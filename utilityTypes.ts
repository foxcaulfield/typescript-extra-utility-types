type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

type Writable<T> = {
	-readonly [K in keyof T]: T[K];
};
