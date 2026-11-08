import type { Product } from "@/lib/types";
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor";
const bnDigits = "০১২৩৪৫৬৭৮৯";
export function toBengali(value: number | string) {
  return String(value).replace(/\d/g, d => bnDigits[Number(d)]).replace(/,/g, ",");
}
export function fromBengali(value: string) {
  return Number(value.replace(/[০-৯]/g, d => String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/[^0-9.-]/g, "")) || 0;
}
export function money(value: number) { return `${toBengali(value.toLocaleString("en-US"))} টাকা`; }
export function unitLabel(unit: string) {
  const map: Record<string,string> = { kg:"প্রতি কেজি", liter:"প্রতি লিটার", litre:"প্রতি লিটার", l:"প্রতি লিটার", dozen:"প্রতি ডজন", piece:"প্রতি পিস", pcs:"প্রতি পিস", pc:"প্রতি পিস" };
  return map[unit?.toLowerCase()] || (unit?.startsWith("প্রতি") ? unit : `প্রতি ${unit || "একক"}`);
}
export function normalizeProducts(payload: unknown): Product[] {
  const rows = Array.isArray(payload) ? payload : (payload as {data?: unknown; products?: unknown})?.data ?? (payload as {products?: unknown})?.products ?? [];
  if (!Array.isArray(rows)) return [];
  return rows.map((p: any) => ({
    ...p, id: p.id ?? p._id, slug: p.slug || String(p.id ?? p._id),
    nameBn: p.nameBn || p.name || "নাম পাওয়া যায়নি", today: Number(p.today ?? p.price ?? 0),
    change: p.change || { dir: "flat", pct: 0 }, markets: p.markets || []
  }));
}
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  return normalizeProducts(await res.json());
}
export async function getProduct(identifier: string): Promise<Product | null> {
  const products = await getProducts();
  const found = products.find(p => p.slug === identifier || String(p.id) === identifier);
  if (found) {
    const byId = await fetch(`${API_BASE}/products/${found.id}`, { next: { revalidate: 300 } });
    if (byId.ok) return normalizeProducts([await byId.json()])[0] || found;
  }
  if (/^\d+$/.test(identifier)) {
    const res = await fetch(`${API_BASE}/products/${identifier}`, { next: { revalidate: 300 } });
    if (res.ok) return normalizeProducts([await res.json()])[0] || null;
  }
  return null;
}
export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("ক্যাটাগরি লোড করা যায়নি");
  const data = await res.json(); return Array.isArray(data) ? data : data.data || [];
}
