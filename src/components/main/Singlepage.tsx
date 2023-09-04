import React, { FC } from 'react';


const SinglePage:FC = () => {
  return (
    <>
      <div className="h-[700px]">
        {/* 전체 틀 INNER */}
        <div className="h-[500px]  w-[1200px] mx-auto my-0 mb-6">

          {/* 테이블 */}
          <table className='w-[1200px] mt-6  text-center border-t-4 border-b-4  border-stone-500'>
            <thead>
              <tr className="pr-5 border-b-2 border-stone-400">
                <th className='px-1 bg-stone-200'>제목</th>
                <td className='px-4'>ESG Forum 사이트 개설</td>

              </tr>
            </thead>
            <tbody >
              <tr >
                <th className="border-b-2 border-stone-400 bg-stone-200">작성일자</th>
                <td className="border-b-2 border-stone-400">1994.10.01</td>

              </tr>
              <tr>
                <th className="border-b-2 border-stone-400 bg-stone-200">작성자</th>
                <td className="border-b-2 border-stone-400">박성철</td>

              </tr>
              <tr className="h-[30px]">
                <th className="h-[30px]  border-b-2 border-stone-400 bg-stone-200">첨부파일</th>
                <td>안녕하세요.txt</td>
              </tr>
            </tbody>
          </table>

          
          {/* e에디터 들어갈 부분 */}
          <div className="mb-[10psx] bg-red-300 h-[500psx]">

          </div>
        </div>

        {/* 내용 */}


      </div>
    </>
  )
}

export default SinglePage