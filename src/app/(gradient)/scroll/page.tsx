import { ScrollCarousel } from "@/components/ScrollCarousel";
import "@/styles/carousel.css";
import ClubFormDialog from "@/components/ClubFormDialog";
import MobileGroupPreview from "@/components/MobileGroupPreview";
import { clubs } from "@/lib/data/club";

export default function ScrollPage() {
  return (
    <ClubFormDialog>
      <MobileGroupPreview>
        <ScrollCarousel data={clubs} />
      </MobileGroupPreview>
    </ClubFormDialog>
  );
}
