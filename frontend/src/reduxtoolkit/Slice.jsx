import {createSlice} from '@reduxjs/toolkit';
const AccountSlice= createSlice({
    name: 'account',
    initialState: {
        user: null,
    
    },
    reducers: {
        setUser:(state, action) => {
            state.user = action.payload;
            
        },
        clearUser:(State)=>{
            State.user = null;
        },
       
    },
});

export const {setUser,clearUser } = AccountSlice.actions; 
export default AccountSlice.reducer;