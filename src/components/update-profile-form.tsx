"use client";
import { useState,FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function UpdateProfileForm({name}:{name:string}){const [value,setValue]=useState(name);const [busy,setBusy]=useState(false);const router=useRouter();async function submit(e:FormEvent){e.preventDefault();if(value.trim().length<2){toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");return}setBusy(true);const {error}=await authClient.updateUser({name:value.trim()});setBusy(false);if(error){toast.error(error.message||"আপডেট করা যায়নি");return}toast.success("প্রোফাইল আপডেট হয়েছে");router.push("/profile");router.refresh()}return <form className="profile-card update-form" onSubmit={submit}><label>নাম<input value={value} onChange={e=>setValue(e.target.value)} required minLength={2}/></label><button className="btn btn-primary" disabled={busy}>{busy?"আপডেট হচ্ছে…":"Update Information"}</button></form>}
