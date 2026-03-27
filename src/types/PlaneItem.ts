import { Target } from "./DialogModal";

export interface PlaneItem {
  index: number;
  title: string;
  text: string;
  image: string;
  targetModal: Target;
  isFormTribe?: boolean;
}
