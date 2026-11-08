"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { Menu, X, LogOut, UserRound } from "lucide-react";
import type { Product, Category } from "@/lib/types";
import { money, API_BASE, normalizeProducts } from "@/lib/utils";

export default function Navbar({ categories }: {categories:Category[]}) {
  const [products,setProducts]=useState<Product[]>([]);
  useEffect(()=>{let active=true;fetch(`${API_BASE}/products`).then(r=>r.ok?r.json():[]).then(d=>{if(active)setProducts(normalizeProducts(d))}).catch(()=>{});return()=>{active=false}},[]);
  const path = usePathname(); const router = useRouter(); 
  const { data: session } = authClient.useSession();
  const [open,setOpen]=useState(false); const [profileOpen,setProfileOpen]=useState(false);
  const today = new Intl.DateTimeFormat("bn-BD",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Dhaka"}).format(new Date());
  const links = categories.length ? categories : [];
  async function logout(){ await authClient.signOut(); toast.success("সফলভাবে সাইন আউট হয়েছে"); setProfileOpen(false); router.push("/"); router.refresh(); }
  return <header className="site-header">
    <div className="container nav-top">
      <Link href="/" className="brand"><span className="brand-icon">🛒</span><span><strong>বাজার দর</strong><small>{today}</small></span></Link>
      <div className="desktop-auth">{session?.user ? <div className="profile-wrap"><button className="profile-trigger" onClick={()=>setProfileOpen(!profileOpen)}><span className="avatar">{session.user.name?.[0] || "👤"}</span><span>{session.user.name || "আমার অ্যাকাউন্ট"}</span><span>⌄</span></button>{profileOpen&&<div className="profile-menu"><Link href="/profile" onClick={()=>setProfileOpen(false)}><UserRound size={16}/> আমার প্রোফাইল</Link><button onClick={logout}><LogOut size={16}/> সাইন আউট</button></div>}</div> : <><Link className="btn btn-outline btn-sm" href="/signin">সাইন ইন</Link><Link className="btn btn-primary btn-sm" href="/signup">সাইন আপ</Link></>}</div>
      <button className="mobile-menu" aria-label="মেনু" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    <div className={`nav-links-wrap ${open?"mobile-open":""}`}><nav className="container nav-links">{links.map(c=><Link key={c.slug} className={`nav-link ${path===`/category/${c.slug}`?"active":""}`} href={`/category/${c.slug}`} onClick={()=>setOpen(false)}><span>{c.icon}</span>{c.nameBn}</Link>)}{session?.user&&<Link className={`nav-link mobile-only ${path==="/profile"?"active":""}`} href="/profile">👤 আমার প্রোফাইল</Link>}{session?.user&&<button className="nav-link mobile-only" onClick={logout}>সাইন আউট</button>}{!session?.user&&<div className="mobile-auth"><Link href="/signin" className="btn btn-outline">সাইন ইন</Link><Link href="/signup" className="btn btn-primary">সাইন আপ</Link></div>}</nav></div>
    <div className="ticker"><div className="ticker-track">{[...products,...products].map((p,i)=><Link href={`/product/${p.slug}`} key={`${p.id}-${i}`} className="ticker-item"><span>{p.image||p.categoryIcon||"🛍️"} {p.nameBn}</span><b>{money(p.today)}/{p.unit==="kg"?"কেজি":p.unit==="liter"?"লিটার":p.unit==="dozen"?"ডজন":p.unit==="piece"?"পিস":p.unit||"একক"}</b><em className={p.change?.dir||"flat"}>{p.change?.dir==="up"?"▲":p.change?.dir==="down"?"▼":"—"} {p.change?.pct?.toLocaleString("bn-BD")||"০"}%</em></Link>)}</div></div>
  </header>;
}
