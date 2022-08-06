import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    modalSearchProjectIsOpen: false
};


export const modalSearchProjectSlice = createSlice({

    name: 'modalSearchProject',

    initialState,

    reducers: {

        modalSearchProjectOpen: ( state ) => {

            state.modalSearchProjectIsOpen = true;
            
        },

        modalSearchProjectClose: ( state ) => {

            state.modalSearchProjectIsOpen = false;
            
        }
        
    }
});


export const { modalSearchProjectOpen, modalSearchProjectClose } = modalSearchProjectSlice.actions;