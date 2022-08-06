import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    searching: false
};


export const searchingSlice = createSlice({

    name: 'searching',

    initialState,

    reducers: {

        searchingStart: ( state ) => {

            state.searching = true;
            
        },

        searchingFinish: ( state ) => {

            state.searching = false;
            
        }
        
    }
});

export const { searchingStart, searchingFinish } = searchingSlice.actions;