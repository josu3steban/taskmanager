import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { collaboratorSlice } from "./slices/collaborator";
import { projectSlice } from "./slices/project";
import { taskSlice } from "./slices/task/taskSlice";
import { modalSearchProjectSlice, modalTaskSlice, searchingSlice } from "./slices/ui";



export const store = configureStore({
    reducer: {
        auth      : authSlice.reducer,
        project   : projectSlice.reducer,
        modalTask : modalTaskSlice.reducer,
        searching : searchingSlice.reducer,
        task      : taskSlice.reducer,
        collaborator: collaboratorSlice.reducer,
        modalSearchProject: modalSearchProjectSlice.reducer
    }
});