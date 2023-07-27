'use client';
import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DatabaseReference, DataSnapshot, ref, get } from 'firebase/database';
import { database } from '@/utils/firebase';
import PrivateRoute from '@/utils/PrivateRoute';
import Header from '../common/header';

// Card component
const Card = styled.div`
    width: 18.75em;
    height: 30em;
    border: 1px solid #ddd;
    border-radius: 0.5em;
    padding: 1em;
    margin: 1em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

const CardImage = styled.img`
    width: 100%;
    height: 12.5em;
    object-fit: contain;
    border-radius: 0.5em;
    margin-bottom: 1em;
`;

const CardName = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5em;
`;

const CardPrice = styled.p`
    font-size: 1rem;
    color: #888;
    margin-bottom: 0.5em;
`;

const CardDescription = styled.p`
    font-size: 1rem;
    color: #555;
    flex: 1;
`;

// Card list container
const CardListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductLink = styled.a`
    color: #000000;
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;

const AddToCartButton = styled.button`
    background-color: #1616fa;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 8px;
`;

const Products = () => {
    const [data, setData] = useState<any>();

    useEffect(() => {
        // Read all Products from database
        readDataFromDatabase();
    }, []);

    const readDataFromDatabase = async () => {
        const db = database;

        try {
            const productsRef: DatabaseReference = ref(database, 'products');
            const snapshot: DataSnapshot = await get(productsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                setData(data);
            } else {
                console.error('No data found in the database: ', data);
            }
        } catch (error) {
            console.error('Error in reading data from the database: ', error);
        }
    };

    const addItemToDatabase = async () => {
        const db = database;
        const randomID = crypto.randomUUID();

        try {
            // await set(ref(db, 'products/' + randomID), {
            //   name: 'Smartphone',
            //   price: 699.99,
            //   description: 'The latest flagship smartphone with a powerful camera and long battery life',
            //   imageUrl: 'https://m.media-amazon.com/images/I/61L1ItFgFHL.jpg'
            // });
        } catch (error) {
            console.error('Error adding data to Firebase:', error);
        }
    };
    return (
        <>
            <Header />
            <CardListContainer>
                {data &&
                    Object.entries(data).map((product: any, key) => (
                        // product[0] -> id of the product
                        // product[1] -> All the other details of the product i.e. product[1]?.description
                        <ProductLink
                            href={`/products/${product[0]}`}
                            key={product[0]}
                        >
                            <Card>
                                <CardImage
                                    src={product[1].imageUrl}
                                    alt={product[1].name}
                                />
                                <CardName>{product[1].name}</CardName>
                                <CardPrice>{'$ ' + product[1].price}</CardPrice>
                                <CardDescription>
                                    {product[1]?.description?.length > 125
                                        ? product[1].description.slice(0, 125) +
                                          '...'
                                        : product[1]?.description}
                                </CardDescription>
                                <AddToCartButton>Add To Cart</AddToCartButton>
                            </Card>
                        </ProductLink>
                    ))}
            </CardListContainer>
        </>
    );
};

export default Products;
