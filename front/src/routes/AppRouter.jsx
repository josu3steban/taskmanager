import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import { AuthRouter } from "../pages/auth/routes"
import { ProjectRoutes } from "../pages/projects/routes";
import { useEffect } from "react";
import { stratChecking } from "../store/slices/auth";
import 'animate.css'
import { Spinner } from "../pages/ui/Spinner";


export const AppRouter = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checking } = useSelector( state => state.auth );

  useEffect(() => {
    dispatch( stratChecking() );
  }, []);
  
  if( checking === 'checking') {
    return( <Spinner /> );
  }
  
  return (
    <Routes>
      {
        ( checking === 'not-authenticated' )
          ? <Route path='/auth/*' element={ <AuthRouter /> }/>

          : <Route path="/*" element={ <ProjectRoutes /> }/>
      }

      <Route path="/*" element={ <Navigate to='/auth/' /> } />
        
    </Routes>
  )
}
