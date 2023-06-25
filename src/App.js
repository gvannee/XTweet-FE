import Login from './views/login/Login';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from './views/home/Home';
import Profile from './views/profile/Profile';
import './style.scss';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from './context/authContext';



function App() {
  const {currentUser} = useContext(AuthContext);
  

  const Layout = () => {
    return (
      <div>
        <div style={{ display: 'flex', color: 'white' }} >
          <LeftBar />
          <div style={{flex: 6}}>
          <Outlet />
          </div>
          
          <RightBar />
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  const router = new createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/profile?id=",
          element: <Profile />,
        }
      ]
    },

    {
      path: "/login",
      element: <Login />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
