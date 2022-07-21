import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA0WYF2Iuna-851PraNSzBju-nLxief8kY",
  authDomain: "image-uploader-e9595.firebaseapp.com",
  projectId: "image-uploader-e9595",
  storageBucket: "image-uploader-e9595.appspot.com",
  messagingSenderId: "665853050338",
  appId: "1:665853050338:web:4ed4dadbacf2024bf54dbb",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
