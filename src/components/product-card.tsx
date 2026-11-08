import Link from "next/link";
import type { Product } from "@/lib/types";
import { money, unitLabel } from "@/lib/utils";
export default function ProductCard({product}:{product:Product}){
 const dir=product.change?.dir||"flat"; const arrow=dir==="up"?"▲":dir==="down"?"▼":"—";
 return <Link href={`/product/${product.slug}`} className="product-card"><div className="product-card-top"><span className="product-emoji">{product.image||product.categoryIcon||"🛍️"}</span><span className="category-chip">{product.categoryNameBn||"বাজার পণ্য"}</span></div><h3>{product.nameBn}</h3><p className="unit-text">{unitLabel(product.unit)}</p><div className="price-row"><div><small>আজকের দাম</small><strong>{money(product.today)}</strong></div><span className={`change-badge ${dir}`}>{arrow} {Number(product.change?.pct||0).toLocaleString("bn-BD")}%</span></div><div className="card-bottom">বিস্তারিত দেখুন <span>↗</span></div></Link>
}
