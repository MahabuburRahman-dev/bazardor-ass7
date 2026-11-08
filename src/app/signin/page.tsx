import AuthForm from "@/components/auth-form";
export default async function SignInPage({searchParams}:{searchParams:Promise<{callbackURL?:string;reason?:string}>}){const params=await searchParams;return <AuthForm mode="signin" callbackURL={params.callbackURL||"/"} showRedirectNotice={params.reason==="auth-required"}/>;}
