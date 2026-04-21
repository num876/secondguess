"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userProfile: null,
  logout: async () => {},
  signInWithGoogle: async () => {},
  signInWithGithub: async () => {},
  resetPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const syncProfile = async (firebaseUser: User) => {
    const userRef = doc(db, "users", firebaseUser.uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const profile = userDoc.data();
      setUserProfile(profile);
      return profile;
    } else {
      // Create profile if it doesn't exist (e.g. first social login)
      const newProfile = {
        email: firebaseUser.email,
        createdAt: new Date().toISOString(),
        siteId: null,
      };
      await setDoc(userRef, newProfile);
      setUserProfile(newProfile);
      return newProfile;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const profile = await syncProfile(user);
        
        // Redirect logic
        if (pathname === "/login") {
          if (profile.siteId) {
            router.push("/dashboard");
          } else {
            router.push("/setup");
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
        if (pathname.startsWith("/dashboard") || pathname === "/setup") {
          router.push("/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

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

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      userProfile, 
      logout, 
      signInWithGoogle, 
      signInWithGithub,
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
