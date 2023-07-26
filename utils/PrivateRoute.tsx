'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { firebaseAuth } from './firebase';

const PrivateRoute = ({ children }: { children: any }) => {

    const router = useRouter();
    const isAuthenticated = true;

    useEffect(() => {

    firebaseAuth.onAuthStateChanged((user) => {
        console.log(user);
        if(user) {
            return;
        } else {
            router.push('/');
            alert('Please login to continue to the app.');
        }
    })

    },[isAuthenticated, router]);

    return <div>PrivateRoute Works!</div>;
};

export default PrivateRoute;
