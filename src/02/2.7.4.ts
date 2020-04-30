/*

  Esercizio: tipizzare la funzione `get`

*/


//export declare function get(key: string, obj: unknown): unknown

// Soluzione
export declare function get<O, K extends keyof O>(key: K, obj: O): O[K]

// tests

import { AssertEquals } from '../equals'

// $ExpectError .
get('a', 1)
// $ExpectError .
get('a', {})
// $ExpectError .
get('a', { b: 1 })

const s1 = get('a', { a: 1, b: true })
type S1 = AssertEquals<typeof s1, number, 'T'>
