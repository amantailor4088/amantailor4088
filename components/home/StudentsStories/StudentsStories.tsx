"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const students = [
    {
        image: "/reviews/1.jpg",
        quote: "The online course gave me confidence to start my own boutique. I now earn from what I love!"
    },
    {
        image: "/reviews/2.jpg",
        quote: "In just 3 months, I went from zero to tailoring professionally. And all in Punjabi!"
    },
    {
        image: "/reviews/3.jpg",
        quote: "Stitching is now my side hustle, all thanks to the easy video lessons and flexible timing."
    },
    {
        image: "/reviews/4.jpg",
        quote: "I never thought I could stitch, but this course made it so simple and enjoyable!"
    },
    {
        image: "/reviews/6.jpg",
        quote: "The instructors are so patient and the content is incredibly clear. My skills have truly transformed."
    },
    {
        image: "/reviews/7.jpg",
        quote: "This online course fit perfectly into my busy schedule, allowing me to pursue my passion for fashion."
    },
    {
        image: "/reviews/8.jpg",
        quote: "From basic stitches to complex designs, every lesson was a step towards becoming a confident tailor."
    },
    {
        image: "/reviews/5.jpg",
        quote: "United by our success, we're proud to be part of this incredible journey, showing that anyone can achieve their dreams here!"
    },
];

const SuccessStoriesSlider = () => {
    return (
        <section className="bg-gradient-to-b from-white via-purple-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-24 px-4 sm:px-6 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Our Students
                </h2>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 9000 }}
                    loop
                    pagination={{
                        clickable: true,
                        el: ".swiper-custom-pagination",
                    }}
                    slidesPerView={1}
                    spaceBetween={30}
                >
                    {students.map((student, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative flex flex-col lg:flex-row items-center gap-10 bg-white/90 dark:bg-neutral-800/90 p-8 sm:p-10 rounded-2xl shadow-xl">
                                <div className="w-full lg:w-1/2 relative h-64 sm:h-92 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110 rounded-md">
                                    <Image
                                        src={student.image}
                                        alt={"image not found"}
                                        fill
                                        className="object-contain object-top"
                                    />
                                </div>
                                <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left min-h-[16rem] sm:min-h-[20rem] flex items-center">
                                    <div className="absolute -top-0 lg:top-5 -left-5 lg:-left-18 text-[7rem] sm:text-[9rem] leading-none font-serif text-purple-500 dark:text-purple-300 opacity-20 select-none z-0 pointer-events-none">
                                        “
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-100 mb-4 leading-relaxed">
                                            {student.quote}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 right-0 md:bottom-5 md:right-10 text-[7rem] sm:text-[9rem] leading-none font-serif text-purple-500 dark:text-purple-300 opacity-20 select-none z-0 pointer-events-none rotate-180">
                                        “
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Pagination Dots */}
                <div className="swiper-custom-pagination mt-8 flex justify-center gap-2" />

                {/* Dot styles */}
                <style jsx global>{`
                    .swiper-custom-pagination .swiper-pagination-bullet {
                        width: 8px;
                        height: 8px;
                        background-color: #9333ea;
                        opacity: 0.5;
                        border-radius: 9999px;
                        transition: all 0.3s ease;
                    }

                    .swiper-custom-pagination .swiper-pagination-bullet-active {
                        background-color: #7e22ce;
                        opacity: 1;
                        transform: scale(1.3);
                    }

                    .dark .swiper-custom-pagination .swiper-pagination-bullet {
                        background-color: #e9d5ff;
                        opacity: 0.5;
                    }

                    .dark .swiper-custom-pagination .swiper-pagination-bullet-active {
                        background-color: #c084fc;
                        opacity: 1;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default SuccessStoriesSlider;
