export async function genToArray<T>(gen: AsyncIterableIterator<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const x of gen) {
    out.push(x);
  }
  return out;
}
