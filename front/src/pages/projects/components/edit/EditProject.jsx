import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startDeleteProjet, startGetProjectById } from '../../../../store/slices/project';
import { Spinner } from '../../../ui/Spinner';
import { FormProject } from '../form/FormProject';

export const EditProject = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const { project } = useSelector( state => state.project );
  const { id } = params;

  useEffect(() => {

    if( !project || project?._id !== id ) {

      dispatch( startGetProjectById( id ) );
      
    }
    
  }, []);


  const handleDelete = () => {

    Swal.fire({
      title: '¿Seguro desea eliminar este proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        dispatch( startDeleteProjet(id) );

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    })
    
  };
  

  if( !project ) {

    return <Spinner />
    
  }
  
  return (
    <section>

      <div className="sm:mb-5 flex justify-between items-center">

        <h2 className="sm:text-3xl sm:mb-0 font-black text-4xl text-my-color-five uppercase mb-5">Editar Proyecto</h2>

        <button
          className="sm:text-sm sm:font-normal font-black text-xl text-red-800 hover:text-my-color-three transition-colors"
          onClick={ handleDelete }
        >
          <i className="fa-solid fa-trash-can mr-1"></i>
          <span className=''>Eliminar</span>
        </button>

      </div>

      <FormProject />

    </section>
  )
}
