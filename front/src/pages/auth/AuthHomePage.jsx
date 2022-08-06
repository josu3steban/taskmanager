import { Outlet } from 'react-router-dom';

export const AuthHomePage = () => {
  return (
    <div
      className="
        
      
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        animate__animated
        animate__fadeIn
        animate__faster
      ">

      <main
        className='
          sm:w-9/12
          w-2/5
        '
      >
        <Outlet />
      </main>
      
    </div>
  )
}
