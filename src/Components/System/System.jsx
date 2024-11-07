import { Outlet } from 'react-router-dom';
import TopBar from './TopBar/TopBar';


const System = () => {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  )
}

export default System;