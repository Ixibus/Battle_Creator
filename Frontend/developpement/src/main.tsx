import "./styles/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import Layout from "./layouts/Layout";

import LandingPage from "./pages/LandingPage/LandingPage";
import AccountCreation from "./pages/AccountCreationPage/AccountCreation";
import ProjectCreation from "./pages/ProjectCreationPage/ProjectCreation";
import OnboardingMandatoryMissions from "./pages/OnboardingMandatoryMissions/OnboardingMandatoryMissions";
import OnboardingOptionalMissions from "./pages/OnboardingOptionalMissions/OnboardingOptionalMissions";
import HomePage from "./pages/HomePage/HomePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        // element: <LandingPage />,
        // element: <AccountCreation />,
        // element: <ProjectCreation/>,
        // element: <OnboardingMandatoryMissions/>,
        element: <OnboardingOptionalMissions/>,
      },
      // {
      //   index: true,
      //   element: <App />,
      // },
      {
        path: "/projectCreation",
        element: <ProjectCreation/>,
      },
      {
        path: "/mandatoryMissions",
        element: <OnboardingMandatoryMissions/>,
      },
      {
        path: "/optionnalMissions",
        element: <OnboardingOptionalMissions/>,
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
