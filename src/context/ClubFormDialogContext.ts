import { createContext, useContext } from "react";
import { Target } from "@/types/DialogModal";

interface ClubFormDialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  target: Target;
  setTarget: (target: Target) => void;
}

const ClubFormDialogContext = createContext<ClubFormDialogContextValue | null>(
  null,
);

export function useClubFormDialog() {
  const context = useContext(ClubFormDialogContext);
  if (!context) {
    throw new Error("useClubFormDialog must be used within a ClubFormDialog");
  }
  return context;
}

export default ClubFormDialogContext;
