import { create } from "zustand";

export type Project = {
  id: number;
  name: string; // Nom de la propriété retournée par l'entité Project Java
  projectDate: string;
  description: string;
};

export type User = {
  id: number;
  login: string;
};

type ProjectStore = {
  user: User | null;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  fetchUserProjects: () => Promise<void>;
  logout: () => void;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  user: null,
  projects: [],
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUserProjects: async () => {
    const user = get().user;
    console.log("Utilisateur connecté dans le store :", user);

    if (!user || !user.id) {
        console.log("Impossible de charger les projets : ID utilisateur manquant dans le store", user);
      set({ error: "Aucun utilisateur connecté.", projects: [] });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `http://localhost:8080/projects/user/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(user.id)

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets.");
      }

      const data = await response.json();
      console.log("Projets reçus du backend :", data);
      set({ projects: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Erreur lors du chargement des projets.",
        isLoading: false,
      });
    }
  },

  logout: () => set({ user: null, projects: [], error: null }),
}));