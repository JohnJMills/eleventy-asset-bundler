import { expect, test } from 'vitest'
import getFileSlug from './get-file-slug.js'

test('getFileSlug', () => {
  expect(getFileSlug('src/index.js')).toBe('index')
})