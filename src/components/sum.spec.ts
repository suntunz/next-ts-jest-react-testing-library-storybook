import { sum } from './sum'

it('suming 5 + 2 will return 7', () => {
  const a = 5
  expect(a).toBe(5)
  expect(sum(5, 2)).toBe(7)
})
