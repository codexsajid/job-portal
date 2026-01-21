import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
    return (
        <div className='text-center my-5 max-w-5xl m-auto px-4 sm:px-6'>
            <div className='flex flex-col gap-2'>
                <span className='m-auto font-medium text-red-500 bg-gray-100 py-1 px-3 rounded-full text-xs sm:text-sm'>No. 1 Job Hunt Website</span>
                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl'>Search, Apply & <br /> Get Your <span className='text-purple-700'>Dream Jobs</span></h1>
                <p className='text-xs sm:text-sm md:text-base px-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, eum. Fugit officia ducimus optio quis!</p>
            </div>
            <div className='flex my-5 w-full sm:w-[75%] md:w-[45%] shadow-lg border border-gray-200 pl-3 m-auto rounded-full items-center gap-4'>
                <input
                    className='outline-none border-none w-full text-xs sm:text-sm'
                    type='text'
                    placeholder='Find your dream jobs'
                />
                <Button className='rounded-r-full'>
                    <Search size={16} />
                </Button>
            </div>
        </div >
    )
}

export default HeroSection