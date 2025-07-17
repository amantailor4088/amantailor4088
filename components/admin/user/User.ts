// types/User.ts (If you have it in a separate file)
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  courses: string[];
}

// Sample Data (can be in your page file or a separate data file)
export const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "123-456-7890",
    courses: ["Introduction to React", "Advanced JavaScript", "UI/UX Fundamentals"],
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob.w@example.com",
    phone: "987-654-3210",
    courses: ["Data Structures & Algorithms", "Python for Beginners", "Cloud Computing Basics"],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    phone: "555-123-4567",
    courses: ["Full-Stack Web Development", "Database Management"],
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.p@example.com",
    phone: "111-222-3333",
    courses: ["Machine Learning with Python", "Deep Learning Fundamentals", "Cybersecurity Basics"],
  },
  {
    id: 5,
    name: "Eve Green",
    email: "eve.g@example.com",
    phone: "444-555-6666",
    courses: ["Graphic Design Principles", "Digital Marketing Strategy"],
  },
  {
    id: 6,
    name: "Frank White",
    email: "frank.w@example.com",
    phone: "777-888-9999",
    courses: ["Business Analytics", "Project Management Essentials"],
  },
];