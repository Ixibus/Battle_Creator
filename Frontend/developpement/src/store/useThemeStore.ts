import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { typeState } from '../types/store.d'

// Theme sombre
// Sans middleware create<T>((set) => ...)
// Avec middleware create<T>()(middleware(...)) ici create<T>()(persist(...))
const useThemeStore = create<typeState>()(
  persist(
    (set) => ({
      // État (valeur par default: false)
      isDarkMode: false,

      // Actions
      toggleDarkMode: () => set((state) => ({
        isDarkMode: !state.isDarkMode
      }))
    }),
    {
      // clé dans le LocalStorage
      name: 'theme-dark-mode'
    }
  )
)

export default useThemeStore