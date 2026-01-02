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
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) =>
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-7">
                                <Button onClick={() => navigate('/browse')} variant='outline'>{cat}</Button>
                            </CarouselItem>
                        )
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategoryCarousel