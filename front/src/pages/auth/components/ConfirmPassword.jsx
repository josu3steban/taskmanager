import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { startConfirmAccount } from '../../../store/slices/auth/authThunk';

export const ConfirmPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;
  
  useEffect(() =>{

    dispatch( startConfirmAccount(token) );
    
    setTimeout(() => {
      navigate('/auth/');
    }, 4000);
    
  }, []);
  
  return (
    <div className="sm:mt-0 -mt-20 animate__animated animate__fadeIn animate__faster">

      <header className='text-my-color-one mb-10 mt-10'>
        <h2 className='sm:text-3xl text-center uppercase text-5xl text-my-color-one font-black leading-tight mb-3'>¡Ya está!🥳</h2>
        <p className='sm:text-lg text-3xl font-normal'><span className="text-my-color-three">Tu cuenta ha sido confirmada.</span> Ahora empieza a administrar tus proyectos, tareas y colaboradores.🤑🤑🤑</p>
      </header>
      
      {/* <section className="bg-my-color-two px-10 py-16 rounded-md text-center">
        <input
          className="px-10 py-4 bg-my-color-three text-2xl text-my-color-one font-black tracking-wide rounded-xl cursor-pointer animate-bounce"
          type="button"
          value="CONFIRMA CUENTA"
          onClick={ handleConfirmAccount }
        />
      </section> */}
      
    </div>
  )
}
