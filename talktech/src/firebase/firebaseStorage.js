import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from 'firebase/storage';
  
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTLOkzsIX-zbQSPjJ7gALlo_grDC-NORc",
  authDomain: "chat-app-dec86.firebaseapp.com",
  projectId: "chat-app-dec86",
  storageBucket: "chat-app-dec86.appspot.com",
  messagingSenderId: "771358090947",
  appId: "1:771358090947:web:e1bfb7099e0ec80a6d6476"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Se encarga de subir file a storage y te retorna el url la imagen
export const subirFileStorage = async (file, carpeta) => {
    const archivoRef = ref(storage, `${carpeta}/${file.name}`);
    await uploadBytes(archivoRef, file);
    const traerFile = getDownloadURL(archivoRef);
    return traerFile;
  };
  