import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    projects      : null,
    project       : null,
    activeProject : null
}

export const projectSlice = createSlice({

    name: 'project',

    initialState,

    reducers: {

        projectsLoad: ( state, action ) => {

            state.projects = action.payload;
            
        },

        setActiveProject: ( state, action ) => {

            state.activeProject = action.payload;

        },

        clearActiveProject: ( state, action ) => {

            state.activeProject = null;
            state.project       = null;
            
        },

        clearProject: ( state, action ) => {

            state.projects = null;
            
        },

        addProject: ( state, action ) => {

            state.projects.push( action.payload );
            
        },

        getProjectById: ( state, action ) => {

            state.project = { ...action.payload }

        },

        updateProject: ( state, action ) =>{

            state.projects = state.projects.map( project => (project._id === action.payload._id) ? action.payload : project );
            state.project = { ...action.payload }
            
        },

        deleteProject: ( state, action ) => {

            state.projects = state.projects.filter( project => project._id !== action.payload._id );
            
        }
        
    }
    
});

export const { projectsLoad, setActiveProject, clearActiveProject, addProject, clearProject, getProjectById, updateProject, deleteProject } = projectSlice.actions;