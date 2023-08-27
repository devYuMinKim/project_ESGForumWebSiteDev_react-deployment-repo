import { Typography } from "@material-tailwind/react";
import { User } from "../../../data";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const tdTextContent = "font-medium text-blue-gray-600 text-center";
const apiUrl = "http://127.0.0.1:8000/api";

const approvalHandler = async (name: string, affiliation: string) => {
  try {
    const response = await axios.put(`${apiUrl}/users/approval`, {
      name,
      affiliation
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
  setAssetApplicants: React.Dispatch<React.SetStateAction<User[]>>,
}

const TBodyApplicants: React.FC<TBodyApplicantsProps> = ({ applicants, setAssetApplicants }) => (
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
                  const isApprovaled = await approvalHandler(name, affiliation);
                  if (isApprovaled) {
                    setAssetApplicants(applicants.filter((applicant) => applicant.name !== name && applicant.email !== email))
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