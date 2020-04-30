/*

  Esercizio: estrarre il tipo di una componente di una tupla

*/

type Tuple = [number, string, boolean]

// estrarre la prima componente
type Num = Tuple[0];
// estrarre la seconda componente
type Str = Tuple[1]

// tests

import { AssertEquals } from '../equals'
import { tuple } from '../../chapters/02/2.12/2.12.2'

type S1 = AssertEquals<Num, number, 'T'>
type S2 = AssertEquals<Str, string, 'T'>
