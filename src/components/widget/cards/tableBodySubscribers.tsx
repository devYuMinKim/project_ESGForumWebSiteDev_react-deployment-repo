import { Typography } from "@material-tailwind/react";
import { SubscriberData as Subscribers } from "../../../data";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const tdTextContent = "font-medium text-blue-gray-600 text-center";

interface TBodySubscribersProps {
  subscribers: Subscribers[]
}

const TBodySubscribers: React.FC<TBodySubscribersProps> = (data) => (
  <tbody>
    {data.subscribers.map(
      ({ affiliation, name }, key) => {
        const className = `py-3 px-6 ${key === data.subscribers.length - 1
          ? ""
          : "border-b border-blue-gray-50"
          }`;

        return (
          <tr
            key={name}
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
              <PlusCircleIcon className="font-medium w-5 cursor-pointer"></PlusCircleIcon>
            </td>
          </tr>
        );
      }
    )}
  </tbody>
)

export default TBodySubscribers;