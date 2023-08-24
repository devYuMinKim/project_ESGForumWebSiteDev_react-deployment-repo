import { Typography } from "@material-tailwind/react";
import { CommitteeData as Committee } from "../../../data";
import { useNavigate } from "react-router-dom";

const MAX_LENGTH = 24;
const tdTextContent = "font-medium text-blue-gray-600 text-center";

interface TBodyCommitteeProps {
  committees: Committee[]
}

const TextTruncate = (text: string) => {
  if (text.length <= MAX_LENGTH) {
    return text;
  }

  const truncatedText = text.substring(0, MAX_LENGTH) + '...';

  return truncatedText;
};

const TBodyCommittee: React.FC<TBodyCommitteeProps> = ({
  committees,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`committee/${id}`);
    // navigate(`/`);
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