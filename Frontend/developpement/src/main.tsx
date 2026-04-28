import "./styles/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import Layout from "./layouts/Layout";
import ProjectCreation from "./pages/ProjectCreationPage/ProjectCreation";
import MandatoryMissions from "./pages/MandatoryMissions/MandatoryMissions";
import OptionnalMissions from "./pages/OptionnalMissions/OptionnalMissions";
import HomePage from "./pages/HomePage/HomePage";
// import AccountCreation from "./pages/AccountCreationPage/AccountCreation";
import App from "./pages/Test/App";
import AccountCreation from "./pages/AccountCreationPage/AccountCreation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConnexionTest from "./pages/Test/ConnexionTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ConnexionTest />,
      },
      // {
      //   index: true,
      //   element: <App />,
      // },
      {
        path: "/projectCreation",
        element: <ProjectCreation />,
      },
      {
        path: "/mandatoryMissions",
        element: <MandatoryMissions />,
      },
      {
        path: "/optionnalMissions",
        element: <OptionnalMissions />,
      },
      {
        path: "/homePage",
        element: <HomePage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
    </QueryClientProvider>

    </Auth0Provider>
  </StrictMode>,
);
