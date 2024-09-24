import React, { useContext } from 'react'
import AdultDropdown from '../AdultsDropdown/AdultsDropdown'
import KidsDropdown from '../KidsDropdown/KidsDropdown'
import CheckIn from '../CheckIn/CheckIn'
import CheckOut from '../CheckOut/CheckOut'
import { RoomContext } from '../../context/RoomContext'

const BookForm = () => {
  const { handleClick } = useContext(RoomContext);

  return (
    <form className='h-[300px] w-full lg:h-[70px]'>
        <div className='flex flex-col w-full h-full lg:flex-row'>
            <div className='flex-1 border-r'><CheckIn/></div>
            <div className='flex-1 border-r'><CheckOut/></div>
            <div className='flex-1 border-r'><AdultDropdown/></div>
            <div className='flex-1 border-r'><KidsDropdown/></div>

            {/* btn  */}
            <button className='btn btn-primary'
              type='submit'
              onClick={(e) => handleClick(e)}
            >Check now</button>
        </div>
    </form>
  )
}

export default BookForm
