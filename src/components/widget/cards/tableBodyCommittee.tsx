import { Typography } from "@material-tailwind/react";
import { CommitteeData as Committee } from "../../../types/admin.interface";
import { useNavigate } from "react-router-dom";

interface TBodyCommitteeProps {
  committees: Committee[]
}

const TBodyCommittee: React.FC<TBodyCommitteeProps> = ({
  committees,
}) => {
  const navigate = useNavigate();

  const tdTextContent = "font-medium text-blue-gray-600 text-center";

  const TextTruncate = (text: string) => {
    const MAX_LENGTH = 24;

    if (text.length <= MAX_LENGTH) {
      return text;
    }

    const truncatedText = text.substring(0, MAX_LENGTH) + "...";

    return truncatedText;
  };

  const handleRowClick = (id: number) => {
    navigate(`committee/${id}`);
  };

  return (
    <tbody>
      {committees.map(
        ({ id, name, explanation }, key) => {
          const className = `py-3 px-6 ${key === committees.length - 1
            ? ""
            : "border-b border-blue-gray-50"
            }`;

          return (
            <tr
              key={id}
              className="font-medium w-10 cursor-pointer transition-shadow hover:shadow-inner"
              onClick={() => handleRowClick(id)}>
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
                  {TextTruncate(name)}
                </Typography>
              </td>
              <td className={className}>
                <Typography
                  variant="small"
                  className={tdTextContent}
                >
                  {TextTruncate(explanation)}
                </Typography>
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  )
}

export default TBodyCommittee;