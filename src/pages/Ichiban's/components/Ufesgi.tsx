import React from 'react'
import{ FaUniversity } from 'react-icons/fa'
import { FaPeopleGroup } from "react-icons/fa6";
import {FaUserGraduate, FaEarthAsia ,FaRegHandshake ,FaPersonCircleCheck} from "react-icons/fa6";
const Ufesgi = () => {
  return (
    <div className="mb-12 -mt-4">
      <div className="mb-10 text-3xl text-center" >UFESGI 란?</div>
      <div className="grid grid-cols-3 gap-0 text-center">
        <div className="wrap-ufesgi bg-[#41483c15]"><FaUserGraduate/><span className="pl-4 prefix_ufesgi">U</span>niversity</div>
        <div className="wrap-ufesgi bg-[#25a95136]"><FaPeopleGroup/><span className="pl-4 prefix_ufesgi">F</span>orum</div>
        <div className="wrap-ufesgi bg-[#41483c15]"><FaEarthAsia/><span className="pl-4 prefix_ufesgi">E</span>nvironmental</div>
        <div className="wrap-ufesgi bg-[#25a95136]"><FaRegHandshake/><span className="pl-4 prefix_ufesgi">S</span>ocial</div>
        <div className="wrap-ufesgi bg-[#41483c15]"><FaUniversity/><span className="pl-4 prefix_ufesgi">G</span>overnance</div>
        <div className="wrap-ufesgi bg-[#25a95136]"><FaPersonCircleCheck/><span className="pl-4 prefix_ufesgi">I</span>mplementation</div>
      </div>
    </div>
  )
}

export default Ufesgi
