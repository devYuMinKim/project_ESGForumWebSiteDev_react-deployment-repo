import { FC } from 'react';
import p1 from '../imgs/p-1.jpg'
import p2 from '../imgs/p-2.jpg'
import p3 from '../imgs/p-3.jpg'
import p4 from '../imgs/p-4.jpg'

const Esg: FC = () => {
  return (
    <div className=" mb-[200px]">
      <div className="mb-5 text-3xl text-center ">ESG 실천이란?</div>
      <div className="mb-5 text-center ">뜻을 같이하는 대학인들이 힘을 합쳐 다음을 실천하는 것.</div>

      <div className="flex justify-center">
        <div className='w-9/12'>
          <div className="grid grid-cols-2 gap-0 text-left text-white">

            {/* css 이상하게 먹음 */}

          {/* 1 */}
          <div className="relative bg-cover h-80 wrap-ufesgi hover:grayscale" style={{backgroundImage:`url('${p1}')`}}>
              <div className="absolute z-10 w-full h-full duration-700 border-white hover:border-solid hover:border-[40px]"></div>
              <div className="esg-text ">
                <div className="text-2xl">연구 및 실천 프로그램 개발</div>
                <p>기후변화 대응을 위한 ESG 경영의 정당성과 필요성을 입증하고</p>
                <p>실천 가능한 프로그램을 개발</p>
              </div>
          </div>

          {/* 2 */}
          <div className="relative bg-cover wrap-ufesgi h-80 hover:grayscale" style={{ backgroundImage: `url('${p2}')` }} >
              <div className="absolute z-10 w-full h-full duration-700 border-white hover:border-solid hover:border-[40px]"></div>
              <div className="esg-text ">
                <div className="text-2xl">ESG가치의 내재화</div>
                <p>ESG의 가치를 대학의 교육, 연구 , 행정에 내재화</p>
              </div>
          </div>
          {/* 3 */}
          <div className="relative bg-cover wrap-ufesgi h-80 hover:grayscale" style={{ backgroundImage: `url('${p3}')` }}>
              <div className="absolute z-10 w-full h-full duration-700 border-white hover:border-solid hover:border-[40px]"></div>
              <div className="esg-text">
                <div className="text-2xl">활동 지원</div>
                <p>청년들의 지속가능한 미래와 ESG 가치를 위한 실천 활동 지원</p>
              </div>
            </div>

          {/* 4 */}
            <div className="relative bg-cover wrap-ufesgi h-80 hover:grayscale" style={{ backgroundImage: `url('${p4}')` }}>
              <div className="absolute z-10 w-full h-full duration-700 border-white hover:border-solid hover:border-[40px]"></div>
              <div className="esg-text">
                <div className="text-2xl">실천 네트워크 구축</div>
                <p>대학, 시민사회, 지방자치단체, ESG 혁신경영 기업과의 </p>
                <p>실천 네트워크 구축</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </ div >
  );
};

export default Esg;
