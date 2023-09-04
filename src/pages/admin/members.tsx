import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import TableHead from "../../components/layout/table/tableHead"
import { Member } from "../../types/admin.interface";
import { useEffect, useState } from "react";
import FormInput from "../../components/layout/login";
import Spinner from "../../components/layout/dashboard/spinner";
import authenticatedAxios from "../../services/request.service";

const Members: React.FC = () => {

  const tdTextContent = "font-medium text-blue-gray-600 text-center";

  const shadow = (notes: (string | number | null | undefined)[]) => {
    const shadow = [...notes].map((note) => {
      if (note === null) {
        return "일반 회원";
      }
      return note;
    })
    return shadow;
  }

  const getNewMembers = (members: Member[], id: number) => {
    const newMember = members.filter((member) => member.id !== id);
    return newMember;
  }

  // 직위 변경
  const positionChange = async (id: number, note: any, setMembers: React.Dispatch<React.SetStateAction<Member[]>>) => {
    try {
      const response = await authenticatedAxios.put("/members", {
        id,
        note
      });
      
      if (response.status === 201) {
        const newMembersInfo: Member[] = response.data;
        setMembers(newMembersInfo);
        window.alert("수정 완료");
        setReady(true);
        return;
      }
      
      window.alert("문제가 발생했습니다. 다시 시도하세요.");
      return;
      
    } catch (error) {
      window.alert("문제가 발생했습니다. 다시 시도하세요.");
      return;
    }
  }
  
  // 회원 삭제
  const deleteMember = async (id: number, members: Member[], setMembers: React.Dispatch<React.SetStateAction<Member[]>>, setNote: React.Dispatch<React.SetStateAction<(number | null | undefined | string)[]>>) => {
    try {
      const flag = window.confirm("삭제 하시겠습니까?");

      if (!flag) return;

      const response = await authenticatedAxios.delete(`/members/${id}`);

      if (response.status === 204) {
        const newMembers = getNewMembers(members, id);
        setMembers(newMembers);
        const notes = newMembers.map((member) => {
          return member.note;
        });
        setNote(notes);
        window.alert("삭제 완료");
        return;
      }

      window.alert("문제가 발생했습니다. 다시 시도하세요.");
      return;

    } catch (error) {
      window.alert("문제가 발생했습니다. 다시 시도하세요.");
      return;
    }
  }

  const [ready, setReady] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [notes, setNote] = useState<(number | null | undefined | string)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authenticatedAxios.get<Member[]>("/members");

        if (response.status === 200) {
          const memberData = response.data; // 데이터를 MemberData 타입 배열로 변환

          const notes = memberData.map((member) => {
            return member.note;
          });

          setReady(true);
          setMembers(memberData);
          setNote(notes);
        }
      } catch (error) {

      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Spinner flag={ready} />
      <div className={`${ready ? "m-12" : "hidden"}`}>
        <Card
          className="border-2 border-slate-100 rounded-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-1">
              회원 정보
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <table className="w-full min-w-[300px] table-auto">
              <TableHead topics={["이름", "소속", "포럼 직위", ""]} px="px-5" />
              <tbody>
                {members.map(
                  ({ id, name, affiliation }, key) => {
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
                        <td className={`${className} `}>
                          <div className="flex justify-center">
                            <FormInput
                              id="name"
                              label={""}
                              type="text"
                              autoComplete="name"
                              placeholder={"회원의 직위를 입력하세요."}
                              value={`${[notes][key] === null ? "일반 회원" : shadow(notes)[key]}`}
                              width={"w-24"}
                              margin="m-0"
                              onChange={(e) => {
                                const _note = [...notes];
                                _note[key] = e.target.value;
                                setNote(_note);
                              }}
                            />
                          </div>
                        </td>
                        <td className={`${className} flex justify-center space-x-2 h-full py-3`}>
                          <button
                            className={"w-15 bg-slate-600 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                            onClick={async () => positionChange(id, notes[key], setMembers)}
                          >
                            직위 변경
                          </button>
                          <button
                            className={"w-10 bg-red-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                            onClick={async () => deleteMember(id, members, setMembers, setNote)}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Members;