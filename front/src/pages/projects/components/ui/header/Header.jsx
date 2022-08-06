import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { startLogout } from '../../../../../store/slices/auth/'

import './header.css';
import { clearActiveProject, collab_clearAllollaborator, collab_clearollaborator, task_ClearActiveTask, task_clearAllTasks } from '../../../../../store';
import { ModalSearchProject } from '../../../../ui/modal/ModalSearchProject';
import { modalSearchProjectOpen } from '../../../../../store/slices/ui';
import IconMenu from '../../../../../assets/icon/menu.png'
import { useEffect, useState } from 'react';

export const Header = () => {

  const [ menu, setMenu ] = useState( true );
  const [ animar, setAnimar ] = useState( true );
  const [ widthScreen, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    } );

    
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector( state => state.auth );
  
  const handleLogout = () => {

    dispatch( startLogout() );
    dispatch( clearActiveProject() );
    dispatch( task_ClearActiveTask() );
    dispatch( task_clearAllTasks() );
    dispatch( collab_clearollaborator() );
    dispatch( collab_clearAllollaborator() );

  };

  const hanldeNewProject = () => {
    setMenu(true);
    setAnimar(true);

    dispatch( clearActiveProject() );
    navigate('/new-project');

  };


  const handleOpenModalSearch = () => {
    setMenu(true);
    setAnimar(true);

    dispatch( modalSearchProjectOpen() );

  };

  const handleHomePage = () => {

    setMenu(true);
    setAnimar(true);
    dispatch( clearActiveProject() );
    dispatch( task_ClearActiveTask() );
    dispatch( task_clearAllTasks() );
    dispatch( collab_clearollaborator() );
    dispatch( collab_clearAllollaborator() );
    navigate('/');
    
  };

  const handleHomeMenu = () => {
    if(widthScreen <= 640 ) {
      handleMenu();
    } else {

      setMenu(true);
      setAnimar(true);
      dispatch( clearActiveProject() );
      dispatch( task_ClearActiveTask() );
      dispatch( task_clearAllTasks() );
      dispatch( collab_clearollaborator() );
      dispatch( collab_clearAllollaborator() );
      navigate('/');
      
    }
  }


  const handleMenu = () => {
    if( menu ){
      setMenu( !menu );

      setTimeout(() => {
        setAnimar( !animar );
      }, 200);
    } else {
    //   setTimeout(() => {
        setMenu( !menu );
    //   }, 200);
      setAnimar( !animar );
    }
  }
  
  return (
    <header className="sm:items-start sm:justify-between sm:align-middle  sm:p-0 sm:h-fit flex items-center justify-end px-5 py-5">

      <div
        className="
          sm:relative
        
          flex
          sm:flex-col
          sm:items-start
          items-center
          grow
          justify-between
      ">

        <div className="sm:flex-col grow flex justify-between">

          <div className={`
              hidden
              sm:block
              sm:bg-my-color-five
              ${menu ? 'sm:w-0':'sm:w-full'}
              sm:absolute
              sm:h-16
              transition-all
              duration-500
            `}>
          </div>

          <h2 onClick={handleHomeMenu} className={`${menu ? 'text-my-color-five' : 'text-my-color-one'} sm:pl-2 sm:pt-[13px] sm:relative sm:left-6 sm:-top-1 sm:text-xl font-black text-3xl cursor-default`}>TaskManager</h2>

          <div className="sm:pt-3 sm:pl-1 hidden sm:absolute sm:flex sm:justify-start sm:items-center">
            <div className="">
              <button
                  id='icon-menu'
                  onClick={ handleMenu }
                  className="
                  border
                  bg-my-bg-second
                  fill-current
                  w-6
                  p-1
                  rounded
                  flex
              ">
                  <img className=" w-full" src={ IconMenu } alt="icono de boton" />
              </button>
            </div>
          </div>


          <ModalSearchProject />

        
          <div
            className={`
              sm:overflow-hidden
              ${menu ? ' sm:w-0' : ' sm:w-full'}

              transition-all
              duration-500
              sm:z-10
              sm:h-screen

              sm:absolute
              sm:top-16
              sm:bg-my-color-five

            
              sm:flex-col
              flex
          `}>

            <button
              className='hidden sm:flex items-center gap-2 mr-5 p-2 rounded-md hover:shadow-my-color-five/10 hover:shadow-xl transition-shadow'
              onClick={ handleHomePage }
            >
              <i className={`sm:text-my-color-one fa-solid fa-house sm:text-xl text-2xl hover:font-black`}></i>
              <h2 className={`grow self-center sm:text-my-color-one  sm:text-base text-2xl font-black uppercase transition-colors`}>Inicio</h2>
            </button>

            <hr className='sm:my-2'/>
            
            <button
              className=' flex items-center gap-2 mr-5 p-2 rounded-md hover:shadow-my-color-five/10 hover:shadow-xl transition-shadow'
              onClick={ handleOpenModalSearch }
            >
              <i className={`sm:text-my-color-one fa-solid fa-magnifying-glass sm:text-xl text-2xl hover:font-black`}></i>
              <h2 className={`sm:text-my-color-one sm:text-base text-2xl font-black uppercase transition-colors`}>Buscar Proyecto</h2>
            </button>

            <hr className='sm:my-2'/>

            <button
              className='flex items-center gap-2 mr-5 p-2 rounded-md hover:shadow-my-color-five/10 hover:shadow-xl transition-shadow'
              onClick={ hanldeNewProject }
            >
              <i className="fa-regular fa-square-plus sm:text-2xl sm:top-0 text-4xl text-my-color-two relative top-[2px] hover:font-black"></i>
              <h2 className='sm:text-base text-2xl font-black uppercase text-my-color-two'>Nuevo Proyecto</h2>
            </button>
          </div>

        </div>

      </div>

      <div
      className="
        sm:flex-col
        sm:pt-2
        flex
        items-center
        justify-center
      ">
        
        <div className="dropdown sm:text-end sm:mr-2 sm:mt-1">

          <span className='sm:text-lg mr-1 text-my-color-five font-medium text-xl border-b-my-color-two border-r-my-color-two'>Hola, { username }</span>
          <span className='border-r-4 rounded-xl border-r-my-color-two animate-pulse'></span>
          
          <div className="dropdown__content text-my-color-five bg-my-color-one sm:-mr-8">

            <Link
              className=' text-xl font-medium block my-3 border-b-2 border-my-color-one hover:border-b-2 hover:border-b-my-color-five transition-colors'
              to='/'
            >
              Mis Proyectos
            </Link>
            
            
            <button
              className='bg-my-color-five w-full rounded-md text-my-color-one py-1 font-medium tracking-wider hover:bg-my-color-three transition-colors mt-2'
              onClick={ handleLogout }
            >Salir</button>

          </div>
        </div>
      </div>

    </header>
  )
}
