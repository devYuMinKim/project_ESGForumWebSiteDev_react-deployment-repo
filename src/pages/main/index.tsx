import "./App.css";
import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Ufesgi from "../../components/main/Ufesgi";
import Esg from "../../components/main/Esg";
import Footer from "../../components/layout/footer/Footer";
import Singlepage from "../../components/main/Singlepage";

import mainImg from "../../assets/main/main-bg.png";

const Main: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* 메인 이미지 */}
              <div className="relative block w-screen h-screen m-auto mt-1 text-center">
                <div
                  style={{ backgroundImage: `url('${mainImg}')` }}
                  className="block w-full h-full bg-no-repeat bg-contain"
                />
              </div>

              {/* FESGI 란? */}
              <Ufesgi />

              {/* ESG 실천이란? */}
              <Esg />
            </>
          }
        />
        <Route path="/singlepage" element={<Singlepage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
