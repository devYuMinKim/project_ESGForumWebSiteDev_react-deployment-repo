import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Member } from "../../../types/admin.interface";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import authenticatedAxios from "../../../services/request.service";
import Spinner from "./spinner";
import TableHead from "../table/tableHead";
import { useEffect, useState } from "react";

interface ApplicantsProps {
  applicantsCount: number
  setApplicantsCount: React.Dispatch<React.SetStateAction<number>>,
}

const Applicant: React.FC<ApplicantsProps> = ({
  applicantsCount,
  setApplicantsCount,
}) => {

  const getNotes = (members: Member[]) => {
    const notes = members.map((member) => {
      return member.note;
    });

    return notes;
  }

  const shadow = (notes: (string | number | null | undefined)[]) => {
    const shadow = [...notes].map((note) => {
      if (!note || note === null) {
        return "일반 회원";
      }

      return note;
    });

    return shadow;
  }

  const [applicants, setApplicants] = useState<Member[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [notes, setNote] = useState<(number | null | undefined | string)[]>(getNotes(applicants));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authenticatedAxios.get<Member[]>("/applicants");

        if (response.status === 200) {
          const applicants: Member[] = response.data; // 데이터를 MemberData 타입 배열로 변환

          setReady(true);
          if (applicants) {
            setApplicants(applicants);
            setApplicantsCount(applicants.length);
            const notes = getNotes(applicants);
            setNote(notes);
          }
        }
      } catch (error) {

      }
    };

    fetchData();
  }, [])


  const tdTextContent = "font-medium text-blue-gray-600 text-center";

  const approvalHandler = async (id: number) => {
    const flag = window.confirm("허가 하시겠습니까?");

    if (!flag) {
      return false;
    }

    try {
      const response = await authenticatedAxios.put("/members/approval", {
        id
      });

      if (response.status === 201) {
        window.alert("허가 완료");
        setApplicantsCount(--applicantsCount);
        return true;
      }

      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    } catch (error) {
      window.alert("오류가 발생했습니다. 다시 시도하세요.");
    }
  }



  return (
    <div className="relative">
      <Spinner flag={ready} />
      <div className={`${ready ? "" : "opacity-0"} transition-opacity`}>
        <Card
          className="border-2 border-slate-100 rounded-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-1">
              사이트 가입 신청자 정보
            </Typography>
          </CardHeader>
          <CardBody className="p-0 overflow-y-scroll">
            <table className="w-full min-w-[840px] table-auto">
              <TableHead topics={["email", "id", "이름", "소속", "포럼 직위", "허가 하기"]} px="px-10" />
              <tbody>
                {applicants.map(
                  ({ email, id, affiliation, name }, key) => {
                    const className = `h-15 py-3 px-6 ${key === applicants.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr
                        key={email}
                        className="transition-shadow hover:shadow-inner">
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {id}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {affiliation}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {`${[notes][key] === null ? "일반 회원" : shadow(notes)[key]}`}
                          </Typography>
                        </td>
                        <td className={`${className} flex justify-center`}>
                          <div
                            onClick={async () => {
                              const isApprovaled = await approvalHandler(id);
                              if (isApprovaled) {
                                setApplicants([...applicants].filter((applicant) => applicant.email !== email));
                                setApplicantsCount(--applicantsCount);
                              }
                            }}
                          >
                            <PlusCircleIcon className="font-medium w-5 cursor-pointer" />
                          </div>
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

export default Applicant;