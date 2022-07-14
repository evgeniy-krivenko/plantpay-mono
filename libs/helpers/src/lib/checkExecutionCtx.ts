/**
 * @example
 * ```
 * const isServer = checkExecutionCtx();
 * ```
 */
export const checkExecutionCtx = (): boolean => typeof window === 'undefined';
