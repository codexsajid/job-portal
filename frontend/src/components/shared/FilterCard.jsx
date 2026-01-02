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
        <div className='w-full bg-white'>
            <h1>Filter Jobs</h1>
            <hr className='mt-3 mr-5 font-bold' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((item, index) => (
                        <div key={index}>
                            <h1 className='font-bold my-2' >{item.filterType}</h1>
                            {
                                item.array.map((data, index1) => {
                                    const itemId = `id${index}-${index1}`
                                    return (
                                        <div className='flex gap-2 items-center my-2 space-x-2' key={index1}>
                                            <RadioGroupItem value={data} id={itemId} className={"border border-black"} />
                                            <Label htmlFor={itemId} className={"text-sm"}>{data}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard