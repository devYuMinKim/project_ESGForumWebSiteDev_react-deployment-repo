import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import TableHead from "../table/tableHead"
import { User, UserDataResponse } from "../../../types/admin.interface";
import { useEffect, useState } from "react";
import Spinner from "./spinner";
import authenticatedAxios from "../../../services/request.service";

interface UsersProps {
  userCount: number
  setUserCount: React.Dispatch<React.SetStateAction<number>>;
}

const Users: React.FC<UsersProps> = ({
  userCount,
  setUserCount
}) => {
  const [ready, setReady] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response: UserDataResponse = (await authenticatedAxios.get("/users")).data;
      console.log(response)
      const usersData = response.users;
      setReady(true);
      setUsers(usersData);
      setUserCount(usersData.length);
    }
    fetchData();
  }, []);

  const tdTextContent = "font-medium text-blue-gray-600 text-center";

  const combineUsers = (usersData: UserDataResponse) => {
    const combinedUsersData = [...usersData.applicants, ...usersData.users];
    return combinedUsersData;
  }

  const getAutortity = (authorityData: 0 | 1 | null) => {
    if (authorityData === 0) {
      return "일반 사용자"
    }
    return "관리자"
  }

  const getNewUSers = (users: User[], email: string) => {
    const newUsers = users.filter((user) => user.email !== email);
    return newUsers;
  }

  const deleteUser = async (email: string) => {
    try {
      const flag = window.confirm("탈퇴 시키겠습니까?");

      if (!flag) return;

      const response = await authenticatedAxios.delete(`/users/${email}`);

      if (response.status === 204) {
        const newUsers = getNewUSers(users, email);
        setUsers(newUsers);
        setUserCount(--userCount);
        window.alert("탈퇴 완료");
        return;
      }

      window.alert("문제가 발생했습니다. 다시 시도하세요.");
      return;

    } catch (error) {
      window.alert("문제가 발생했습니다. 다시 시도하세요.");
      return;
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
              사이트 가입자 정보
            </Typography>
          </CardHeader>
          <CardBody className="p-0 overflow-y-scroll">
            <table className="w-full min-w-[640px] table-auto">
              <TableHead topics={["이메일", "소속", "이름", "권한", "가입자 관리"]} px="px-5" />
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
                          <div className="flex justify-center">
                            <button
                              className={" bg-red-500 text-white font-bold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg"}
                              onClick={async () => deleteUser(email)}
                            >
                              가입자 탈퇴
                            </button>
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
    </div>)
}

export default Users;