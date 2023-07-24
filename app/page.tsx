'use client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import {
    DatabaseReference,
    DataSnapshot,
    getDatabase,
    ref,
    set,
    get,
} from 'firebase/database';
import { database } from '@/utils/firebase';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: ${(props) => props.theme.colors.background};
  }
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
            await set(ref(db, 'products/' + randomID), {
                name: 'T-shirt',
                price: 0.99,
            });
            console.log('Data added successfully.');
        } catch (error) {
            console.error('Error adding data to Firebase:', error);
        }
    };

    return (
        <div>
            {data &&
                Object.values(data).map((element: any, index) => (
                    <div key={index} style={{ backgroundColor: 'red' }}>
                        <p>{element?.name}</p>
                        <p>{element?.price}</p>
                    </div>
                ))}
            <button onClick={addItemToDatabase}>Add Item to Database</button>
        </div>
    );
}
