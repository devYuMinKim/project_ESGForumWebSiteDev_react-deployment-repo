import React from "react";
import { CommitteeMember } from "../../../types/committee.interface";

const CommitteeTableRow: React.FC<{ member: CommitteeMember }> = ({
  member,
}) => (
  <tr>
    <td className="p-2 whitespace-nowrap">
      <div className="font-medium text-gray-800">{member.name}</div>
    </td>
    <td className="p-2 whitespace-nowrap">
      <div className="text-left">{member.affiliation}</div>
    </td>
    <td className="p-2 whitespace-nowrap">
      <div className="text-left">{member.email}</div>
    </td>
    <td className="p-2 whitespace-nowrap">
      {member.pivot.note === "위원장" ? (
        <div className="text-left font-medium text-green-500">
          {member.pivot.note}
        </div>
      ) : (
        <div className="text-left font-medium text-gray-400">
          {member.pivot.note}
        </div>
      )}
    </td>
  </tr>
);

export default CommitteeTableRow;
