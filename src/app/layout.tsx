import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getCategories } from "@/lib/utils";
export const metadata:Metadata={title:"বাজার দর — আজকের বাজারের মূল্য এক নজরে",description:"বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর, দাম বাড়া-কমা এবং বাজারভিত্তিক মূল্য।"};
export default async function RootLayout({children}:{children:React.ReactNode}){
 let categories=[]; try{categories=await getCategories()}catch{}
 return <html lang="bn"><body><Providers><Navbar categories={categories}/><main>{children}</main><Footer/></Providers></body></html>;
}
