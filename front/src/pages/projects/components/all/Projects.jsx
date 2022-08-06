import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';

import { Spinner } from '../../../ui/Spinner'
import { clearActiveProject, startProjectLoad } from '../../../../store/slices/project';
import { ProjectsContainer } from "./ProjectsContainer"

export const Projects = () => {


  const dispatch = useDispatch();
  const { projects } = useSelector( state => state.project );

  
  useEffect(() => {

    dispatch( startProjectLoad() );
    dispatch( clearActiveProject() );
    
  }, []);
  
  return (
    <div className="">
      <h2 className="sm:text-2xl font-black text-4xl text-my-color-two uppercase mb-2 animate__animated animate__fadeIn animate__faster">Mis Proyectos</h2>
      
      {
        ( !!projects )
          ?
          (
            <main className="sm:p-2 p-4 animate__animated animate__fadeIn animate__faster">
              <ProjectsContainer />
            </main>
          )
          :
          (
            <Spinner />
          )
      }
      
      
      
    </div>
  )
}
