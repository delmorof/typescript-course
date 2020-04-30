/*

  Esercizio: Definire una custom type guard che raffina un valore qualsiasi in un `Array<number>`

*/

const isNumber = (x: unknown): x is number =>
  typeof x === 'number'

const isArray = (x: unknown): x is Array<unknown> =>
  Array.isArray(x)

export const isArrayOfNumbers = (x: unknown): x is Array<number> => {
  return isArray(x) && x.every(v => isNumber(v))
}

// tests

import * as assert from 'assert'

assert.strictEqual(isArrayOfNumbers(1), false)
assert.strictEqual(isArrayOfNumbers([]), true)
assert.strictEqual(isArrayOfNumbers(['a', 'b']), false)
assert.strictEqual(isArrayOfNumbers(['a', 1]), false)
assert.strictEqual(isArrayOfNumbers([1, 2]), true)
