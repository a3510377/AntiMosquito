/** check port value */
export function checkPort(value: string): number {
  let port = parseInt(value, 10);
  if (isNaN(port)) return 3000;
  if (port >= 0 && port <= 65535) return port;
  else return --port;
}
