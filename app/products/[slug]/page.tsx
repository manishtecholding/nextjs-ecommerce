'use client';
import Header from '@/app/common/header';
import { database } from '@/utils/firebase';
import { DataSnapshot, DatabaseReference, ref, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const ProductImage = styled.img`
    width: 15.5em;
    object-fit: cover;
`;

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const NotFound = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: xx-large;
`;

const ProductsDetail = ({ params }: { params: { slug: string } }) => {
    console.log(params);

    const [product, setProduct] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        readDataFromDatabase(params?.slug);
    }, []);

    const readDataFromDatabase = async (slug: any) => {
        const db = database;
        setIsLoading(true);

        try {
            const productsRef: DatabaseReference = ref(
                database,
                `products/${slug}`
            );
            const snapshot: DataSnapshot = await get(productsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log('Data from the database: ', data);
                setProduct(data);
            } else {
                console.log('No data found in the database: ', product);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error in reading data from the database: ', error);
        }
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    } else {
        return product ? (
            <>
                <Header />
                <ProductWrapper>
                    <h2>{product?.name}</h2>
                    <p>{product?.description}</p>
                    <p>
                        <ProductImage
                            src={product?.imageUrl}
                            alt={product?.name}
                        />
                    </p>
                    <p>{'$ ' + product?.price}</p>
                </ProductWrapper>
            </>
        ) : (
            <NotFound>No Products found!</NotFound>
        );
    }
};

export default ProductsDetail;
