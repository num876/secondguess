'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

const isConfigValid = () => {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
};

if (!isConfigValid()) {
  console.error("[v0] FIREBASE CONFIG ERROR: Environment variables are missing!", {
    apiKey: !!firebaseConfig.apiKey,
    projectId: !!firebaseConfig.projectId
  });
}

// Initialize Firebase with error handling - don't crash if config is missing
let app: any = null;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;
let githubProvider: any = null;

if (isConfigValid()) {
  try {
    const apps = getApps();
    if (apps.length > 0) {
      app = getApp();
    } else {
      app = initializeApp(firebaseConfig);
    }
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    githubProvider = new GithubAuthProvider();
  } catch (e) {
    console.error("[v0] Firebase initialization error:", e);
    // Set all to null so app can still load
    app = null;
    auth = null;
    db = null;
  }
}

export { app, auth, db, googleProvider, githubProvider, isConfigValid };
