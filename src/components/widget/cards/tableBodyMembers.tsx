import { Typography } from "@material-tailwind/react";
import { MemberData, MemberData as Members } from "../../../data";
import axios from "axios";

const tdTextContent = "font-medium text-blue-gray-600 text-center";
const apiUrl = process.env.REACT_APP_API_URL;

export const findChairMan = (members: MemberData[]) => {
  for (const member of members) {
    if (member.pivot.note === "1") {
      return member.name;
    }
  }

  return "공석";
}

const deleteMember = (members: MemberData[], id2: number) => {
  const newMember = members.filter((member) => member.pivot.id2 !== id2);
  return newMember;
}

const appointmentHandler = async (
  id: number,
  m_id: number,
  setMembers: React.Dispatch<React.SetStateAction<Members[]>>,
  setChairman: React.Dispatch<React.SetStateAction<string>>,) => {
  try {
    // 수정 - 위원장 임명
    const response = await axios.put(`${apiUrl}/committees/${id}/members/${m_id}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (response.status === 201) {
      const newMembersInfo = response.data;
      setMembers(newMembersInfo);
      setChairman(findChairMan(newMembersInfo));
      window.alert("위원장 임명 완료");
    }
  }
  catch (error) {
    window.alert("오류가 발생했습니다. 다시 시도하세요.");
  }
}

const deleteHandler = async (
  id: number,
  m_id: number,
  members: MemberData[],
  setMembers: React.Dispatch<React.SetStateAction<Members[]>>,
  setChairman: React.Dispatch<React.SetStateAction<string>>,) => {
  try {

    const flag = window.confirm("삭제 하시겠습니까?");
    // 삭제
    if (flag) {
      const response = await axios.delete(`${apiUrl}/committees/${id}/members/${m_id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (response.status === 204) {
        const newMember = deleteMember(members, m_id);
        setMembers(newMember);
        setChairman(findChairMan(newMember));
        window.alert("삭제 완료");
      }
    }
  }
  catch (err) {
    window.alert("오류가 발생했습니다. 다시 시도하세요.");
  }
}

interface TBodyMembersProps {
  c_id: number
  members: Members[],
  setMembers: React.Dispatch<React.SetStateAction<Members[]>>,
  setChairman: React.Dispatch<React.SetStateAction<string>>
}

const TBodyMembers: React.FC<TBodyMembersProps> = ({ c_id, members, setMembers, setChairman }) => {
  return (
    <tbody>
      {members.map(
        ({ pivot, name, affiliation }, key) => {
          const className = `py-3 px-1 ${key === members.length - 1
            ? ""
            : "border-b border-blue-gray-50"
            }`;

          return (
            <tr
              key={key}
              className="transition-shadow hover:shadow-inner"
            >
              <td className={className}>
                <Typography
                  variant="small"
                  className={tdTextContent}
                >
                  {name ? name : "불러오지 못했습니다.."}
                </Typography>
              </td>
              <td className={className}>
                <Typography
                  variant="small"
                  className={tdTextContent}
                >
                  {affiliation ? affiliation : "불러오지 못했습니다.."}
                </Typography>
              </td>
              <td className={className}>
                <Typography
                  variant={`${(pivot.note === "1") ? "h6" : "small"}`}
                  className={tdTextContent}
                >
                  {(pivot.note === "1") ? "위원장" : (pivot.note === null) ? "일반 회원" : "불러오지 못했습니다.."}
                </Typography>
              </td>
              <td className={`${className} flex justify-center space-x-2`}>
                <button
                  className={"w-15 bg-slate-600 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg"}
                  onClick={async () => appointmentHandler(c_id, pivot.id2, setMembers, setChairman)}
                >
                  위원장 임명
                </button>
                <button
                  className={"w-10 bg-red-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg"}
                  onClick={async () => deleteHandler(c_id, pivot.id2, members, setMembers, setChairman)}
                >
                  삭제
                </button>
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  )
}

export default TBodyMembers;