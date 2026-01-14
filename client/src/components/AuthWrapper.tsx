'use client'

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/services/user.api";
import { login } from "@/contextapi/authSlice";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname(); // Get current URL path
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    // List of paths that do NOT require login
    const publicRoutes = ["/login", "/register"];

    useEffect(() => {
        // 1. If we are already on a public page, stop loading and do nothing
        if (publicRoutes.includes(pathname)) {
            setIsLoading(false);
            return;
        }

        const checkAuth = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    dispatch(login(user?.data.data));
                    setIsLoading(false); // Success: Stop loading, show app
                } else {
                    throw new Error("No user found");
                }
            } catch (error) {
                console.log("Auth failed, redirecting...", error);
                router.push("/login"); // Redirect to login
                // Note: We keep isLoading = true here so the protected content never flashes
            }
        };

        checkAuth();
    }, [dispatch, router, pathname]);

    // 2. Show a white screen or spinner while checking
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
               <p className="text-lg animate-pulse">Checking authentication...</p>
            </div>
        );
    }

    // 3. Render the actual page only if authorized or public
    return <>{children}</>;
}   