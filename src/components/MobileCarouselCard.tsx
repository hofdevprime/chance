import { motion } from "motion/react";
import { Target } from "@/types/DialogModal";
import { useClubFormDialog } from "@/context/ClubFormDialogContext";
import { useGroupPreview } from "@/context/GroupPreviewContext";
import { cn } from "@/lib/utils/cn";
import { Club } from "@/types/Club";

interface MobileCarouselCardProps {
  index: number;
  club?: Club;
  title?: string;
  description?: string;
  image?: string;
  target: Target;
}

export function MobileCarouselCard({
  index,
  club,
  title,
  description,
  image,
  target,
}: MobileCarouselCardProps) {
  const { setOpen: setOpenClubForm, setTarget } = useClubFormDialog();
  const { setOpen: setOpenPreview, setClub } = useGroupPreview();

  const displayTitle = club?.name ?? title ?? "";
  const displayDescription = club?.description ?? description ?? "";
  const displayImage = club?.cardImage ?? image ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      className={cn(
        "w-full overflow-hidden bg-[#0d1b2e] shadow-none flex flex-col cursor-pointer",
        "border border-solid border-[rgba(255,255,255,0.07)]",
        "mb-3.75 p-2.5",
      )}
      onClick={() => {
        if (club) {
          setClub(club);
          setOpenPreview(true);
        }
      }}
    >
      <div className="flex flex-row gap-0">
        <div className="grow-0 shrink-0 basis-30 h-30 relative background-[linear-gradient(160deg,#071628 0%,#0d2d50 100%)]">
          <img
            src={displayImage}
            alt={displayTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 py-1 px-5 flex-1 gap-1.5 justify-start">
          <p className="m-0 text-2xl font-normal text-white tracking-[0.4px] uppercase leading-[1.2]">
            {displayTitle}
          </p>
          <p className="mt-2 text-xs text-[rgba(255,255,255,0.55)] leading-normal line-clamp-4">
            {displayDescription}
          </p>
        </div>
      </div>

      <button
        className={cn(
          "w-full py-3.25 px-0 border-none mt-2.5",
          "grid-button text-white text-sm font-semibold tracking-[0.3px]",
          "cursor-pointer",
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (club) {
            setClub(club);
            setOpenPreview(true);
          } else {
            setOpenClubForm(true);
            setTarget(target);
          }
        }}
      >
        {target === Target.JOIN ? "Join group" : "Request tribe"}
      </button>
    </motion.div>
  );
}
