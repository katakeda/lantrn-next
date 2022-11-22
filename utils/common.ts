export const buildUrl = (base: string, a: any) => {
  const url = new URL(base);
  for (const key in a) {
    url.searchParams.append(key, a[key]);
  }
  return url.toString();
};