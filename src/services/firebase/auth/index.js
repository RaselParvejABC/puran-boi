import app from "../app";
import { getAuth } from "firebase/auth";

const firebaseAuthInstance = getAuth(app);

export default firebaseAuthInstance;
