import HomeContent from "@/components/home-content";
import { getCategories } from "@/lib/utils";
export const revalidate=300;
export default async function HomePage(){let categories=[];try{categories=await getCategories()}catch{} return <HomeContent initialCategories={categories}/>}
