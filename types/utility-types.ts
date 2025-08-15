// Generic utility types shared across apps

/** Require at least one key of T to be present */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Partial<T> & { [K in Keys]-?: Required<Pick<T, K>> }[Keys];