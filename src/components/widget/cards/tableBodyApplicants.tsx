import { Typography } from "@material-tailwind/react";
import { User } from "../../../data";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const tdTextContent = "font-medium text-blue-gray-600 text-center";
const apiUrl = process.env.REACT_APP_API_URL;

const approvalHandler = async (email: string) => {
  const flag = window.confirm("허가 하시겠습니까?");

  if (!flag) {
    return false;
  }

  try {
    const response = await axios.put(`${apiUrl}/users/approval`, {
      email
    }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
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

interface TBodyApplicantsProps {
  applicants: User[],
  assetUsers: User[],
  setAssetApplicants: React.Dispatch<React.SetStateAction<User[]>>,
  setAssetUsers: React.Dispatch<React.SetStateAction<User[]>>,
}

const TBodyApplicants: React.FC<TBodyApplicantsProps> = ({ applicants, assetUsers, setAssetUsers, setAssetApplicants }) => (
  <tbody>
    {applicants.map(
      ({ email, affiliation, name }, key) => {
        const className = `py-3 px-6 ${key === applicants.length - 1
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
            <td className={`${className} flex justify-center`}>
              <div
                onClick={async () => {
                  const isApprovaled = await approvalHandler(email);
                  if (isApprovaled) {
                    setAssetUsers([...assetUsers, applicants[key]]);
                    setAssetApplicants(applicants.filter((applicant) => applicant.email !== email));
                  }
                }}
              >
                <PlusCircleIcon className="font-medium w-5 cursor-pointer"></PlusCircleIcon>
              </div>
            </td>
          </tr>
        );
      }
    )}
  </tbody>
)

export default TBodyApplicants;