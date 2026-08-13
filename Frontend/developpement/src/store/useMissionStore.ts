import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MissionType = {
  id: number;
  name: string;
  location: string;
  missionDate: string;
  description: string;
};

export type User = {
  id: number;
  login: string;
};

type MissionStore = {
  user: User | null;
  missions: MissionType[];
  selectedMission : MissionType | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setSelectedMission : (mission : MissionType | null) => void;
  fetchUserMissions: () => Promise<void>;
  logout: () => void;
};

// Envelopper le store avec persist(...)
export const useMissionStore = create<MissionStore>()(
  persist(
    (set, get) => ({
      user: null,
      missions: [],
      selectedMission: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setSelectedMission: (mission) => set({ selectedMission: mission }),

      fetchUserMissions: async () => {
        const user = get().user;

        if (!user || !user.id) {
          set({ error: "Aucun utilisateur connecté.", missions: [] });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `http://localhost:8080/missions/project/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets.");
          }

          const data = await response.json();
          set({ missions: data, isLoading: false });
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

        set({ user: null, missions: [], error: null, selectedMission: null });

        useMissionStore.persist.clearStorage();
      },
    }),
    {
      name: "mission-auth-storage", // 👈 Nom de la clé dans le localStorage
      // Optionnel : enregistrer seulement 'user' et 'missions' (pas les états temporaires comme 'isLoading')
      partialize: (state) => ({ user: state.user, missions: state.missions, selectedMission: state.selectedMission }),
    },
  ),
);
