import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.goto('/admin')
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
})

test('saves a draft, previews it, and publishes without leaking the draft publicly', async ({ page }) => {
  const draftHeading = 'Новый заголовок для проверки публикации'

  await page.goto('/admin/pages/home')
  await page.getByLabel('Заголовок').fill(draftHeading)
  await page.getByRole('button', { name: 'Сохранить черновик' }).click()
  await expect(page.getByText('Черновик сохранён', { exact: true })).toBeVisible()
  await page.reload()
  await expect(page.getByLabel('Заголовок')).toHaveValue(draftHeading)

  await page.goto('/preview/home')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(draftHeading)

  await page.goto('/site/home')
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(draftHeading)

  await page.goto('/admin/pages/home')
  await page.getByRole('button', { name: 'Опубликовать' }).click()
  await expect(page.getByText('Страница опубликована', { exact: true })).toBeVisible()

  await page.goto('/site/home')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(draftHeading)
})

test('creates and publishes a new news item in one action', async ({ page }) => {
  await page.goto('/admin/news/new')
  await page.getByLabel('Заголовок').fill('Новая демонстрационная публикация')
  await page.getByLabel('Адрес').fill('demo-publication')
  await page.getByLabel('Краткое описание').fill('Проверяем полный сценарий создания новости.')
  await page.getByRole('button', { name: 'Опубликовать' }).click()
  await expect(page).toHaveURL(/\/admin\/news\/news-/)
  await expect(page.getByText('Новость опубликована.', { exact: true })).toBeVisible()

  await page.goto('/admin/news')
  const createdRow = page.getByRole('row').filter({ hasText: 'Новая демонстрационная публикация' })
  await expect(createdRow).toBeVisible()
  await expect(createdRow.getByText('Опубликовано')).toBeVisible()
})

test('keeps editor users out of user administration on direct navigation', async ({ page }) => {
  await page.goto('/admin')
  await page.getByRole('combobox', { name: 'Роль' }).selectOption('editor')
  await page.goto('/admin/users')
  await expect(page.getByRole('heading', { name: 'Недостаточно прав' })).toBeVisible()
  await expect(page.getByText('oleg@example.ru')).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Недостаточно прав' })).toBeVisible()
  await expect(page.getByText('oleg@example.ru')).toHaveCount(0)
})

test('supports the populated login demonstration', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: 'Войти' }).click()
  await expect(page).toHaveURL(/\/admin$/)
  await expect(page.getByRole('heading', { name: 'Добрый день, Олег' })).toBeVisible()
})

test('protects unsaved edits during internal navigation', async ({ page }) => {
  await page.goto('/admin/pages/home')
  await page.getByLabel('Заголовок').fill('Несохранённая проверка')
  await page.getByRole('link', { name: 'Новости' }).click()
  await expect(page.getByRole('heading', { name: 'Уйти без сохранения?' })).toBeVisible()
  await page.getByRole('button', { name: 'Остаться' }).click()
  await expect(page.getByLabel('Заголовок')).toHaveValue('Несохранённая проверка')

  await page.getByRole('link', { name: 'Новости' }).click()
  await page.getByRole('button', { name: 'Уйти без сохранения' }).click()
  await expect(page).toHaveURL(/\/admin\/news$/)
})

test('has no horizontal page overflow on a 390px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/admin/pages/home')
  const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})

test('keeps keyboard focus inside an open dialog', async ({ page }) => {
  await page.goto('/admin/pages/home')
  await page.getByRole('button', { name: 'Заменить изображение' }).click()
  const dialog = page.getByRole('dialog', { name: 'Выбрать изображение' })
  await expect(dialog.getByRole('button', { name: 'Закрыть окно' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Выбрать', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Закрыть окно' })).toBeFocused()
})

test('reports unavailable browser persistence without crashing the workspace', async ({ page }) => {
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === 'oj-cms-demo-v1') throw new DOMException('Quota exceeded', 'QuotaExceededError')
      return originalSetItem.call(this, key, value)
    }
  })
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Добрый день, Олег' })).toBeVisible()
  await expect(page.getByText('Браузеру не удалось сохранить изменения', { exact: false })).toBeVisible()
})

for (const route of ['/login', '/admin', '/admin/pages/home']) {
  test(`${route} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length }))).toEqual([])
  })
}
