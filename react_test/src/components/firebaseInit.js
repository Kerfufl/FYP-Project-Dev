import { initializeApp } from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyCMvkAk_mQ4P8Jl8KepDd2_EtECvIKpahQ",
    authDomain: "final-year-project-stora-c4785.firebaseapp.com",
    projectId: "final-year-project-stora-c4785",
    storageBucket: "final-year-project-stora-c4785.appspot.com",
    messagingSenderId: "51713848155",
    appId: "1:51713848155:web:60a0ad4630078a8ac0a07e",
    measurementId: "G-TWV6ENFGDS"
  
  };

// Initialize Firebase

const initStor = initializeApp(firebaseConfig);

//const stor = getStorage(initStor)
//const storRef = ref(stor)
export default initStor;