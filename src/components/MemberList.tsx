import { MemberListItem } from "./MemberListItem";
import type { Member } from "@/types/Member";

interface MemberListProps {
  members: Member[];
}

export function MemberList({ members }: MemberListProps) {
  return (
    <div className="flex flex-col gap-y-1.5 w-full overflow-y-auto bg-[#0E0D12]">
      {members.map((member) => (
        <MemberListItem key={member.id} member={member} />
      ))}
    </div>
  );
}
