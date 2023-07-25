'use client';
import { useEffect, useState } from 'react';
import { DatabaseReference, DataSnapshot, ref, get } from 'firebase/database';
import { database } from '@/utils/firebase';
import styled from 'styled-components';

// Card component
const Card = styled.div`
    width: 18.75em;
    height: 25em;
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

export default function Home() {
    console.log('I am inside myapp');
    const [data, setData] = useState<any>();

    useEffect(() => {
        readDataFromDatabase();
    }, []);

    const readDataFromDatabase = async () => {
        const db = database;

        try {
            const productsRef: DatabaseReference = ref(database, 'products');
            const snapshot: DataSnapshot = await get(productsRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log('Data from the database: ', data);
                setData(data);
            } else {
                console.log('No data found in the database: ', data);
            }
        } catch (error) {
            console.error('Error in reading data from the database: ', error);
        }
    };

    const addItemToDatabase = async () => {
        console.log('addItemToDatabase');
        const db = database;
        const randomID = crypto.randomUUID();

        try {
            // await set(ref(db, 'products/' + randomID), {
            //   name: 'Smartphone',
            //   price: 699.99,
            //   description: 'The latest flagship smartphone with a powerful camera and long battery life',
            //   imageUrl: 'https://m.media-amazon.com/images/I/61L1ItFgFHL.jpg'
            // });
            console.log('Data added successfully.');
        } catch (error) {
            console.error('Error adding data to Firebase:', error);
        }
    };

    return (
        <CardListContainer>
            {data &&
                Object.values(data).map((product: any, index) => (
                    <Card key={index}>
                        <CardImage src={product.imageUrl} alt={product.name} />
                        <CardName>{product.name}</CardName>
                        <CardPrice>{'$ ' + product.price}</CardPrice>
                        <CardDescription>{product?.description?.length > 125 ? product.description.slice(0,125) + '...' : product?.description}</CardDescription>
                    </Card>
                ))}
        </CardListContainer>
    );
}
