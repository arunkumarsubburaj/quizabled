import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxIHSdsM2w7zZvZhUSUv1Pz4iR5Sf_trY",
  authDomain: "quizabled-c1aad.firebaseapp.com",
  projectId: "quizabled-c1aad",
  storageBucket: "quizabled-c1aad.appspot.com",
  messagingSenderId: "444076859282",
  appId: "1:444076859282:web:b87ee0b3caaf0e7bdfeb4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
