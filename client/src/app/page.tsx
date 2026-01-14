'use client'
import HomePage from "@/components/HomePage";
import { useEffect } from "react";
import {useRouter} from "next/navigation"
import {useDispatch} from "react-redux"
import { getCurrentUser } from "@/services/user.api";
import {login} from "../contextapi/authSlice"
export default function Home() {

  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <HomePage/>
        
    </div>
    
  );
}
