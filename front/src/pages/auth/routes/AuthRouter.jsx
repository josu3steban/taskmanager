import { Routes, Route, Navigate } from "react-router-dom";
import { AuthHomePage } from "../AuthHomePage";
import { Login, Register, ConfirmPassword, ForgotPassword, NewPassword } from "../components";

export const AuthRouter = () => {
  return (

    <Routes>
      {/* ruta de paágina general */}
      <Route path="/" element={ <AuthHomePage /> }>
        {/* ruta para el inicio de sesión */}
        <Route index element={ <Login />}/>
        {/* ruta para registrase con los datos */}
        <Route path="register" element={ <Register />}/>
        {/* ruta con el token para confirmar la cuenta */}
        <Route path="confirm-account/:token" element={ <ConfirmPassword />}/>
        {/* ruta para ingresar el email del que se quiere reestablecer la contraseña */}
        <Route path="forgot-password" element={ <ForgotPassword />}/>
        {/* ruta con el token para reestablecer la contraseña */}
        <Route path="new-password/:token" element={ <NewPassword />}/>
      </Route>
      
      {/* si la ruta ingresada no coincide con ninguna de auth, se redirige */}
      <Route path="/*" element={ <Navigate to='/auth/' /> }/>
    </Routes>
    
  )
}
