import { useEffect, useState } from "react";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/services/studentService";

import {
  Student,
  StudentInput,
} from "@/types/student";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load students
  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStudents();

      setStudents(data);
    } catch (error) {
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Add student
  const addStudent = async (
    data: StudentInput
  ) => {
    try {
      setError(null);

      const newStudent = await createStudent(data);

      setStudents((prev) => [
        ...prev,
        newStudent,
      ]);

      return newStudent;
    } catch (error) {
      setError("Unable to add student.");
      throw error;
    }
  };

  // Update student
  const editStudent = async (
    id: string,
    data: StudentInput
  ) => {
    try {
      setError(null);

      const updatedStudent =
        await updateStudent(id, data);

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id
            ? updatedStudent
            : student
        )
      );

      return updatedStudent;
    } catch (error) {
      setError("Unable to update student.");
      throw error;
    }
  };

  // Delete student
  const removeStudent = async (
    id: string
  ) => {
    try {
      setError(null);

      await deleteStudent(id);

      setStudents((prev) =>
        prev.filter(
          (student) => student.id !== id
        )
      );
    } catch (error) {
      setError("Unable to delete student.");
      throw error;
    }
  };

  return {
    students,
    loading,
    error,
    addStudent,
    editStudent,
    removeStudent,
    loadStudents,
  };
};  