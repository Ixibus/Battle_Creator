import "./styles/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./features/ProtectedRoute";

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
import ProjectList from "./pages/ProjectList/ProjectList";

import OptionalMission from "./assets/icones/optionnalMission.svg?react";
import Members from "./assets/icones/members.svg?react";
import AddingMissionPage from "./pages/AddingMissionPage/AddingMissionPage";
import MissionPage from "./pages/MissionPage/MissionPage";
import MaterialTag from "./components/MaterialTag/MaterialTag";
import TaskTag from "./components/TaskTag/TaskTag";
import MemberAssignmentTag from "./components/MemberAssignmentTag/MemberAssignmentTag";
import TaskAndAssignmentContainer from "./components/TaskAndAssignmentContainer/TaskAndAssignmentContainer";
import AddingTaskPage from "./pages/AddingTaskPage/AddingTaskPage";
import TaskAssignmentPage from "./pages/TaskAssignmentPage/TaskAssignmentPage";
import OverlayedWarning from "./components/OverlayedWarning/OverlayedWarning";
import { ToastContainer } from "./components/toast/Toast";
import ProjectListAuthed from "./pages/ProjectListAuthed/ProjectListAuthed";

function RootLayout() {
  return (
    <>
      <Outlet />
      <div className="toastMessage" style={{ whiteSpace: "pre-line" }}>
        <ToastContainer />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <FirstLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "/connexionPage",
            element: <ConnexionPage />,
          },
        ],
      },
      {
        element: <OnboardingLayout />,
        children: [
          {
            path: "/accountCreation",
            element: <AccountCreation />,
          },
          {
            path: "/projectCreation",
            element: <ProjectCreation />,
          },
          {
            path: "/onboardingMandatoryMissions",
            element: <OnboardingMandatoryMissions />,
          },
          {
            path: "/onboardingOptionalMissions",
            element: <OnboardingOptionalMissions />,
          },
        ],
      },
      {
        // element: <ProtectedRoute />,
        children: [
          {
            path: "/projectListAuthed",
            element: <ProjectListAuthed />,
          },
          {
            element: <Layout />,
            children: [
              {
                path: "/homePage",
                element: <HomePage />,
              },
              {
                path: "/addingMissionPage",
                element: <AddingMissionPage />,
              },
              {
                path: "/missionPage/:id",
                element: <MissionPage />,
              },
              {
                path: "/addingTaskPage",
                element: <AddingTaskPage />,
              },
              {
                path: "/taskAssignmentPage",
                element: <TaskAssignmentPage />,
              },
              {
                path: "/projectCreation",
                element: <ProjectCreation />,
              },
              {
                path: "/projectList",
                element: <ProjectList />,
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
                path: "/overlayedWarning",
                element: <OverlayedWarning />,
              },
            ],
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
