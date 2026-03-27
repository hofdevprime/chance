"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import GroupPreviewContext from "@/context/GroupPreviewContext";
import MobileGroupDescription from "@/components/MobileGroupDescription";
import LoreGallery from "@/components/LoreGallery";
import { MemberList } from "@/components/MemberList";
import { MemberListItem } from "@/components/MemberListItem";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { useClubFormDialog } from "@/context/ClubFormDialogContext";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { members } from "@/lib/data/members";
import { slides } from "@/lib/data/slides";
import { clubs } from "@/lib/data/club";
import { Target } from "@/types/DialogModal";
import { cn } from "@/lib/utils/cn";
import { Club } from "@/types/Club";

const EMPTY_CLUB: Club = {
  name: "",
  description: "",
  previewText: "",
  previewImage: "",
  cardImage: "",
};

export default function MobileGroupPreview({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [club, setClub] = useState<Club | null>(null);

  const { setOpen: setOpenClubForm, setTarget } = useClubFormDialog();
  const isMobile = useIsMobile(1024);

  const activeClub = club ?? EMPTY_CLUB;

  return (
    <GroupPreviewContext.Provider value={{ open, setOpen, club, setClub }}>
      {children}

      {/* ── Mobile: vaul Drawer ── */}
      {isMobile && <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60" />
          <Drawer.Content
            className={cn(
              "fixed inset-x-0 bottom-0 z-50",
              "max-h-[95dvh] flex flex-col",
              "bg-[#0E0D12] rounded-t-md",
              "border border-[#FFFFFF0F]",
              "outline-none",
            )}
          >
            <Drawer.Title className="sr-only">{activeClub.name}</Drawer.Title>
            <Drawer.Description className="sr-only">
              Group preview for {activeClub.name}
            </Drawer.Description>

            <div className="overflow-y-auto pb-[4.5rem]">
              <div className="flex flex-col gap-y-6 p-6">
                {/* Header */}
                <div className="flex w-full items-start gap-x-5">
                  <img
                    src={activeClub.cardImage}
                    alt={activeClub.name}
                    className="aspect-square h-11 rounded-md border border-[#FFFFFF1F] object-cover shrink-0"
                  />
                  <div className="flex flex-col flex-1 gap-y-1.5 min-w-0">
                    <h1 className="text-lg leading-tight font-[Google_Sans_Flex] truncate">
                      {activeClub.name}
                    </h1>
                    <span className="text-[#FFFFFF66] text-xs font-[Google_Sans_Flex]">
                      {members.length.toLocaleString()} members
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="shrink-0 cursor-pointer text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <MobileGroupDescription text={activeClub.description} />

                <TabsPrimitive.Root
                  className="flex flex-col gap-y-1.5"
                  defaultValue="lore"
                >
                  <TabsPrimitive.List className="flex w-full gap-x-1.5 bg-[#1C1C20] p-1.5 rounded-sm">
                    <TabsPrimitive.Trigger
                      className="flex-1 data-[state=active]:bg-[#FFFFFF0F] text-sm font-[Google_Sans_Flex] leading-none py-1.5 px-3 rounded-xs cursor-pointer"
                      value="lore"
                    >
                      Lore
                    </TabsPrimitive.Trigger>
                    <TabsPrimitive.Trigger
                      className="flex-1 data-[state=active]:bg-[#FFFFFF0F] text-sm font-[Google_Sans_Flex] leading-none py-1.5 px-3 rounded-xs cursor-pointer"
                      value="members"
                    >
                      Members
                    </TabsPrimitive.Trigger>
                  </TabsPrimitive.List>
                  <TabsPrimitive.Content value="lore">
                    <LoreGallery slides={slides} />
                  </TabsPrimitive.Content>
                  <TabsPrimitive.Content value="members">
                    <MemberList members={members} />
                  </TabsPrimitive.Content>
                </TabsPrimitive.Root>
              </div>
            </div>

            {/* Fixed Join button */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-[#0E0D12]">
              <button
                className={cn(
                  "w-full py-3.25 px-0 border-none",
                  "grid-button text-white text-sm font-semibold tracking-[0.3px]",
                  "cursor-pointer",
                )}
                onClick={() => {
                  setOpen(false);
                  setTarget(Target.JOIN);
                  setOpenClubForm(true);
                }}
              >
                Join group
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>}

      {/* ── Desktop: Radix Dialog ── */}
      {!isMobile && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className={cn(
              "!w-[calc(100vw-80px)] !max-w-[1360px]",
              "!h-[calc(100vh-128px)] !top-[calc(50%+32px)]",
              "flex flex-row overflow-hidden !p-0",
              "bg-[#0E0D12] border border-[#FFFFFF0F] !rounded-sm",
            )}
          >
            <DialogTitle className="sr-only">{activeClub.name}</DialogTitle>
            {/* Sidebar */}
            <div className="w-[104px] shrink-0 flex flex-col border-r border-[#FFFFFF0F]">
              <img
                src="/images/country-club-logo.png"
                alt="Country Club"
                className="w-14 mx-auto mt-6 mb-5"
              />
              <div className="h-px bg-[#FFFFFF0F] mx-6" />
              <div className="flex flex-col gap-y-6 items-center mt-6 px-[28px]">
                {clubs.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setClub(c)}
                    className={cn(
                      "w-12 h-12 rounded-sm overflow-hidden border cursor-pointer shrink-0",
                      c.name === activeClub.name
                        ? "border-white/40"
                        : "border-white/10",
                    )}
                  >
                    <img
                      src={c.cardImage}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div className="flex-1 flex flex-col border-r border-[#FFFFFF0F] overflow-hidden">
              <div className="relative shrink-0" style={{ height: "38%" }}>
                <img
                  src={activeClub.previewImage || activeClub.cardImage}
                  alt={activeClub.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 overflow-y-auto gap-y-1 min-h-0">
                <h2 className="text-2xl font-normal font-[Google_Sans_Flex]">
                  {activeClub.name}
                </h2>
                <span className="text-sm text-[#FFFFFF66] font-[Google_Sans_Flex]">
                  {members.length.toLocaleString()} members
                </span>
                <p className="mt-4 text-[#FFFFFFA3] text-sm leading-relaxed font-[Google_Sans_Flex] whitespace-pre-line">
                  {activeClub.description}
                </p>
              </div>
              <div className="px-6 pb-6 shrink-0">
                <button
                  className={cn(
                    "w-full py-3 border-none",
                    "grid-button text-white text-sm font-semibold tracking-[0.3px]",
                    "cursor-pointer",
                  )}
                  onClick={() => {
                    setOpen(false);
                    setTarget(Target.JOIN);
                    setOpenClubForm(true);
                  }}
                >
                  Join group
                </button>
              </div>
            </div>

            {/* Members panel */}
            <div className="flex-1 flex flex-col border-r border-[#FFFFFF0F] overflow-hidden">
              <div className="px-6 py-6 shrink-0">
                <h3 className="text-center text-sm font-[Google_Sans_Flex] text-white">
                  Members
                </h3>
              </div>
              <div className="h-px bg-[#FFFFFF0F] mx-6 shrink-0" />
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-y-3">
                {members.map((m) => (
                  <MemberListItem key={m.id} member={m} />
                ))}
              </div>
            </div>

            {/* Lore panel */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 py-6 shrink-0">
                <h3 className="text-center text-sm font-[Google_Sans_Flex] text-white">
                  Lore
                </h3>
              </div>
              <div className="h-px bg-[#FFFFFF0F] mx-6 shrink-0" />
              <div className="flex-1 px-6 py-6 min-h-0">
                <LoreGallery slides={slides} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </GroupPreviewContext.Provider>
  );
}
