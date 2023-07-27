// Create a shopping cart page where users can view and manage their selected items.

'use client';
import { RootState } from '@/redux/store';
import PrivateRoute from '@/utils/PrivateRoute';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    remove,
    add,
    incrementByAmount,
    decrementByAmount,
} from '../../redux/itemSlice';

const Cart = () => {
    const itemsList = useSelector((state: any) => state?.items?.items || []);
    const total = useSelector((state: any) => state?.items?.total);

    const item: any = {
        id: 3,
        image: 'https://www.shutterstock.com/image-photo/bangkok-thailand-samsung-launch-new-600w-1704070018.jpg',
        name: 'iPhone 13',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: 75,
    };

    const dispatch = useDispatch();
    return (
        <PrivateRoute>
            <div>
                {itemsList &&
                    itemsList?.map((element: any, index: any) => (
                        <>
                          <div>{element?.name} = {element?.price} * {element?.amount} = {element?.price * element?.amount}</div>
                          <button onClick={() => dispatch(incrementByAmount({id: element?.id, amount: 1})
                          )}>+</button>
                          <button onClick={() => dispatch(decrementByAmount({id: element?.id, amount: 1})
                          )}>-</button>
                        </>
                    ))}
            </div>

            <button onClick={() => dispatch(add(item))}>Add</button>

            <button onClick={() => dispatch(remove(1))}>Remove</button>

            <div>Total: {total} </div>
        </PrivateRoute>
    );
};

export default Cart;
