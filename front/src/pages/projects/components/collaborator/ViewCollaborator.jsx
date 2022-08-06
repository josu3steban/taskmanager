import { useDispatch, useSelector } from "react-redux"
import { collab_startAddCollaborator } from "../../../../store";


export const ViewCollaborator = () => {

  const dispatch = useDispatch();
  
  const { collaborator } = useSelector( state => state.collaborator );
  const { project } = useSelector( state => state.project );

  const handleAddCollaborator = ( id, username ) => {

    dispatch( collab_startAddCollaborator(id,username) );
    
  }
    
  return (

    <section className="flex justify-between items-center my-3">
        <p className="grow sm:text-xl text-my-color-five font-black text-2xl">Nombre: <span className="sm:inline-block sm:font-normal sm:text-lg font-medium">{collaborator.name}</span></p>

        <button
            className="sm:text-lg sm:px-0 sm:w-fit font-black text-2xl text-my-color-two px-4 border-b-2 border-my-color-one hover:border-my-color-two transition-colors"
            type="submit"
            onClick={() => handleAddCollaborator(project._id, collaborator.username)}
        >
            Agregar al Proyecto
            
        </button>
    </section>
    
  )
}
