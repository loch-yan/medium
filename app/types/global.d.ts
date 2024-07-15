export type onBoardingSwiperType = {
    id: number
    title: string
    description: string
    shortDescription: string
    image: any
}

type Avatar = {
    public_id: string;
    url: string;
  };

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: Avatar;
  password?: string;
  courses: any;
  createdAt: Date;
  updatedAt: Date;
};


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

export type CourseDataType = {
  _id: string | any;
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: LinkType[];
  suggestion: string;
  questions: CommentType[];
};

export type CommentType = {
  _id: string;
  user: User;
  question: string;
  questionReplies: CommentType[];
};

export type ReviewType = {
  user: User;
  rating?: number;
  comment: string;
  commentReplies?: ReviewType[];
};

export type LinkType = {
  title: string;
  url: string;
};

export  type PrerequisiteType = {
  title: string;
};

export type BenefitType = {
  title: string;
};