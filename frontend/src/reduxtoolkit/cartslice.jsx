import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateCart: (state, action) => {
            const { id, updatedItem } = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            if (index !== -1) {
                state.items[index] = updatedItem;
            }
        },
        deleteCart: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
    },
});

export const { setCart, clearCart, updateCart, deleteCart } = CartSlice.actions;
export default CartSlice.reducer;
