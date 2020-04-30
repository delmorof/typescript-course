/*

  Esercizio: Definire una versione di `Array.isArray` più type-safe

*/

export const isArray = (x: unknown): x is Array<unknown> =>
  Array.isArray(x)


const payload = `{"bar":[1,2,3]}`
const x = JSON.parse(payload)
if (Array.isArray(x)) {
  // x ha tipo Array<any>
  console.log(x.keys)
}

if (isArray(x)) {
  // x ha tipo Array<unknown>
  console.log(x.keys)
}