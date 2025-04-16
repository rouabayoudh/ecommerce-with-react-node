export type TFilterKeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: Array<any> extends T[K]
        ? Exclude<K, symbol>
        : K extends symbol
          ? Exclude<K, symbol>
          : `${Exclude<K, symbol>}${'' | `.${NestedKeys<T[K]>}`}`;
    }[keyof T]
  : never;

export type ObjectWithNestedKeys<T, ValueType = any> = Partial<{
  [K in NestedKeys<T>]: ValueType;
}>;

export type TFilterNestedKeysOfType<T, U> = T extends object
  ? {
      [K in keyof T]: T[K] extends U
        ? `${K & string}`
        : T[K] extends object
          ? Array<any> extends T[K]
            ? never
            : `${K & string}.${TFilterNestedKeysOfType<T[K], U>}`
          : never;
    }[keyof T]
  : never;
