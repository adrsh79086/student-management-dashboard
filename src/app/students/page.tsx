"use client";

import Link from "next/link";
import Header from "@/components/Header";
import StudentTable from "@/components/StudentTable";
import { useStudents } from "@/hooks/useStudents";

export default function StudentsPage() {
  const { students, loading } = useStudents();

  return (
    <Header>
      <div className="students-header">
        <div>
          <h1>Students</h1>
          </div>

        <Link
          href="/students/add"
          className="add-student-btn"
        >
          + Add Student
        </Link>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <StudentTable students={students} />
      )}
    </Header>
  );
}