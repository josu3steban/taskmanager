import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearActiveProject, clearProject } from "../../../../store/slices/project";
import { Spinner } from "../../../ui/Spinner";
import { FormProject } from "../form/FormProject"

export const NewProject = () => {

  const dispatch = useDispatch();
  const { project } = useSelector( state => state.project );
  
  useEffect(() => {
    
    dispatch( clearActiveProject() );

  }, []);
  
  if( !!project ) {
    
    return <Spinner /> 

  }
  
  return (
    <div className="animate__animated animate__fadeIn animate__faster">

      <h2 className="sm:text-2xl font-black text-4xl text-my-color-five uppercase mb-5">Crear un Proyecto</h2>
      
      {/* <div className=""> */}
        <FormProject />
      {/* </div> */}
      
    </div>
  )
}
