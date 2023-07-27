// Create a shopping cart page where users can view and manage their selected items.

'use client';
import PrivateRoute from '@/utils/PrivateRoute';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    incrementByAmount,
    decrementByAmount,
    add,
    remove,
} from '../../redux/itemSlice';
import { styled } from 'styled-components';

const ProductHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-weight: bold;
`;

const CartContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const ProductImage = styled.img`
    width: 6.25em;
    object-fit: cover;
    border-radius: 0.5em;
`;

const QuantityButton = styled.button`
    margin: 0 0.3125em;
    background-color: black;
    border: none;
    color: white;
    border-radius: 0.3125em;
`;

const Total = styled.h5`
    float: right;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 0.625em;
        text-align: left;
        border-bottom: 1px solid #ccc;
    }

    tr {
        border-bottom: 1px solid #ccc;
    }

    tr:last-child {
        border-bottom: none;
    }
`;

const Cart = () => {
    const itemsList = useSelector((state: any) => state?.items?.items || []);
    const total = useSelector((state: any) => state?.items?.total);

    const item: any = {
        id: 3,
        imageUrl:
            'https://www.shutterstock.com/image-photo/bangkok-thailand-samsung-launch-new-600w-1704070018.jpg',
        name: 'Samsung A1',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: 300,
    };

    const dispatch = useDispatch();
    return (
        <PrivateRoute>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsList &&
                            itemsList.map((element: any, index: any) => (
                                <tr>
                                    <td>
                                        <ProductImage
                                            src={element?.imageUrl}
                                            alt={element?.name}
                                        />
                                    </td>
                                    <td>{element?.name}</td>
                                    <td>$ {element?.price}</td>
                                    <td>
                                        <QuantityButton
                                            onClick={() =>
                                                dispatch(
                                                    incrementByAmount({
                                                        id: element?.id,
                                                        amount: 1,
                                                    })
                                                )
                                            }
                                        >
                                            +
                                        </QuantityButton>
                                        {element?.amount}
                                        <QuantityButton
                                            onClick={() =>
                                                dispatch(
                                                    decrementByAmount({
                                                        id: element?.id,
                                                        amount: 1,
                                                    })
                                                )
                                            }
                                        >
                                            -
                                        </QuantityButton>
                                    </td>
                                    <td>$ {element?.price * element?.amount}</td>
                                </tr>
                            ))}
                        {/* Add more rows here */}
                    </tbody>
                </Table>
            </div>

            <button onClick={() => dispatch(add(item))}>Add</button>

            <button onClick={() => dispatch(remove(1))}>Remove</button>

            <Total>Total: $ {total} </Total>
        </PrivateRoute>
    );
};

export default Cart;
