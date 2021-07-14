import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { setAllTransactions } from './transactions';

const initialState: boolean = false;

export const isAuth = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        setIsAuth: (
            state: boolean,
            action: { payload: boolean; type: string }
        ) => {
            state = action.payload;
            return state;
        },

        // fetchAuth: (state) => {
        //     axios
        //         .get('/isAuth')
        //         .then((res) => {
        //             setIsAuth(res.data.isAuth);
        //             if (state) {
        //                 axios
        //                     .get(`/getdata/${res.data.userId}`)
        //                     .then((res) => {
        //                         setAllTransactions(res.data);
        //                     })
        //                     .catch((err) => {
        //                         console.log(err);
        //                     });
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // },
    },
});

export const { setIsAuth } = isAuth.actions;
export default isAuth.reducer;
