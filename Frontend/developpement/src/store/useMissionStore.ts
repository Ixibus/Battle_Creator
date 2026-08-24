import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MissionTypeEnum = "mandatory" | "option";

export type ProjectType = {
  id: number;
  name?: string;
  description?: string;
};

export type MissionType = {
  id: number;
  type: MissionTypeEnum;
  isDefault: boolean; // Ou "is_default" si votre sérialiseur JSON conserve le snake_case
  name: string;
  goal: string;
  description?: string | null;
  project?: ProjectType | null;
};

export type User = {
  id: number;
  login: string;
};

type MissionStore = {
  user: User | null;
  missions: MissionType[];
  selectedMission: MissionType | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setSelectedMission: (mission: MissionType | null) => void;
  fetchMissionsByProject: (projectId: number | undefined) => Promise<void>;
  fetchAllMissions: () => Promise<void>;
  addMission: (mission: MissionType) => void;
  updateMission: (id: number, updatedMission: MissionType) => void;
  removeMission: (id: number) => void;
  logout: () => Promise<void>;
};

const API_URL = import.meta.env.VITE_API_URL;

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

      // Récupérer les missions associées à un projet spécifique
      fetchMissionsByProject: async (projectId) => {
        if (!projectId || projectId <= 0) {
          set({ error: "ID de projet invalide.", missions: [] });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch(
            `${API_URL}/missions/project/${projectId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des missions du projet.");
          }

          const data: MissionType[] = await response.json();
          set({ missions: data, isLoading: false });
        } catch (err: any) {
          set({
            error: err.message || "Erreur lors du chargement des missions.",
            isLoading: false,
          });
        }
      },

      // Récupérer TOUTES les missions (optionnel si besoin)
      fetchAllMissions: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`${API_URL}/missions`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération de toutes les missions.");
          }

          const data: MissionType[] = await response.json();
          set({ missions: data, isLoading: false });
        } catch (err: any) {
          set({
            error: err.message || "Erreur lors du chargement des missions.",
            isLoading: false,
          });
        }
      },

      // Méthodes utilitaires pour modifier le state sans refaire un fetch
      addMission: (mission) =>
        set((state) => ({ missions: [...state.missions, mission] })),

      updateMission: (id, updatedMission) =>
        set((state) => ({
          missions: state.missions.map((m) => (m.id === id ? updatedMission : m)),
          selectedMission:
            state.selectedMission?.id === id ? updatedMission : state.selectedMission,
        })),

      removeMission: (id) =>
        set((state) => ({
          missions: state.missions.filter((m) => m.id !== id),
          selectedMission:
            state.selectedMission?.id === id ? null : state.selectedMission,
        })),

      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
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
      name: "mission-auth-storage",
      partialize: (state) => ({
        user: state.user,
        missions: state.missions,
        selectedMission: state.selectedMission,
      }),
    }
  )
);