import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/types";
export default function ProductGrid({products}:{products:Product[]}){return <div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>}
