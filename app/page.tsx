'use client';
import { firebase } from '@/utils/firebase';
import 'firebase/compat/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

const firebaseConfig = {
    apiKey: 'AIzaSyDxMICaK4h2RoMAq_h-OtJwr8lZtO_ERg4',
    authDomain: 'e-commerce-c1ebf.firebaseapp.com',
    databaseURL:
        'https://e-commerce-c1ebf-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'e-commerce-c1ebf',
    storageBucket: 'e-commerce-c1ebf.appspot.com',
    messagingSenderId: '573150665589',
    appId: '1:573150665589:web:d3be5b0e56877f1386913c',
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
        },
    ],
    signInSuccessUrl: '/products',
};

export default function Home() {
    return (
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            ></StyledFirebaseAuth>
    );
}
