import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

interface StatisticsCardProps {
  color: string,
  icon: any,
  title: string,
  value: string | number,
  footer?: any
}

const StatisticsCard =
  ({ color, icon, title, value, footer }: StatisticsCardProps) => {
    return (
      <Card
        className="border-2 border-slate-100 rounded-lg">
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
