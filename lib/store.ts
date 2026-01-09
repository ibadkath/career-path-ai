import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CareerStore {
  savedRoadmap: any | null;
  setSavedRoadmap: (roadmap: any) => void;
  clearRoadmap: () => void;
}

export const useCareerStore = create<CareerStore>()(
  persist(
    (set) => ({
      savedRoadmap: null,
      setSavedRoadmap: (roadmap) => set({ savedRoadmap: roadmap }),
      clearRoadmap: () => set({ savedRoadmap: null }),
    }),
    {
      name: 'career-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);