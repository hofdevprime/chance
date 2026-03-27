import { MoreVertical } from "lucide-react";
import type { Member } from "@/types/Member";

interface MemberListItemProps {
  member: Member;
}

export function MemberListItem({ member }: MemberListItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#151419] rounded-xs">
      <div className="relative size-12 shrink-0 overflow-hidden rounded-sm">
        <img
          src={member.avatarUrl}
          alt={member.displayName}
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-y-1.5">
        <span className="truncate text-sm text-white font-[Google_Sans_Flex] leading-tight">
          {member.displayName}
        </span>
        <span className="truncate text-xs text-[#FFFFFF66] font-[Google_Sans_Flex]">
          {member.handle}
        </span>
      </div>

      <MoreVertical size={14} className="shrink-0 text-white" />
    </div>
  );
}
