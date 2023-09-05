import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import TableHead from "../../components/layout/table/tableHead"
import { User, UserDataResponse } from "../../types/admin.interface";
import { useEffect, useState } from "react";
import Spinner from "../../components/layout/dashboard/spinner";
import authenticatedAxios from "../../services/request.service";

const tdTextContent = "font-medium text-blue-gray-600 text-center";
const apiUrl = process.env.REACT_APP_API_URL;

const Users: React.FC = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const combineUsers = (usersData: UserDataResponse) => {
    const combinedUsersData = [...usersData.applicants, ...usersData.users];
    console.log(combinedUsersData);
    return combinedUsersData;
  }

  const getAutortity = (authorityData: null | number) => {
    console.log(authorityData)
    switch (authorityData) {
      case 1: return "관리자";
      case 0: return "일반 사용자";
      default: return "대기자";
    }
  }

  const getNewUSers = (members: User[], email: string) => {
    const newMember = members.filter((member) => member.email !== email);
    return newMember;
  }

  const deleteUser = async (email: string) => {
    try {
      const flag = window.confirm("삭제 하시겠습니까?");

      if (!flag) return;

      const response = await authenticatedAxios.delete(`${apiUrl}/users/${email}`);

      if (response.status === 204) {
        const newUsers = getNewUSers(users, email);
        setUsers(newUsers);
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

  useEffect(() => {
    const fetchData = async () => {
      const response: UserDataResponse = (await authenticatedAxios.get(`users`)).data;

      const usersData = combineUsers(response);
      setReady(true);
      setUsers(usersData);
    }
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
              <TableHead topics={["이메일", "소속", "이름", "권한", ""]} px="px-5" />
              <tbody>
                {users.map(
                  ({ email, affiliation, name, authority }, key) => {
                    const className = `py-3 px-1 ${key === users.length - 1
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
                        <td className={className}>
                          <Typography
                            variant="small"
                            className={tdTextContent}
                          >
                            {getAutortity(authority)}
                          </Typography>
                        </td>
                        <td className={`${className} h-full`}>
                          <button
                            className={"w-10 bg-red-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg"}
                            onClick={async () => deleteUser(email)}
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
    </div>)
}

export default Users;