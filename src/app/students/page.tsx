"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import Header from "@/components/Header";
import StudentTable from "@/components/StudentTable";
import StudentFilters from "@/components/StudentFilters";

import { useStudents } from "@/hooks/useStudents";

export default function StudentsPage() {
  const {
    students,
    loading,
    error,
    removeStudent,
  } = useStudents();

  // =========================
  // FILTER STATES
  // =========================

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All");
  const [status, setStatus] = useState("All");
  const [scoreRange, setScoreRange] = useState("All");

  const [filteredStudents, setFilteredStudents] =
    useState(students);

  // Students load hone ke baad
  // filtered list ko update karo
  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  // =========================
  // APPLY FILTER
  // =========================

  const handleApplyFilters = () => {
    const value = search
      .toLowerCase()
      .trim();

    const result = students.filter((student) => {
      // SEARCH
      const fullName =
        `${student.firstName} ${student.lastName}`
          .toLowerCase();

      const email =
        student.email.toLowerCase();

      const searchMatch =
        !value ||
        fullName.includes(value) ||
        email.includes(value);

      // COURSE
      const courseMatch =
        course === "All" ||
        student.course === course;

      // STATUS
      const statusMatch =
        status === "All" ||
        student.status === status;

      // SCORE
      let scoreMatch = true;

      if (scoreRange === "0-40") {
        scoreMatch =
          student.score >= 0 &&
          student.score <= 40;
      }

      if (scoreRange === "41-60") {
        scoreMatch =
          student.score >= 41 &&
          student.score <= 60;
      }

      if (scoreRange === "61-80") {
        scoreMatch =
          student.score >= 61 &&
          student.score <= 80;
      }

      if (scoreRange === "81-100") {
        scoreMatch =
          student.score >= 81 &&
          student.score <= 100;
      }

      return (
        searchMatch &&
        courseMatch &&
        statusMatch &&
        scoreMatch
      );
    });

    setFilteredStudents(result);
  };

  // =========================
  // RESET FILTER
  // =========================

  const handleReset = () => {
    setSearch("");
    setCourse("All");
    setStatus("All");
    setScoreRange("All");

    setFilteredStudents(students);
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const handleDelete = async (id: string) => {
    const student = students.find(
      (student) => student.id === id
    );

    if (!student) {
      return;
    }

    const fullName =
      `${student.firstName} ${student.lastName}`;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${fullName}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await removeStudent(id);
    } catch (error) {
      console.error(
        "Failed to delete student:",
        error
      );
    }
  };

  return (
    <Header>

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>Students</h1>

          <p>
            Manage all students
          </p>
        </div>

        {/* ADD STUDENT */}

        <Button
          component={Link}
          href="/students/add"
          variant="contained"
        >
          Add Student
        </Button>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <StudentFilters
        search={search}
        course={course}
        status={status}
        scoreRange={scoreRange}

        onSearchChange={setSearch}
        onCourseChange={setCourse}
        onStatusChange={setStatus}
        onScoreRangeChange={setScoreRange}

        onApply={handleApplyFilters}
        onReset={handleReset}
      />

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "15px",
          }}
        >
          {error}
        </p>
      )}

      {/* =========================
          TABLE
      ========================= */}

      {loading ? (
        <p>
          Loading students...
        </p>
      ) : (
        <StudentTable
          students={filteredStudents}
          onDelete={handleDelete}
        />
      )}

    </Header>
  );
}