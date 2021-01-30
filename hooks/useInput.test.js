import { act, renderHook } from '@testing-library/react-hooks'

import useInput from './useInput'

test('should increment counter', () => {
  const { value, input } = renderHook(() =>
    useInput({ type: 'number', data: 5 }),
  )

  expect(value).toBe(5)

  act(() => {
    input.onChange(3)
  })

  expect(value).toBe(3)
})
