"use client";
import { useMemo,useState } from "react";
import Link from "next/link";
import { ChevronDown,ArrowLeft } from "lucide-react";
import type { Category,Product } from "@/lib/types";
import ProductGrid from "@/components/product-grid";
export default function CategoryClient({category,products}:{category:Category;products:Product[]}){
 const [sort,setSort]=useState("default");
 const sorted=useMemo(()=>{const list=[...products];if(sort==="asc")list.sort((a,b)=>a.today-b.today);if(sort==="desc")list.sort((a,b)=>b.today-a.today);return list},[products,sort]);
 return <div className="container page-shell"><div className="breadcrumb"><Link href="/">হোম</Link><span>/</span><span>{category.nameBn}</span></div><section className="category-banner"><span className="category-big-icon">{category.icon}</span><div><span className="eyebrow">PRODUCT CATEGORY</span><h1>{category.nameBn}</h1><p>এই ক্যাটাগরির সকল পণ্যের আজকের বাজারদর ও মূল্য পরিবর্তন</p></div></section><div className="list-toolbar"><div><h2>{category.nameBn} পণ্যসমূহ</h2><span>{products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে</span></div><label className="sort-control">সাজান <span className="select-wrap"><select value={sort} onChange={e=>setSort(e.target.value)}><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><ChevronDown size={16}/></span></label></div>{sorted.length?<ProductGrid products={sorted}/>:<div className="empty-state"><div>📦</div><h3>এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h3><p>অন্য ক্যাটাগরি থেকে পণ্য দেখুন।</p><Link className="btn btn-primary" href="/">হোম পেজে ফিরে যান <ArrowLeft size={16}/></Link></div>}</div>
}
