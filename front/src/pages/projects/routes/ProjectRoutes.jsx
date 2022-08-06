import { Route, Routes, Navigate } from "react-router-dom";
import { ProjectHomePage } from "../";
import { Projects, NewProject, ProjectById, NewCollaborator } from "../components/";
import { EditProject } from "../components/edit/EditProject";


export const ProjectRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ProjectHomePage /> }>
          <Route index element={ <Projects /> } />
          <Route path="new-project" element={ <NewProject /> } />
          <Route path="project/edit/:id" element={ <EditProject /> } />
          <Route path="project/new-collaborator/:id" element={ <NewCollaborator /> } />

          <Route path="project/:id" element={ <ProjectById /> } />
        </Route>

        <Route path="/*" element={ <Navigate to='/' /> }/>
    </Routes>
  )
}
