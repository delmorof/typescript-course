/*

  Esercizio: aggiungere degli alias a delle proprietà di una classe.

  - aggiungere gli alias `unwrap` e `to` per `get`
  - aggiungere gli alias `wrap` e `from` per `reverseGet`

*/

/**
 * Rappresenta un isomorfismo tra gli insiemi S e A
 */
export class Iso<S, A> { 
  readonly wrap: this['reverseGet'] = this.reverseGet
  readonly unwrap: this['get']
  from: Iso<S, A>['reverseGet']
  constructor(
    readonly get: (s: S) => A,
    readonly reverseGet: (a: A) => S
  ) {  
    this.unwrap = get;
    this.from = reverseGet;
  }

  to(s: S): A {
    return this.get(s)
  }    
}

// Posso definire un alias sia come proprietà che come funzione.
// Nel caso di funzione sono costretto a indicare nuovamente il tipo che 
// non può essere ereditato dal paramentro del costruttore e non posso impedire di sovrascrivere 
// l'implementazione a runtime, cosa che posso fare usando le proprietà con readonly.

// tests

import * as assert from 'assert'

const meter2Km = new Iso<number, number>(
  s => s / 1000,
  a => a * 1000
)

// Esempio di modifica di un metodo a runtime 
//meter2Km.to =  s => s / 500;

assert.strictEqual(meter2Km.get(1200), 1.2)
assert.strictEqual(meter2Km.to(1200), 1.2)
assert.strictEqual(meter2Km.unwrap(1200), 1.2)

assert.strictEqual(meter2Km.reverseGet(1.2), 1200)
assert.strictEqual(meter2Km.from(1.2), 1200)
assert.strictEqual(meter2Km.wrap(1.2), 1200)
