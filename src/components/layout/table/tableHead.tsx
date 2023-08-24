import { Typography } from "@material-tailwind/react";

interface Topics {
  topics: string[];
  px: string;
}

const TableHead: React.FC<Topics> = ({ topics, px }) => (
  <thead>
    <tr>
      {topics.map(
        (el) => (
          <th
            key={el}
            className={`border-b border-blue-gray-50 py-3 ${px} text-center`}
          >
            <Typography
              variant="small"
              className="font-bold font-large uppercase text-black text-[15px]"
            >
              {el}
            </Typography>
          </th>
        )
      )}
    </tr>
  </thead>
)

export default TableHead;