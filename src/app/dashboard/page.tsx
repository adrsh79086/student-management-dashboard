"use client";

import Header from "@/components/Header";
import StatCard from "@/components/StateCard";
import { useStudents } from "@/hooks/useStudents";

export default function DashboardPage() {
  const { students, loading } = useStudents();

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const completedStudents = students.filter(
    (student) => student.status === "Completed"
  ).length;

  const averageScore =
    students.length === 0
      ? 0
      : students.reduce(
          (sum, student) => sum + student.score,
          0
        ) / students.length;

  const pendingAssignments = students.reduce(
    (sum, student) => sum + student.pendingAssignments,
    0
  );

  return (
    <Header>
      <h1>Dashboard</h1>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="stats-container">
          <StatCard
            title="Total Students"
            value={totalStudents}
          />

          <StatCard
            title="Active Students"
            value={activeStudents}
          />

          <StatCard
            title="Completed Students"
            value={completedStudents}
          />

          <StatCard
            title="Average Score"
            value={`${averageScore.toFixed(1)}%`}
          />

          <StatCard
            title="Pending Assignments"
            value={pendingAssignments}
          />
        </div>
      )}
    </Header>
  );
}