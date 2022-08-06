import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    modalTaskIsOpen: false
};


export const modalTaskSlice = createSlice({

    name: 'modalTask',

    initialState,

    reducers: {

        modalTaskOpen: ( state ) => {

            state.modalTaskIsOpen = true;
            
        },

        modalTaskClose: ( state ) => {

            state.modalTaskIsOpen = false;
            
        }
        
    }
});


export const { modalTaskOpen, modalTaskClose } = modalTaskSlice.actions;