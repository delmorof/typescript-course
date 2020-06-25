# Sintesi argomenti

## Inline declarations

Le dichiarazione all’interno del codice invece che nei definition file sono particolarmente utili quando si stia esplorando una soluzione e per fare velocemente delle prove di type checking.

```ts
// costanti
declare const a: number
// variabili
declare let b: number
// classi
declare class Foo {
    public value: string
    constructor(value: string)
}
// funzioni
declare function f(x: string): number
declare const g: (x: string) => number
```

## [Overloading](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#function-overloads)

Gli overloading servono a rendere più precise le firme delle funzioni.

```ts
declare function g(x: number): string
declare function g(x: string): number
declare function g(x: string | n umber): number | string
```

La terza firma di g serve a guidare l’implementazione e non comparirà
nel definition file generato da TypeScript se declaration = true nel
tsconfig.jso

## [Polimorfismo e Generics](https://www.typescriptlang.org/docs/handbook/generics.html#introduction)

Una funzione viene detta polimorfica se può gestire diversi tipi parametrizzati, monomorfica altrimenti.

```ts
// una funzione polimorfica
declare function head<A>(xs: Array<A>): A | undefined
```

E' possibile definire anche classi o interfacce polimorfiche

```ts
// classe polimorfica
class GenericClass<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```

### Generic Constraints 

Durante l'implementazione di una classe o di una funzione polimorfica potremmo voler restringere i tipi
che possono utilizzare la nostra implementazione a solo quelli che hanno certe caratteristiche. 
Ad esempio potremmo voler implementare una funzione utilizzabile solamente dai tipi che espoongono una 
proprietà *length*, per farlo è possibile usare la keyword **extends** della definizione del tipo parametrizzato.


```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3}); // Valid
```


## [Custom type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)

Una Type guards è un'espressione che esegue un controllo a runtime che garantisce il tipo  in un determinato ambito. 

Come si definisce:

```ts
type Refinement<A, B extends A> = (a: A) => a is B
```

Notare che B deve essere assegnabile ad A. In
altre parole B deve essere un sottotipo di A.

Esempi:

```ts
const isObject = (x: unknown): x is object =>
    typeof x === ’object’ && x !== null

const isDictionary = (
        x: unknown
    ): x is { [key: string]: unknown } => isObject(x)

const isString = (x: unknown): x is string =>
    typeof x === ’string’
```
Come si usano:

```ts
export const isString = (x: unknown): x is string => {
    return typeof x === "string"
}
    
const f = (x: string | number): number => {
    if (isString(x)) {
        // qui x è di tipo string
        return x.length
    } else {
        // qui x è di tipo number
        return x
    }
}
```

Alcune custom type guard sono predefinite, un esempio notevole è Array.isArray

```ts
Array.isArray(x) // Notate però che Array.isArray raffina a Array<any>
```

