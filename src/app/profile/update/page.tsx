import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/update-profile-form";
export default async function UpdateProfilePage(){const session=await auth.api.getSession({headers:await headers()});if(!session)redirect("/signin?callbackURL=/profile/update&reason=auth-required");return <div className="container page-shell profile-page"><span className="eyebrow">ACCOUNT SETTINGS</span><h1>তথ্য আপডেট করুন</h1><p className="section-sub">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p><UpdateProfileForm name={session.user.name||""}/></div>}
