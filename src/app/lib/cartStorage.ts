export interface CartLine {
  productId: number;
  quantity: number;
}

const STORAGE_KEY = "elix-cart";

export function readCartLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).productId === "number" &&
        typeof (line as CartLine).quantity === "number" &&
        (line as CartLine).quantity > 0
    );
  } catch {
    return [];
  }
}

export function writeCartLines(lines: CartLine[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}
