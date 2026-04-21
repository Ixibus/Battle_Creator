import './styles/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './layouts/Layout'
import AccountCReation from './pages/AccountCreationPage/AccountCreation';
import ProjectCreation from './pages/ProjectCreationPage/ProjectCreation';
import MandatoryMissions from './pages/MandatoryMissions/MandatoryMissions';
import OptionnalMissions from './pages/OptionnalMissions/OptionnalMissions';
import HomePage from './pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AccountCReation/>
      },
      {
        path: "/projectCreation",
        element: <ProjectCreation/>
      },
      {
        path: "/mandatoryMissions",
        element: <MandatoryMissions/>
      },
      {
        path: "/optionnalMissions",
        element: <OptionnalMissions/>
      },
      {
        path: "/homePage",
        element: <HomePage/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
)
