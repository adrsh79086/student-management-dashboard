"use client";

import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminName, logout } = useAppContext();

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">SMS</h2>

        <nav className="sidebar-nav">
          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/students">
            Students
          </Link>
        </nav>
      </aside>

      {/* Right side */}
      <div className="main-section">

        {/* Header */}
        <header className="top-header">
          <div>
            <h2>Student Management</h2>
            <p>Welcome, {adminName}</p>
          </div>

          <button
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="page-content">
          {children}
        </main>

      </div>
    </div>
  );
}