import { notFound } from "next/navigation";
import { getCategories,getProducts } from "@/lib/utils";
import CategoryClient from "./category-client";
export const revalidate=300;
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const [categories,products]=await Promise.all([getCategories(),getProducts()]);const category=categories.find((c:any)=>c.slug===slug||c.id===slug);if(!category)notFound();return <CategoryClient category={category} products={products.filter(p=>p.category===slug)}/>}
