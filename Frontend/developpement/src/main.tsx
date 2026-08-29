import "./styles/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import Layout from "./layouts/Layout";
// import ProtectedRoute from "./features/ProtectedRoute";

import LandingPage from "./pages/LandingPage/LandingPage";
import AccountCreation from "./pages/AccountCreationPage/AccountCreation";
import ProjectCreation from "./pages/ProjectCreationPage/ProjectCreation";
import OnboardingMandatoryMissions from "./pages/OnboardingMandatoryMissions/OnboardingMandatoryMissions";
import OnboardingOptionalMissions from "./pages/OnboardingOptionalMissions/OnboardingOptionalMissions";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage/HomePage";
import OnboardingLayout from "./layouts/OnboardingLayout";
import ConnexionPage from "./pages/ConnexionPage/ConnexionPage";
import LandingPageLayout from "./layouts/LandingPageLayout";
import ConnexionPageLayout from "./layouts/ConnexionPageLayout";
import ProjectList from "./pages/ProjectList/ProjectList";

// import AddingMissionPage from "./pages/AddingMissionPage/AddingMissionPage";
import MissionPage from "./pages/MissionPage/MissionPage";
// import AddingTaskPage from "./pages/AddingTaskPage/AddingTaskPage";
// import TaskAssignmentPage from "./pages/TaskAssignmentPage/TaskAssignmentPage";
import OverlayedWarning from "./components/OverlayedWarning/OverlayedWarning";
import { ToastContainer } from "./components/toast/Toast";
import MissionList from "./pages/MissionList/MissionList";
import ProjectListAuthed from "./pages/ProjectListAuthed/ProjectListAuthed";
// import AddingNewProject from "./pages/AddingNewProject/AddingNewProject";

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
        element: <LandingPageLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
        ],
      },
      {
        element: <ConnexionPageLayout />,
        children: [
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
              // {
              //   path: "/addingMissionPage",
              //   element: <AddingMissionPage />,
              // },
              {
                path: "/missionPage/:id",
                element: <MissionPage />,
              },
              // {
              //   path: "/addingTaskPage",
              //   element: <AddingTaskPage />,
              // },
              // {
              //   path: "/taskAssignmentPage",
              //   element: <TaskAssignmentPage />,
              // },
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
              {
                path: "/missionList",
                element: <MissionList />,
              },
              // {
              //   path: "/addingNewProject",
              //   element: <AddingNewProject />,
              // },
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
