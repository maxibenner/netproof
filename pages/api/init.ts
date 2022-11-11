import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const adminCredentials = {
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY!),
    }),
  };

  admin.initializeApp(adminCredentials);
}

export default admin;
