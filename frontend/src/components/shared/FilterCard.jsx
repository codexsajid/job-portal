import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: [
            "Andheri",
            "Thane",
            "Powai",
            "Navi Mumbai",
            "Dadar",
            "Kurla",
            "Chembur",
            "Bandra",
            "Ghatkopar",
            "Vashi"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Engineer",
            "Data Scientist",
            "Full Stack Developer",
            "HR Recruiter",
            "DevOps Engineer",
            "Healthcare Analyst",
            "Digital Marketing Executive",
            "Mobile App Developer",
            "Business Analyst"
        ]
    },

];
const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue])
    return (
        <div className='w-full p-3 sm:p-4'>
            <h1 className='font-bold text-base sm:text-lg mb-4'>Filter Jobs</h1>
            <hr className='mb-4' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((item, index) => (
                        <div key={index} className='mb-5'>
                            <h2 className='font-semibold text-sm sm:text-base mb-3'>{item.filterType}</h2>
                            <div className='space-y-2'>
                                {
                                    item.array.map((data, index1) => {
                                        const itemId = `id${index}-${index1}`
                                        return (
                                            <div className='flex items-center gap-2' key={index1}>
                                                <RadioGroupItem value={data} id={itemId} className={"border border-gray-300"} />
                                                <Label htmlFor={itemId} className={"text-xs sm:text-sm cursor-pointer"}>{data}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard