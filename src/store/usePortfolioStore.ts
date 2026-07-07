import { create } from "zustand";

interface PortfolioState {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  showreelPlaying: boolean;
  setShowreelPlaying: (playing: boolean) => void;
  showreelMuted: boolean;
  setShowreelMuted: (muted: boolean) => void;
  isBookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeFilter: "All",
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  showreelPlaying: false, // Default is false because it starts as autoplaying but user can toggle to full modal/interactive player
  showreelMuted: true, // Default to true for standard autoplay policies
  setShowreelPlaying: (playing) => set({ showreelPlaying: playing }),
  setShowreelMuted: (muted) => set({ showreelMuted: muted }),
  isBookingModalOpen: false,
  setBookingModalOpen: (open) => set({ isBookingModalOpen: open }),
}));
