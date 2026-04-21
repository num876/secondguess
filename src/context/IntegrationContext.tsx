"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

interface Integration {
  id: string;
  status: 'connected' | 'pending' | 'error';
  connectedAt: any;
  provider: string;
}

interface IntegrationContextType {
  integrations: Record<string, Integration>;
  loading: boolean;
  disconnectIntegration: (provider: string) => Promise<void>;
  isLive: (provider: string) => boolean;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

export function IntegrationProvider({ children }: { children: React.ReactNode }) {
  const { userProfile } = useAuth();
  const [integrations, setIntegrations] = useState<Record<string, Integration>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?.siteId) {
      setIntegrations({});
      setLoading(false);
      return;
    }

    const integrationsRef = collection(db, "sites", userProfile.siteId, "integrations");
    
    // Real-time synchronization
    const unsubscribe = onSnapshot(integrationsRef, (snapshot) => {
      const newIntegrations: Record<string, Integration> = {};
      snapshot.forEach((doc) => {
        newIntegrations[doc.id] = { id: doc.id, ...doc.data() } as Integration;
      });
      setIntegrations(newIntegrations);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userProfile?.siteId]);

  const disconnectIntegration = async (provider: string) => {
    if (!userProfile?.siteId) return;
    try {
      await deleteDoc(doc(db, "sites", userProfile.siteId, "integrations", provider));
    } catch (err) {
      console.error("Disconnect Error:", err);
    }
  };

  const isLive = (provider: string) => {
    return integrations[provider]?.status === 'connected';
  };

  return (
    <IntegrationContext.Provider value={{ integrations, loading, disconnectIntegration, isLive }}>
      {children}
    </IntegrationContext.Provider>
  );
}

export function useIntegrations() {
  const context = useContext(IntegrationContext);
  if (context === undefined) {
    throw new Error("useIntegrations must be used within an IntegrationProvider");
  }
  return context;
}
