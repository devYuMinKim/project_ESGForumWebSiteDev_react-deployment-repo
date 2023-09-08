import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Track } from "../../../types/admin.interface";

interface StatisticsCardProps {
  color: string,
  name: Track,
  icon: any,
  title: string,
  value?: string | number,
  footer?: any,
  onClick?: Track[]
  track?: Track
  setTrack?: React.Dispatch<React.SetStateAction<Track>>
}

const StatisticsCard: React.FC<StatisticsCardProps> =
  ({ color, name, icon, title, value, footer, onClick, track, setTrack }: StatisticsCardProps) => {

    const isTrack = (
      onClicks: Track[] | undefined,
      name: Track
    ) => {
      const isTrack = onClicks?.filter((onClick) => onClick === name);
      return isTrack?.length ? "hover:cursor-pointer" : "";
    }

    const isTracked = (
      track: Track | undefined,
      name: Track) => {
      if (track == name) {
        return "";
      }

      if (!track) {
        return "";
      }

      return "opacity-40";
    }

    const changeTrack = (name: Track) => {
      if (setTrack) {
        setTrack(name);
      }
    }

    const istrack = isTrack(onClick, name);

    return (
      <Card
        onClick={istrack ? () => changeTrack(name) : () => { }}
        className={`border-2 ${isTracked(track, name)} border-slate-100 rounded-lg ${istrack} transition-opacity`}>
        <CardHeader
          variant="filled"
          className={`rounded-lg absolute -mt-4 grid h-14 w-14 place-items-center shadow-lg ${color}`}
        >
          {icon}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <Typography variant="small" className="font-normal text-blue-gray-600 mb-1">
            {title}
          </Typography>
          <Typography variant="h6" color="blue-gray">
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
