// @ts-ignore
export const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
// @ts-ignore
export const when = (cond, f1, f2?) => x => cond(x) ? f1(x) : f2 ? f2(x) : x;
