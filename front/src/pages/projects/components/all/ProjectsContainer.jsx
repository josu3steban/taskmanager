import { useSelector } from "react-redux"
import { ProjectsList } from "./ProjectsList"

export const ProjectsContainer = () => {

  const { projects } = useSelector( state => state.project );

  return (

    projects.map( project => (

      <ProjectsList key={ project._id } project={ project } />
      
    ))
    
  )
}
