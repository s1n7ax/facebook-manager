import { AssertionError } from 'assert';

export declare function assert(value: unknown): asserts value;

export function assertIsNumber(
    val: any,
    options?: {
        message?: string;
        actual?: any;
        expected?: any;
        operator?: string;
        stackStartFunction?: () => void;
    }
): asserts val is number {
    if (typeof val === 'number') return;

    throw new AssertionError(options);
}

export function assertIsNotNull<T>(
    val: T,
    options?: {
        message?: string;
        actual?: any;
        expected?: any;
        operator?: string;
        stackStartFunction?: () => void;
    }
): asserts val is NonNullable<T> {
    if (val !== null) return;

    throw new AssertionError(options);
}

export function assertIsNotNullOrUndefined<T>(
    val: T,
    options?: {
        message?: string;
        actual?: any;
        expected?: any;
        operator?: string;
        stackStartFunction?: () => void;
    }
): asserts val is NonNullable<T> {
    if (val !== null && val !== undefined) return;

    throw new AssertionError(options);
}
