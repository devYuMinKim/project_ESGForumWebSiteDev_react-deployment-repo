import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [signin, setSignin] = useState('bgOff');
  const [login, setLogin] = useState('bgOn');

  return (
    <>
      <nav className="w-screen h-[120px] border-b-4 border-mainColor-300   drop-shadow-lg">
        <div className='flex items-center justify-between w-full h-full px-10'>
          <div className='flex items-center'>
            <h1 className="mr-10 text-xl font-bold sm:text-4xl">
              <Link to="/">ESG Forum</Link>
            </h1>
            <ul className="hidden md:flex">
              {/* min-width: 768px 이상이면 flex */}
              <li className="text-lg font-medium">포럼소개</li>
              <li className="text-lg font-medium">주요사업</li>
              <li className="text-lg font-medium">세미나</li>
              <li className="text-lg font-medium">
                <Link to="/board">자료실</Link>
              </li>
              <li className="text-lg font-medium">회원안내</li>
              <li className="text-lg font-medium">알림마당</li>
            </ul>
          </div>

          {/* 🟡🟡🟡🟡🟡🟡🟡🟡 */}
          {<div className="pr-4 md:flex">
            {/* 회원가입 버튼 */}
            <button
              className={'mr-4 px-3 py-1 mt-1 ' + signin}
              onMouseMove={() => {
                if (signin === 'bgOff') {
                  setSignin('bgOn');
                  setLogin('bgOff');
                }
              }}
              onMouseLeave={() => {
                setLogin('bgOn');
                setSignin('bgOff');
              }}
            >
              회원가입
            </button>

            {/* 로그인 버튼 */}
            <button
               className={'px-5 py-1 mt-1 ' + login}
               onMouseMove={() => {
                 if (login === 'bgOff') {
                   setLogin('bgOn');
                   setSignin('bgOff');
                 }
               }}
             >
               로그인
             </button> 
           </div>}

         </div>

       </nav> 
     </>
   );
};

export default Navbar;