per raffinare ulteriormente potremmo definire:
```ts
const isArray = (x: unknown): x is Array<unknown> => {
  return Array.isArray(x)
}
```
[unknown è più restrittivo di any](https://devblogs.microsoft.com/typescript/announcing-typescript-3-0-rc-2/#the-unknown-type)

## Readonly

Il modificatore readonly rende immutabili i campi di un oggetto:

```ts
interface Person {
    readonly name: string
    readonly age: number
}

declare const person: Person
person.age = 42 // Cannot assign to ’age’ because it is a constant or a read-only property
```

Per rendere immutabile un tipo già definito è possibile usare il tipo pre-
definito Readonly

```ts
interface Point {
    x: number
    y: number
}
type ImmutablePoint = Readonly<Point>
/*
type ImmutablePoint = {
    readonly x: number;
    readonly y: number;
}
*/
```

Per i field delle classi è possibile esprimere il modificatore readonly di-
rettamente nel costruttore

```ts
class Point2D {
    constructor(readonly x: number, readonly y: number) {}
}
```

È anche possibile rendere immutabile un **Array** con il tipo
predefinito **ReadonlyArray**. Ci sono interfacce analoghe per **Map** e **Set**, rispettivamente **ReadonlyMap** e **ReadonlySet**.

```ts
const x: ReadonlyArray<number> = [1, 2, 3]
x.push(4) // error: Property ’push’ does not exist on type ’ReadonlyArray<number>’

```
## Index type

### [Index type query operator](https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types)

E' possibile ricavare l'union type formato dal nome delle chiavi di un oggetto usando l’operatore keyof

```ts
interface Point {
    x: number
    y: number
}
type PointKeys = keyof Point
/*
    type PointKeys = "x" | "y"
*/

type ArrayKeys = keyof Array<number>
/*
type ArrayKeys = number | "length" | "toString" |
"toLocaleString" | "push" | "pop" | "concat" | "join" |
"reverse" | "shift" | "slice" | "sort" | "splice" |
"unshift" | "indexOf" | "lastIndexOf" | "every" | "some" |
"forEach" | "map" | "filter" | "reduce" | "reduceRight" |
"entries" | "keys" | "values" | "find" | "findIndex" |
"fill" | "copyWithin"
*/
```

### Indexed access operator []
Cosı̀ come è possibile, dato un oggetto, ricavare il valore di una sua proprietà
usando l’accesso per indice, l'operatore T[K] permette di estrarre il tipo del campo K dal tipo T

```ts
interface Person {
    name: string
    age: number
}

type Name = Person["name"]
/*
    type Name = string
*/
    type Age = Person["age"]
/*
    type Age = number
*/
```

## Mapped Types

TypeScript fornisce un modo per creare nuovi tipi basati su tipi già definiti, i mapped types. La formula generale di un mapped type è la seguente

```ts
    {[K in U] : f (K)}
```

dove 

- K è una variabile.
- U è una unione
- f è una funzione di K

ad esempio:

```ts
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
/*
    type Flags = {
        option1: boolean;
        option2: boolean;
    }
*/

interface Person {
    name: string;
    age: number;
}


// Rende le proprietà di un tipo readoly
type Readonly<T> = { readonly [P in keyof T]: T[P] }

type PersonPartial = Partial<Person>; 
/*
    type PersonPartial = {
        name?: string | undefined;
        age?: number | undefined;
    }
*/

// Rende le proprietà di un tipo opsionali
type Partial<T> = { [P in keyof T]?: T[P] }

// Rende le proprietà di un tipo obbligatorie
type Required<T> = { [P in keyof T]-?: T[P] }

type ReadonlyPerson = Readonly<Person>;
/*
    type ReadonlyPerson = {
        readonly name: string;
        readonly age: number;
    }
*/

// Rende le proprietà di un tipo nullabele
type Nullable<T> = { [P in keyof T]: T[P] | null }

type Pick<T, K extends keyof T> = { [P in K]: T[P] }
```
Typescript mette a disposizione una serie di utility types per facilitare le trasformazioni più comuni. [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#table-of-contents)

## [Conditional Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types)


```ts
    T extends U ? X : Y
```

Se T è assegnabile a U allora il tipo risultante è X, altrimenti è Y

Esempio:

```ts
    /**
    * Exclude from T those types that are assignable to U
    */
    type Exclude<T, U> = T extends U ? never : T;

    // voglio una copia di ‘Person‘ tranne il campo ‘age‘
    export interface Person {
        firstName: string
        lastName: string
        age: number
    }
    type NotAge = Exclude<keyof Person, 'age'>    
```

### [Type inference in conditional types ](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-inference-in-conditional-types)
Nell clausola extends di un conditional type è possibile utilizzare la key-word infer che introduce una type variable da far inferire al type checker.
Queste type variable possono essere poi utilizzate nel ramo positivo del conditional type. 

```ts
    type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

    type T0 = Unpacked<string>;  // string
    type T1 = Unpacked<string[]>;  // string
    type T2 = Unpacked<() => string>;  // string
    type T3 = Unpacked<Promise<string>>;  // string
    type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
    type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string
```

