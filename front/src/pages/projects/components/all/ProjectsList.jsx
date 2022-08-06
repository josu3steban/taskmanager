import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../helpers/formatDate";
import { setActiveProject } from "../../../../store/slices/project";

export const ProjectsList = ({ project }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { uid } = useSelector( state => state.auth );
  
  // const dateFormat = formatDate(project.delivery);
  
  const handleSelectActiveProject = ( idProject ) => {

    dispatch( setActiveProject(idProject) );
    navigate( `/project/${idProject}` );
    
  }
  
  return (
    
    <section
      onClick={ () => handleSelectActiveProject( project._id ) }
      className="
        sm:mb-8
        animate__animated animate__bounceIn
        flex
        flex-col
        p-2
        mb-10
        border-l-4 
        border-my-color-two
        hover:shadow-[6px_6px_14px_#c9cecf,-6px_-6px_14px_#ffffff]
        hover:rounded-xl
        hover:border-my-color-five
        cursor-pointer
        transition-all
        duration-300"
    >

      <div className="flex flex-col">
        <h3 className="sm:text-lg sm:mb-2 text-2xl font-bold text-my-color-five mb-3 tracking-wide">{ project.name }</h3>

        <p className="sm:text-sm sm:font-normal text-lg text-my-color-five font-medium">{ project.description }</p>


        <span className="sm:font-light sm:text-xs sm:self-auto sm:mt-4 self-end text-my-color-three font-medium">Fehca de entrega: <span className="text-my-color-five">{ formatDate(project.delivery) }</span> </span>

      </div>

      {
        (uid !== project.creator._id)
        &&(

          <h3 className="sm:text-xs sm:mt-4 w-fit text-xl text-my-color-one  bg-my-color-two px-2 py-1 rounded-2xl">Colaborador</h3>
          
        )
      }

      
      
    </section>
    
  )
}
