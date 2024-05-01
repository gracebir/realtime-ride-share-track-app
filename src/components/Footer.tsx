/** @format */

import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <div className='bg-gradient-footer text-white text-2xl flex py-6 px-6 justify-between w-full sticky bottom-0 left-0 right-0'>
            <MdOutlineFavoriteBorder />
            <FaRegClock />
            <IoNotificationsOutline />
        </div>
    );
};

export default Footer;
