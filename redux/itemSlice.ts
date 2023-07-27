import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ItemsState {
    items: any;
    total: number;
}

const initialState: ItemsState = {
    items: [],
    total: 0,
};

function calculateTotal(items: any) {
    return items.reduce((total: any, item: any) => {
        const price = parseFloat(item.price);
        const amount = parseFloat(item.amount);

        if (isNaN(price) || isNaN(amount)) {
            // If either price or amount is not a valid number, return the current total without modification
            return total;
        }

        return total + price * amount;
    }, 0);
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<any>) => {
            const newItem = { ...action.payload, amount: 1 };
            const existingItem = state.items.find(
                (item: any) => item.id === newItem.id
            );

            if (!existingItem) {
                state.items.push(newItem);
                state.total = calculateTotal(state.items); // Recalculate the total after adding the item
            } else {
                // If the item already exists, increase its amount instead of adding it as a new item
                existingItem.amount += 1;
            }
        },
        remove: (state, action: PayloadAction<any>) => {
            const itemIdToRemove = action.payload;
            state.items = state.items.filter(
                (item: any) => item.id !== itemIdToRemove
            );

            state.total = calculateTotal(state.items); // Recalculate the total after removing the item
        },
        incrementByAmount: (
            state,
            action: PayloadAction<{ id: string; amount: number }>
        ) => {
            const { id, amount } = action.payload;
            const existingItem = state.items.find(
                (item: any) => item.id === id
            );

            if (existingItem) {
                // Increase the amount of the existing item
                existingItem.amount += amount;

                // Update the price of the item based on the new amount
                const price = parseFloat(existingItem.price);
                if (!isNaN(price)) {
                    existingItem.totalPrice = price * existingItem.amount;
                }

                // Recalculate the total after updating the item
                state.total = calculateTotal(state.items);
            }
        },
        decrementByAmount: (
            state,
            action: PayloadAction<{ id: string; amount: number }>
        ) => {
            const { id, amount } = action.payload;
            const existingItem = state.items.find(
                (item: any) => item.id === id
            );

            if (existingItem) {
                // Decrease the amount of the existing item
                existingItem.amount -= amount;

                // Update the price of the item based on the new amount
                const price = parseFloat(existingItem.price);
                if (!isNaN(price)) {
                    existingItem.totalPrice = price * existingItem.amount;
                }

                // Remove the item from the cart if the quantity becomes 0
                if (existingItem.amount <= 0) {
                    state.items = state.items.filter(
                        (item: any) => item.id !== id
                    );
                }

                // Recalculate the total after updating the item
                state.total = calculateTotal(state.items);
            }
        },
    },
});

export const { add, remove, incrementByAmount, decrementByAmount } =
    itemsSlice.actions;
// export default counterSlice.reducer;
export default itemsSlice.reducer;
