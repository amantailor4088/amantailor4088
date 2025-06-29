import Link from "next/link";

type Course = {
    title: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    slug: string;
};

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow bg-white dark:bg-gray-800">
      <img
        src={course.thumbnailUrl}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {course.description.slice(0, 80)}...
        </p>
        <p className="text-indigo-600 font-bold mb-3">
          ₹{course.price}
        </p>
        <Link href={`/courses/${course.slug}`}>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}
