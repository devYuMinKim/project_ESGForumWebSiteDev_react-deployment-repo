import './App.css';
import { FC } from 'react';
import { Routes, Route } from "react-router-dom";

// import Navbar from './components/Navbar'; 유민이 것으로 교체
import Ufesgi from '../../components/main/Ufesgi';
import Esg from '../../components/main/Esg';
import Footer from '../../components/layout/footer/Footer';
import Singlepage from '../../components/main/Singlepage';

import mainImg from '../../assets/main/main-bg.png';

const Main: FC = () => {
  return (
    <>
      {/* 🟢 1. Navbar */}

      <Routes>
        <Route path="/" element={
          <>
            {/* 🟢 2. 메인 이미지 */}
            <div className="relative block w-screen h-screen m-auto mt-1 text-center">
              <div style={{ backgroundImage: `url('${mainImg}')` }} className="block w-full h-full bg-no-repeat bg-contain" />
            </div>

            {/* 🟢 4. FESGI 란? */}
            <Ufesgi />

            {/* 🟢 5. ESG 실천이란? */}
            <Esg />
          </>
        } />
        <Route path="/singlepage" element={<Singlepage />} />
      </Routes>

      {/* 🟢 6. Footer */}
      <Footer />
    </>
  );
}

export default Main;