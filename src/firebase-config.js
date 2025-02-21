import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace the below config with your Firebase project's configuration.
const firebaseConfig = {
  apiKey: "AIzaSyDOYChIaUfoy3QpC8u3a1ypgzrJtWR8Syk",
  authDomain: "mployer-69a28.firebaseapp.com",
  projectId: "mployer-69a28",
  storageBucket: "mployer-69a28.firebasestorage.app",
  messagingSenderId: "1062833080226",
  appId: "1:1062833080226:web:b539b546441e4f80de14fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
