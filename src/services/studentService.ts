import { Student, StudentInput } from "@/types/student";

const STORAGE_KEY = "students";

export const getStudents = async (): Promise<Student[]> => {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

export const getStudentById = async (
  id: string
): Promise<Student | undefined> => {
  const students = await getStudents();

  return students.find(
    (student) => String(student.id) === id
  );
};

export const createStudent = async (
  data: StudentInput
): Promise<Student> => {
  const students = await getStudents();

  const highestNumber = students.reduce((max, student) => {
    const match = String(student.id).match(/^STU-(\d+)$/);

    if (!match) {
      return max;
    }

    const number = Number(match[1]);

    return Math.max(max, number);
  }, 0);

  const nextNumber = highestNumber + 1;

  const newStudent: Student = {
    id: `STU-${String(nextNumber).padStart(3, "0")}`,
    ...data,
  };

  students.push(newStudent);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students)
  );

  return newStudent;
};

export const updateStudent = async (
  id: string,
  data: StudentInput
): Promise<Student> => {
  const students = await getStudents();

  const index = students.findIndex(
    (student) => String(student.id) === id
  );

  if (index === -1) {
    throw new Error("Student not found");
  }

  const updatedStudent: Student = {
    ...students[index],
    ...data,
  };

  students[index] = updatedStudent;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students)
  );

  return updatedStudent;
};

export const deleteStudent = async (
  id: string
): Promise<void> => {
  const students = await getStudents();

  const filteredStudents = students.filter(
    (student) => String(student.id) !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filteredStudents)
  );
};