import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    tasks: [],
    task: null,
    activeTask: null
};


export const taskSlice = createSlice({

    name: 'task',

    initialState,

    reducers: {

        task_LoadTasks: ( state, action ) => {

            state.tasks = [...action.payload]
            
        },

        task_addTask: ( state, action ) => {

            if(!state.tasks.find( task => task._id === action.payload._id)) {
                state.tasks = [ ...state.tasks, action.payload]
            }

        },

        task_SetActiveTask: ( state, action ) => {

            state.activeTask = action.payload
            
        },

        task_SetTask: ( state, action ) => {

            state.task = { ...action.payload }
            
        },

        task_ClearActiveTask: ( state, action ) => {

            state.activeTask = null;
            state.task = null
            
        },

        task_clearAllTasks: ( state ) => {

            state.tasks = [];
            
        },

        task_UpdateTask: ( state, action ) => {

            state.tasks = state.tasks.map( task => (task._id === action.payload._id) ? action.payload : task);
            
        },

        task_DeleteTask: ( state, action ) => {

            state.tasks = state.tasks.filter( task => task._id !== action.payload);
            
        }
        
    }
    
});


export const { task_LoadTasks, task_ClearActiveTask, task_DeleteTask, task_SetActiveTask, task_SetTask, task_clearAllTasks, task_UpdateTask, task_addTask } = taskSlice.actions;