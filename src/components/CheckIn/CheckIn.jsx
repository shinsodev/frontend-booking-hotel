// import React from 'react'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import '../../../src/datepicker.css'
import { BsCalendar } from "react-icons/bs"
import { useState } from "react"

const CheckIn = () => {
    const [startDate, setStartDate] = useState(false);

    return (
        <div className="relative flex-1 items-center h-full">
            <div className="absolute z-10 pr-8 right-0 top-7">
                <div>
                    <BsCalendar className="text-accent text-base"/>
                </div>
            </div>

            <DatePicker
                className="w-full h-full"
                selected={startDate}
                placeholderText="Check in"
                onChange={(date) => setStartDate(date)}
            />
        </div>
        
    )
}

export default CheckIn