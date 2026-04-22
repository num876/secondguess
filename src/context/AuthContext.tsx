"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { onAuthStateChanged, User, signOut, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, db, googleProvider, githubProvider } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: any | null;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  updateSiteConfig: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userProfile: null,
  logout: async () => {},
  signInWithGoogle: async () => {},
  signInWithGithub: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
  updateSiteConfig: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Fix: use a ref for pathname so we don't re-subscribe onAuthStateChanged on every navigation
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const syncProfile = async (firebaseUser: User) => {
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const profile = userDoc.data();
        let siteData = {};
        if (profile.siteId) {
          const siteRef = doc(db, "sites", profile.siteId);
          const siteDoc = await getDoc(siteRef);
          if (siteDoc.exists()) {
            siteData = siteDoc.data();
          }
        }
        const combinedProfile = { ...profile, ...siteData };
        setUserProfile(combinedProfile);
        return combinedProfile;
      } else {
        // New user — check if a plan was stored before social auth
        const pendingPlan = typeof window !== "undefined"
          ? sessionStorage.getItem("forensiq_pending_plan")
          : null;

        const newProfile = {
          email: firebaseUser.email,
          fullName: firebaseUser.displayName || "",
          createdAt: new Date().toISOString(),
          siteId: null,
          plan: pendingPlan || "free",
        };
        await setDoc(userRef, newProfile);
        if (pendingPlan && typeof window !== "undefined") {
          sessionStorage.removeItem("forensiq_pending_plan");
        }
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (err) {
      console.error("Profile sync failed", err);
      return null;
    }
  };

  useEffect(() => {
    // Fix: stable subscription — no pathname in deps. Read pathname via ref inside.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profile = await syncProfile(firebaseUser);
        
        // Only redirect from the login page
        if (pathnameRef.current === "/login") {
          if (profile && (profile as any).siteId) {
            router.push("/dashboard");
          } else {
            router.push("/setup");
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
        const current = pathnameRef.current;
        if (
          current.startsWith("/dashboard") ||
          current === "/setup" ||
          current === "/settings"
        ) {
          router.push("/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty — pathname read via ref

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign in failed", error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      console.error("Github sign in failed", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfile = async (data: any) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, data, { merge: true });
    setUserProfile((prev: any) => ({ ...prev, ...data }));
  };

  const updateSiteConfig = async (data: any) => {
    if (!userProfile?.siteId) return;
    const siteRef = doc(db, "sites", userProfile.siteId);
    await setDoc(siteRef, data, { merge: true });
    setUserProfile((prev: any) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      userProfile, 
      logout, 
      signInWithGoogle, 
      signInWithGithub,
      resetPassword,
      updateProfile,
      updateSiteConfig
    }}>
      {children}
    </AuthContext.Provider>
  );
};
