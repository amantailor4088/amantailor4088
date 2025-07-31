import useGetUsers from "@/hooks/user/useGetUsers";

const UserTable = () => {
  const { users, loading, error } = useGetUsers();

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 dark:border-neutral-700 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-sm">
          <thead className="bg-gray-100 dark:bg-neutral-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Sr No
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Phone
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Courses
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-neutral-800"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  <div className="flex content-center gap-5">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white flex items-center justify-center rounded-full font-bold shadow-inner">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  <div className="hover:underline">{user.email}</div>
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-white">
                  {user.phone}
                </td>
                <td className="px-6 py-4">
                  {user.courses.length > 0 ? (
                    user.courses.map((course, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {course}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs italic">
                      No courses
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-5 md:hidden">
        {users.map((user, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-neutral-800 p-5 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out" // Enhanced shadow for depth, smooth transition
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white flex items-center justify-center rounded-full text-xl font-bold shadow-inner">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-0.5 leading-tight">
                  {user.name}
                </h3>
                <a
                  href={`mailto:${user.email}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block" // 'block' ensures truncate works effectively
                  aria-label={`Email ${user.name}`}
                >
                  {user.email}
                </a>
              </div>
            </div>

            {/* Contact Information Section (Phone) */}
            <div className="mb-4 border-t border-gray-100 dark:border-neutral-700 pt-4">
              {" "}
              {/* Subtle separator */}
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2 tracking-wide">
                Contact Information
              </p>
              <div className="flex items-center gap-2">
                {/* Phone Icon */}
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                {/* Phone number as a clickable link */}
                <a
                  href={`tel:${user.phone}`}
                  className="text-base text-gray-800 dark:text-gray-200 font-medium hover:underline"
                  aria-label={`Call ${user.name}`}
                >
                  {user.phone}
                </a>
              </div>
            </div>

            {/* Courses Section */}
            <div className="border-t border-gray-100 dark:border-neutral-700 pt-4">
              {" "}
              {/* Subtle separator */}
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2 tracking-wide">
                Enrolled Courses
              </p>
              <div className="flex flex-wrap gap-2">
                {user.courses.length > 0 ? (
                  user.courses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3.5 py-1 rounded-full shadow-sm dark:bg-blue-700 dark:text-blue-100 whitespace-nowrap" // Slightly more padding, shadow, and nowrap to prevent breaking in awkward places
                    >
                      {course}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm italic">
                    No courses enrolled.
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
