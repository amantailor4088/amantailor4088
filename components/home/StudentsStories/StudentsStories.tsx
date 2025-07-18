"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const students = [
    {
        image: "/reviews/1.jpg",
        quote: "Didu you are the best teacher in the world 🥰🥰🥰 vaise bhi kise  di tarkki deke ka Koi nahi jarda hunda hun 1 day rahgye ta hun khdi a na smhj ni lagi frist day vi dass sakhdi aa se vaise bhi jinna Ne kuchh karna nahi hunde ooo bol hi sakhdi a naa maa khde kuj ni pushye kyo ki class ch sare clear ho jande see ehne skhoke koi vi ni smhjode jine tusi samjhaya you are the best 🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰 loke da kmm hi aa bolne"
    },
    {
        image: "/reviews/3.jpg",
        quote: "Good morning mam. Tusi bhut vadiya trike nl smjaude o.ohde lyi thank you. But loka da km hunda faltu bolna   tusi tension na lao asi sode nl aa❤❤"
    },
    {
        image: "/reviews/4.jpg",
        quote: "Mam mai koi class miss ni kiti.class de end tk sare doubt clear ho jnde ne.har ek doubt ene vadia trike nl clear krde o tusi thnx ji🙏"
    },
    {
        image: "/reviews/6.jpg",
        quote: "Thanku so much mam ❤ ehna vdia sikhon leyi"
    },
    {
        image: "/reviews/7.jpg",
        quote: "Hlo. Ssa dee Dee tusi bht vdia smjane a har ek cheez bht easy way nal sanu sab smjh aundi nd aj tak ma ik var v kj ni puchya ky k doubt koi rehnda e ni vdo dekh k mera km vse set c internet cafe a mera apna but ma tuhade to inspire ho k stitching v sikhi hn ma apni shop te nl e stitching v krdi a ma ik do var status update kita mere nl stitching da v bht customer jud gye km dono bht vdia chl rhe a thank u soooo much aina vdia sikhan ly manu ta tuhanu dekh hr km krn di hope mildi a love u Dee 😘😘😘😘😘😘"
    },
    {
        image: "/reviews/8.jpg",
        quote: "Eh m first tym workshop to Sikh k bnayi ae mam"
    },
    {
        image: "/reviews/5.jpg",
        quote: "Thank you so much dii ❤🤗"
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
