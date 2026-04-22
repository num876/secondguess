import * as admin from "firebase-admin";

const initializeAdmin = () => {
  if (admin.apps.length > 0) return admin.apps[0];

  try {
    const rawJson = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;
    if (!rawJson) throw new Error("FIREBASE_ADMIN_SERVICE_ACCOUNT is not defined");

    let serviceAccount = JSON.parse(rawJson);

    // Fix for private key PEM formatting issues
    if (serviceAccount.private_key) {
      // Handle both literal newlines and escaped newlines
      serviceAccount.private_key = serviceAccount.private_key
        .replace(/\\n/g, '\n')
        .replace(/\n\n/g, '\n'); // Prevent double newlines
      
      if (!serviceAccount.private_key.includes("BEGIN PRIVATE KEY")) {
        console.error("[FIREBASE-ADMIN-DEBUG] Private key is missing BEGIN header");
      }
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error("[FIREBASE-ADMIN-DEBUG] Initialization error:", error.message || error);
    if (error.stack) console.error(error.stack);
    return null;
  }
};

const app = initializeAdmin();

export const adminDb = app ? admin.firestore() : null;
export const adminAuth = app ? admin.auth() : null;
export { admin };
