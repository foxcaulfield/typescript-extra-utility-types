// ========================== Utility Types ==========================

/**
 * Properly types Object.entries and provides a helper function.
 * 
 * @example
 * const obj = { a: 1, b: "test" };
 * const entries = getEntries(obj); // ['a', 1] | ['b', "test"]
 */
type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
	
const getEntries = <T extends Record<string, unknown>>(obj: T) => Object.entries(obj) as ObjectEntries<T>;

function getEntries<O extends object, K extends keyof O>(obj: O):Array<(readonly [K, O[K]])> {
	return (Object.keys(obj) as Array<K>).map(k => [k, obj[k]] as const);
}

/**
 * Makes all properties of an object mutable.
 * 
 * @example
 * interface ReadonlyObject { readonly x: number; readonly y: string; }
 * type MutableObject = Writable<ReadonlyObject>; // { x: number; y: string; }
 */
type Writable<T> = { -readonly [K in keyof T]: T[K] };

/**
 * Extracts the element type from an array type.
 * 
 * @example
 * const sampleArray = [1, 2, 3, "hello", true, 7, 8];
 * type TElem = ElementOfArray<SampleArray>; // number | string | boolean
 */
type ElementOfArray<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Extracts the writable keys of an object.
 * 
 * @example
 * interface TestModel { 
 *	propOne: string; 
 *	propTwo: string; 
 *	readonly propThree: string; 
 * }
 *
 * type TestModelWritableKeys = WritableKeys<TestModel>; // "propOne" | "propTwo"
 */
type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

/**
 * Extracts the readonly keys of an object.
 * 
 * @example
 * interface TestModel { 
 *	propOne: string; 
 *	propTwo: string; 
 *	readonly propThree: string; 
 * }
 *
 * type TestModelReadonlyKeys = ReadonlyKeys<TestModel>; // "propThree"
 */
type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];
