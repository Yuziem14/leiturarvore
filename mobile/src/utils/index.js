export function parseAsArray(data) {
  return Array.isArray(data) ? data : Array(data);
}

export function isOne(data) {
  return data.length === 1;
}

export function first(data) {
  return data[0];
}
