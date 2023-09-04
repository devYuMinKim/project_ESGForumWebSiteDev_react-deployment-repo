import React from 'react'
import{ FaUniversity } from 'react-icons/fa'
import { FaPeopleGroup } from "react-icons/fa6";
import {FaUserGraduate, FaEarthAsia ,FaRegHandshake ,FaPersonCircleCheck} from "react-icons/fa6";
const Ufesgi = () => {
  return (
    <div className="mb-12 -mt-4">
      <div className="mb-10 text-3xl text-center" >UFESGI 란?</div>
      <div className="grid grid-cols-3 gap-0 text-center">
        {/* 1. University */}
        <div className="wrap-ufesgi bg-[#41483c15] flex items-center justify-center h-14">
          <FaUserGraduate/> 
          <span className="pl-4 prefix_ufesgi">U</span>niversity
        </div>

        {/* 2. Forum */}
        <div className="wrap-ufesgi bg-[#25a95136]  flex items-center justify-center h-14">
          <FaPeopleGroup/>
          <span className="pl-4 prefix_ufesgi">F</span>orum
        </div>

        {/* 3. Environmental */}
        <div className="wrap-ufesgi bg-[#41483c15]  flex items-center justify-center h-14">
          <FaEarthAsia/>
          <span className="pl-4 prefix_ufesgi">E</span>nvironmental
        </div>

        {/* 4. Social */}
        <div className="wrap-ufesgi bg-[#25a95136]  flex items-center justify-center h-14">
          <FaRegHandshake/>
          <span className="pl-4 prefix_ufesgi">S</span>ocial
        </div>

        {/* 5. Governance */}
        <div className="wrap-ufesgi bg-[#41483c15]  flex items-center justify-center h-14">
          <FaUniversity/>
          <span className="pl-4 prefix_ufesgi">G</span>overnance
        </div>

        {/* 6. Implementation */}
        <div className="wrap-ufesgi bg-[#25a95136]  flex items-center justify-center h-14">
          <FaPersonCircleCheck/>
          <span className="pl-4 prefix_ufesgi">I</span>mplementation
        </div>
      </div>
    </div>
  )
}

export default Ufesgi
