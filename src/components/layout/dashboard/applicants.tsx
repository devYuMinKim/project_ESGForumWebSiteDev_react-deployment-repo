import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Member, ApplicantsManagement } from "../../../types/admin.interface";
import authenticatedAxios from "../../../services/request.service";
import Spinner from "./spinner";
import TableHead from "../table/tableHead";
import { useEffect, useState } from "react";
import { selectMember } from "../../../services/member.service";

interface ApplicantsProps {
  setApplicantsCount: React.Dispatch<React.SetStateAction<number>>,
}

const Applicant: React.FC<ApplicantsProps> = ({
  setApplicantsCount,
}) => {

  const [applicants, setApplicants] = useState<Member[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [manage, setManage] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authenticatedAxios.get<Member[]>("/applicants");

        if (response.status === 200) {
          const applicants: Member[] = response.data;

          setReady(true);
          setApplicants(applicants);
          setApplicantsCount(applicants.length);
        }
      } catch (error) {
        window.alert("오류가 발생했습니다.");
      }
    };

    fetchData();
  }, [])

  const tdTextContent = "font-medium text-blue-gray-600 text-center";

  const managementHandler = async (ids: number[], managementValue: ApplicantsManagement = 'approval') => {

    const isApproval = managementValue === 'approval';

    const flagMessage = (isApproval)
      ? "허가 하시겠습니까?"
      : "반려 하시겠습니까?";

    const flag = window.confirm(flagMessage);

    if (!flag) {
      return false;
    }

    try {
      const { status } = await authenticatedAxios.put(`/members/${managementValue}`, {
        ids
      });

      if (status === 201) {
        const message = (isApproval)
          ? "허가"
          : "반려";

        window.alert(`${message} 완료`);
        setApplicantsCount(applicants?.length - selected?.length);
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
            <div className="absolute bottom-5 right-10 flex items-center">
              <div className={`space-x-5 ${selected?.length ? "" : "opacity-0"} transition-opacity`}>
                <button
                  className={"w-15 bg-slate-600 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                  onClick={async () => {
                    const isApprovaled = await managementHandler(selected);
                    if (isApprovaled) {
                      setApplicants([...applicants].filter((applicant) => !(selected.includes(applicant.id))));
                    }
                  }}
                >
                  허가 하기
                </button>
                <button
                  className={"w-15 bg-red-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                  onClick={async () => {
                    const isRejected = await managementHandler(selected, "rejection");
                    if (isRejected) {
                      setApplicants([...applicants].filter((applicant) => !(selected.includes(applicant.id))));
                    }
                  }
                  }
                >
                  반려 하기
                </button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0 overflow-y-scroll">
            <table className="w-full min-w-[840px] table-auto">
              <TableHead topics={["", "이름", "이메일", "소속", "포럼 직위"]} px="px-1" />
              <tbody>
                {applicants.map(
                  ({ email, id, affiliation, name, note }, key) => {
                    const className = `py-3 px-1 ${key === applicants.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr
                        key={id}
                        className={`transition-shadow ${selected.includes(id)
                          ? "bg-slate-50"
                          : ""}`}
                        onClick={() => selectMember(id, manage, selected, setManage, setSelected)}
                      >
                        <td className={`${className} flex justify-center items-center`}>
                          <div
                            className="h-full"
                            onChange={() => selectMember(id, manage, selected, setManage, setSelected)}>
                            <input
                              type="checkbox"
                              checked={selected.includes(id)}
                              className="rounded"
                            />
                          </div>
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
                            {email}
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
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {note}
                          </Typography>
                        </td>
                        {/* <td className={`${className} flex justify-center space-x-2 h-full py-3`}> */}
                        {/* <button
                            className={"w-15 bg-slate-600 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                            onClick={async () => {
                              const isApprovaled = await managementHandler(id);
                              if (isApprovaled) {
                                setApplicants([...applicants].filter((applicant) => applicant.id !== id));
                              }
                            }}
                          >
                            허가
                          </button>
                          <button
                            className={"w-15 bg-red-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg my-1"}
                            onClick={async () => {
                              const isApprovaled = await managementHandler(id, "rejection");
                              if (isApprovaled) {
                                setApplicants([...applicants].filter((applicant) => applicant.id !== id));
                              }
                            }}
                          >
                            반려
                          </button> */}
                        {/* </td> */}
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