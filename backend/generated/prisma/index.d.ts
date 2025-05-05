
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Kitchen
 * 
 */
export type Kitchen = $Result.DefaultSelection<Prisma.$KitchenPayload>
/**
 * Model Food
 * 
 */
export type Food = $Result.DefaultSelection<Prisma.$FoodPayload>
/**
 * Model FoodMacro
 * 
 */
export type FoodMacro = $Result.DefaultSelection<Prisma.$FoodMacroPayload>
/**
 * Model NutritionalMetric
 * 
 */
export type NutritionalMetric = $Result.DefaultSelection<Prisma.$NutritionalMetricPayload>
/**
 * Model UserPreference
 * 
 */
export type UserPreference = $Result.DefaultSelection<Prisma.$UserPreferencePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kitchen`: Exposes CRUD operations for the **Kitchen** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kitchens
    * const kitchens = await prisma.kitchen.findMany()
    * ```
    */
  get kitchen(): Prisma.KitchenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.food`: Exposes CRUD operations for the **Food** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Foods
    * const foods = await prisma.food.findMany()
    * ```
    */
  get food(): Prisma.FoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foodMacro`: Exposes CRUD operations for the **FoodMacro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoodMacros
    * const foodMacros = await prisma.foodMacro.findMany()
    * ```
    */
  get foodMacro(): Prisma.FoodMacroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nutritionalMetric`: Exposes CRUD operations for the **NutritionalMetric** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NutritionalMetrics
    * const nutritionalMetrics = await prisma.nutritionalMetric.findMany()
    * ```
    */
  get nutritionalMetric(): Prisma.NutritionalMetricDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userPreference`: Exposes CRUD operations for the **UserPreference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPreferences
    * const userPreferences = await prisma.userPreference.findMany()
    * ```
    */
  get userPreference(): Prisma.UserPreferenceDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Kitchen: 'Kitchen',
    Food: 'Food',
    FoodMacro: 'FoodMacro',
    NutritionalMetric: 'NutritionalMetric',
    UserPreference: 'UserPreference'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "kitchen" | "food" | "foodMacro" | "nutritionalMetric" | "userPreference"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Kitchen: {
        payload: Prisma.$KitchenPayload<ExtArgs>
        fields: Prisma.KitchenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KitchenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KitchenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>
          }
          findFirst: {
            args: Prisma.KitchenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KitchenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>
          }
          findMany: {
            args: Prisma.KitchenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>[]
          }
          create: {
            args: Prisma.KitchenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>
          }
          createMany: {
            args: Prisma.KitchenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KitchenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>[]
          }
          delete: {
            args: Prisma.KitchenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>
          }
          update: {
            args: Prisma.KitchenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>
          }
          deleteMany: {
            args: Prisma.KitchenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KitchenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KitchenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>[]
          }
          upsert: {
            args: Prisma.KitchenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KitchenPayload>
          }
          aggregate: {
            args: Prisma.KitchenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKitchen>
          }
          groupBy: {
            args: Prisma.KitchenGroupByArgs<ExtArgs>
            result: $Utils.Optional<KitchenGroupByOutputType>[]
          }
          count: {
            args: Prisma.KitchenCountArgs<ExtArgs>
            result: $Utils.Optional<KitchenCountAggregateOutputType> | number
          }
        }
      }
      Food: {
        payload: Prisma.$FoodPayload<ExtArgs>
        fields: Prisma.FoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          findFirst: {
            args: Prisma.FoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          findMany: {
            args: Prisma.FoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          create: {
            args: Prisma.FoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          createMany: {
            args: Prisma.FoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          delete: {
            args: Prisma.FoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          update: {
            args: Prisma.FoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          deleteMany: {
            args: Prisma.FoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          upsert: {
            args: Prisma.FoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          aggregate: {
            args: Prisma.FoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFood>
          }
          groupBy: {
            args: Prisma.FoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodCountArgs<ExtArgs>
            result: $Utils.Optional<FoodCountAggregateOutputType> | number
          }
        }
      }
      FoodMacro: {
        payload: Prisma.$FoodMacroPayload<ExtArgs>
        fields: Prisma.FoodMacroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodMacroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodMacroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>
          }
          findFirst: {
            args: Prisma.FoodMacroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodMacroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>
          }
          findMany: {
            args: Prisma.FoodMacroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>[]
          }
          create: {
            args: Prisma.FoodMacroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>
          }
          createMany: {
            args: Prisma.FoodMacroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodMacroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>[]
          }
          delete: {
            args: Prisma.FoodMacroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>
          }
          update: {
            args: Prisma.FoodMacroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>
          }
          deleteMany: {
            args: Prisma.FoodMacroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodMacroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoodMacroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>[]
          }
          upsert: {
            args: Prisma.FoodMacroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodMacroPayload>
          }
          aggregate: {
            args: Prisma.FoodMacroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoodMacro>
          }
          groupBy: {
            args: Prisma.FoodMacroGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodMacroGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodMacroCountArgs<ExtArgs>
            result: $Utils.Optional<FoodMacroCountAggregateOutputType> | number
          }
        }
      }
      NutritionalMetric: {
        payload: Prisma.$NutritionalMetricPayload<ExtArgs>
        fields: Prisma.NutritionalMetricFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NutritionalMetricFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NutritionalMetricFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>
          }
          findFirst: {
            args: Prisma.NutritionalMetricFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NutritionalMetricFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>
          }
          findMany: {
            args: Prisma.NutritionalMetricFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>[]
          }
          create: {
            args: Prisma.NutritionalMetricCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>
          }
          createMany: {
            args: Prisma.NutritionalMetricCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NutritionalMetricCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>[]
          }
          delete: {
            args: Prisma.NutritionalMetricDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>
          }
          update: {
            args: Prisma.NutritionalMetricUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>
          }
          deleteMany: {
            args: Prisma.NutritionalMetricDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NutritionalMetricUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NutritionalMetricUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>[]
          }
          upsert: {
            args: Prisma.NutritionalMetricUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NutritionalMetricPayload>
          }
          aggregate: {
            args: Prisma.NutritionalMetricAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNutritionalMetric>
          }
          groupBy: {
            args: Prisma.NutritionalMetricGroupByArgs<ExtArgs>
            result: $Utils.Optional<NutritionalMetricGroupByOutputType>[]
          }
          count: {
            args: Prisma.NutritionalMetricCountArgs<ExtArgs>
            result: $Utils.Optional<NutritionalMetricCountAggregateOutputType> | number
          }
        }
      }
      UserPreference: {
        payload: Prisma.$UserPreferencePayload<ExtArgs>
        fields: Prisma.UserPreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          findFirst: {
            args: Prisma.UserPreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          findMany: {
            args: Prisma.UserPreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>[]
          }
          create: {
            args: Prisma.UserPreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          createMany: {
            args: Prisma.UserPreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserPreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>[]
          }
          delete: {
            args: Prisma.UserPreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          update: {
            args: Prisma.UserPreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          deleteMany: {
            args: Prisma.UserPreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserPreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>[]
          }
          upsert: {
            args: Prisma.UserPreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPreferencePayload>
          }
          aggregate: {
            args: Prisma.UserPreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPreference>
          }
          groupBy: {
            args: Prisma.UserPreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<UserPreferenceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    kitchen?: KitchenOmit
    food?: FoodOmit
    foodMacro?: FoodMacroOmit
    nutritionalMetric?: NutritionalMetricOmit
    userPreference?: UserPreferenceOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    macroPreferences: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    macroPreferences?: boolean | UserCountOutputTypeCountMacroPreferencesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMacroPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPreferenceWhereInput
  }


  /**
   * Count Type KitchenCountOutputType
   */

  export type KitchenCountOutputType = {
    foods: number
  }

  export type KitchenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foods?: boolean | KitchenCountOutputTypeCountFoodsArgs
  }

  // Custom InputTypes
  /**
   * KitchenCountOutputType without action
   */
  export type KitchenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KitchenCountOutputType
     */
    select?: KitchenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KitchenCountOutputType without action
   */
  export type KitchenCountOutputTypeCountFoodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodWhereInput
  }


  /**
   * Count Type FoodCountOutputType
   */

  export type FoodCountOutputType = {
    macros: number
  }

  export type FoodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    macros?: boolean | FoodCountOutputTypeCountMacrosArgs
  }

  // Custom InputTypes
  /**
   * FoodCountOutputType without action
   */
  export type FoodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodCountOutputType
     */
    select?: FoodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FoodCountOutputType without action
   */
  export type FoodCountOutputTypeCountMacrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodMacroWhereInput
  }


  /**
   * Count Type NutritionalMetricCountOutputType
   */

  export type NutritionalMetricCountOutputType = {
    preferences: number
    foodMacros: number
  }

  export type NutritionalMetricCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | NutritionalMetricCountOutputTypeCountPreferencesArgs
    foodMacros?: boolean | NutritionalMetricCountOutputTypeCountFoodMacrosArgs
  }

  // Custom InputTypes
  /**
   * NutritionalMetricCountOutputType without action
   */
  export type NutritionalMetricCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetricCountOutputType
     */
    select?: NutritionalMetricCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NutritionalMetricCountOutputType without action
   */
  export type NutritionalMetricCountOutputTypeCountPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPreferenceWhereInput
  }

  /**
   * NutritionalMetricCountOutputType without action
   */
  export type NutritionalMetricCountOutputTypeCountFoodMacrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodMacroWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    name: string | null
    email: string | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    name: string | null
    email: string | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    name: number
    email: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    name?: true
    email?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    name: string | null
    email: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    email?: boolean
    macroPreferences?: boolean | User$macroPreferencesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    name?: boolean
    email?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "name" | "email", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    macroPreferences?: boolean | User$macroPreferencesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      macroPreferences: Prisma.$UserPreferencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      name: string | null
      email: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    macroPreferences<T extends User$macroPreferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$macroPreferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.macroPreferences
   */
  export type User$macroPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    where?: UserPreferenceWhereInput
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    cursor?: UserPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Kitchen
   */

  export type AggregateKitchen = {
    _count: KitchenCountAggregateOutputType | null
    _min: KitchenMinAggregateOutputType | null
    _max: KitchenMaxAggregateOutputType | null
  }

  export type KitchenMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type KitchenMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type KitchenCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type KitchenMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type KitchenMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type KitchenCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type KitchenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kitchen to aggregate.
     */
    where?: KitchenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kitchens to fetch.
     */
    orderBy?: KitchenOrderByWithRelationInput | KitchenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KitchenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kitchens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kitchens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kitchens
    **/
    _count?: true | KitchenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KitchenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KitchenMaxAggregateInputType
  }

  export type GetKitchenAggregateType<T extends KitchenAggregateArgs> = {
        [P in keyof T & keyof AggregateKitchen]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKitchen[P]>
      : GetScalarType<T[P], AggregateKitchen[P]>
  }




  export type KitchenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KitchenWhereInput
    orderBy?: KitchenOrderByWithAggregationInput | KitchenOrderByWithAggregationInput[]
    by: KitchenScalarFieldEnum[] | KitchenScalarFieldEnum
    having?: KitchenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KitchenCountAggregateInputType | true
    _min?: KitchenMinAggregateInputType
    _max?: KitchenMaxAggregateInputType
  }

  export type KitchenGroupByOutputType = {
    id: string
    name: string
    description: string | null
    _count: KitchenCountAggregateOutputType | null
    _min: KitchenMinAggregateOutputType | null
    _max: KitchenMaxAggregateOutputType | null
  }

  type GetKitchenGroupByPayload<T extends KitchenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KitchenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KitchenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KitchenGroupByOutputType[P]>
            : GetScalarType<T[P], KitchenGroupByOutputType[P]>
        }
      >
    >


  export type KitchenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    foods?: boolean | Kitchen$foodsArgs<ExtArgs>
    _count?: boolean | KitchenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kitchen"]>

  export type KitchenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["kitchen"]>

  export type KitchenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["kitchen"]>

  export type KitchenSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type KitchenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description", ExtArgs["result"]["kitchen"]>
  export type KitchenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foods?: boolean | Kitchen$foodsArgs<ExtArgs>
    _count?: boolean | KitchenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KitchenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KitchenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KitchenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kitchen"
    objects: {
      foods: Prisma.$FoodPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
    }, ExtArgs["result"]["kitchen"]>
    composites: {}
  }

  type KitchenGetPayload<S extends boolean | null | undefined | KitchenDefaultArgs> = $Result.GetResult<Prisma.$KitchenPayload, S>

  type KitchenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KitchenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KitchenCountAggregateInputType | true
    }

  export interface KitchenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kitchen'], meta: { name: 'Kitchen' } }
    /**
     * Find zero or one Kitchen that matches the filter.
     * @param {KitchenFindUniqueArgs} args - Arguments to find a Kitchen
     * @example
     * // Get one Kitchen
     * const kitchen = await prisma.kitchen.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KitchenFindUniqueArgs>(args: SelectSubset<T, KitchenFindUniqueArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kitchen that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KitchenFindUniqueOrThrowArgs} args - Arguments to find a Kitchen
     * @example
     * // Get one Kitchen
     * const kitchen = await prisma.kitchen.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KitchenFindUniqueOrThrowArgs>(args: SelectSubset<T, KitchenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kitchen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenFindFirstArgs} args - Arguments to find a Kitchen
     * @example
     * // Get one Kitchen
     * const kitchen = await prisma.kitchen.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KitchenFindFirstArgs>(args?: SelectSubset<T, KitchenFindFirstArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kitchen that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenFindFirstOrThrowArgs} args - Arguments to find a Kitchen
     * @example
     * // Get one Kitchen
     * const kitchen = await prisma.kitchen.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KitchenFindFirstOrThrowArgs>(args?: SelectSubset<T, KitchenFindFirstOrThrowArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kitchens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kitchens
     * const kitchens = await prisma.kitchen.findMany()
     * 
     * // Get first 10 Kitchens
     * const kitchens = await prisma.kitchen.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kitchenWithIdOnly = await prisma.kitchen.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KitchenFindManyArgs>(args?: SelectSubset<T, KitchenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kitchen.
     * @param {KitchenCreateArgs} args - Arguments to create a Kitchen.
     * @example
     * // Create one Kitchen
     * const Kitchen = await prisma.kitchen.create({
     *   data: {
     *     // ... data to create a Kitchen
     *   }
     * })
     * 
     */
    create<T extends KitchenCreateArgs>(args: SelectSubset<T, KitchenCreateArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kitchens.
     * @param {KitchenCreateManyArgs} args - Arguments to create many Kitchens.
     * @example
     * // Create many Kitchens
     * const kitchen = await prisma.kitchen.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KitchenCreateManyArgs>(args?: SelectSubset<T, KitchenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kitchens and returns the data saved in the database.
     * @param {KitchenCreateManyAndReturnArgs} args - Arguments to create many Kitchens.
     * @example
     * // Create many Kitchens
     * const kitchen = await prisma.kitchen.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kitchens and only return the `id`
     * const kitchenWithIdOnly = await prisma.kitchen.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KitchenCreateManyAndReturnArgs>(args?: SelectSubset<T, KitchenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Kitchen.
     * @param {KitchenDeleteArgs} args - Arguments to delete one Kitchen.
     * @example
     * // Delete one Kitchen
     * const Kitchen = await prisma.kitchen.delete({
     *   where: {
     *     // ... filter to delete one Kitchen
     *   }
     * })
     * 
     */
    delete<T extends KitchenDeleteArgs>(args: SelectSubset<T, KitchenDeleteArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kitchen.
     * @param {KitchenUpdateArgs} args - Arguments to update one Kitchen.
     * @example
     * // Update one Kitchen
     * const kitchen = await prisma.kitchen.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KitchenUpdateArgs>(args: SelectSubset<T, KitchenUpdateArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kitchens.
     * @param {KitchenDeleteManyArgs} args - Arguments to filter Kitchens to delete.
     * @example
     * // Delete a few Kitchens
     * const { count } = await prisma.kitchen.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KitchenDeleteManyArgs>(args?: SelectSubset<T, KitchenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kitchens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kitchens
     * const kitchen = await prisma.kitchen.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KitchenUpdateManyArgs>(args: SelectSubset<T, KitchenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kitchens and returns the data updated in the database.
     * @param {KitchenUpdateManyAndReturnArgs} args - Arguments to update many Kitchens.
     * @example
     * // Update many Kitchens
     * const kitchen = await prisma.kitchen.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Kitchens and only return the `id`
     * const kitchenWithIdOnly = await prisma.kitchen.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KitchenUpdateManyAndReturnArgs>(args: SelectSubset<T, KitchenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Kitchen.
     * @param {KitchenUpsertArgs} args - Arguments to update or create a Kitchen.
     * @example
     * // Update or create a Kitchen
     * const kitchen = await prisma.kitchen.upsert({
     *   create: {
     *     // ... data to create a Kitchen
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kitchen we want to update
     *   }
     * })
     */
    upsert<T extends KitchenUpsertArgs>(args: SelectSubset<T, KitchenUpsertArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kitchens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenCountArgs} args - Arguments to filter Kitchens to count.
     * @example
     * // Count the number of Kitchens
     * const count = await prisma.kitchen.count({
     *   where: {
     *     // ... the filter for the Kitchens we want to count
     *   }
     * })
    **/
    count<T extends KitchenCountArgs>(
      args?: Subset<T, KitchenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KitchenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kitchen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KitchenAggregateArgs>(args: Subset<T, KitchenAggregateArgs>): Prisma.PrismaPromise<GetKitchenAggregateType<T>>

    /**
     * Group by Kitchen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KitchenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KitchenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KitchenGroupByArgs['orderBy'] }
        : { orderBy?: KitchenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KitchenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKitchenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kitchen model
   */
  readonly fields: KitchenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kitchen.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KitchenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    foods<T extends Kitchen$foodsArgs<ExtArgs> = {}>(args?: Subset<T, Kitchen$foodsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Kitchen model
   */
  interface KitchenFieldRefs {
    readonly id: FieldRef<"Kitchen", 'String'>
    readonly name: FieldRef<"Kitchen", 'String'>
    readonly description: FieldRef<"Kitchen", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Kitchen findUnique
   */
  export type KitchenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * Filter, which Kitchen to fetch.
     */
    where: KitchenWhereUniqueInput
  }

  /**
   * Kitchen findUniqueOrThrow
   */
  export type KitchenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * Filter, which Kitchen to fetch.
     */
    where: KitchenWhereUniqueInput
  }

  /**
   * Kitchen findFirst
   */
  export type KitchenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * Filter, which Kitchen to fetch.
     */
    where?: KitchenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kitchens to fetch.
     */
    orderBy?: KitchenOrderByWithRelationInput | KitchenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kitchens.
     */
    cursor?: KitchenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kitchens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kitchens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kitchens.
     */
    distinct?: KitchenScalarFieldEnum | KitchenScalarFieldEnum[]
  }

  /**
   * Kitchen findFirstOrThrow
   */
  export type KitchenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * Filter, which Kitchen to fetch.
     */
    where?: KitchenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kitchens to fetch.
     */
    orderBy?: KitchenOrderByWithRelationInput | KitchenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kitchens.
     */
    cursor?: KitchenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kitchens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kitchens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kitchens.
     */
    distinct?: KitchenScalarFieldEnum | KitchenScalarFieldEnum[]
  }

  /**
   * Kitchen findMany
   */
  export type KitchenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * Filter, which Kitchens to fetch.
     */
    where?: KitchenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kitchens to fetch.
     */
    orderBy?: KitchenOrderByWithRelationInput | KitchenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kitchens.
     */
    cursor?: KitchenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kitchens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kitchens.
     */
    skip?: number
    distinct?: KitchenScalarFieldEnum | KitchenScalarFieldEnum[]
  }

  /**
   * Kitchen create
   */
  export type KitchenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * The data needed to create a Kitchen.
     */
    data: XOR<KitchenCreateInput, KitchenUncheckedCreateInput>
  }

  /**
   * Kitchen createMany
   */
  export type KitchenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kitchens.
     */
    data: KitchenCreateManyInput | KitchenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kitchen createManyAndReturn
   */
  export type KitchenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * The data used to create many Kitchens.
     */
    data: KitchenCreateManyInput | KitchenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kitchen update
   */
  export type KitchenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * The data needed to update a Kitchen.
     */
    data: XOR<KitchenUpdateInput, KitchenUncheckedUpdateInput>
    /**
     * Choose, which Kitchen to update.
     */
    where: KitchenWhereUniqueInput
  }

  /**
   * Kitchen updateMany
   */
  export type KitchenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kitchens.
     */
    data: XOR<KitchenUpdateManyMutationInput, KitchenUncheckedUpdateManyInput>
    /**
     * Filter which Kitchens to update
     */
    where?: KitchenWhereInput
    /**
     * Limit how many Kitchens to update.
     */
    limit?: number
  }

  /**
   * Kitchen updateManyAndReturn
   */
  export type KitchenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * The data used to update Kitchens.
     */
    data: XOR<KitchenUpdateManyMutationInput, KitchenUncheckedUpdateManyInput>
    /**
     * Filter which Kitchens to update
     */
    where?: KitchenWhereInput
    /**
     * Limit how many Kitchens to update.
     */
    limit?: number
  }

  /**
   * Kitchen upsert
   */
  export type KitchenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * The filter to search for the Kitchen to update in case it exists.
     */
    where: KitchenWhereUniqueInput
    /**
     * In case the Kitchen found by the `where` argument doesn't exist, create a new Kitchen with this data.
     */
    create: XOR<KitchenCreateInput, KitchenUncheckedCreateInput>
    /**
     * In case the Kitchen was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KitchenUpdateInput, KitchenUncheckedUpdateInput>
  }

  /**
   * Kitchen delete
   */
  export type KitchenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
    /**
     * Filter which Kitchen to delete.
     */
    where: KitchenWhereUniqueInput
  }

  /**
   * Kitchen deleteMany
   */
  export type KitchenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kitchens to delete
     */
    where?: KitchenWhereInput
    /**
     * Limit how many Kitchens to delete.
     */
    limit?: number
  }

  /**
   * Kitchen.foods
   */
  export type Kitchen$foodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    where?: FoodWhereInput
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    cursor?: FoodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Kitchen without action
   */
  export type KitchenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kitchen
     */
    select?: KitchenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kitchen
     */
    omit?: KitchenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KitchenInclude<ExtArgs> | null
  }


  /**
   * Model Food
   */

  export type AggregateFood = {
    _count: FoodCountAggregateOutputType | null
    _min: FoodMinAggregateOutputType | null
    _max: FoodMaxAggregateOutputType | null
  }

  export type FoodMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    kitchen_id: string | null
  }

  export type FoodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    kitchen_id: string | null
  }

  export type FoodCountAggregateOutputType = {
    id: number
    name: number
    description: number
    kitchen_id: number
    _all: number
  }


  export type FoodMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    kitchen_id?: true
  }

  export type FoodMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    kitchen_id?: true
  }

  export type FoodCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    kitchen_id?: true
    _all?: true
  }

  export type FoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Food to aggregate.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Foods
    **/
    _count?: true | FoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodMaxAggregateInputType
  }

  export type GetFoodAggregateType<T extends FoodAggregateArgs> = {
        [P in keyof T & keyof AggregateFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFood[P]>
      : GetScalarType<T[P], AggregateFood[P]>
  }




  export type FoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodWhereInput
    orderBy?: FoodOrderByWithAggregationInput | FoodOrderByWithAggregationInput[]
    by: FoodScalarFieldEnum[] | FoodScalarFieldEnum
    having?: FoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodCountAggregateInputType | true
    _min?: FoodMinAggregateInputType
    _max?: FoodMaxAggregateInputType
  }

  export type FoodGroupByOutputType = {
    id: string
    name: string
    description: string | null
    kitchen_id: string
    _count: FoodCountAggregateOutputType | null
    _min: FoodMinAggregateOutputType | null
    _max: FoodMaxAggregateOutputType | null
  }

  type GetFoodGroupByPayload<T extends FoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodGroupByOutputType[P]>
            : GetScalarType<T[P], FoodGroupByOutputType[P]>
        }
      >
    >


  export type FoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    kitchen_id?: boolean
    kitchen?: boolean | KitchenDefaultArgs<ExtArgs>
    macros?: boolean | Food$macrosArgs<ExtArgs>
    _count?: boolean | FoodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    kitchen_id?: boolean
    kitchen?: boolean | KitchenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    kitchen_id?: boolean
    kitchen?: boolean | KitchenDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    kitchen_id?: boolean
  }

  export type FoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "kitchen_id", ExtArgs["result"]["food"]>
  export type FoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kitchen?: boolean | KitchenDefaultArgs<ExtArgs>
    macros?: boolean | Food$macrosArgs<ExtArgs>
    _count?: boolean | FoodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kitchen?: boolean | KitchenDefaultArgs<ExtArgs>
  }
  export type FoodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kitchen?: boolean | KitchenDefaultArgs<ExtArgs>
  }

  export type $FoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Food"
    objects: {
      kitchen: Prisma.$KitchenPayload<ExtArgs>
      macros: Prisma.$FoodMacroPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      kitchen_id: string
    }, ExtArgs["result"]["food"]>
    composites: {}
  }

  type FoodGetPayload<S extends boolean | null | undefined | FoodDefaultArgs> = $Result.GetResult<Prisma.$FoodPayload, S>

  type FoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoodCountAggregateInputType | true
    }

  export interface FoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Food'], meta: { name: 'Food' } }
    /**
     * Find zero or one Food that matches the filter.
     * @param {FoodFindUniqueArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodFindUniqueArgs>(args: SelectSubset<T, FoodFindUniqueArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Food that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodFindUniqueOrThrowArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Food that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindFirstArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodFindFirstArgs>(args?: SelectSubset<T, FoodFindFirstArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Food that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindFirstOrThrowArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Foods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Foods
     * const foods = await prisma.food.findMany()
     * 
     * // Get first 10 Foods
     * const foods = await prisma.food.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodWithIdOnly = await prisma.food.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodFindManyArgs>(args?: SelectSubset<T, FoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Food.
     * @param {FoodCreateArgs} args - Arguments to create a Food.
     * @example
     * // Create one Food
     * const Food = await prisma.food.create({
     *   data: {
     *     // ... data to create a Food
     *   }
     * })
     * 
     */
    create<T extends FoodCreateArgs>(args: SelectSubset<T, FoodCreateArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Foods.
     * @param {FoodCreateManyArgs} args - Arguments to create many Foods.
     * @example
     * // Create many Foods
     * const food = await prisma.food.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodCreateManyArgs>(args?: SelectSubset<T, FoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Foods and returns the data saved in the database.
     * @param {FoodCreateManyAndReturnArgs} args - Arguments to create many Foods.
     * @example
     * // Create many Foods
     * const food = await prisma.food.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Foods and only return the `id`
     * const foodWithIdOnly = await prisma.food.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Food.
     * @param {FoodDeleteArgs} args - Arguments to delete one Food.
     * @example
     * // Delete one Food
     * const Food = await prisma.food.delete({
     *   where: {
     *     // ... filter to delete one Food
     *   }
     * })
     * 
     */
    delete<T extends FoodDeleteArgs>(args: SelectSubset<T, FoodDeleteArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Food.
     * @param {FoodUpdateArgs} args - Arguments to update one Food.
     * @example
     * // Update one Food
     * const food = await prisma.food.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodUpdateArgs>(args: SelectSubset<T, FoodUpdateArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Foods.
     * @param {FoodDeleteManyArgs} args - Arguments to filter Foods to delete.
     * @example
     * // Delete a few Foods
     * const { count } = await prisma.food.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodDeleteManyArgs>(args?: SelectSubset<T, FoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Foods
     * const food = await prisma.food.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodUpdateManyArgs>(args: SelectSubset<T, FoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foods and returns the data updated in the database.
     * @param {FoodUpdateManyAndReturnArgs} args - Arguments to update many Foods.
     * @example
     * // Update many Foods
     * const food = await prisma.food.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Foods and only return the `id`
     * const foodWithIdOnly = await prisma.food.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoodUpdateManyAndReturnArgs>(args: SelectSubset<T, FoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Food.
     * @param {FoodUpsertArgs} args - Arguments to update or create a Food.
     * @example
     * // Update or create a Food
     * const food = await prisma.food.upsert({
     *   create: {
     *     // ... data to create a Food
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Food we want to update
     *   }
     * })
     */
    upsert<T extends FoodUpsertArgs>(args: SelectSubset<T, FoodUpsertArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Foods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCountArgs} args - Arguments to filter Foods to count.
     * @example
     * // Count the number of Foods
     * const count = await prisma.food.count({
     *   where: {
     *     // ... the filter for the Foods we want to count
     *   }
     * })
    **/
    count<T extends FoodCountArgs>(
      args?: Subset<T, FoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Food.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodAggregateArgs>(args: Subset<T, FoodAggregateArgs>): Prisma.PrismaPromise<GetFoodAggregateType<T>>

    /**
     * Group by Food.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodGroupByArgs['orderBy'] }
        : { orderBy?: FoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Food model
   */
  readonly fields: FoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Food.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kitchen<T extends KitchenDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KitchenDefaultArgs<ExtArgs>>): Prisma__KitchenClient<$Result.GetResult<Prisma.$KitchenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    macros<T extends Food$macrosArgs<ExtArgs> = {}>(args?: Subset<T, Food$macrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Food model
   */
  interface FoodFieldRefs {
    readonly id: FieldRef<"Food", 'String'>
    readonly name: FieldRef<"Food", 'String'>
    readonly description: FieldRef<"Food", 'String'>
    readonly kitchen_id: FieldRef<"Food", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Food findUnique
   */
  export type FoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food findUniqueOrThrow
   */
  export type FoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food findFirst
   */
  export type FoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foods.
     */
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food findFirstOrThrow
   */
  export type FoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foods.
     */
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food findMany
   */
  export type FoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Foods to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food create
   */
  export type FoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The data needed to create a Food.
     */
    data: XOR<FoodCreateInput, FoodUncheckedCreateInput>
  }

  /**
   * Food createMany
   */
  export type FoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Foods.
     */
    data: FoodCreateManyInput | FoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Food createManyAndReturn
   */
  export type FoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * The data used to create many Foods.
     */
    data: FoodCreateManyInput | FoodCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Food update
   */
  export type FoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The data needed to update a Food.
     */
    data: XOR<FoodUpdateInput, FoodUncheckedUpdateInput>
    /**
     * Choose, which Food to update.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food updateMany
   */
  export type FoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Foods.
     */
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyInput>
    /**
     * Filter which Foods to update
     */
    where?: FoodWhereInput
    /**
     * Limit how many Foods to update.
     */
    limit?: number
  }

  /**
   * Food updateManyAndReturn
   */
  export type FoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * The data used to update Foods.
     */
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyInput>
    /**
     * Filter which Foods to update
     */
    where?: FoodWhereInput
    /**
     * Limit how many Foods to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Food upsert
   */
  export type FoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The filter to search for the Food to update in case it exists.
     */
    where: FoodWhereUniqueInput
    /**
     * In case the Food found by the `where` argument doesn't exist, create a new Food with this data.
     */
    create: XOR<FoodCreateInput, FoodUncheckedCreateInput>
    /**
     * In case the Food was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodUpdateInput, FoodUncheckedUpdateInput>
  }

  /**
   * Food delete
   */
  export type FoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter which Food to delete.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food deleteMany
   */
  export type FoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foods to delete
     */
    where?: FoodWhereInput
    /**
     * Limit how many Foods to delete.
     */
    limit?: number
  }

  /**
   * Food.macros
   */
  export type Food$macrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    where?: FoodMacroWhereInput
    orderBy?: FoodMacroOrderByWithRelationInput | FoodMacroOrderByWithRelationInput[]
    cursor?: FoodMacroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodMacroScalarFieldEnum | FoodMacroScalarFieldEnum[]
  }

  /**
   * Food without action
   */
  export type FoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
  }


  /**
   * Model FoodMacro
   */

  export type AggregateFoodMacro = {
    _count: FoodMacroCountAggregateOutputType | null
    _avg: FoodMacroAvgAggregateOutputType | null
    _sum: FoodMacroSumAggregateOutputType | null
    _min: FoodMacroMinAggregateOutputType | null
    _max: FoodMacroMaxAggregateOutputType | null
  }

  export type FoodMacroAvgAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type FoodMacroSumAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type FoodMacroMinAggregateOutputType = {
    id: number | null
    food_id: string | null
    metric_id: string | null
    value: number | null
  }

  export type FoodMacroMaxAggregateOutputType = {
    id: number | null
    food_id: string | null
    metric_id: string | null
    value: number | null
  }

  export type FoodMacroCountAggregateOutputType = {
    id: number
    food_id: number
    metric_id: number
    value: number
    _all: number
  }


  export type FoodMacroAvgAggregateInputType = {
    id?: true
    value?: true
  }

  export type FoodMacroSumAggregateInputType = {
    id?: true
    value?: true
  }

  export type FoodMacroMinAggregateInputType = {
    id?: true
    food_id?: true
    metric_id?: true
    value?: true
  }

  export type FoodMacroMaxAggregateInputType = {
    id?: true
    food_id?: true
    metric_id?: true
    value?: true
  }

  export type FoodMacroCountAggregateInputType = {
    id?: true
    food_id?: true
    metric_id?: true
    value?: true
    _all?: true
  }

  export type FoodMacroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodMacro to aggregate.
     */
    where?: FoodMacroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodMacros to fetch.
     */
    orderBy?: FoodMacroOrderByWithRelationInput | FoodMacroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodMacroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodMacros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodMacros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoodMacros
    **/
    _count?: true | FoodMacroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoodMacroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoodMacroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodMacroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodMacroMaxAggregateInputType
  }

  export type GetFoodMacroAggregateType<T extends FoodMacroAggregateArgs> = {
        [P in keyof T & keyof AggregateFoodMacro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoodMacro[P]>
      : GetScalarType<T[P], AggregateFoodMacro[P]>
  }




  export type FoodMacroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodMacroWhereInput
    orderBy?: FoodMacroOrderByWithAggregationInput | FoodMacroOrderByWithAggregationInput[]
    by: FoodMacroScalarFieldEnum[] | FoodMacroScalarFieldEnum
    having?: FoodMacroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodMacroCountAggregateInputType | true
    _avg?: FoodMacroAvgAggregateInputType
    _sum?: FoodMacroSumAggregateInputType
    _min?: FoodMacroMinAggregateInputType
    _max?: FoodMacroMaxAggregateInputType
  }

  export type FoodMacroGroupByOutputType = {
    id: number
    food_id: string
    metric_id: string
    value: number
    _count: FoodMacroCountAggregateOutputType | null
    _avg: FoodMacroAvgAggregateOutputType | null
    _sum: FoodMacroSumAggregateOutputType | null
    _min: FoodMacroMinAggregateOutputType | null
    _max: FoodMacroMaxAggregateOutputType | null
  }

  type GetFoodMacroGroupByPayload<T extends FoodMacroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodMacroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodMacroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodMacroGroupByOutputType[P]>
            : GetScalarType<T[P], FoodMacroGroupByOutputType[P]>
        }
      >
    >


  export type FoodMacroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    food_id?: boolean
    metric_id?: boolean
    value?: boolean
    food?: boolean | FoodDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodMacro"]>

  export type FoodMacroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    food_id?: boolean
    metric_id?: boolean
    value?: boolean
    food?: boolean | FoodDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodMacro"]>

  export type FoodMacroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    food_id?: boolean
    metric_id?: boolean
    value?: boolean
    food?: boolean | FoodDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodMacro"]>

  export type FoodMacroSelectScalar = {
    id?: boolean
    food_id?: boolean
    metric_id?: boolean
    value?: boolean
  }

  export type FoodMacroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "food_id" | "metric_id" | "value", ExtArgs["result"]["foodMacro"]>
  export type FoodMacroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    food?: boolean | FoodDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }
  export type FoodMacroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    food?: boolean | FoodDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }
  export type FoodMacroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    food?: boolean | FoodDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }

  export type $FoodMacroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoodMacro"
    objects: {
      food: Prisma.$FoodPayload<ExtArgs>
      metric: Prisma.$NutritionalMetricPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      food_id: string
      metric_id: string
      value: number
    }, ExtArgs["result"]["foodMacro"]>
    composites: {}
  }

  type FoodMacroGetPayload<S extends boolean | null | undefined | FoodMacroDefaultArgs> = $Result.GetResult<Prisma.$FoodMacroPayload, S>

  type FoodMacroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoodMacroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoodMacroCountAggregateInputType | true
    }

  export interface FoodMacroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoodMacro'], meta: { name: 'FoodMacro' } }
    /**
     * Find zero or one FoodMacro that matches the filter.
     * @param {FoodMacroFindUniqueArgs} args - Arguments to find a FoodMacro
     * @example
     * // Get one FoodMacro
     * const foodMacro = await prisma.foodMacro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodMacroFindUniqueArgs>(args: SelectSubset<T, FoodMacroFindUniqueArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FoodMacro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodMacroFindUniqueOrThrowArgs} args - Arguments to find a FoodMacro
     * @example
     * // Get one FoodMacro
     * const foodMacro = await prisma.foodMacro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodMacroFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodMacroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodMacro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroFindFirstArgs} args - Arguments to find a FoodMacro
     * @example
     * // Get one FoodMacro
     * const foodMacro = await prisma.foodMacro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodMacroFindFirstArgs>(args?: SelectSubset<T, FoodMacroFindFirstArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodMacro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroFindFirstOrThrowArgs} args - Arguments to find a FoodMacro
     * @example
     * // Get one FoodMacro
     * const foodMacro = await prisma.foodMacro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodMacroFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodMacroFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FoodMacros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodMacros
     * const foodMacros = await prisma.foodMacro.findMany()
     * 
     * // Get first 10 FoodMacros
     * const foodMacros = await prisma.foodMacro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodMacroWithIdOnly = await prisma.foodMacro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodMacroFindManyArgs>(args?: SelectSubset<T, FoodMacroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FoodMacro.
     * @param {FoodMacroCreateArgs} args - Arguments to create a FoodMacro.
     * @example
     * // Create one FoodMacro
     * const FoodMacro = await prisma.foodMacro.create({
     *   data: {
     *     // ... data to create a FoodMacro
     *   }
     * })
     * 
     */
    create<T extends FoodMacroCreateArgs>(args: SelectSubset<T, FoodMacroCreateArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FoodMacros.
     * @param {FoodMacroCreateManyArgs} args - Arguments to create many FoodMacros.
     * @example
     * // Create many FoodMacros
     * const foodMacro = await prisma.foodMacro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodMacroCreateManyArgs>(args?: SelectSubset<T, FoodMacroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FoodMacros and returns the data saved in the database.
     * @param {FoodMacroCreateManyAndReturnArgs} args - Arguments to create many FoodMacros.
     * @example
     * // Create many FoodMacros
     * const foodMacro = await prisma.foodMacro.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FoodMacros and only return the `id`
     * const foodMacroWithIdOnly = await prisma.foodMacro.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodMacroCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodMacroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FoodMacro.
     * @param {FoodMacroDeleteArgs} args - Arguments to delete one FoodMacro.
     * @example
     * // Delete one FoodMacro
     * const FoodMacro = await prisma.foodMacro.delete({
     *   where: {
     *     // ... filter to delete one FoodMacro
     *   }
     * })
     * 
     */
    delete<T extends FoodMacroDeleteArgs>(args: SelectSubset<T, FoodMacroDeleteArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FoodMacro.
     * @param {FoodMacroUpdateArgs} args - Arguments to update one FoodMacro.
     * @example
     * // Update one FoodMacro
     * const foodMacro = await prisma.foodMacro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodMacroUpdateArgs>(args: SelectSubset<T, FoodMacroUpdateArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FoodMacros.
     * @param {FoodMacroDeleteManyArgs} args - Arguments to filter FoodMacros to delete.
     * @example
     * // Delete a few FoodMacros
     * const { count } = await prisma.foodMacro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodMacroDeleteManyArgs>(args?: SelectSubset<T, FoodMacroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodMacros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodMacros
     * const foodMacro = await prisma.foodMacro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodMacroUpdateManyArgs>(args: SelectSubset<T, FoodMacroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodMacros and returns the data updated in the database.
     * @param {FoodMacroUpdateManyAndReturnArgs} args - Arguments to update many FoodMacros.
     * @example
     * // Update many FoodMacros
     * const foodMacro = await prisma.foodMacro.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FoodMacros and only return the `id`
     * const foodMacroWithIdOnly = await prisma.foodMacro.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoodMacroUpdateManyAndReturnArgs>(args: SelectSubset<T, FoodMacroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FoodMacro.
     * @param {FoodMacroUpsertArgs} args - Arguments to update or create a FoodMacro.
     * @example
     * // Update or create a FoodMacro
     * const foodMacro = await prisma.foodMacro.upsert({
     *   create: {
     *     // ... data to create a FoodMacro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodMacro we want to update
     *   }
     * })
     */
    upsert<T extends FoodMacroUpsertArgs>(args: SelectSubset<T, FoodMacroUpsertArgs<ExtArgs>>): Prisma__FoodMacroClient<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FoodMacros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroCountArgs} args - Arguments to filter FoodMacros to count.
     * @example
     * // Count the number of FoodMacros
     * const count = await prisma.foodMacro.count({
     *   where: {
     *     // ... the filter for the FoodMacros we want to count
     *   }
     * })
    **/
    count<T extends FoodMacroCountArgs>(
      args?: Subset<T, FoodMacroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodMacroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoodMacro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodMacroAggregateArgs>(args: Subset<T, FoodMacroAggregateArgs>): Prisma.PrismaPromise<GetFoodMacroAggregateType<T>>

    /**
     * Group by FoodMacro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodMacroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodMacroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodMacroGroupByArgs['orderBy'] }
        : { orderBy?: FoodMacroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodMacroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodMacroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoodMacro model
   */
  readonly fields: FoodMacroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoodMacro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodMacroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    food<T extends FoodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FoodDefaultArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    metric<T extends NutritionalMetricDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NutritionalMetricDefaultArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FoodMacro model
   */
  interface FoodMacroFieldRefs {
    readonly id: FieldRef<"FoodMacro", 'Int'>
    readonly food_id: FieldRef<"FoodMacro", 'String'>
    readonly metric_id: FieldRef<"FoodMacro", 'String'>
    readonly value: FieldRef<"FoodMacro", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * FoodMacro findUnique
   */
  export type FoodMacroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * Filter, which FoodMacro to fetch.
     */
    where: FoodMacroWhereUniqueInput
  }

  /**
   * FoodMacro findUniqueOrThrow
   */
  export type FoodMacroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * Filter, which FoodMacro to fetch.
     */
    where: FoodMacroWhereUniqueInput
  }

  /**
   * FoodMacro findFirst
   */
  export type FoodMacroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * Filter, which FoodMacro to fetch.
     */
    where?: FoodMacroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodMacros to fetch.
     */
    orderBy?: FoodMacroOrderByWithRelationInput | FoodMacroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodMacros.
     */
    cursor?: FoodMacroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodMacros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodMacros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodMacros.
     */
    distinct?: FoodMacroScalarFieldEnum | FoodMacroScalarFieldEnum[]
  }

  /**
   * FoodMacro findFirstOrThrow
   */
  export type FoodMacroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * Filter, which FoodMacro to fetch.
     */
    where?: FoodMacroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodMacros to fetch.
     */
    orderBy?: FoodMacroOrderByWithRelationInput | FoodMacroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodMacros.
     */
    cursor?: FoodMacroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodMacros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodMacros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodMacros.
     */
    distinct?: FoodMacroScalarFieldEnum | FoodMacroScalarFieldEnum[]
  }

  /**
   * FoodMacro findMany
   */
  export type FoodMacroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * Filter, which FoodMacros to fetch.
     */
    where?: FoodMacroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodMacros to fetch.
     */
    orderBy?: FoodMacroOrderByWithRelationInput | FoodMacroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoodMacros.
     */
    cursor?: FoodMacroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodMacros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodMacros.
     */
    skip?: number
    distinct?: FoodMacroScalarFieldEnum | FoodMacroScalarFieldEnum[]
  }

  /**
   * FoodMacro create
   */
  export type FoodMacroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * The data needed to create a FoodMacro.
     */
    data: XOR<FoodMacroCreateInput, FoodMacroUncheckedCreateInput>
  }

  /**
   * FoodMacro createMany
   */
  export type FoodMacroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodMacros.
     */
    data: FoodMacroCreateManyInput | FoodMacroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FoodMacro createManyAndReturn
   */
  export type FoodMacroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * The data used to create many FoodMacros.
     */
    data: FoodMacroCreateManyInput | FoodMacroCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodMacro update
   */
  export type FoodMacroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * The data needed to update a FoodMacro.
     */
    data: XOR<FoodMacroUpdateInput, FoodMacroUncheckedUpdateInput>
    /**
     * Choose, which FoodMacro to update.
     */
    where: FoodMacroWhereUniqueInput
  }

  /**
   * FoodMacro updateMany
   */
  export type FoodMacroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodMacros.
     */
    data: XOR<FoodMacroUpdateManyMutationInput, FoodMacroUncheckedUpdateManyInput>
    /**
     * Filter which FoodMacros to update
     */
    where?: FoodMacroWhereInput
    /**
     * Limit how many FoodMacros to update.
     */
    limit?: number
  }

  /**
   * FoodMacro updateManyAndReturn
   */
  export type FoodMacroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * The data used to update FoodMacros.
     */
    data: XOR<FoodMacroUpdateManyMutationInput, FoodMacroUncheckedUpdateManyInput>
    /**
     * Filter which FoodMacros to update
     */
    where?: FoodMacroWhereInput
    /**
     * Limit how many FoodMacros to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodMacro upsert
   */
  export type FoodMacroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * The filter to search for the FoodMacro to update in case it exists.
     */
    where: FoodMacroWhereUniqueInput
    /**
     * In case the FoodMacro found by the `where` argument doesn't exist, create a new FoodMacro with this data.
     */
    create: XOR<FoodMacroCreateInput, FoodMacroUncheckedCreateInput>
    /**
     * In case the FoodMacro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodMacroUpdateInput, FoodMacroUncheckedUpdateInput>
  }

  /**
   * FoodMacro delete
   */
  export type FoodMacroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    /**
     * Filter which FoodMacro to delete.
     */
    where: FoodMacroWhereUniqueInput
  }

  /**
   * FoodMacro deleteMany
   */
  export type FoodMacroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodMacros to delete
     */
    where?: FoodMacroWhereInput
    /**
     * Limit how many FoodMacros to delete.
     */
    limit?: number
  }

  /**
   * FoodMacro without action
   */
  export type FoodMacroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
  }


  /**
   * Model NutritionalMetric
   */

  export type AggregateNutritionalMetric = {
    _count: NutritionalMetricCountAggregateOutputType | null
    _min: NutritionalMetricMinAggregateOutputType | null
    _max: NutritionalMetricMaxAggregateOutputType | null
  }

  export type NutritionalMetricMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    unit: string | null
  }

  export type NutritionalMetricMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    unit: string | null
  }

  export type NutritionalMetricCountAggregateOutputType = {
    id: number
    name: number
    description: number
    unit: number
    _all: number
  }


  export type NutritionalMetricMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    unit?: true
  }

  export type NutritionalMetricMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    unit?: true
  }

  export type NutritionalMetricCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    unit?: true
    _all?: true
  }

  export type NutritionalMetricAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NutritionalMetric to aggregate.
     */
    where?: NutritionalMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NutritionalMetrics to fetch.
     */
    orderBy?: NutritionalMetricOrderByWithRelationInput | NutritionalMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NutritionalMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NutritionalMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NutritionalMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NutritionalMetrics
    **/
    _count?: true | NutritionalMetricCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NutritionalMetricMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NutritionalMetricMaxAggregateInputType
  }

  export type GetNutritionalMetricAggregateType<T extends NutritionalMetricAggregateArgs> = {
        [P in keyof T & keyof AggregateNutritionalMetric]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNutritionalMetric[P]>
      : GetScalarType<T[P], AggregateNutritionalMetric[P]>
  }




  export type NutritionalMetricGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NutritionalMetricWhereInput
    orderBy?: NutritionalMetricOrderByWithAggregationInput | NutritionalMetricOrderByWithAggregationInput[]
    by: NutritionalMetricScalarFieldEnum[] | NutritionalMetricScalarFieldEnum
    having?: NutritionalMetricScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NutritionalMetricCountAggregateInputType | true
    _min?: NutritionalMetricMinAggregateInputType
    _max?: NutritionalMetricMaxAggregateInputType
  }

  export type NutritionalMetricGroupByOutputType = {
    id: string
    name: string
    description: string | null
    unit: string
    _count: NutritionalMetricCountAggregateOutputType | null
    _min: NutritionalMetricMinAggregateOutputType | null
    _max: NutritionalMetricMaxAggregateOutputType | null
  }

  type GetNutritionalMetricGroupByPayload<T extends NutritionalMetricGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NutritionalMetricGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NutritionalMetricGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NutritionalMetricGroupByOutputType[P]>
            : GetScalarType<T[P], NutritionalMetricGroupByOutputType[P]>
        }
      >
    >


  export type NutritionalMetricSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    unit?: boolean
    preferences?: boolean | NutritionalMetric$preferencesArgs<ExtArgs>
    foodMacros?: boolean | NutritionalMetric$foodMacrosArgs<ExtArgs>
    _count?: boolean | NutritionalMetricCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nutritionalMetric"]>

  export type NutritionalMetricSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    unit?: boolean
  }, ExtArgs["result"]["nutritionalMetric"]>

  export type NutritionalMetricSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    unit?: boolean
  }, ExtArgs["result"]["nutritionalMetric"]>

  export type NutritionalMetricSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    unit?: boolean
  }

  export type NutritionalMetricOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "unit", ExtArgs["result"]["nutritionalMetric"]>
  export type NutritionalMetricInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | NutritionalMetric$preferencesArgs<ExtArgs>
    foodMacros?: boolean | NutritionalMetric$foodMacrosArgs<ExtArgs>
    _count?: boolean | NutritionalMetricCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NutritionalMetricIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NutritionalMetricIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NutritionalMetricPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NutritionalMetric"
    objects: {
      preferences: Prisma.$UserPreferencePayload<ExtArgs>[]
      foodMacros: Prisma.$FoodMacroPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      unit: string
    }, ExtArgs["result"]["nutritionalMetric"]>
    composites: {}
  }

  type NutritionalMetricGetPayload<S extends boolean | null | undefined | NutritionalMetricDefaultArgs> = $Result.GetResult<Prisma.$NutritionalMetricPayload, S>

  type NutritionalMetricCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NutritionalMetricFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NutritionalMetricCountAggregateInputType | true
    }

  export interface NutritionalMetricDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NutritionalMetric'], meta: { name: 'NutritionalMetric' } }
    /**
     * Find zero or one NutritionalMetric that matches the filter.
     * @param {NutritionalMetricFindUniqueArgs} args - Arguments to find a NutritionalMetric
     * @example
     * // Get one NutritionalMetric
     * const nutritionalMetric = await prisma.nutritionalMetric.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NutritionalMetricFindUniqueArgs>(args: SelectSubset<T, NutritionalMetricFindUniqueArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NutritionalMetric that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NutritionalMetricFindUniqueOrThrowArgs} args - Arguments to find a NutritionalMetric
     * @example
     * // Get one NutritionalMetric
     * const nutritionalMetric = await prisma.nutritionalMetric.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NutritionalMetricFindUniqueOrThrowArgs>(args: SelectSubset<T, NutritionalMetricFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NutritionalMetric that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricFindFirstArgs} args - Arguments to find a NutritionalMetric
     * @example
     * // Get one NutritionalMetric
     * const nutritionalMetric = await prisma.nutritionalMetric.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NutritionalMetricFindFirstArgs>(args?: SelectSubset<T, NutritionalMetricFindFirstArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NutritionalMetric that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricFindFirstOrThrowArgs} args - Arguments to find a NutritionalMetric
     * @example
     * // Get one NutritionalMetric
     * const nutritionalMetric = await prisma.nutritionalMetric.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NutritionalMetricFindFirstOrThrowArgs>(args?: SelectSubset<T, NutritionalMetricFindFirstOrThrowArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NutritionalMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NutritionalMetrics
     * const nutritionalMetrics = await prisma.nutritionalMetric.findMany()
     * 
     * // Get first 10 NutritionalMetrics
     * const nutritionalMetrics = await prisma.nutritionalMetric.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nutritionalMetricWithIdOnly = await prisma.nutritionalMetric.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NutritionalMetricFindManyArgs>(args?: SelectSubset<T, NutritionalMetricFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NutritionalMetric.
     * @param {NutritionalMetricCreateArgs} args - Arguments to create a NutritionalMetric.
     * @example
     * // Create one NutritionalMetric
     * const NutritionalMetric = await prisma.nutritionalMetric.create({
     *   data: {
     *     // ... data to create a NutritionalMetric
     *   }
     * })
     * 
     */
    create<T extends NutritionalMetricCreateArgs>(args: SelectSubset<T, NutritionalMetricCreateArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NutritionalMetrics.
     * @param {NutritionalMetricCreateManyArgs} args - Arguments to create many NutritionalMetrics.
     * @example
     * // Create many NutritionalMetrics
     * const nutritionalMetric = await prisma.nutritionalMetric.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NutritionalMetricCreateManyArgs>(args?: SelectSubset<T, NutritionalMetricCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NutritionalMetrics and returns the data saved in the database.
     * @param {NutritionalMetricCreateManyAndReturnArgs} args - Arguments to create many NutritionalMetrics.
     * @example
     * // Create many NutritionalMetrics
     * const nutritionalMetric = await prisma.nutritionalMetric.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NutritionalMetrics and only return the `id`
     * const nutritionalMetricWithIdOnly = await prisma.nutritionalMetric.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NutritionalMetricCreateManyAndReturnArgs>(args?: SelectSubset<T, NutritionalMetricCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NutritionalMetric.
     * @param {NutritionalMetricDeleteArgs} args - Arguments to delete one NutritionalMetric.
     * @example
     * // Delete one NutritionalMetric
     * const NutritionalMetric = await prisma.nutritionalMetric.delete({
     *   where: {
     *     // ... filter to delete one NutritionalMetric
     *   }
     * })
     * 
     */
    delete<T extends NutritionalMetricDeleteArgs>(args: SelectSubset<T, NutritionalMetricDeleteArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NutritionalMetric.
     * @param {NutritionalMetricUpdateArgs} args - Arguments to update one NutritionalMetric.
     * @example
     * // Update one NutritionalMetric
     * const nutritionalMetric = await prisma.nutritionalMetric.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NutritionalMetricUpdateArgs>(args: SelectSubset<T, NutritionalMetricUpdateArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NutritionalMetrics.
     * @param {NutritionalMetricDeleteManyArgs} args - Arguments to filter NutritionalMetrics to delete.
     * @example
     * // Delete a few NutritionalMetrics
     * const { count } = await prisma.nutritionalMetric.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NutritionalMetricDeleteManyArgs>(args?: SelectSubset<T, NutritionalMetricDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NutritionalMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NutritionalMetrics
     * const nutritionalMetric = await prisma.nutritionalMetric.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NutritionalMetricUpdateManyArgs>(args: SelectSubset<T, NutritionalMetricUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NutritionalMetrics and returns the data updated in the database.
     * @param {NutritionalMetricUpdateManyAndReturnArgs} args - Arguments to update many NutritionalMetrics.
     * @example
     * // Update many NutritionalMetrics
     * const nutritionalMetric = await prisma.nutritionalMetric.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NutritionalMetrics and only return the `id`
     * const nutritionalMetricWithIdOnly = await prisma.nutritionalMetric.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NutritionalMetricUpdateManyAndReturnArgs>(args: SelectSubset<T, NutritionalMetricUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NutritionalMetric.
     * @param {NutritionalMetricUpsertArgs} args - Arguments to update or create a NutritionalMetric.
     * @example
     * // Update or create a NutritionalMetric
     * const nutritionalMetric = await prisma.nutritionalMetric.upsert({
     *   create: {
     *     // ... data to create a NutritionalMetric
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NutritionalMetric we want to update
     *   }
     * })
     */
    upsert<T extends NutritionalMetricUpsertArgs>(args: SelectSubset<T, NutritionalMetricUpsertArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NutritionalMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricCountArgs} args - Arguments to filter NutritionalMetrics to count.
     * @example
     * // Count the number of NutritionalMetrics
     * const count = await prisma.nutritionalMetric.count({
     *   where: {
     *     // ... the filter for the NutritionalMetrics we want to count
     *   }
     * })
    **/
    count<T extends NutritionalMetricCountArgs>(
      args?: Subset<T, NutritionalMetricCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NutritionalMetricCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NutritionalMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NutritionalMetricAggregateArgs>(args: Subset<T, NutritionalMetricAggregateArgs>): Prisma.PrismaPromise<GetNutritionalMetricAggregateType<T>>

    /**
     * Group by NutritionalMetric.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NutritionalMetricGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NutritionalMetricGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NutritionalMetricGroupByArgs['orderBy'] }
        : { orderBy?: NutritionalMetricGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NutritionalMetricGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNutritionalMetricGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NutritionalMetric model
   */
  readonly fields: NutritionalMetricFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NutritionalMetric.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NutritionalMetricClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preferences<T extends NutritionalMetric$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, NutritionalMetric$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    foodMacros<T extends NutritionalMetric$foodMacrosArgs<ExtArgs> = {}>(args?: Subset<T, NutritionalMetric$foodMacrosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodMacroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NutritionalMetric model
   */
  interface NutritionalMetricFieldRefs {
    readonly id: FieldRef<"NutritionalMetric", 'String'>
    readonly name: FieldRef<"NutritionalMetric", 'String'>
    readonly description: FieldRef<"NutritionalMetric", 'String'>
    readonly unit: FieldRef<"NutritionalMetric", 'String'>
  }
    

  // Custom InputTypes
  /**
   * NutritionalMetric findUnique
   */
  export type NutritionalMetricFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * Filter, which NutritionalMetric to fetch.
     */
    where: NutritionalMetricWhereUniqueInput
  }

  /**
   * NutritionalMetric findUniqueOrThrow
   */
  export type NutritionalMetricFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * Filter, which NutritionalMetric to fetch.
     */
    where: NutritionalMetricWhereUniqueInput
  }

  /**
   * NutritionalMetric findFirst
   */
  export type NutritionalMetricFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * Filter, which NutritionalMetric to fetch.
     */
    where?: NutritionalMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NutritionalMetrics to fetch.
     */
    orderBy?: NutritionalMetricOrderByWithRelationInput | NutritionalMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NutritionalMetrics.
     */
    cursor?: NutritionalMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NutritionalMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NutritionalMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NutritionalMetrics.
     */
    distinct?: NutritionalMetricScalarFieldEnum | NutritionalMetricScalarFieldEnum[]
  }

  /**
   * NutritionalMetric findFirstOrThrow
   */
  export type NutritionalMetricFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * Filter, which NutritionalMetric to fetch.
     */
    where?: NutritionalMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NutritionalMetrics to fetch.
     */
    orderBy?: NutritionalMetricOrderByWithRelationInput | NutritionalMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NutritionalMetrics.
     */
    cursor?: NutritionalMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NutritionalMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NutritionalMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NutritionalMetrics.
     */
    distinct?: NutritionalMetricScalarFieldEnum | NutritionalMetricScalarFieldEnum[]
  }

  /**
   * NutritionalMetric findMany
   */
  export type NutritionalMetricFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * Filter, which NutritionalMetrics to fetch.
     */
    where?: NutritionalMetricWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NutritionalMetrics to fetch.
     */
    orderBy?: NutritionalMetricOrderByWithRelationInput | NutritionalMetricOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NutritionalMetrics.
     */
    cursor?: NutritionalMetricWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NutritionalMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NutritionalMetrics.
     */
    skip?: number
    distinct?: NutritionalMetricScalarFieldEnum | NutritionalMetricScalarFieldEnum[]
  }

  /**
   * NutritionalMetric create
   */
  export type NutritionalMetricCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * The data needed to create a NutritionalMetric.
     */
    data: XOR<NutritionalMetricCreateInput, NutritionalMetricUncheckedCreateInput>
  }

  /**
   * NutritionalMetric createMany
   */
  export type NutritionalMetricCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NutritionalMetrics.
     */
    data: NutritionalMetricCreateManyInput | NutritionalMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NutritionalMetric createManyAndReturn
   */
  export type NutritionalMetricCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * The data used to create many NutritionalMetrics.
     */
    data: NutritionalMetricCreateManyInput | NutritionalMetricCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NutritionalMetric update
   */
  export type NutritionalMetricUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * The data needed to update a NutritionalMetric.
     */
    data: XOR<NutritionalMetricUpdateInput, NutritionalMetricUncheckedUpdateInput>
    /**
     * Choose, which NutritionalMetric to update.
     */
    where: NutritionalMetricWhereUniqueInput
  }

  /**
   * NutritionalMetric updateMany
   */
  export type NutritionalMetricUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NutritionalMetrics.
     */
    data: XOR<NutritionalMetricUpdateManyMutationInput, NutritionalMetricUncheckedUpdateManyInput>
    /**
     * Filter which NutritionalMetrics to update
     */
    where?: NutritionalMetricWhereInput
    /**
     * Limit how many NutritionalMetrics to update.
     */
    limit?: number
  }

  /**
   * NutritionalMetric updateManyAndReturn
   */
  export type NutritionalMetricUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * The data used to update NutritionalMetrics.
     */
    data: XOR<NutritionalMetricUpdateManyMutationInput, NutritionalMetricUncheckedUpdateManyInput>
    /**
     * Filter which NutritionalMetrics to update
     */
    where?: NutritionalMetricWhereInput
    /**
     * Limit how many NutritionalMetrics to update.
     */
    limit?: number
  }

  /**
   * NutritionalMetric upsert
   */
  export type NutritionalMetricUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * The filter to search for the NutritionalMetric to update in case it exists.
     */
    where: NutritionalMetricWhereUniqueInput
    /**
     * In case the NutritionalMetric found by the `where` argument doesn't exist, create a new NutritionalMetric with this data.
     */
    create: XOR<NutritionalMetricCreateInput, NutritionalMetricUncheckedCreateInput>
    /**
     * In case the NutritionalMetric was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NutritionalMetricUpdateInput, NutritionalMetricUncheckedUpdateInput>
  }

  /**
   * NutritionalMetric delete
   */
  export type NutritionalMetricDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
    /**
     * Filter which NutritionalMetric to delete.
     */
    where: NutritionalMetricWhereUniqueInput
  }

  /**
   * NutritionalMetric deleteMany
   */
  export type NutritionalMetricDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NutritionalMetrics to delete
     */
    where?: NutritionalMetricWhereInput
    /**
     * Limit how many NutritionalMetrics to delete.
     */
    limit?: number
  }

  /**
   * NutritionalMetric.preferences
   */
  export type NutritionalMetric$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    where?: UserPreferenceWhereInput
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    cursor?: UserPreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * NutritionalMetric.foodMacros
   */
  export type NutritionalMetric$foodMacrosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodMacro
     */
    select?: FoodMacroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodMacro
     */
    omit?: FoodMacroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodMacroInclude<ExtArgs> | null
    where?: FoodMacroWhereInput
    orderBy?: FoodMacroOrderByWithRelationInput | FoodMacroOrderByWithRelationInput[]
    cursor?: FoodMacroWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodMacroScalarFieldEnum | FoodMacroScalarFieldEnum[]
  }

  /**
   * NutritionalMetric without action
   */
  export type NutritionalMetricDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NutritionalMetric
     */
    select?: NutritionalMetricSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NutritionalMetric
     */
    omit?: NutritionalMetricOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NutritionalMetricInclude<ExtArgs> | null
  }


  /**
   * Model UserPreference
   */

  export type AggregateUserPreference = {
    _count: UserPreferenceCountAggregateOutputType | null
    _avg: UserPreferenceAvgAggregateOutputType | null
    _sum: UserPreferenceSumAggregateOutputType | null
    _min: UserPreferenceMinAggregateOutputType | null
    _max: UserPreferenceMaxAggregateOutputType | null
  }

  export type UserPreferenceAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    min_value: number | null
    max_value: number | null
  }

  export type UserPreferenceSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    min_value: number | null
    max_value: number | null
  }

  export type UserPreferenceMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    metric_id: string | null
    min_value: number | null
    max_value: number | null
  }

  export type UserPreferenceMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    metric_id: string | null
    min_value: number | null
    max_value: number | null
  }

  export type UserPreferenceCountAggregateOutputType = {
    id: number
    user_id: number
    metric_id: number
    min_value: number
    max_value: number
    _all: number
  }


  export type UserPreferenceAvgAggregateInputType = {
    id?: true
    user_id?: true
    min_value?: true
    max_value?: true
  }

  export type UserPreferenceSumAggregateInputType = {
    id?: true
    user_id?: true
    min_value?: true
    max_value?: true
  }

  export type UserPreferenceMinAggregateInputType = {
    id?: true
    user_id?: true
    metric_id?: true
    min_value?: true
    max_value?: true
  }

  export type UserPreferenceMaxAggregateInputType = {
    id?: true
    user_id?: true
    metric_id?: true
    min_value?: true
    max_value?: true
  }

  export type UserPreferenceCountAggregateInputType = {
    id?: true
    user_id?: true
    metric_id?: true
    min_value?: true
    max_value?: true
    _all?: true
  }

  export type UserPreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPreference to aggregate.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPreferences
    **/
    _count?: true | UserPreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserPreferenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserPreferenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPreferenceMaxAggregateInputType
  }

  export type GetUserPreferenceAggregateType<T extends UserPreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPreference[P]>
      : GetScalarType<T[P], AggregateUserPreference[P]>
  }




  export type UserPreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPreferenceWhereInput
    orderBy?: UserPreferenceOrderByWithAggregationInput | UserPreferenceOrderByWithAggregationInput[]
    by: UserPreferenceScalarFieldEnum[] | UserPreferenceScalarFieldEnum
    having?: UserPreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPreferenceCountAggregateInputType | true
    _avg?: UserPreferenceAvgAggregateInputType
    _sum?: UserPreferenceSumAggregateInputType
    _min?: UserPreferenceMinAggregateInputType
    _max?: UserPreferenceMaxAggregateInputType
  }

  export type UserPreferenceGroupByOutputType = {
    id: number
    user_id: number
    metric_id: string
    min_value: number | null
    max_value: number | null
    _count: UserPreferenceCountAggregateOutputType | null
    _avg: UserPreferenceAvgAggregateOutputType | null
    _sum: UserPreferenceSumAggregateOutputType | null
    _min: UserPreferenceMinAggregateOutputType | null
    _max: UserPreferenceMaxAggregateOutputType | null
  }

  type GetUserPreferenceGroupByPayload<T extends UserPreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], UserPreferenceGroupByOutputType[P]>
        }
      >
    >


  export type UserPreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    metric_id?: boolean
    min_value?: boolean
    max_value?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreference"]>

  export type UserPreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    metric_id?: boolean
    min_value?: boolean
    max_value?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreference"]>

  export type UserPreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    metric_id?: boolean
    min_value?: boolean
    max_value?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPreference"]>

  export type UserPreferenceSelectScalar = {
    id?: boolean
    user_id?: boolean
    metric_id?: boolean
    min_value?: boolean
    max_value?: boolean
  }

  export type UserPreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "metric_id" | "min_value" | "max_value", ExtArgs["result"]["userPreference"]>
  export type UserPreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }
  export type UserPreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }
  export type UserPreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    metric?: boolean | NutritionalMetricDefaultArgs<ExtArgs>
  }

  export type $UserPreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPreference"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      metric: Prisma.$NutritionalMetricPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      metric_id: string
      min_value: number | null
      max_value: number | null
    }, ExtArgs["result"]["userPreference"]>
    composites: {}
  }

  type UserPreferenceGetPayload<S extends boolean | null | undefined | UserPreferenceDefaultArgs> = $Result.GetResult<Prisma.$UserPreferencePayload, S>

  type UserPreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPreferenceCountAggregateInputType | true
    }

  export interface UserPreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPreference'], meta: { name: 'UserPreference' } }
    /**
     * Find zero or one UserPreference that matches the filter.
     * @param {UserPreferenceFindUniqueArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPreferenceFindUniqueArgs>(args: SelectSubset<T, UserPreferenceFindUniqueArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPreference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPreferenceFindUniqueOrThrowArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPreference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceFindFirstArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPreferenceFindFirstArgs>(args?: SelectSubset<T, UserPreferenceFindFirstArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPreference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceFindFirstOrThrowArgs} args - Arguments to find a UserPreference
     * @example
     * // Get one UserPreference
     * const userPreference = await prisma.userPreference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPreferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPreferences
     * const userPreferences = await prisma.userPreference.findMany()
     * 
     * // Get first 10 UserPreferences
     * const userPreferences = await prisma.userPreference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPreferenceWithIdOnly = await prisma.userPreference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserPreferenceFindManyArgs>(args?: SelectSubset<T, UserPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserPreference.
     * @param {UserPreferenceCreateArgs} args - Arguments to create a UserPreference.
     * @example
     * // Create one UserPreference
     * const UserPreference = await prisma.userPreference.create({
     *   data: {
     *     // ... data to create a UserPreference
     *   }
     * })
     * 
     */
    create<T extends UserPreferenceCreateArgs>(args: SelectSubset<T, UserPreferenceCreateArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserPreferences.
     * @param {UserPreferenceCreateManyArgs} args - Arguments to create many UserPreferences.
     * @example
     * // Create many UserPreferences
     * const userPreference = await prisma.userPreference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserPreferenceCreateManyArgs>(args?: SelectSubset<T, UserPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserPreferences and returns the data saved in the database.
     * @param {UserPreferenceCreateManyAndReturnArgs} args - Arguments to create many UserPreferences.
     * @example
     * // Create many UserPreferences
     * const userPreference = await prisma.userPreference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserPreferences and only return the `id`
     * const userPreferenceWithIdOnly = await prisma.userPreference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserPreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserPreference.
     * @param {UserPreferenceDeleteArgs} args - Arguments to delete one UserPreference.
     * @example
     * // Delete one UserPreference
     * const UserPreference = await prisma.userPreference.delete({
     *   where: {
     *     // ... filter to delete one UserPreference
     *   }
     * })
     * 
     */
    delete<T extends UserPreferenceDeleteArgs>(args: SelectSubset<T, UserPreferenceDeleteArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPreference.
     * @param {UserPreferenceUpdateArgs} args - Arguments to update one UserPreference.
     * @example
     * // Update one UserPreference
     * const userPreference = await prisma.userPreference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPreferenceUpdateArgs>(args: SelectSubset<T, UserPreferenceUpdateArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPreferences.
     * @param {UserPreferenceDeleteManyArgs} args - Arguments to filter UserPreferences to delete.
     * @example
     * // Delete a few UserPreferences
     * const { count } = await prisma.userPreference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPreferenceDeleteManyArgs>(args?: SelectSubset<T, UserPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPreferences
     * const userPreference = await prisma.userPreference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPreferenceUpdateManyArgs>(args: SelectSubset<T, UserPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPreferences and returns the data updated in the database.
     * @param {UserPreferenceUpdateManyAndReturnArgs} args - Arguments to update many UserPreferences.
     * @example
     * // Update many UserPreferences
     * const userPreference = await prisma.userPreference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserPreferences and only return the `id`
     * const userPreferenceWithIdOnly = await prisma.userPreference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserPreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserPreference.
     * @param {UserPreferenceUpsertArgs} args - Arguments to update or create a UserPreference.
     * @example
     * // Update or create a UserPreference
     * const userPreference = await prisma.userPreference.upsert({
     *   create: {
     *     // ... data to create a UserPreference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPreference we want to update
     *   }
     * })
     */
    upsert<T extends UserPreferenceUpsertArgs>(args: SelectSubset<T, UserPreferenceUpsertArgs<ExtArgs>>): Prisma__UserPreferenceClient<$Result.GetResult<Prisma.$UserPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserPreferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceCountArgs} args - Arguments to filter UserPreferences to count.
     * @example
     * // Count the number of UserPreferences
     * const count = await prisma.userPreference.count({
     *   where: {
     *     // ... the filter for the UserPreferences we want to count
     *   }
     * })
    **/
    count<T extends UserPreferenceCountArgs>(
      args?: Subset<T, UserPreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserPreferenceAggregateArgs>(args: Subset<T, UserPreferenceAggregateArgs>): Prisma.PrismaPromise<GetUserPreferenceAggregateType<T>>

    /**
     * Group by UserPreference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserPreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPreferenceGroupByArgs['orderBy'] }
        : { orderBy?: UserPreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPreference model
   */
  readonly fields: UserPreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPreference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    metric<T extends NutritionalMetricDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NutritionalMetricDefaultArgs<ExtArgs>>): Prisma__NutritionalMetricClient<$Result.GetResult<Prisma.$NutritionalMetricPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserPreference model
   */
  interface UserPreferenceFieldRefs {
    readonly id: FieldRef<"UserPreference", 'Int'>
    readonly user_id: FieldRef<"UserPreference", 'Int'>
    readonly metric_id: FieldRef<"UserPreference", 'String'>
    readonly min_value: FieldRef<"UserPreference", 'Float'>
    readonly max_value: FieldRef<"UserPreference", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * UserPreference findUnique
   */
  export type UserPreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference findUniqueOrThrow
   */
  export type UserPreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference findFirst
   */
  export type UserPreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPreferences.
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * UserPreference findFirstOrThrow
   */
  export type UserPreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreference to fetch.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPreferences.
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPreferences.
     */
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * UserPreference findMany
   */
  export type UserPreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter, which UserPreferences to fetch.
     */
    where?: UserPreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPreferences to fetch.
     */
    orderBy?: UserPreferenceOrderByWithRelationInput | UserPreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPreferences.
     */
    cursor?: UserPreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPreferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPreferences.
     */
    skip?: number
    distinct?: UserPreferenceScalarFieldEnum | UserPreferenceScalarFieldEnum[]
  }

  /**
   * UserPreference create
   */
  export type UserPreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPreference.
     */
    data: XOR<UserPreferenceCreateInput, UserPreferenceUncheckedCreateInput>
  }

  /**
   * UserPreference createMany
   */
  export type UserPreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPreferences.
     */
    data: UserPreferenceCreateManyInput | UserPreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserPreference createManyAndReturn
   */
  export type UserPreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many UserPreferences.
     */
    data: UserPreferenceCreateManyInput | UserPreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPreference update
   */
  export type UserPreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPreference.
     */
    data: XOR<UserPreferenceUpdateInput, UserPreferenceUncheckedUpdateInput>
    /**
     * Choose, which UserPreference to update.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference updateMany
   */
  export type UserPreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPreferences.
     */
    data: XOR<UserPreferenceUpdateManyMutationInput, UserPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserPreferences to update
     */
    where?: UserPreferenceWhereInput
    /**
     * Limit how many UserPreferences to update.
     */
    limit?: number
  }

  /**
   * UserPreference updateManyAndReturn
   */
  export type UserPreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * The data used to update UserPreferences.
     */
    data: XOR<UserPreferenceUpdateManyMutationInput, UserPreferenceUncheckedUpdateManyInput>
    /**
     * Filter which UserPreferences to update
     */
    where?: UserPreferenceWhereInput
    /**
     * Limit how many UserPreferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPreference upsert
   */
  export type UserPreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPreference to update in case it exists.
     */
    where: UserPreferenceWhereUniqueInput
    /**
     * In case the UserPreference found by the `where` argument doesn't exist, create a new UserPreference with this data.
     */
    create: XOR<UserPreferenceCreateInput, UserPreferenceUncheckedCreateInput>
    /**
     * In case the UserPreference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPreferenceUpdateInput, UserPreferenceUncheckedUpdateInput>
  }

  /**
   * UserPreference delete
   */
  export type UserPreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
    /**
     * Filter which UserPreference to delete.
     */
    where: UserPreferenceWhereUniqueInput
  }

  /**
   * UserPreference deleteMany
   */
  export type UserPreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPreferences to delete
     */
    where?: UserPreferenceWhereInput
    /**
     * Limit how many UserPreferences to delete.
     */
    limit?: number
  }

  /**
   * UserPreference without action
   */
  export type UserPreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPreference
     */
    select?: UserPreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPreference
     */
    omit?: UserPreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPreferenceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    name: 'name',
    email: 'email'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const KitchenScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type KitchenScalarFieldEnum = (typeof KitchenScalarFieldEnum)[keyof typeof KitchenScalarFieldEnum]


  export const FoodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    kitchen_id: 'kitchen_id'
  };

  export type FoodScalarFieldEnum = (typeof FoodScalarFieldEnum)[keyof typeof FoodScalarFieldEnum]


  export const FoodMacroScalarFieldEnum: {
    id: 'id',
    food_id: 'food_id',
    metric_id: 'metric_id',
    value: 'value'
  };

  export type FoodMacroScalarFieldEnum = (typeof FoodMacroScalarFieldEnum)[keyof typeof FoodMacroScalarFieldEnum]


  export const NutritionalMetricScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    unit: 'unit'
  };

  export type NutritionalMetricScalarFieldEnum = (typeof NutritionalMetricScalarFieldEnum)[keyof typeof NutritionalMetricScalarFieldEnum]


  export const UserPreferenceScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    metric_id: 'metric_id',
    min_value: 'min_value',
    max_value: 'max_value'
  };

  export type UserPreferenceScalarFieldEnum = (typeof UserPreferenceScalarFieldEnum)[keyof typeof UserPreferenceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: IntFilter<"User"> | number
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    macroPreferences?: UserPreferenceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    macroPreferences?: UserPreferenceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    macroPreferences?: UserPreferenceListRelationFilter
  }, "user_id" | "email">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"User"> | number
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
  }

  export type KitchenWhereInput = {
    AND?: KitchenWhereInput | KitchenWhereInput[]
    OR?: KitchenWhereInput[]
    NOT?: KitchenWhereInput | KitchenWhereInput[]
    id?: StringFilter<"Kitchen"> | string
    name?: StringFilter<"Kitchen"> | string
    description?: StringNullableFilter<"Kitchen"> | string | null
    foods?: FoodListRelationFilter
  }

  export type KitchenOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    foods?: FoodOrderByRelationAggregateInput
  }

  export type KitchenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: KitchenWhereInput | KitchenWhereInput[]
    OR?: KitchenWhereInput[]
    NOT?: KitchenWhereInput | KitchenWhereInput[]
    description?: StringNullableFilter<"Kitchen"> | string | null
    foods?: FoodListRelationFilter
  }, "id" | "name">

  export type KitchenOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: KitchenCountOrderByAggregateInput
    _max?: KitchenMaxOrderByAggregateInput
    _min?: KitchenMinOrderByAggregateInput
  }

  export type KitchenScalarWhereWithAggregatesInput = {
    AND?: KitchenScalarWhereWithAggregatesInput | KitchenScalarWhereWithAggregatesInput[]
    OR?: KitchenScalarWhereWithAggregatesInput[]
    NOT?: KitchenScalarWhereWithAggregatesInput | KitchenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Kitchen"> | string
    name?: StringWithAggregatesFilter<"Kitchen"> | string
    description?: StringNullableWithAggregatesFilter<"Kitchen"> | string | null
  }

  export type FoodWhereInput = {
    AND?: FoodWhereInput | FoodWhereInput[]
    OR?: FoodWhereInput[]
    NOT?: FoodWhereInput | FoodWhereInput[]
    id?: StringFilter<"Food"> | string
    name?: StringFilter<"Food"> | string
    description?: StringNullableFilter<"Food"> | string | null
    kitchen_id?: StringFilter<"Food"> | string
    kitchen?: XOR<KitchenScalarRelationFilter, KitchenWhereInput>
    macros?: FoodMacroListRelationFilter
  }

  export type FoodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    kitchen_id?: SortOrder
    kitchen?: KitchenOrderByWithRelationInput
    macros?: FoodMacroOrderByRelationAggregateInput
  }

  export type FoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_kitchen_id?: FoodNameKitchen_idCompoundUniqueInput
    AND?: FoodWhereInput | FoodWhereInput[]
    OR?: FoodWhereInput[]
    NOT?: FoodWhereInput | FoodWhereInput[]
    name?: StringFilter<"Food"> | string
    description?: StringNullableFilter<"Food"> | string | null
    kitchen_id?: StringFilter<"Food"> | string
    kitchen?: XOR<KitchenScalarRelationFilter, KitchenWhereInput>
    macros?: FoodMacroListRelationFilter
  }, "id" | "name_kitchen_id">

  export type FoodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    kitchen_id?: SortOrder
    _count?: FoodCountOrderByAggregateInput
    _max?: FoodMaxOrderByAggregateInput
    _min?: FoodMinOrderByAggregateInput
  }

  export type FoodScalarWhereWithAggregatesInput = {
    AND?: FoodScalarWhereWithAggregatesInput | FoodScalarWhereWithAggregatesInput[]
    OR?: FoodScalarWhereWithAggregatesInput[]
    NOT?: FoodScalarWhereWithAggregatesInput | FoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Food"> | string
    name?: StringWithAggregatesFilter<"Food"> | string
    description?: StringNullableWithAggregatesFilter<"Food"> | string | null
    kitchen_id?: StringWithAggregatesFilter<"Food"> | string
  }

  export type FoodMacroWhereInput = {
    AND?: FoodMacroWhereInput | FoodMacroWhereInput[]
    OR?: FoodMacroWhereInput[]
    NOT?: FoodMacroWhereInput | FoodMacroWhereInput[]
    id?: IntFilter<"FoodMacro"> | number
    food_id?: StringFilter<"FoodMacro"> | string
    metric_id?: StringFilter<"FoodMacro"> | string
    value?: FloatFilter<"FoodMacro"> | number
    food?: XOR<FoodScalarRelationFilter, FoodWhereInput>
    metric?: XOR<NutritionalMetricScalarRelationFilter, NutritionalMetricWhereInput>
  }

  export type FoodMacroOrderByWithRelationInput = {
    id?: SortOrder
    food_id?: SortOrder
    metric_id?: SortOrder
    value?: SortOrder
    food?: FoodOrderByWithRelationInput
    metric?: NutritionalMetricOrderByWithRelationInput
  }

  export type FoodMacroWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    food_id_metric_id?: FoodMacroFood_idMetric_idCompoundUniqueInput
    AND?: FoodMacroWhereInput | FoodMacroWhereInput[]
    OR?: FoodMacroWhereInput[]
    NOT?: FoodMacroWhereInput | FoodMacroWhereInput[]
    food_id?: StringFilter<"FoodMacro"> | string
    metric_id?: StringFilter<"FoodMacro"> | string
    value?: FloatFilter<"FoodMacro"> | number
    food?: XOR<FoodScalarRelationFilter, FoodWhereInput>
    metric?: XOR<NutritionalMetricScalarRelationFilter, NutritionalMetricWhereInput>
  }, "id" | "food_id_metric_id">

  export type FoodMacroOrderByWithAggregationInput = {
    id?: SortOrder
    food_id?: SortOrder
    metric_id?: SortOrder
    value?: SortOrder
    _count?: FoodMacroCountOrderByAggregateInput
    _avg?: FoodMacroAvgOrderByAggregateInput
    _max?: FoodMacroMaxOrderByAggregateInput
    _min?: FoodMacroMinOrderByAggregateInput
    _sum?: FoodMacroSumOrderByAggregateInput
  }

  export type FoodMacroScalarWhereWithAggregatesInput = {
    AND?: FoodMacroScalarWhereWithAggregatesInput | FoodMacroScalarWhereWithAggregatesInput[]
    OR?: FoodMacroScalarWhereWithAggregatesInput[]
    NOT?: FoodMacroScalarWhereWithAggregatesInput | FoodMacroScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FoodMacro"> | number
    food_id?: StringWithAggregatesFilter<"FoodMacro"> | string
    metric_id?: StringWithAggregatesFilter<"FoodMacro"> | string
    value?: FloatWithAggregatesFilter<"FoodMacro"> | number
  }

  export type NutritionalMetricWhereInput = {
    AND?: NutritionalMetricWhereInput | NutritionalMetricWhereInput[]
    OR?: NutritionalMetricWhereInput[]
    NOT?: NutritionalMetricWhereInput | NutritionalMetricWhereInput[]
    id?: StringFilter<"NutritionalMetric"> | string
    name?: StringFilter<"NutritionalMetric"> | string
    description?: StringNullableFilter<"NutritionalMetric"> | string | null
    unit?: StringFilter<"NutritionalMetric"> | string
    preferences?: UserPreferenceListRelationFilter
    foodMacros?: FoodMacroListRelationFilter
  }

  export type NutritionalMetricOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    unit?: SortOrder
    preferences?: UserPreferenceOrderByRelationAggregateInput
    foodMacros?: FoodMacroOrderByRelationAggregateInput
  }

  export type NutritionalMetricWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: NutritionalMetricWhereInput | NutritionalMetricWhereInput[]
    OR?: NutritionalMetricWhereInput[]
    NOT?: NutritionalMetricWhereInput | NutritionalMetricWhereInput[]
    description?: StringNullableFilter<"NutritionalMetric"> | string | null
    unit?: StringFilter<"NutritionalMetric"> | string
    preferences?: UserPreferenceListRelationFilter
    foodMacros?: FoodMacroListRelationFilter
  }, "id" | "name">

  export type NutritionalMetricOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    unit?: SortOrder
    _count?: NutritionalMetricCountOrderByAggregateInput
    _max?: NutritionalMetricMaxOrderByAggregateInput
    _min?: NutritionalMetricMinOrderByAggregateInput
  }

  export type NutritionalMetricScalarWhereWithAggregatesInput = {
    AND?: NutritionalMetricScalarWhereWithAggregatesInput | NutritionalMetricScalarWhereWithAggregatesInput[]
    OR?: NutritionalMetricScalarWhereWithAggregatesInput[]
    NOT?: NutritionalMetricScalarWhereWithAggregatesInput | NutritionalMetricScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NutritionalMetric"> | string
    name?: StringWithAggregatesFilter<"NutritionalMetric"> | string
    description?: StringNullableWithAggregatesFilter<"NutritionalMetric"> | string | null
    unit?: StringWithAggregatesFilter<"NutritionalMetric"> | string
  }

  export type UserPreferenceWhereInput = {
    AND?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    OR?: UserPreferenceWhereInput[]
    NOT?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    id?: IntFilter<"UserPreference"> | number
    user_id?: IntFilter<"UserPreference"> | number
    metric_id?: StringFilter<"UserPreference"> | string
    min_value?: FloatNullableFilter<"UserPreference"> | number | null
    max_value?: FloatNullableFilter<"UserPreference"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    metric?: XOR<NutritionalMetricScalarRelationFilter, NutritionalMetricWhereInput>
  }

  export type UserPreferenceOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    metric_id?: SortOrder
    min_value?: SortOrderInput | SortOrder
    max_value?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    metric?: NutritionalMetricOrderByWithRelationInput
  }

  export type UserPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_metric_id?: UserPreferenceUser_idMetric_idCompoundUniqueInput
    AND?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    OR?: UserPreferenceWhereInput[]
    NOT?: UserPreferenceWhereInput | UserPreferenceWhereInput[]
    user_id?: IntFilter<"UserPreference"> | number
    metric_id?: StringFilter<"UserPreference"> | string
    min_value?: FloatNullableFilter<"UserPreference"> | number | null
    max_value?: FloatNullableFilter<"UserPreference"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    metric?: XOR<NutritionalMetricScalarRelationFilter, NutritionalMetricWhereInput>
  }, "id" | "user_id_metric_id">

  export type UserPreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    metric_id?: SortOrder
    min_value?: SortOrderInput | SortOrder
    max_value?: SortOrderInput | SortOrder
    _count?: UserPreferenceCountOrderByAggregateInput
    _avg?: UserPreferenceAvgOrderByAggregateInput
    _max?: UserPreferenceMaxOrderByAggregateInput
    _min?: UserPreferenceMinOrderByAggregateInput
    _sum?: UserPreferenceSumOrderByAggregateInput
  }

  export type UserPreferenceScalarWhereWithAggregatesInput = {
    AND?: UserPreferenceScalarWhereWithAggregatesInput | UserPreferenceScalarWhereWithAggregatesInput[]
    OR?: UserPreferenceScalarWhereWithAggregatesInput[]
    NOT?: UserPreferenceScalarWhereWithAggregatesInput | UserPreferenceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserPreference"> | number
    user_id?: IntWithAggregatesFilter<"UserPreference"> | number
    metric_id?: StringWithAggregatesFilter<"UserPreference"> | string
    min_value?: FloatNullableWithAggregatesFilter<"UserPreference"> | number | null
    max_value?: FloatNullableWithAggregatesFilter<"UserPreference"> | number | null
  }

  export type UserCreateInput = {
    name?: string | null
    email: string
    macroPreferences?: UserPreferenceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: number
    name?: string | null
    email: string
    macroPreferences?: UserPreferenceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    macroPreferences?: UserPreferenceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    macroPreferences?: UserPreferenceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: number
    name?: string | null
    email: string
  }

  export type UserUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type KitchenCreateInput = {
    id: string
    name: string
    description?: string | null
    foods?: FoodCreateNestedManyWithoutKitchenInput
  }

  export type KitchenUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    foods?: FoodUncheckedCreateNestedManyWithoutKitchenInput
  }

  export type KitchenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    foods?: FoodUpdateManyWithoutKitchenNestedInput
  }

  export type KitchenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    foods?: FoodUncheckedUpdateManyWithoutKitchenNestedInput
  }

  export type KitchenCreateManyInput = {
    id: string
    name: string
    description?: string | null
  }

  export type KitchenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type KitchenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodCreateInput = {
    id: string
    name: string
    description?: string | null
    kitchen: KitchenCreateNestedOneWithoutFoodsInput
    macros?: FoodMacroCreateNestedManyWithoutFoodInput
  }

  export type FoodUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    kitchen_id: string
    macros?: FoodMacroUncheckedCreateNestedManyWithoutFoodInput
  }

  export type FoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    kitchen?: KitchenUpdateOneRequiredWithoutFoodsNestedInput
    macros?: FoodMacroUpdateManyWithoutFoodNestedInput
  }

  export type FoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    kitchen_id?: StringFieldUpdateOperationsInput | string
    macros?: FoodMacroUncheckedUpdateManyWithoutFoodNestedInput
  }

  export type FoodCreateManyInput = {
    id: string
    name: string
    description?: string | null
    kitchen_id: string
  }

  export type FoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    kitchen_id?: StringFieldUpdateOperationsInput | string
  }

  export type FoodMacroCreateInput = {
    value: number
    food: FoodCreateNestedOneWithoutMacrosInput
    metric: NutritionalMetricCreateNestedOneWithoutFoodMacrosInput
  }

  export type FoodMacroUncheckedCreateInput = {
    id?: number
    food_id: string
    metric_id: string
    value: number
  }

  export type FoodMacroUpdateInput = {
    value?: FloatFieldUpdateOperationsInput | number
    food?: FoodUpdateOneRequiredWithoutMacrosNestedInput
    metric?: NutritionalMetricUpdateOneRequiredWithoutFoodMacrosNestedInput
  }

  export type FoodMacroUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    food_id?: StringFieldUpdateOperationsInput | string
    metric_id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type FoodMacroCreateManyInput = {
    id?: number
    food_id: string
    metric_id: string
    value: number
  }

  export type FoodMacroUpdateManyMutationInput = {
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type FoodMacroUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    food_id?: StringFieldUpdateOperationsInput | string
    metric_id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type NutritionalMetricCreateInput = {
    id: string
    name: string
    description?: string | null
    unit: string
    preferences?: UserPreferenceCreateNestedManyWithoutMetricInput
    foodMacros?: FoodMacroCreateNestedManyWithoutMetricInput
  }

  export type NutritionalMetricUncheckedCreateInput = {
    id: string
    name: string
    description?: string | null
    unit: string
    preferences?: UserPreferenceUncheckedCreateNestedManyWithoutMetricInput
    foodMacros?: FoodMacroUncheckedCreateNestedManyWithoutMetricInput
  }

  export type NutritionalMetricUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
    preferences?: UserPreferenceUpdateManyWithoutMetricNestedInput
    foodMacros?: FoodMacroUpdateManyWithoutMetricNestedInput
  }

  export type NutritionalMetricUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
    preferences?: UserPreferenceUncheckedUpdateManyWithoutMetricNestedInput
    foodMacros?: FoodMacroUncheckedUpdateManyWithoutMetricNestedInput
  }

  export type NutritionalMetricCreateManyInput = {
    id: string
    name: string
    description?: string | null
    unit: string
  }

  export type NutritionalMetricUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type NutritionalMetricUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
  }

  export type UserPreferenceCreateInput = {
    min_value?: number | null
    max_value?: number | null
    user: UserCreateNestedOneWithoutMacroPreferencesInput
    metric: NutritionalMetricCreateNestedOneWithoutPreferencesInput
  }

  export type UserPreferenceUncheckedCreateInput = {
    id?: number
    user_id: number
    metric_id: string
    min_value?: number | null
    max_value?: number | null
  }

  export type UserPreferenceUpdateInput = {
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutMacroPreferencesNestedInput
    metric?: NutritionalMetricUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type UserPreferenceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    metric_id?: StringFieldUpdateOperationsInput | string
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserPreferenceCreateManyInput = {
    id?: number
    user_id: number
    metric_id: string
    min_value?: number | null
    max_value?: number | null
  }

  export type UserPreferenceUpdateManyMutationInput = {
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserPreferenceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    metric_id?: StringFieldUpdateOperationsInput | string
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserPreferenceListRelationFilter = {
    every?: UserPreferenceWhereInput
    some?: UserPreferenceWhereInput
    none?: UserPreferenceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserPreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FoodListRelationFilter = {
    every?: FoodWhereInput
    some?: FoodWhereInput
    none?: FoodWhereInput
  }

  export type FoodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KitchenCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type KitchenMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type KitchenMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type KitchenScalarRelationFilter = {
    is?: KitchenWhereInput
    isNot?: KitchenWhereInput
  }

  export type FoodMacroListRelationFilter = {
    every?: FoodMacroWhereInput
    some?: FoodMacroWhereInput
    none?: FoodMacroWhereInput
  }

  export type FoodMacroOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FoodNameKitchen_idCompoundUniqueInput = {
    name: string
    kitchen_id: string
  }

  export type FoodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    kitchen_id?: SortOrder
  }

  export type FoodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    kitchen_id?: SortOrder
  }

  export type FoodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    kitchen_id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FoodScalarRelationFilter = {
    is?: FoodWhereInput
    isNot?: FoodWhereInput
  }

  export type NutritionalMetricScalarRelationFilter = {
    is?: NutritionalMetricWhereInput
    isNot?: NutritionalMetricWhereInput
  }

  export type FoodMacroFood_idMetric_idCompoundUniqueInput = {
    food_id: string
    metric_id: string
  }

  export type FoodMacroCountOrderByAggregateInput = {
    id?: SortOrder
    food_id?: SortOrder
    metric_id?: SortOrder
    value?: SortOrder
  }

  export type FoodMacroAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type FoodMacroMaxOrderByAggregateInput = {
    id?: SortOrder
    food_id?: SortOrder
    metric_id?: SortOrder
    value?: SortOrder
  }

  export type FoodMacroMinOrderByAggregateInput = {
    id?: SortOrder
    food_id?: SortOrder
    metric_id?: SortOrder
    value?: SortOrder
  }

  export type FoodMacroSumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NutritionalMetricCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    unit?: SortOrder
  }

  export type NutritionalMetricMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    unit?: SortOrder
  }

  export type NutritionalMetricMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    unit?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserPreferenceUser_idMetric_idCompoundUniqueInput = {
    user_id: number
    metric_id: string
  }

  export type UserPreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    metric_id?: SortOrder
    min_value?: SortOrder
    max_value?: SortOrder
  }

  export type UserPreferenceAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    min_value?: SortOrder
    max_value?: SortOrder
  }

  export type UserPreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    metric_id?: SortOrder
    min_value?: SortOrder
    max_value?: SortOrder
  }

  export type UserPreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    metric_id?: SortOrder
    min_value?: SortOrder
    max_value?: SortOrder
  }

  export type UserPreferenceSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    min_value?: SortOrder
    max_value?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserPreferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput> | UserPreferenceCreateWithoutUserInput[] | UserPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput | UserPreferenceCreateOrConnectWithoutUserInput[]
    createMany?: UserPreferenceCreateManyUserInputEnvelope
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
  }

  export type UserPreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput> | UserPreferenceCreateWithoutUserInput[] | UserPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput | UserPreferenceCreateOrConnectWithoutUserInput[]
    createMany?: UserPreferenceCreateManyUserInputEnvelope
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserPreferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput> | UserPreferenceCreateWithoutUserInput[] | UserPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput | UserPreferenceCreateOrConnectWithoutUserInput[]
    upsert?: UserPreferenceUpsertWithWhereUniqueWithoutUserInput | UserPreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserPreferenceCreateManyUserInputEnvelope
    set?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    disconnect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    delete?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    update?: UserPreferenceUpdateWithWhereUniqueWithoutUserInput | UserPreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPreferenceUpdateManyWithWhereWithoutUserInput | UserPreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPreferenceScalarWhereInput | UserPreferenceScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserPreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput> | UserPreferenceCreateWithoutUserInput[] | UserPreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutUserInput | UserPreferenceCreateOrConnectWithoutUserInput[]
    upsert?: UserPreferenceUpsertWithWhereUniqueWithoutUserInput | UserPreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserPreferenceCreateManyUserInputEnvelope
    set?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    disconnect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    delete?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    update?: UserPreferenceUpdateWithWhereUniqueWithoutUserInput | UserPreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPreferenceUpdateManyWithWhereWithoutUserInput | UserPreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPreferenceScalarWhereInput | UserPreferenceScalarWhereInput[]
  }

  export type FoodCreateNestedManyWithoutKitchenInput = {
    create?: XOR<FoodCreateWithoutKitchenInput, FoodUncheckedCreateWithoutKitchenInput> | FoodCreateWithoutKitchenInput[] | FoodUncheckedCreateWithoutKitchenInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutKitchenInput | FoodCreateOrConnectWithoutKitchenInput[]
    createMany?: FoodCreateManyKitchenInputEnvelope
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
  }

  export type FoodUncheckedCreateNestedManyWithoutKitchenInput = {
    create?: XOR<FoodCreateWithoutKitchenInput, FoodUncheckedCreateWithoutKitchenInput> | FoodCreateWithoutKitchenInput[] | FoodUncheckedCreateWithoutKitchenInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutKitchenInput | FoodCreateOrConnectWithoutKitchenInput[]
    createMany?: FoodCreateManyKitchenInputEnvelope
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
  }

  export type FoodUpdateManyWithoutKitchenNestedInput = {
    create?: XOR<FoodCreateWithoutKitchenInput, FoodUncheckedCreateWithoutKitchenInput> | FoodCreateWithoutKitchenInput[] | FoodUncheckedCreateWithoutKitchenInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutKitchenInput | FoodCreateOrConnectWithoutKitchenInput[]
    upsert?: FoodUpsertWithWhereUniqueWithoutKitchenInput | FoodUpsertWithWhereUniqueWithoutKitchenInput[]
    createMany?: FoodCreateManyKitchenInputEnvelope
    set?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    disconnect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    delete?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    update?: FoodUpdateWithWhereUniqueWithoutKitchenInput | FoodUpdateWithWhereUniqueWithoutKitchenInput[]
    updateMany?: FoodUpdateManyWithWhereWithoutKitchenInput | FoodUpdateManyWithWhereWithoutKitchenInput[]
    deleteMany?: FoodScalarWhereInput | FoodScalarWhereInput[]
  }

  export type FoodUncheckedUpdateManyWithoutKitchenNestedInput = {
    create?: XOR<FoodCreateWithoutKitchenInput, FoodUncheckedCreateWithoutKitchenInput> | FoodCreateWithoutKitchenInput[] | FoodUncheckedCreateWithoutKitchenInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutKitchenInput | FoodCreateOrConnectWithoutKitchenInput[]
    upsert?: FoodUpsertWithWhereUniqueWithoutKitchenInput | FoodUpsertWithWhereUniqueWithoutKitchenInput[]
    createMany?: FoodCreateManyKitchenInputEnvelope
    set?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    disconnect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    delete?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    update?: FoodUpdateWithWhereUniqueWithoutKitchenInput | FoodUpdateWithWhereUniqueWithoutKitchenInput[]
    updateMany?: FoodUpdateManyWithWhereWithoutKitchenInput | FoodUpdateManyWithWhereWithoutKitchenInput[]
    deleteMany?: FoodScalarWhereInput | FoodScalarWhereInput[]
  }

  export type KitchenCreateNestedOneWithoutFoodsInput = {
    create?: XOR<KitchenCreateWithoutFoodsInput, KitchenUncheckedCreateWithoutFoodsInput>
    connectOrCreate?: KitchenCreateOrConnectWithoutFoodsInput
    connect?: KitchenWhereUniqueInput
  }

  export type FoodMacroCreateNestedManyWithoutFoodInput = {
    create?: XOR<FoodMacroCreateWithoutFoodInput, FoodMacroUncheckedCreateWithoutFoodInput> | FoodMacroCreateWithoutFoodInput[] | FoodMacroUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutFoodInput | FoodMacroCreateOrConnectWithoutFoodInput[]
    createMany?: FoodMacroCreateManyFoodInputEnvelope
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
  }

  export type FoodMacroUncheckedCreateNestedManyWithoutFoodInput = {
    create?: XOR<FoodMacroCreateWithoutFoodInput, FoodMacroUncheckedCreateWithoutFoodInput> | FoodMacroCreateWithoutFoodInput[] | FoodMacroUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutFoodInput | FoodMacroCreateOrConnectWithoutFoodInput[]
    createMany?: FoodMacroCreateManyFoodInputEnvelope
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
  }

  export type KitchenUpdateOneRequiredWithoutFoodsNestedInput = {
    create?: XOR<KitchenCreateWithoutFoodsInput, KitchenUncheckedCreateWithoutFoodsInput>
    connectOrCreate?: KitchenCreateOrConnectWithoutFoodsInput
    upsert?: KitchenUpsertWithoutFoodsInput
    connect?: KitchenWhereUniqueInput
    update?: XOR<XOR<KitchenUpdateToOneWithWhereWithoutFoodsInput, KitchenUpdateWithoutFoodsInput>, KitchenUncheckedUpdateWithoutFoodsInput>
  }

  export type FoodMacroUpdateManyWithoutFoodNestedInput = {
    create?: XOR<FoodMacroCreateWithoutFoodInput, FoodMacroUncheckedCreateWithoutFoodInput> | FoodMacroCreateWithoutFoodInput[] | FoodMacroUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutFoodInput | FoodMacroCreateOrConnectWithoutFoodInput[]
    upsert?: FoodMacroUpsertWithWhereUniqueWithoutFoodInput | FoodMacroUpsertWithWhereUniqueWithoutFoodInput[]
    createMany?: FoodMacroCreateManyFoodInputEnvelope
    set?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    disconnect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    delete?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    update?: FoodMacroUpdateWithWhereUniqueWithoutFoodInput | FoodMacroUpdateWithWhereUniqueWithoutFoodInput[]
    updateMany?: FoodMacroUpdateManyWithWhereWithoutFoodInput | FoodMacroUpdateManyWithWhereWithoutFoodInput[]
    deleteMany?: FoodMacroScalarWhereInput | FoodMacroScalarWhereInput[]
  }

  export type FoodMacroUncheckedUpdateManyWithoutFoodNestedInput = {
    create?: XOR<FoodMacroCreateWithoutFoodInput, FoodMacroUncheckedCreateWithoutFoodInput> | FoodMacroCreateWithoutFoodInput[] | FoodMacroUncheckedCreateWithoutFoodInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutFoodInput | FoodMacroCreateOrConnectWithoutFoodInput[]
    upsert?: FoodMacroUpsertWithWhereUniqueWithoutFoodInput | FoodMacroUpsertWithWhereUniqueWithoutFoodInput[]
    createMany?: FoodMacroCreateManyFoodInputEnvelope
    set?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    disconnect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    delete?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    update?: FoodMacroUpdateWithWhereUniqueWithoutFoodInput | FoodMacroUpdateWithWhereUniqueWithoutFoodInput[]
    updateMany?: FoodMacroUpdateManyWithWhereWithoutFoodInput | FoodMacroUpdateManyWithWhereWithoutFoodInput[]
    deleteMany?: FoodMacroScalarWhereInput | FoodMacroScalarWhereInput[]
  }

  export type FoodCreateNestedOneWithoutMacrosInput = {
    create?: XOR<FoodCreateWithoutMacrosInput, FoodUncheckedCreateWithoutMacrosInput>
    connectOrCreate?: FoodCreateOrConnectWithoutMacrosInput
    connect?: FoodWhereUniqueInput
  }

  export type NutritionalMetricCreateNestedOneWithoutFoodMacrosInput = {
    create?: XOR<NutritionalMetricCreateWithoutFoodMacrosInput, NutritionalMetricUncheckedCreateWithoutFoodMacrosInput>
    connectOrCreate?: NutritionalMetricCreateOrConnectWithoutFoodMacrosInput
    connect?: NutritionalMetricWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FoodUpdateOneRequiredWithoutMacrosNestedInput = {
    create?: XOR<FoodCreateWithoutMacrosInput, FoodUncheckedCreateWithoutMacrosInput>
    connectOrCreate?: FoodCreateOrConnectWithoutMacrosInput
    upsert?: FoodUpsertWithoutMacrosInput
    connect?: FoodWhereUniqueInput
    update?: XOR<XOR<FoodUpdateToOneWithWhereWithoutMacrosInput, FoodUpdateWithoutMacrosInput>, FoodUncheckedUpdateWithoutMacrosInput>
  }

  export type NutritionalMetricUpdateOneRequiredWithoutFoodMacrosNestedInput = {
    create?: XOR<NutritionalMetricCreateWithoutFoodMacrosInput, NutritionalMetricUncheckedCreateWithoutFoodMacrosInput>
    connectOrCreate?: NutritionalMetricCreateOrConnectWithoutFoodMacrosInput
    upsert?: NutritionalMetricUpsertWithoutFoodMacrosInput
    connect?: NutritionalMetricWhereUniqueInput
    update?: XOR<XOR<NutritionalMetricUpdateToOneWithWhereWithoutFoodMacrosInput, NutritionalMetricUpdateWithoutFoodMacrosInput>, NutritionalMetricUncheckedUpdateWithoutFoodMacrosInput>
  }

  export type UserPreferenceCreateNestedManyWithoutMetricInput = {
    create?: XOR<UserPreferenceCreateWithoutMetricInput, UserPreferenceUncheckedCreateWithoutMetricInput> | UserPreferenceCreateWithoutMetricInput[] | UserPreferenceUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutMetricInput | UserPreferenceCreateOrConnectWithoutMetricInput[]
    createMany?: UserPreferenceCreateManyMetricInputEnvelope
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
  }

  export type FoodMacroCreateNestedManyWithoutMetricInput = {
    create?: XOR<FoodMacroCreateWithoutMetricInput, FoodMacroUncheckedCreateWithoutMetricInput> | FoodMacroCreateWithoutMetricInput[] | FoodMacroUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutMetricInput | FoodMacroCreateOrConnectWithoutMetricInput[]
    createMany?: FoodMacroCreateManyMetricInputEnvelope
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
  }

  export type UserPreferenceUncheckedCreateNestedManyWithoutMetricInput = {
    create?: XOR<UserPreferenceCreateWithoutMetricInput, UserPreferenceUncheckedCreateWithoutMetricInput> | UserPreferenceCreateWithoutMetricInput[] | UserPreferenceUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutMetricInput | UserPreferenceCreateOrConnectWithoutMetricInput[]
    createMany?: UserPreferenceCreateManyMetricInputEnvelope
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
  }

  export type FoodMacroUncheckedCreateNestedManyWithoutMetricInput = {
    create?: XOR<FoodMacroCreateWithoutMetricInput, FoodMacroUncheckedCreateWithoutMetricInput> | FoodMacroCreateWithoutMetricInput[] | FoodMacroUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutMetricInput | FoodMacroCreateOrConnectWithoutMetricInput[]
    createMany?: FoodMacroCreateManyMetricInputEnvelope
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
  }

  export type UserPreferenceUpdateManyWithoutMetricNestedInput = {
    create?: XOR<UserPreferenceCreateWithoutMetricInput, UserPreferenceUncheckedCreateWithoutMetricInput> | UserPreferenceCreateWithoutMetricInput[] | UserPreferenceUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutMetricInput | UserPreferenceCreateOrConnectWithoutMetricInput[]
    upsert?: UserPreferenceUpsertWithWhereUniqueWithoutMetricInput | UserPreferenceUpsertWithWhereUniqueWithoutMetricInput[]
    createMany?: UserPreferenceCreateManyMetricInputEnvelope
    set?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    disconnect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    delete?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    update?: UserPreferenceUpdateWithWhereUniqueWithoutMetricInput | UserPreferenceUpdateWithWhereUniqueWithoutMetricInput[]
    updateMany?: UserPreferenceUpdateManyWithWhereWithoutMetricInput | UserPreferenceUpdateManyWithWhereWithoutMetricInput[]
    deleteMany?: UserPreferenceScalarWhereInput | UserPreferenceScalarWhereInput[]
  }

  export type FoodMacroUpdateManyWithoutMetricNestedInput = {
    create?: XOR<FoodMacroCreateWithoutMetricInput, FoodMacroUncheckedCreateWithoutMetricInput> | FoodMacroCreateWithoutMetricInput[] | FoodMacroUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutMetricInput | FoodMacroCreateOrConnectWithoutMetricInput[]
    upsert?: FoodMacroUpsertWithWhereUniqueWithoutMetricInput | FoodMacroUpsertWithWhereUniqueWithoutMetricInput[]
    createMany?: FoodMacroCreateManyMetricInputEnvelope
    set?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    disconnect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    delete?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    update?: FoodMacroUpdateWithWhereUniqueWithoutMetricInput | FoodMacroUpdateWithWhereUniqueWithoutMetricInput[]
    updateMany?: FoodMacroUpdateManyWithWhereWithoutMetricInput | FoodMacroUpdateManyWithWhereWithoutMetricInput[]
    deleteMany?: FoodMacroScalarWhereInput | FoodMacroScalarWhereInput[]
  }

  export type UserPreferenceUncheckedUpdateManyWithoutMetricNestedInput = {
    create?: XOR<UserPreferenceCreateWithoutMetricInput, UserPreferenceUncheckedCreateWithoutMetricInput> | UserPreferenceCreateWithoutMetricInput[] | UserPreferenceUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: UserPreferenceCreateOrConnectWithoutMetricInput | UserPreferenceCreateOrConnectWithoutMetricInput[]
    upsert?: UserPreferenceUpsertWithWhereUniqueWithoutMetricInput | UserPreferenceUpsertWithWhereUniqueWithoutMetricInput[]
    createMany?: UserPreferenceCreateManyMetricInputEnvelope
    set?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    disconnect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    delete?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    connect?: UserPreferenceWhereUniqueInput | UserPreferenceWhereUniqueInput[]
    update?: UserPreferenceUpdateWithWhereUniqueWithoutMetricInput | UserPreferenceUpdateWithWhereUniqueWithoutMetricInput[]
    updateMany?: UserPreferenceUpdateManyWithWhereWithoutMetricInput | UserPreferenceUpdateManyWithWhereWithoutMetricInput[]
    deleteMany?: UserPreferenceScalarWhereInput | UserPreferenceScalarWhereInput[]
  }

  export type FoodMacroUncheckedUpdateManyWithoutMetricNestedInput = {
    create?: XOR<FoodMacroCreateWithoutMetricInput, FoodMacroUncheckedCreateWithoutMetricInput> | FoodMacroCreateWithoutMetricInput[] | FoodMacroUncheckedCreateWithoutMetricInput[]
    connectOrCreate?: FoodMacroCreateOrConnectWithoutMetricInput | FoodMacroCreateOrConnectWithoutMetricInput[]
    upsert?: FoodMacroUpsertWithWhereUniqueWithoutMetricInput | FoodMacroUpsertWithWhereUniqueWithoutMetricInput[]
    createMany?: FoodMacroCreateManyMetricInputEnvelope
    set?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    disconnect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    delete?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    connect?: FoodMacroWhereUniqueInput | FoodMacroWhereUniqueInput[]
    update?: FoodMacroUpdateWithWhereUniqueWithoutMetricInput | FoodMacroUpdateWithWhereUniqueWithoutMetricInput[]
    updateMany?: FoodMacroUpdateManyWithWhereWithoutMetricInput | FoodMacroUpdateManyWithWhereWithoutMetricInput[]
    deleteMany?: FoodMacroScalarWhereInput | FoodMacroScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMacroPreferencesInput = {
    create?: XOR<UserCreateWithoutMacroPreferencesInput, UserUncheckedCreateWithoutMacroPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMacroPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type NutritionalMetricCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<NutritionalMetricCreateWithoutPreferencesInput, NutritionalMetricUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: NutritionalMetricCreateOrConnectWithoutPreferencesInput
    connect?: NutritionalMetricWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMacroPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutMacroPreferencesInput, UserUncheckedCreateWithoutMacroPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMacroPreferencesInput
    upsert?: UserUpsertWithoutMacroPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMacroPreferencesInput, UserUpdateWithoutMacroPreferencesInput>, UserUncheckedUpdateWithoutMacroPreferencesInput>
  }

  export type NutritionalMetricUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<NutritionalMetricCreateWithoutPreferencesInput, NutritionalMetricUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: NutritionalMetricCreateOrConnectWithoutPreferencesInput
    upsert?: NutritionalMetricUpsertWithoutPreferencesInput
    connect?: NutritionalMetricWhereUniqueInput
    update?: XOR<XOR<NutritionalMetricUpdateToOneWithWhereWithoutPreferencesInput, NutritionalMetricUpdateWithoutPreferencesInput>, NutritionalMetricUncheckedUpdateWithoutPreferencesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserPreferenceCreateWithoutUserInput = {
    min_value?: number | null
    max_value?: number | null
    metric: NutritionalMetricCreateNestedOneWithoutPreferencesInput
  }

  export type UserPreferenceUncheckedCreateWithoutUserInput = {
    id?: number
    metric_id: string
    min_value?: number | null
    max_value?: number | null
  }

  export type UserPreferenceCreateOrConnectWithoutUserInput = {
    where: UserPreferenceWhereUniqueInput
    create: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
  }

  export type UserPreferenceCreateManyUserInputEnvelope = {
    data: UserPreferenceCreateManyUserInput | UserPreferenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserPreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserPreferenceWhereUniqueInput
    update: XOR<UserPreferenceUpdateWithoutUserInput, UserPreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<UserPreferenceCreateWithoutUserInput, UserPreferenceUncheckedCreateWithoutUserInput>
  }

  export type UserPreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserPreferenceWhereUniqueInput
    data: XOR<UserPreferenceUpdateWithoutUserInput, UserPreferenceUncheckedUpdateWithoutUserInput>
  }

  export type UserPreferenceUpdateManyWithWhereWithoutUserInput = {
    where: UserPreferenceScalarWhereInput
    data: XOR<UserPreferenceUpdateManyMutationInput, UserPreferenceUncheckedUpdateManyWithoutUserInput>
  }

  export type UserPreferenceScalarWhereInput = {
    AND?: UserPreferenceScalarWhereInput | UserPreferenceScalarWhereInput[]
    OR?: UserPreferenceScalarWhereInput[]
    NOT?: UserPreferenceScalarWhereInput | UserPreferenceScalarWhereInput[]
    id?: IntFilter<"UserPreference"> | number
    user_id?: IntFilter<"UserPreference"> | number
    metric_id?: StringFilter<"UserPreference"> | string
    min_value?: FloatNullableFilter<"UserPreference"> | number | null
    max_value?: FloatNullableFilter<"UserPreference"> | number | null
  }

  export type FoodCreateWithoutKitchenInput = {
    id: string
    name: string
    description?: string | null
    macros?: FoodMacroCreateNestedManyWithoutFoodInput
  }

  export type FoodUncheckedCreateWithoutKitchenInput = {
    id: string
    name: string
    description?: string | null
    macros?: FoodMacroUncheckedCreateNestedManyWithoutFoodInput
  }

  export type FoodCreateOrConnectWithoutKitchenInput = {
    where: FoodWhereUniqueInput
    create: XOR<FoodCreateWithoutKitchenInput, FoodUncheckedCreateWithoutKitchenInput>
  }

  export type FoodCreateManyKitchenInputEnvelope = {
    data: FoodCreateManyKitchenInput | FoodCreateManyKitchenInput[]
    skipDuplicates?: boolean
  }

  export type FoodUpsertWithWhereUniqueWithoutKitchenInput = {
    where: FoodWhereUniqueInput
    update: XOR<FoodUpdateWithoutKitchenInput, FoodUncheckedUpdateWithoutKitchenInput>
    create: XOR<FoodCreateWithoutKitchenInput, FoodUncheckedCreateWithoutKitchenInput>
  }

  export type FoodUpdateWithWhereUniqueWithoutKitchenInput = {
    where: FoodWhereUniqueInput
    data: XOR<FoodUpdateWithoutKitchenInput, FoodUncheckedUpdateWithoutKitchenInput>
  }

  export type FoodUpdateManyWithWhereWithoutKitchenInput = {
    where: FoodScalarWhereInput
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyWithoutKitchenInput>
  }

  export type FoodScalarWhereInput = {
    AND?: FoodScalarWhereInput | FoodScalarWhereInput[]
    OR?: FoodScalarWhereInput[]
    NOT?: FoodScalarWhereInput | FoodScalarWhereInput[]
    id?: StringFilter<"Food"> | string
    name?: StringFilter<"Food"> | string
    description?: StringNullableFilter<"Food"> | string | null
    kitchen_id?: StringFilter<"Food"> | string
  }

  export type KitchenCreateWithoutFoodsInput = {
    id: string
    name: string
    description?: string | null
  }

  export type KitchenUncheckedCreateWithoutFoodsInput = {
    id: string
    name: string
    description?: string | null
  }

  export type KitchenCreateOrConnectWithoutFoodsInput = {
    where: KitchenWhereUniqueInput
    create: XOR<KitchenCreateWithoutFoodsInput, KitchenUncheckedCreateWithoutFoodsInput>
  }

  export type FoodMacroCreateWithoutFoodInput = {
    value: number
    metric: NutritionalMetricCreateNestedOneWithoutFoodMacrosInput
  }

  export type FoodMacroUncheckedCreateWithoutFoodInput = {
    id?: number
    metric_id: string
    value: number
  }

  export type FoodMacroCreateOrConnectWithoutFoodInput = {
    where: FoodMacroWhereUniqueInput
    create: XOR<FoodMacroCreateWithoutFoodInput, FoodMacroUncheckedCreateWithoutFoodInput>
  }

  export type FoodMacroCreateManyFoodInputEnvelope = {
    data: FoodMacroCreateManyFoodInput | FoodMacroCreateManyFoodInput[]
    skipDuplicates?: boolean
  }

  export type KitchenUpsertWithoutFoodsInput = {
    update: XOR<KitchenUpdateWithoutFoodsInput, KitchenUncheckedUpdateWithoutFoodsInput>
    create: XOR<KitchenCreateWithoutFoodsInput, KitchenUncheckedCreateWithoutFoodsInput>
    where?: KitchenWhereInput
  }

  export type KitchenUpdateToOneWithWhereWithoutFoodsInput = {
    where?: KitchenWhereInput
    data: XOR<KitchenUpdateWithoutFoodsInput, KitchenUncheckedUpdateWithoutFoodsInput>
  }

  export type KitchenUpdateWithoutFoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type KitchenUncheckedUpdateWithoutFoodsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodMacroUpsertWithWhereUniqueWithoutFoodInput = {
    where: FoodMacroWhereUniqueInput
    update: XOR<FoodMacroUpdateWithoutFoodInput, FoodMacroUncheckedUpdateWithoutFoodInput>
    create: XOR<FoodMacroCreateWithoutFoodInput, FoodMacroUncheckedCreateWithoutFoodInput>
  }

  export type FoodMacroUpdateWithWhereUniqueWithoutFoodInput = {
    where: FoodMacroWhereUniqueInput
    data: XOR<FoodMacroUpdateWithoutFoodInput, FoodMacroUncheckedUpdateWithoutFoodInput>
  }

  export type FoodMacroUpdateManyWithWhereWithoutFoodInput = {
    where: FoodMacroScalarWhereInput
    data: XOR<FoodMacroUpdateManyMutationInput, FoodMacroUncheckedUpdateManyWithoutFoodInput>
  }

  export type FoodMacroScalarWhereInput = {
    AND?: FoodMacroScalarWhereInput | FoodMacroScalarWhereInput[]
    OR?: FoodMacroScalarWhereInput[]
    NOT?: FoodMacroScalarWhereInput | FoodMacroScalarWhereInput[]
    id?: IntFilter<"FoodMacro"> | number
    food_id?: StringFilter<"FoodMacro"> | string
    metric_id?: StringFilter<"FoodMacro"> | string
    value?: FloatFilter<"FoodMacro"> | number
  }

  export type FoodCreateWithoutMacrosInput = {
    id: string
    name: string
    description?: string | null
    kitchen: KitchenCreateNestedOneWithoutFoodsInput
  }

  export type FoodUncheckedCreateWithoutMacrosInput = {
    id: string
    name: string
    description?: string | null
    kitchen_id: string
  }

  export type FoodCreateOrConnectWithoutMacrosInput = {
    where: FoodWhereUniqueInput
    create: XOR<FoodCreateWithoutMacrosInput, FoodUncheckedCreateWithoutMacrosInput>
  }

  export type NutritionalMetricCreateWithoutFoodMacrosInput = {
    id: string
    name: string
    description?: string | null
    unit: string
    preferences?: UserPreferenceCreateNestedManyWithoutMetricInput
  }

  export type NutritionalMetricUncheckedCreateWithoutFoodMacrosInput = {
    id: string
    name: string
    description?: string | null
    unit: string
    preferences?: UserPreferenceUncheckedCreateNestedManyWithoutMetricInput
  }

  export type NutritionalMetricCreateOrConnectWithoutFoodMacrosInput = {
    where: NutritionalMetricWhereUniqueInput
    create: XOR<NutritionalMetricCreateWithoutFoodMacrosInput, NutritionalMetricUncheckedCreateWithoutFoodMacrosInput>
  }

  export type FoodUpsertWithoutMacrosInput = {
    update: XOR<FoodUpdateWithoutMacrosInput, FoodUncheckedUpdateWithoutMacrosInput>
    create: XOR<FoodCreateWithoutMacrosInput, FoodUncheckedCreateWithoutMacrosInput>
    where?: FoodWhereInput
  }

  export type FoodUpdateToOneWithWhereWithoutMacrosInput = {
    where?: FoodWhereInput
    data: XOR<FoodUpdateWithoutMacrosInput, FoodUncheckedUpdateWithoutMacrosInput>
  }

  export type FoodUpdateWithoutMacrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    kitchen?: KitchenUpdateOneRequiredWithoutFoodsNestedInput
  }

  export type FoodUncheckedUpdateWithoutMacrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    kitchen_id?: StringFieldUpdateOperationsInput | string
  }

  export type NutritionalMetricUpsertWithoutFoodMacrosInput = {
    update: XOR<NutritionalMetricUpdateWithoutFoodMacrosInput, NutritionalMetricUncheckedUpdateWithoutFoodMacrosInput>
    create: XOR<NutritionalMetricCreateWithoutFoodMacrosInput, NutritionalMetricUncheckedCreateWithoutFoodMacrosInput>
    where?: NutritionalMetricWhereInput
  }

  export type NutritionalMetricUpdateToOneWithWhereWithoutFoodMacrosInput = {
    where?: NutritionalMetricWhereInput
    data: XOR<NutritionalMetricUpdateWithoutFoodMacrosInput, NutritionalMetricUncheckedUpdateWithoutFoodMacrosInput>
  }

  export type NutritionalMetricUpdateWithoutFoodMacrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
    preferences?: UserPreferenceUpdateManyWithoutMetricNestedInput
  }

  export type NutritionalMetricUncheckedUpdateWithoutFoodMacrosInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
    preferences?: UserPreferenceUncheckedUpdateManyWithoutMetricNestedInput
  }

  export type UserPreferenceCreateWithoutMetricInput = {
    min_value?: number | null
    max_value?: number | null
    user: UserCreateNestedOneWithoutMacroPreferencesInput
  }

  export type UserPreferenceUncheckedCreateWithoutMetricInput = {
    id?: number
    user_id: number
    min_value?: number | null
    max_value?: number | null
  }

  export type UserPreferenceCreateOrConnectWithoutMetricInput = {
    where: UserPreferenceWhereUniqueInput
    create: XOR<UserPreferenceCreateWithoutMetricInput, UserPreferenceUncheckedCreateWithoutMetricInput>
  }

  export type UserPreferenceCreateManyMetricInputEnvelope = {
    data: UserPreferenceCreateManyMetricInput | UserPreferenceCreateManyMetricInput[]
    skipDuplicates?: boolean
  }

  export type FoodMacroCreateWithoutMetricInput = {
    value: number
    food: FoodCreateNestedOneWithoutMacrosInput
  }

  export type FoodMacroUncheckedCreateWithoutMetricInput = {
    id?: number
    food_id: string
    value: number
  }

  export type FoodMacroCreateOrConnectWithoutMetricInput = {
    where: FoodMacroWhereUniqueInput
    create: XOR<FoodMacroCreateWithoutMetricInput, FoodMacroUncheckedCreateWithoutMetricInput>
  }

  export type FoodMacroCreateManyMetricInputEnvelope = {
    data: FoodMacroCreateManyMetricInput | FoodMacroCreateManyMetricInput[]
    skipDuplicates?: boolean
  }

  export type UserPreferenceUpsertWithWhereUniqueWithoutMetricInput = {
    where: UserPreferenceWhereUniqueInput
    update: XOR<UserPreferenceUpdateWithoutMetricInput, UserPreferenceUncheckedUpdateWithoutMetricInput>
    create: XOR<UserPreferenceCreateWithoutMetricInput, UserPreferenceUncheckedCreateWithoutMetricInput>
  }

  export type UserPreferenceUpdateWithWhereUniqueWithoutMetricInput = {
    where: UserPreferenceWhereUniqueInput
    data: XOR<UserPreferenceUpdateWithoutMetricInput, UserPreferenceUncheckedUpdateWithoutMetricInput>
  }

  export type UserPreferenceUpdateManyWithWhereWithoutMetricInput = {
    where: UserPreferenceScalarWhereInput
    data: XOR<UserPreferenceUpdateManyMutationInput, UserPreferenceUncheckedUpdateManyWithoutMetricInput>
  }

  export type FoodMacroUpsertWithWhereUniqueWithoutMetricInput = {
    where: FoodMacroWhereUniqueInput
    update: XOR<FoodMacroUpdateWithoutMetricInput, FoodMacroUncheckedUpdateWithoutMetricInput>
    create: XOR<FoodMacroCreateWithoutMetricInput, FoodMacroUncheckedCreateWithoutMetricInput>
  }

  export type FoodMacroUpdateWithWhereUniqueWithoutMetricInput = {
    where: FoodMacroWhereUniqueInput
    data: XOR<FoodMacroUpdateWithoutMetricInput, FoodMacroUncheckedUpdateWithoutMetricInput>
  }

  export type FoodMacroUpdateManyWithWhereWithoutMetricInput = {
    where: FoodMacroScalarWhereInput
    data: XOR<FoodMacroUpdateManyMutationInput, FoodMacroUncheckedUpdateManyWithoutMetricInput>
  }

  export type UserCreateWithoutMacroPreferencesInput = {
    name?: string | null
    email: string
  }

  export type UserUncheckedCreateWithoutMacroPreferencesInput = {
    user_id?: number
    name?: string | null
    email: string
  }

  export type UserCreateOrConnectWithoutMacroPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMacroPreferencesInput, UserUncheckedCreateWithoutMacroPreferencesInput>
  }

  export type NutritionalMetricCreateWithoutPreferencesInput = {
    id: string
    name: string
    description?: string | null
    unit: string
    foodMacros?: FoodMacroCreateNestedManyWithoutMetricInput
  }

  export type NutritionalMetricUncheckedCreateWithoutPreferencesInput = {
    id: string
    name: string
    description?: string | null
    unit: string
    foodMacros?: FoodMacroUncheckedCreateNestedManyWithoutMetricInput
  }

  export type NutritionalMetricCreateOrConnectWithoutPreferencesInput = {
    where: NutritionalMetricWhereUniqueInput
    create: XOR<NutritionalMetricCreateWithoutPreferencesInput, NutritionalMetricUncheckedCreateWithoutPreferencesInput>
  }

  export type UserUpsertWithoutMacroPreferencesInput = {
    update: XOR<UserUpdateWithoutMacroPreferencesInput, UserUncheckedUpdateWithoutMacroPreferencesInput>
    create: XOR<UserCreateWithoutMacroPreferencesInput, UserUncheckedCreateWithoutMacroPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMacroPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMacroPreferencesInput, UserUncheckedUpdateWithoutMacroPreferencesInput>
  }

  export type UserUpdateWithoutMacroPreferencesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutMacroPreferencesInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type NutritionalMetricUpsertWithoutPreferencesInput = {
    update: XOR<NutritionalMetricUpdateWithoutPreferencesInput, NutritionalMetricUncheckedUpdateWithoutPreferencesInput>
    create: XOR<NutritionalMetricCreateWithoutPreferencesInput, NutritionalMetricUncheckedCreateWithoutPreferencesInput>
    where?: NutritionalMetricWhereInput
  }

  export type NutritionalMetricUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: NutritionalMetricWhereInput
    data: XOR<NutritionalMetricUpdateWithoutPreferencesInput, NutritionalMetricUncheckedUpdateWithoutPreferencesInput>
  }

  export type NutritionalMetricUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
    foodMacros?: FoodMacroUpdateManyWithoutMetricNestedInput
  }

  export type NutritionalMetricUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: StringFieldUpdateOperationsInput | string
    foodMacros?: FoodMacroUncheckedUpdateManyWithoutMetricNestedInput
  }

  export type UserPreferenceCreateManyUserInput = {
    id?: number
    metric_id: string
    min_value?: number | null
    max_value?: number | null
  }

  export type UserPreferenceUpdateWithoutUserInput = {
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
    metric?: NutritionalMetricUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type UserPreferenceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_id?: StringFieldUpdateOperationsInput | string
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserPreferenceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_id?: StringFieldUpdateOperationsInput | string
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type FoodCreateManyKitchenInput = {
    id: string
    name: string
    description?: string | null
  }

  export type FoodUpdateWithoutKitchenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    macros?: FoodMacroUpdateManyWithoutFoodNestedInput
  }

  export type FoodUncheckedUpdateWithoutKitchenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    macros?: FoodMacroUncheckedUpdateManyWithoutFoodNestedInput
  }

  export type FoodUncheckedUpdateManyWithoutKitchenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodMacroCreateManyFoodInput = {
    id?: number
    metric_id: string
    value: number
  }

  export type FoodMacroUpdateWithoutFoodInput = {
    value?: FloatFieldUpdateOperationsInput | number
    metric?: NutritionalMetricUpdateOneRequiredWithoutFoodMacrosNestedInput
  }

  export type FoodMacroUncheckedUpdateWithoutFoodInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type FoodMacroUncheckedUpdateManyWithoutFoodInput = {
    id?: IntFieldUpdateOperationsInput | number
    metric_id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type UserPreferenceCreateManyMetricInput = {
    id?: number
    user_id: number
    min_value?: number | null
    max_value?: number | null
  }

  export type FoodMacroCreateManyMetricInput = {
    id?: number
    food_id: string
    value: number
  }

  export type UserPreferenceUpdateWithoutMetricInput = {
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutMacroPreferencesNestedInput
  }

  export type UserPreferenceUncheckedUpdateWithoutMetricInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UserPreferenceUncheckedUpdateManyWithoutMetricInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    min_value?: NullableFloatFieldUpdateOperationsInput | number | null
    max_value?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type FoodMacroUpdateWithoutMetricInput = {
    value?: FloatFieldUpdateOperationsInput | number
    food?: FoodUpdateOneRequiredWithoutMacrosNestedInput
  }

  export type FoodMacroUncheckedUpdateWithoutMetricInput = {
    id?: IntFieldUpdateOperationsInput | number
    food_id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type FoodMacroUncheckedUpdateManyWithoutMetricInput = {
    id?: IntFieldUpdateOperationsInput | number
    food_id?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}