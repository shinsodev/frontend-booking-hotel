// import React from 'react'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import '../../../src/datepicker.css'
import { BsCalendar } from "react-icons/bs"
import { useState } from "react"

const CheckOut = () => {
  const [outDate, setOutDate] = useState(false);

    return (
        <div className="relative flex-1 items-center h-full">
            <div className="absolute z-10 pr-8 right-0 top-[1.55rem]">
                <div>
                    <BsCalendar className="text-accent text-base"/>
                </div>
            </div>

            <DatePicker
                className="w-full h-full"
                selected={outDate}
                placeholderText="Check out"
                onChange={(date) => setOutDate(date)}
            />
        </div>
        
    )
}

export default CheckOut