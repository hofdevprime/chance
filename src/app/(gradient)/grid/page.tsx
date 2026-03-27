import ClubFormDialog from "@/components/ClubFormDialog";
import MobileGroupPreview from "@/components/MobileGroupPreview";
import { GridCarousel } from "@/components/GridCarousel";
import { clubs } from "@/lib/data/club";

export default function GridPage() {
  return (
    <ClubFormDialog>
      <MobileGroupPreview>
        <GridCarousel data={clubs} />
      </MobileGroupPreview>
    </ClubFormDialog>
  );
}
