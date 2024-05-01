/** @format */
import { IoIosMenu } from "react-icons/io";

function Navbar() {
    return (
        <div className='bg-gradient py-6 w-full px-6 flex justify-between'>
            <IoIosMenu size={28} color='#fff' />
            <span className='text-gray-700 font-semibold text-xl'>Startup</span>
        </div>
    );
}

export default Navbar;
