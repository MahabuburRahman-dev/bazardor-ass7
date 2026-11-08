"use client";
import { useEffect,useState } from "react";
import type { Product,Category } from "@/lib/types";
import { API_BASE,normalizeProducts } from "@/lib/utils";
import ProductGrid from "@/components/product-grid";
import { ProductSkeletons } from "@/components/skeletons";
import { ArrowDown,ArrowUp,ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeContent({initialCategories}:{initialCategories:Category[]}){
 const [products,setProducts]=useState<Product[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(false);
 useEffect(()=>{let live=true;fetch(`${API_BASE}/products`).then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(live)setProducts(normalizeProducts(d))}).catch(()=>setError(true)).finally(()=>{if(live)setLoading(false)});return()=>{live=false}},[]);
 const rising=[...products].filter(p=>p.change?.dir==="up").sort((a,b)=>b.change.pct-a.change.pct).slice(0,6);
 const falling=[...products].filter(p=>p.change?.dir==="down").sort((a,b)=>b.change.pct-a.change.pct).slice(0,6);
 return <>
 <section className="hero-section"><div className="container hero-layout"><div className="hero-copy"><span className="eyebrow"><i/> প্রতিদিনের বাজার, সঠিক তথ্য</span><h1>আজকের বাজারের দাম<br/><span>এক নজরে</span></h1><p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p><a href="#সব-পণ্য" className="btn btn-primary hero-cta">সব পণ্য দেখুন <ArrowRight size={18}/></a><div className="hero-meta"><span> ৩৩+ নিত্যপ্রয়োজনীয় পণ্য</span><span> ৮টি ক্যাটাগরি</span></div></div><div className="hero-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="basket">🧺<div className="basket-items">🥬 🍅 🥕<br/>🧅 🥔 🌶️</div></div><span className="float-food food-one">🥑</span><span className="float-food food-two">🍆</span><span className="float-food food-three">🥦</span><div className="art-caption"><b>বাজারের হালচাল</b><small>দাম জানুন, সচেতন থাকুন</small></div></div></div></section>
 <section className="container trend-section"><div className="section-heading"><div><span className="eyebrow">PRICE MOVEMENT</span><h2><ArrowUp className="up-icon"/> আজ দাম বেড়েছে</h2></div><span className="section-sub">আজকের বাজারে যেসব পণ্যের দাম বেড়েছে</span></div>{loading?<ProductSkeletons count={3}/>:<ProductGrid products={rising}/>}</section>
 <section className="container trend-section fall-section"><div className="section-heading"><div><span className="eyebrow">PRICE MOVEMENT</span><h2><ArrowDown className="down-icon"/> আজ দাম কমেছে</h2></div><span className="section-sub">আজকের বাজারে যেসব পণ্যের দাম কমেছে</span></div>{loading?<ProductSkeletons count={3}/>:<ProductGrid products={falling}/>}</section>
 <section className="container all-products" id="সব-পণ্য"><div className="section-heading"><div><span className="eyebrow">PRODUCT DIRECTORY</span><h2>সব পণ্য</h2><p className="section-sub">নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর এক জায়গায়</p></div><span className="count-pill">{loading?"…":`${products.length.toLocaleString("bn-BD")}টি পণ্য`}</span></div>{loading?<ProductSkeletons count={9}/>:error?<div className="empty-state"><h3>পণ্যের তথ্য পাওয়া যাচ্ছে না</h3><p>ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p><button className="btn btn-primary" onClick={()=>location.reload()}>আবার চেষ্টা করুন</button></div>:<ProductGrid products={products}/>}</section>
 </>;
}
