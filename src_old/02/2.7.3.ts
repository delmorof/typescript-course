/*

  Esercizio: ricavare il tipo delle chiavi del campo `bar` dalla seguente definizione

*/

export interface Foo {
  foo: {
    bar: {
      baz: number
      quux: string
    }
  }
}

type TypeOfKeysOfBar = never

// tests

import { AssertEquals } from '../equals'

type S1 = AssertEquals<TypeOfKeysOfBar, 'baz' | 'quux', 'T'>
