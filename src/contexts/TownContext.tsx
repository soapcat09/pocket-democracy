import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Town } from "@/lib/towns";

interface TownContextType {
  selectedTown: Town | null;
  setSelectedTown: (town: Town | null) => void;
}

const TownContext = createContext<TownContextType | undefined>(undefined);

export const TownProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTown, setSelectedTownState] = useState<Town | null>(() => {
    const stored = localStorage.getItem("selectedTown");
    return stored ? JSON.parse(stored) : null;
  });

  const setSelectedTown = (town: Town | null) => {
    setSelectedTownState(town);
    if (town) {
      localStorage.setItem("selectedTown", JSON.stringify(town));
    } else {
      localStorage.removeItem("selectedTown");
    }
  };

  return (
    <TownContext.Provider value={{ selectedTown, setSelectedTown }}>
      {children}
    </TownContext.Provider>
  );
};

export const useTown = () => {
  const context = useContext(TownContext);
  if (context === undefined) {
    throw new Error("useTown must be used within a TownProvider");
  }
  return context;
};
