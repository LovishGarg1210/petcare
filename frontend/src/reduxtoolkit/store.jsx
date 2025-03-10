import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "../reduxtoolkit/Slice";
import CartSlice from "../reduxtoolkit/cartslice";
const store=configureStore({
    reducer:{
        account:AccountSlice,
        cart:CartSlice,
    },
});

export default store;