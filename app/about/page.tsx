import React from "react";
import { Scissors, GraduationCap, BookOpen, Users } from "lucide-react";
import Image from "next/image";
import { Eye } from "lucide-react";

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

      {/* Vision and Mission */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-[#1c1c2d] dark:via-[#2b1a2d] dark:to-[#1a1a30] transition-colors duration-700">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
          {/* Mission Block */}
          <div className="relative overflow-hidden rounded-xl p-8 group bg-gradient-to-br from-white/60 via-white/30 to-white/10 dark:from-[#2b1a2d]/60 dark:via-[#1c1c2d]/30 dark:to-[#1c1c2d]/10 backdrop-blur-lg shadow-xl border border-white/30 dark:border-white/20 transition-all duration-500 hover:scale-[1.02]">
            {/* Gradient glow ring */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-6 shadow-lg">
                <GraduationCap
                  className="w-12 h-12 text-white"
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                Our mission is to democratize high-quality stitching and
                tailoring education. We strive to provide{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-400 font-semibold">
                  comprehensive, easy-to-understand
                </span>{" "}
                courses that empower individuals to learn at their own pace,
                from the comfort of their homes. We aim to equip our students
                with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 font-semibold">
                  practical skills and creative confidence
                </span>
                .
              </p>
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
            </div>
          </div>

          {/* Vision Block */}
          <div className="relative overflow-hidden rounded-xl p-8 group bg-gradient-to-br from-white/60 via-white/30 to-white/10 dark:from-[#2b1a2d]/60 dark:via-[#1c1c2d]/30 dark:to-[#1c1c2d]/10 backdrop-blur-lg shadow-xl border border-white/30 dark:border-white/20 transition-all duration-500 hover:scale-[1.02]">
            {/* Gradient glow ring */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg">
                <Eye className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                We envision a future where every aspiring tailor has access to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold">
                  {" "}
                  world-class training
                </span>
                , fostering a vibrant community of skilled artisans and
                entrepreneurs. We aspire to be India’s
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 font-semibold">
                  {" "}
                  leading online academy for textile arts
                </span>
                , recognized for our innovative teaching methods and the success
                of our graduates.
              </p>
              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Our Craft & Process */}
      <section className="py-20 px-6 bg-gradient-to-tl from-indigo-100 via-rose-50 to-purple-100 dark:from-[#1a1a30] dark:via-[#2b1a2d] dark:to-[#1c1c2d] transition-colors duration-700">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-16 relative">
            The Heart of Tailoring: Our Craft & Process
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-20">
            {/* Left Column: Text Description */}
            <div className="max-w-2xl text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed md:w-1/2 md:text-left">
              <p className="mb-4">
                At Aman Tailor Academy, we pride ourselves on the meticulous
                attention to detail and the artistic precision that defines true
                craftsmanship. Every stitch, every cut, and every measurement is
                performed with the utmost care, transforming raw materials into
                wearable art.
              </p>
              <p className="mb-4">
                Our process combines time-honored techniques with modern
                innovations. From the initial design sketch to the final
                fitting, we emphasize a deep understanding of fabric, form, and
                function. We believe that true tailoring is a blend of technical
                skill, creative vision, and unwavering dedication to quality.
              </p>
              <p>
                Explore the journey from concept to creation, seeing how passion
                and expertise are woven into every piece.
              </p>
            </div>

            {/* Right Column: Image Collage */}
            <div className="relative w-full max-w-sm h-[350px] sm:h-[450px] md:w-1/2 flex-shrink-0">
              {/* Main Image 1 - Larger, slightly off-center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-neutral-700 transform rotate-[-3deg] z-10 transition-all duration-300 hover:rotate-[-5deg] hover:scale-[1.02] hover:shadow-2xl">
                <Image
                  width={600}
                  height={450}
                  src="/ownerimages/img9.jpg" // <--- REPLACE WITH YOUR IMAGE PATH (e.g., a hand stitching, a design in progress)
                  alt="Close-up of intricate hand stitching on fabric"
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4 text-white text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Precision in Every Stitch
                </div>
              </div>

              {/* Supporting Image 2 - Top-Right, smaller, subtle overlap */}
              <div className="absolute top-0 right-0 w-40 h-32 sm:w-48 sm:h-36 rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-neutral-600 transform rotate-[6deg] z-20 transition-all duration-300 hover:rotate-[8deg] hover:scale-[1.05] hover:shadow-xl">
                <Image
                  width={250}
                  height={180}
                  src="/ownerimages/img8.jpg" // <--- REPLACE WITH YOUR IMAGE PATH (e.g., fabric close-up, tools)
                  alt="Detail shot of tailoring tools and threads"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  The Finest Materials
                </div>
              </div>

              {/* Supporting Image 3 - Bottom-Left, smaller, subtle overlap */}
              <div className="absolute bottom-0 left-0 w-40 h-32 sm:w-48 sm:h-36 rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-neutral-600 transform rotate-[-4deg] z-20 transition-all duration-300 hover:rotate-[-6deg] hover:scale-[1.05] hover:shadow-xl">
                <Image
                  width={250}
                  height={180}
                  src="/ownerimages/img10.jpg" // <--- REPLACE WITH YOUR IMAGE PATH (e.g., sketch, pattern cutting)
                  alt="A tailor's hand drafting a pattern on cloth"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  From Concept to Reality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Blended & Unique Image Presentation (Remains as is) */}
      <section className="py-20 px-6 bg-gradient-to-tr from-purple-100 via-rose-50 to-indigo-100 dark:from-[#1c1c2d] dark:via-[#2b1a2d] dark:to-[#1a1a30] transition-colors duration-700 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-16 relative">
            Meet Our Founder
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-20">
            {/* Left Column: Artistic Image Composition */}
            <div className="relative w-full max-w-sm sm:max-w-md h-[450px] sm:h-[550px] md:w-2/5 flex-shrink-0">
              {/* Main Circular Image - Central, slightly larger */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 z-20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-indigo-500 blur-xl opacity-40 animate-fade-in-slow"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-700 dark:border-purple-400 shadow-xl ring-4 ring-purple-300/50 dark:ring-purple-700/50">
                  <Image
                    width={500}
                    height={500}
                    src="/ownerimages/img1.jpg" // Your main founder image
                    alt="Aman Tailor - Main Founder Portrait"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Supporting Image 1 - Top Left, angled, subtle */}
              <div className="absolute top-0 left-0 w-48 h-36 sm:w-56 sm:h-44 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-neutral-700 transform rotate-[-8deg] opacity-80 transition-all duration-300 hover:rotate-[-10deg] hover:scale-[1.03] hover:shadow-xl z-10">
                <Image
                  width={300}
                  height={200}
                  src="/ownerimages/img5.jpg" // <--- REPLACE WITH YOUR IMAGE PATH
                  alt="Aman Tailor working on a garment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  The Art of Creation
                </div>
              </div>

              {/* Supporting Image 2 - Bottom Right, angled, subtle */}
              <div className="absolute bottom-0 right-0 w-48 h-36 sm:w-56 sm:h-44 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-neutral-700 transform rotate-[8deg] opacity-80 transition-all duration-300 hover:rotate-[10deg] hover:scale-[1.03] hover:shadow-xl z-10">
                <Image
                  width={300}
                  height={200}
                  src="/ownerimages/img6.jpg" // <--- REPLACE WITH YOUR IMAGE PATH
                  alt="Aman Tailor teaching or guiding a student"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Sharing Expertise
                </div>
              </div>
            </div>

            {/* Right Column: Founder Text Content */}
            <div className="max-w-2xl text-center md:text-left md:w-3/5">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Aman Tailor
              </h3>
              <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-purple-500 dark:border-purple-400 pl-4 mb-6 italic">
                "Empowering individuals through craftsmanship."
              </blockquote>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                A visionary in the world of fashion and textiles, Aman Tailor
                founded this academy with a singular passion: to share the
                intricate art of stitching with a wider audience. He believes
                in making professional-grade education accessible to everyone,
                regardless of their location, fostering a love for creation
                across India.
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                With over two decades of experience in bespoke tailoring and
                design, Aman brings a wealth of knowledge, practical insights,
                and an unwavering commitment to excellence to every course. His
                dedication ensures that each student receives the highest
                quality education, transforming novices into confident
                professionals ready to pursue their own ventures.
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Aman's philosophy centers on empowering individuals not just with
                skills, but with the confidence to pursue their creative dreams.
                This academy is a testament to his belief that quality education
                should be accessible to all, building a vibrant community where
                creativity and craftsmanship flourish.
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

      {/* NEW SECTION: Inspiring Futures: Moments of Learning & Growth */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-[#1c1c2d] dark:via-[#2b1a2d] dark:to-[#1a1a30] transition-colors duration-700">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-16 relative">
            Inspiring Futures: Moments of Learning & Growth
            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
          </h2>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-20">
            {/* Left Column: Dynamic Image Gallery */}
            <div className="relative w-full max-w-sm sm:max-w-md h-[400px] sm:h-[500px] md:w-1/2 flex-shrink-0">
              {/* Large Feature Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-neutral-700 transform rotate-[-5deg] z-10 transition-all duration-300 hover:rotate-[-7deg] hover:scale-[1.02] hover:shadow-2xl">
                <Image
                  width={600}
                  height={450}
                  src="/ownerimages/img7.jpg" // <--- REPLACE WITH YOUR IMAGE PATH (e.g., student focused on work)
                  alt="Student deeply engaged in learning tailoring"
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-4 text-white text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Dedicated Learning Environment
                </div>
              </div>

              {/* Smaller Supporting Image 1 - Top-Right */}
              <div className="absolute top-0 right-0 w-40 h-32 sm:w-48 sm:h-36 rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-neutral-600 transform rotate-[7deg] z-20 transition-all duration-300 hover:rotate-[9deg] hover:scale-[1.05] hover:shadow-xl">
                <Image
                  width={250}
                  height={180}
                  src="/ownerimages/img4.jpg" // <--- REPLACE WITH YOUR IMAGE PATH (e.g., group discussion)
                  alt="Students collaborating on a project"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Collaborative Projects
                </div>
              </div>

              {/* Smaller Supporting Image 2 - Bottom-Left */}
              <div className="absolute bottom-0 left-0 w-40 h-32 sm:w-48 sm:h-36 rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-neutral-600 transform rotate-[-6deg] z-20 transition-all duration-300 hover:rotate-[-8deg] hover:scale-[1.05] hover:shadow-xl">
                <Image
                  width={250}
                  height={180}
                  src="/ownerimages/img11.jpg" // <--- REPLACE WITH YOUR IMAGE PATH (e.g., finished student work)
                  alt="A student proudly showing their finished tailoring project"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Achieving Milestones
                </div>
              </div>
            </div>

            {/* Right Column: Text Content / Testimonial */}
            <div className="max-w-2xl text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed md:w-1/2 md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Journey, Our Priority
              </h3>
              <p className="mb-4">
                At Aman Tailor Academy, we don't just teach skills; we foster a
                passion for creation and personal growth. Our online platform
                is designed to be intuitive and supportive, ensuring that every
                student feels empowered and connected on their learning journey.
              </p>
              <p className="mb-6">
                From live interactive sessions to personalized feedback, we
                celebrate every milestone with our students. Join a community
                where your creativity is nurtured, and your potential is
                unleashed, transforming aspirations into tangible achievements.
              </p>

              {/* Example Testimonial (Optional, can be replaced with more text) */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 italic">
                <p className="mb-2 text-gray-800 dark:text-gray-200">
                  "I never thought I could learn tailoring online, but Aman Tailor
                  Academy made it incredibly easy and engaging. The support is
                  phenomenal!"
                </p>
                <p className="font-semibold text-purple-700 dark:text-purple-400 text-right">
                  - Student
                </p>
              </div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40  backdrop-blur-sm" />

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