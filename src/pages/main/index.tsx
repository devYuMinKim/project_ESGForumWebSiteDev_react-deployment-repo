import "./App.css";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Ufesgi from "../../components/main/Ufesgi";
import Esg from "../../components/main/Esg";

import mainImg from "../../assets/main/main-bg.png";

const Main: FC = () => {
  return (
    <>
      {
        <>
          <div className="relative block w-screen h-screen m-auto mt-1 text-center">
            <div
              style={{ backgroundImage: `url('${mainImg}')` }}
              className="block w-full h-full bg-no-repeat bg-contain"
            />
          </div>
          <Ufesgi />
          <Esg />
        </>
      }
    </>
  );
};

export default Main;
