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
import MissionTagsThumbnail from "./components/MissionTagsThumbnail/MissionTagsThumbnail";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlusButton from "./components/Button/PlusButton/PlusButton";
import NextButton from "./components/Button/NextButton/NextButton";
import Figure from "./components/Figure/Figure";
import HomePage from "./pages/HomePage/HomePage";
import MissionTag from "./components/MissionTag/MissionTag";
import SecondaryThumbnail from "./components/SecondaryThumbnail/SecondaryThumbnail";
import Figure2 from "./components/Figure/Figure2";
import OnboardingLayout from "./layouts/OnboardingLayout";
import ConnexionPage from "./pages/ConnexionPage/ConnexionPage";
import FirstLayout from "./layouts/FirstLayout";

const router = createBrowserRouter([
  {
    children: [
      {
        element: <FirstLayout />,
        children: [
          {
            index: true,
            // element: <LandingPage />,
            element: <ConnexionPage/>,
          },
        ],
      },
      {
        element: <OnboardingLayout />,
        children: [
          {
            // index: true,
            // element: <AccountCreation />,
            // element: <ProjectCreation/>,
            // element: <OnboardingMandatoryMissions/>,
            // element: <OnboardingOptionalMissions/>,
          },
        ],
      },
      {
        element: <Layout />,
        children: [
          {
            // index: true,
            // element: <HomePage/>,
            // element: <MissionTag text="Espace"/>,
            // element: <MissionTagsThumbnail title="Missions obligatoires"/>
            // element: <PlusButton/>
            // element: <NextButton styleClassName="btnStyle1" mainClassName="test" text="voir toute la liste des tâches"/>
            // element: <Figure number={34}/>
            // element: <Figure2 number={34}/>
            // element: <InfoThumbnail/>
            // element: <HomePage/>
            // element: <SecondaryThumbnail text="tâches"/>
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
            element: <OnboardingMandatoryMissions />,
          },
          {
            path: "/optionnalMissions",
            element: <OnboardingOptionalMissions />,
          },
          {
            path: "/homePage",
            element: <HomePage />,
          },
        ],
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
