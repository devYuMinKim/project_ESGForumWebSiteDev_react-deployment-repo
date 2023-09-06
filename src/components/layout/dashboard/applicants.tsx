import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { User, UserDataResponse } from "../../../types/admin.interface";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import authenticatedAxios from "../../../services/request.service";
import Spinner from "./spinner";
import TableHead from "../table/tableHead";
import { useEffect, useState } from "react";

interface ApplicantsProps {
  usersCount: number
  applicantsCount: number
  setApplicantsCount: React.Dispatch<React.SetStateAction<number>>,
  setUsersCount: React.Dispatch<React.SetStateAction<number>>,
}

const Applicant: React.FC<ApplicantsProps> = ({
  usersCount,
  applicantsCount,
  setApplicantsCount,
  setUsersCount,
 }) => {

  const [applicants, setApplicants] = useState<User[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authenticatedAxios.get<UserDataResponse>("/users");
        console.log(response)
        if (response.status === 200) {
          const applicants: User[] = response.data.applicants; // 데이터를 MemberData 타입 배열로 변환

          setReady(true);
          if (applicants) {
            setApplicants(applicants);
            setApplicantsCount(applicants.length);
          }
        }
      } catch (error) {

      }
    };

    fetchData();
  }, [])


  const tdTextContent = "font-medium text-blue-gray-600 text-center";

  const approvalHandler = async (email: string) => {
    const flag = window.confirm("허가 하시겠습니까?");

    if (!flag) {
      return false;
    }

    try {
      const response = await authenticatedAxios.put("/users/approval", {
        email
      });

      if (response.status === 201) {
        window.alert("허가 완료");
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
              사이트 가입 대기자 정보
            </Typography>
          </CardHeader>
          <CardBody className="p-0 overflow-y-scroll">
            <table className="w-full min-w-[640px] table-auto">
              <TableHead topics={["이메일", "소속", "이름", "허가 하기"]} px="px-10" />
              <tbody>
                {applicants.map(
                  ({ email, affiliation, name }, key) => {
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
                            {affiliation}
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
                        <td className={`${className} flex justify-center`}>
                          <div
                            onClick={async () => {
                              const isApprovaled = await approvalHandler(email);
                              if (isApprovaled) {
                                setApplicants([...applicants, applicants[key]]);
                                setApplicantsCount(--applicantsCount);
                                setUsersCount(++usersCount);
                                setApplicants(applicants.filter((applicant) => applicant.email !== email));
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