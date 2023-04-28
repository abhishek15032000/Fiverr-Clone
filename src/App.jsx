import React from "react";
import Navbar from "../components/navbar/Navbar"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Layout from '../layout/Layout';
import Add from '../pages/add/Add.jsx';
import Gig from '../pages/gig/Gig.jsx';
import Gigs from '../pages/gigs/Gigs.jsx';
import Home from '../pages/home/Home.jsx';
import Login from '../pages/login/Login.jsx';
import Message from '../pages/message/Message.jsx';
import Messages from '../pages/messages/Messages.jsx';
import Mygigs from '../pages/myGigs/Mygigs.jsx';
import Orders from '../pages/orders/Orders.jsx';
import Register from '../pages/register/Register.jsx';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <Mygigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

    return (
      <div>
        <RouterProvider router={router}/>
      </div>
    )
  }

  
  export default App