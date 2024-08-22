import { Outlet } from 'react-router-dom';

// AppLayout for authenticated users
const AppLayout = () => {
  return (
    <div className='h-screen bg-[#093545] text-white font-Montserrat'>
      <main>
        <Outlet />
      </main>
      <footer className='absolute w-full bottom-0 right-0 left-0'>
      <div className="flex justify-center items-center">
        <img
          src="/assets/Vectors.png"
          alt="Footer Logo"
          className="w-full h-auto"
        />
      </div>
    </footer>
    </div>
  );
};

// AuthLayout for unauthenticated users
const AuthLayout = () => {
  return (
    <div className='h-screen bg-[#093545] text-white '>
      <main >
        <Outlet />
      </main>
      <footer className='absolute w-full bottom-0 right-0 left-0'>
      <div className="flex justify-center items-center">
        <img
          src="/assets/Vectors.png"
          alt="Footer Logo"
          className="w-full h-auto"
        />
      </div>
    </footer>
    </div>
  );
};

export { AppLayout, AuthLayout };
