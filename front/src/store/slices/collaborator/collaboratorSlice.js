import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    collaborators: [],
    collaborator: null,
    activeCollaborator: null
};


export const collaboratorSlice = createSlice({

    name: 'collaborator',

    initialState,

    reducers: {

        collab_loadCollaborator: ( state, action ) => {

            state.collaborators = [...action.payload];
            
        },

        collab_setCollaborator: ( state, action ) => {

            state.collaborator = action.payload;
            state.activeCollaborator = action.payload._id;
            
        },

        collab_clearollaborator: ( state ) => {

            state.collaborator = null;
            state.activeCollaborator = null;
            
        },

        collab_clearAllollaborator: ( state ) => {

            state.collaborators = [];
            
        },

        collab_delteCollaborator: ( state, action ) => {

            state.collaborators = state.collaborators.filter( collaborator => collaborator._id !== action.payload.uid);
            
        }
        
    }
});


export const { collab_loadCollaborator, collab_setCollaborator, collab_clearollaborator, collab_delteCollaborator, collab_clearAllollaborator } = collaboratorSlice.actions;