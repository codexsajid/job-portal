import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const category = [
    "Backend Developer",
    "Frontend Developer",
    "FullStack Developer",
    "Data Science",
    "Data Analytics"
]
const CategoryCarousel = () => {
    const navigate = useNavigate()
    return (
        <div className='px-4 sm:px-6'>
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto my-12 sm:my-20">
                <CarouselContent className="-ml-2 sm:-ml-4 overflow-x-auto sm:overflow-x-hidden scrollbar-hide">
                    {
                        category.map((cat, index) =>
                            <CarouselItem key={index} className="basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 pl-2 sm:pl-4">
                                <Button onClick={() => navigate('/browse')} variant='outline' className='text-xs sm:text-sm h-8 sm:h-10 md:h-12 w-full px-2 sm:px-3'>{cat}</Button>
                            </CarouselItem>
                        )
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>

        </div>
    )
}

export default CategoryCarousel