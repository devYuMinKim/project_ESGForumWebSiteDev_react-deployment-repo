import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export interface onClick {
  name: string,
  to: "members" | "users"
}

const getLink = (onClicks: onClick[] | undefined, name: string) => {
  const isLinked = onClicks?.filter((onClick) => onClick.name == name);

  return isLinked?.length ? isLinked[0].to : "";
}

interface StatisticsCardProps {
  color: string,
  name: string,
  icon: any,
  title: string,
  value: string | number,
  footer?: any,
  onClick?: onClick[]
}

const StatisticsCard =
  ({ color, name, icon, title, value, footer, onClick }: StatisticsCardProps) => {
    const navigate = useNavigate();

    const handleRowClick = (to: string) => {
      navigate(`${to}`);
    };

    const isLinked = getLink(onClick, name);
    return (
      <Card
        onClick={isLinked ? () => handleRowClick(isLinked) : () => { }}
        className={`border-2 border-slate-100 rounded-lg ${isLinked ? "hover:cursor-pointer" : ""}`}>
        <CardHeader
          variant="filled"
          className={`rounded-lg absolute -mt-4 grid h-16 w-16 place-items-center shadow-lg ${color}`}
        >
          {icon}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            {title}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {value}
          </Typography>
        </CardBody>
        {footer && (
          <CardFooter className="border-t border-blue-gray-50 p-4">
            {footer}
          </CardFooter>
        )}
      </Card>
    );
  }

export default StatisticsCard;
