/** check port value */
export function checkPort(value: string): string | number | boolean {
  let port = parseInt(value, 10);
  if (isNaN(port)) return value;
  if (port >= 0) return port;
  return false;
}
