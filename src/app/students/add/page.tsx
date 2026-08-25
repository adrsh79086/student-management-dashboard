"use client";

import Header from "@/components/Header";
import StudentForm from "@/components/StudentForm";

export default function AddStudentPage() {
  return (
    <Header>
      <h1>Add Student</h1>

      <StudentForm />
    </Header>
  );
}