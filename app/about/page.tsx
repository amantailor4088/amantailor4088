import React from "react";
import { Scissors, GraduationCap, BookOpen, Users } from "lucide-react";

const App = () => {
  return (
    <div className="font-sans antialiased text-gray-900 dark:text-white bg-white dark:bg-gray-900">
      {/* About Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://wallpaperaccess.com/full/2594849.jpg')",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/20 dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-neutral-900/20 backdrop-blur-[2px] transition-colors duration-700" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-purple-700 dark:text-purple-400 mb-3">
            Our Journey
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white drop-shadow-md">
            Empowering Dreams, <br className="hidden sm:inline" />
            <span className="text-purple-700 dark:text-purple-400">
              One Stitch at a Time
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            At Aman Tailor Academy, we believe in the transformative power of
            skill. We are dedicated to bringing the rich art of tailoring
            directly to your home, making professional-grade education
            accessible to everyone across India.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
     <section className="py-16 px-6 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-[#1c1c2d] dark:via-[#2b1a2d] dark:to-[#1a1a30] transition-colors duration-700">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 md:mb-24">
      <div className="md:order-2">
        <img
          src="https://placehold.co/600x400/6b46c1/ffffff?text=Our+Mission"
          alt="Our Mission - Democratizing Education"
          className="rounded-xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-102 hover:shadow-xl"
        />
      </div>
      <div className="md:order-1 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 relative pb-3">
          Our Mission
          <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-24 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose mx-auto md:mx-0">
          Our mission is to **democratize high-quality stitching and tailoring education**. We strive to provide **comprehensive, easy-to-understand courses** that empower individuals to learn at their own pace, from the comfort of their homes. We aim to equip our students with **practical skills and creative confidence**.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 relative pb-3">
          Our Vision
          <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-24 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-prose mx-auto md:mx-0">
          We envision a future where every aspiring tailor has access to **world-className training**, fostering a vibrant community of **skilled artisans and entrepreneurs**. We aspire to be India's leading online academy for textile arts, recognized for our **innovative teaching methods** and the **success of our graduates**.
        </p>
      </div>
      <div>
        <img
          src="https://placehold.co/600x400/indigo-600/ffffff?text=Our+Vision"
          alt="Our Vision - Future of Tailoring"
          className="rounded-xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-102 hover:shadow-xl"
        />
      </div>
    </div>
  </div>
</section>

      {/* Founder Section */}
      <section className="py-20 px-6 bg-gradient-to-tr from-purple-100 via-rose-50 to-indigo-100 dark:from-[#1c1c2d] dark:via-[#2b1a2d] dark:to-[#1a1a30] transition-colors duration-700">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-16 relative">
            Meet Our Founder
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-indigo-500 blur-xl opacity-40 animate-fade-in-slow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-700 dark:border-purple-400 shadow-xl ring-4 ring-purple-300/50 dark:ring-purple-700/50">
                <img
                  src="https://placehold.co/256x256/6b46c1/ffffff?text=Aman+Tailor"
                  alt="Aman Tailor - Founder"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Aman Tailor
              </h3>
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-purple-500 dark:border-purple-400 pl-4 mb-6 italic">
                "Empowering individuals through craftsmanship."
              </blockquote>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                A visionary in the world of fashion and textiles, Aman Tailor
                founded this academy with a singular passion: to share the
                intricate art of stitching with a wider audience. With over two
                decades of experience in bespoke tailoring and design, Aman
                brings a wealth of knowledge, practical insights, and an
                unwavering commitment to excellence to every course. His
                dedication ensures that each student receives the highest
                quality education, transforming novices into confident
                professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}

      <section className="py-20 px-6 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-[#1c1c2d] dark:via-[#2b1a2d] dark:to-[#1a1a30] transition-colors duration-700">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-14">
            Why Choose Aman Tailor Academy?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 shadow-inner">
                <Scissors className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Learn from Anywhere
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Our online platform offers the flexibility to learn at your own
                pace, fitting seamlessly into your busy schedule. All you need
                is an internet connection!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 shadow-inner">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Expert Instructors
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Gain insights from seasoned professionals and industry experts
                who bring real-world experience and passion to every lesson.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 shadow-inner">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Comprehensive Curriculum
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                From basic stitches to advanced garment construction, our
                courses cover everything you need to master the art of
                tailoring.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-purple-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 shadow-inner">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Supportive Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Join a thriving community of fellow learners. Share your
                progress, get feedback, and collaborate on projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 px-6 text-white text-center overflow-hidden bg-purple-700 dark:bg-purple-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "url('https://wallpaperaccess.com/full/2594971.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40 dark:from-purple-950 dark:via-purple-900 dark:to-purple-800 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Stitching Journey?
          </h2>
          <p className="text-lg mb-8">
            Explore our diverse range of courses designed for every skill level,
            from absolute beginners to advanced enthusiasts.
          </p>
          <a
            href="/courses"
            className="inline-block bg-white text-purple-700 hover:bg-purple-100 font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Explore Courses
          </a>
        </div>
      </section>
    </div>
  );
};

export default App;
