/*

  Esercizio: generalizzare la soluzione precedente (2.4.2)

*/

import { isArray } from './2.4.1'
import { isNumber } from 'util'

// Uso la definizione di Custom Type guard per definire un tipo che accetterò 
// come parametro d'ingresso
type Refinement<A, B extends A> = (a: A) => a is B


export function createIsArrayOf<A>(refinement: Refinement<unknown, A>): Refinement<unknown, Array<A>>{  
  return (x: unknown): x is Array<A> => 
    isArray(x) && x.every(v => refinement(v))
}


// Esempio di utilizzo
const payload = `{"bar":[1,2,3]}`
const x = JSON.parse(payload)
if (createIsArrayOf(isNumber)(x)) {
  // x ha tipo number[]
  console.log(x.keys)
}
