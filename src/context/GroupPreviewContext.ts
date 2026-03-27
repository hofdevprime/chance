import { createContext, useContext } from "react";
import { Club } from "@/types/Club";

interface GroupPreviewContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  club: Club | null;
  setClub: (club: Club | null) => void;
}

const GroupPreviewContext = createContext<GroupPreviewContextValue | null>(null);

export function useGroupPreview() {
  const context = useContext(GroupPreviewContext);
  if (!context) {
    throw new Error("useGroupPreview must be used within a MobileGroupPreview");
  }
  return context;
}

export default GroupPreviewContext;
