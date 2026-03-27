"use client";

import FileUploadField from "@/components/FileUploadField";
import ModalButton from "@/components/ModalButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog";
import ClubFormDialogContext from "@/context/ClubFormDialogContext";
import { cn } from "@/lib/utils/cn";
import "@/styles/carousel.css";
import { Target } from "@/types/DialogModal";
import { X } from "lucide-react";
import { type ComponentProps, useState } from "react";

function renderTitle(target: Target) {
  switch (target) {
    case Target.FORM:
      return "Create a Club";
    default:
      return "Request to Join";
  }
}

function renderDescription(target: Target) {
  switch (target) {
    case Target.FORM:
      return (
        <>
          This form is a proposal to create a new Chance Country Club.
          <br />
          <br />
          Please be sure that there aren't any existing and active Clubs that
          would fit you and your interests.
        </>
      );
    default:
      return (
        <>
          This form to request to join an existing Chance Country Club.
          <br />
          <br />
          Existing Club moderators will see your responses so please feel free
          to share as much as you'd like!
        </>
      );
  }
}

function renderForm(target: Target) {
  switch (target) {
    case Target.FORM:
      return (
        <>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="john.doe@gmail.com" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="club-name">What is the name of the Club?</label>
            <input type="text" name="club-name" placeholder="Your answer" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="club-description">What is the Club about?</label>
            <input
              type="text"
              name="club-description"
              placeholder="Your answer"
            />
          </div>
          <fieldset className="flex flex-col">
            <legend>Who would be the ideal club members?</legend>

            <label>
              <input
                type="checkbox"
                name="ideal-members"
                value="pure-collectors"
              />
              Pure Collectors
            </label>

            <label>
              <input
                type="checkbox"
                name="ideal-members"
                value="vendors-stream-sellers"
              />
              Vendors / Stream Sellers
            </label>

            <label>
              <input type="checkbox" name="ideal-members" value="graders" />
              Graders
            </label>

            <label>
              <input
                type="checkbox"
                name="ideal-members"
                value="content-creators"
              />
              Content Creators
            </label>

            <label>
              <input type="checkbox" name="ideal-members" value="lgs-owners" />
              LGS Owners
            </label>
          </fieldset>
          <div className="flex flex-col">
            <label htmlFor="founding-members">
              List 6 potential founding members of the group. Please include
              their Instagram (or other social profiles).
            </label>
            <input
              type="text"
              name="founding-members"
              placeholder="ex. john.doe (@johndoe)"
            />
          </div>
        </>
      );
    default:
      return (
        <>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="john.doe@gmail.com" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="club">Which Club are you trying to join?</label>
            <input type="text" name="club" placeholder="Choose club" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="reason">Why do you want to join this Club?</label>
            <input type="text" name="reason" placeholder="Your answer" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contribution">
              How would you contribute to the Club?
            </label>
            <input type="text" name="contribution" placeholder="Your answer" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="instagram">What is your Instagram username?</label>
            <input type="text" name="instagram" placeholder="@john.doe" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="proof">
              Send us a picture or some proof of why you belong in the Club?
            </label>
            <span className="text-[#FFFFFF66]">
              Upload up to 5 supported files. Max 100 MB per file.
            </span>
            <FileUploadField />
          </div>
        </>
      );
  }
}

export default function ClubFormDialog({
  children,
  ...props
}: Omit<ComponentProps<typeof Dialog>, "open" | "onOpenChange">) {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState(Target.JOIN);

  return (
    <ClubFormDialogContext.Provider
      value={{ open, setOpen, target, setTarget }}
    >
      <Dialog open={open} onOpenChange={setOpen} {...props}>
        {children}
        <DialogContent className="lg:max-w-[580px] max-h-[calc(100vh-2rem)] overflow-y-auto font-[Google_Sans_Flex]">
          <form>
            <div className="relative bg-[#0E0D12] p-6 rounded-sm">
              <div className="absolute top-0 left-0 h-[10px] w-[10px] border-solid border-[rgba(255,255,255,0.64)] border-t-[0.5px] border-l-[0.5px] rounded-tl-sm" />
              <div className="absolute top-0 right-0 h-[10px] w-[10px] border-solid border-[rgba(255,255,255,0.64)] border-t-[0.5px] border-r-[0.5px] rounded-tr-sm" />
              <div className="absolute bottom-0 right-0 h-[10px] w-[10px] border-solid border-[rgba(255,255,255,0.64)] border-b-[0.5px] border-r-[0.5px] rounded-br-sm" />
              <div className="absolute bottom-0 left-0 h-[10px] w-[10px] border-solid border-[rgba(255,255,255,0.64)] border-b-[0.5px] border-l-[0.5px] rounded-bl-sm" />
              <div
                className={cn(
                  "flex justify-between",
                  "pb-6 border-b border-[#FFFFFF1F]",
                )}
              >
                <DialogTitle className="text-2xl font-normal">
                  {renderTitle(target)}
                </DialogTitle>
                <DialogClose className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">
                  <X />
                </DialogClose>
              </div>
              <div className="py-6 border-b border-[#FFFFFF1F]">
                <div className="flex gap-3">
                  <div className="flex justify-center items-center bg-[#FFFFFF0A] border-sm w-full max-w-[5rem] h-[6.25rem]">
                    <img
                      src="/images/country-club-logo.png"
                      alt="Country Club"
                      className="w-[3.5rem] h-auto"
                    />
                  </div>
                  <DialogDescription className="flex flex-col text-base m-0">
                    {renderDescription(target)}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex flex-col gap-6 py-6 border-b border-[#FFFFFF1F]">
                {renderForm(target)}
              </div>
              <div className="flex w-full gap-3 pt-6">
                <DialogClose asChild>
                  <ModalButton variant="secondary">Cancel</ModalButton>
                </DialogClose>
                <ModalButton variant="primary">Submit request</ModalButton>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </ClubFormDialogContext.Provider>
  );
}
