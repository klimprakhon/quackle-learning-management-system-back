const { PrismaClient } = require("@prisma/client");
const { subcategory } = require("../src/models/prisma");
const prisma = new PrismaClient();

const instructorData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    roleTitle: "Fullstack Developer at CodeCamp",
    profileImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const categoryData = [
  { id: 1, name: "Data" },
  { id: 2, name: "Business" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Tech" },
];

const subcategoryData = [
  { id: 1, name: "Data Analytic", categoryId: 1 },
  { id: 2, name: "Data Engineer", categoryId: 1 },
  { id: 3, name: "Data Science", categoryId: 1 },
  { id: 4, name: "Digital Business", categoryId: 2 },
  { id: 5, name: "Business Strategy", categoryId: 2 },
  { id: 6, name: "Start-Up", categoryId: 2 },
  { id: 7, name: "Digital Marketing", categoryId: 3 },
  { id: 8, name: "Inbound Marketing", categoryId: 3 },
  { id: 9, name: "Soft skill", categoryId: 3 },
  { id: 10, name: "Front-end", categoryId: 4 },
  { id: 11, name: "Back-end", categoryId: 4 },
  { id: 12, name: "DevOps", categoryId: 4 },
];

const courseData = [
  {
    id: 1,
    courseTitle: "React: The Fundamentals",
    subtitle: "Learn React from zero to hero",
    description: "asfqkjafjcmfkac;asm;dew",
    price: 990,
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subcategoryId: 10,
    level: "Beginner",
    instructorId: 1,
  },
];

const run = async () => {
  await prisma.category.createMany({ data: categoryData });
  await prisma.subcategory.createMany({ data: subcategoryData });
  await prisma.instructor.createMany({ data: instructorData });
  await prisma.course.createMany({ data: courseData });
};

run();
