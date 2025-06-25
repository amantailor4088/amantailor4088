import HeroHighlights from "@/components/home/HeroSection/HeroHighlights";
import Hero from "@/components/home/HeroSection/HeroSection";
import PopularCourses from "@/components/home/PopularCourses/PopularCourses";
import StudentStories from "@/components/home/StudentsStories/StudentsStories";
import WhyChooseUs from "@/components/home/WhyChooseUs/WhyChooseUs";
import CallToAction from "@/components/home/CallToAction/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroHighlights />
      <StudentStories />
      <PopularCourses />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}
