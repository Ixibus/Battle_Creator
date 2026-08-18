import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProjectType = {
  id: number;
  name: string;
  location: string;
  projectDate: string;
  description: string;
};

export type User = {
  id: number;
  login: string;
};

type ProjectStore = {
  user: User | null;
  projects: ProjectType[];
  selectedProject : ProjectType | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setSelectedProject : (project : ProjectType | null) => void;
  fetchUserProjects: () => Promise<void>;
  logout: () => void;
};

// Envelopper le store avec persist(...)
export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      user: null,
      projects: [],
      selectedProject: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setSelectedProject: (project) => set({ selectedProject: project }),

      fetchUserProjects: async () => {
        const user = get().user;

        if (!user || !user.id) {
          set({ error: "Aucun utilisateur connecté.", projects: [] });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:8080/projects/user/${user.id}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets.");
          }

          const data = await response.json();
          set({ projects: data, isLoading: false });
        } catch (err: any) {
          set({
            error: err.message || "Erreur lors du chargement des projets.",
            isLoading: false,
          });
        }
      },

      logout: async () => {
        try {
          await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } catch (err) {
          console.error("Erreur lors de la déconnexion serveur :", err);
        }

        set({ user: null, projects: [], error: null, selectedProject: null });

        useProjectStore.persist.clearStorage();
      },
    }),
    {
      name: "project-auth-storage", // 👈 Nom de la clé dans le localStorage
      // Optionnel : enregistrer seulement 'user' et 'projects' (pas les états temporaires comme 'isLoading')
      partialize: (state) => ({ user: state.user, projects: state.projects, selectedProject: state.selectedProject }),
    },
  ),
);
