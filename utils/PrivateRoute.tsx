'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { firebaseAuth } from './firebase';

const PrivateRoute = ({ children }: { children: any }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getUser = async () => {
        await firebaseAuth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/');
                alert('Please Login to continue.');
            } else {
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        getUser();
    }, [router]);

    return isLoading ? <h1>Loading...</h1> : <>{children}</>;
};

export default PrivateRoute;
