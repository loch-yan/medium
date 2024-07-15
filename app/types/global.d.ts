export type onBoardingSwiperType = {
    id: number
    title: string
    description: string
    shortDescription: string
    image: any
}

export type User = {
    _id: string 
    name: string
    email: string
    password?: string
    courses: []
    createdAt: Date
    updatedAt: Date
    avatar: string
}

export type CoursesType = {
_id: any
name: string
description: string
categories: string
price: number
estimatedPrice?: number
thumbnail: {
    public_id: string | any
    url: string | any
}
tags: string
level: string
demoUrl: string
benefits: BenefitsType[]
prerequisites: Prerequiristcs[]
reviews: ReviewType[]
courseData: CourseDataType[]
ratings?: number
purchased: number
}