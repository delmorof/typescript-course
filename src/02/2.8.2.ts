/*

  Esercizio: Dato lo string literal type

  ```
  type Key = 'foo'
  ```

  derivare il tipo

  ```
  type O = {
    foo: number
  }
  ```

*/

type Key = 'foo'

type O = never

// tests

import { AssertEquals } from '../equals'

type S1 = AssertEquals<
  O,
  {
    foo: number
  },
  'T'
>
