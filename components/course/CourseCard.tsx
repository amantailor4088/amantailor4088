
type Course = {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    id: string;
    
};

type CourseCardProps = {
  existingCourse: Course;
};

export default function CourseCard({ existingCourse }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
         
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {existingCourse.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {existingCourse.description}
            </p>
            <p className="text-green-700 dark:text-green-400 text-lg font-semibold">
              ₹{existingCourse.price}
            </p>
          </div>
        </div>
  );
}
