import { FC } from 'react';

const Footer: FC = () => {
  return (
    <>
      {/* 🟢 6. Footer */}
      <div className=' footer h-[200px] px-40 bottom-0 bg-[#f5f5f5] border-solid border-t-2 border-t-[#dcdcdc] text-[gray]'>
        <div className="pt-4 footer-contant-wrap">
          <div className="grid grid-flow-col grid-rows-3 gap-4 place-items-center">
            <div className="row-span-3 gap-4 text-2xl font-bold place-items-center">대학ESG 실천포럼 
              <span className="text-md">&#40; UFESGI &#41;</span>
            </div>
            <div className="col-span-2"><span className="font-bold">공동의장 &nbsp;&nbsp;</span> 임정근・박홍석 </div>
            <div className="col-span-2 row-span-2"><span className="font-bold">UFESGI</span>  
              &#40;University Forum for ESG Implementation&#41;
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
