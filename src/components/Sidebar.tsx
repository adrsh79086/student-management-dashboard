"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside>
      <h2>SMS</h2>

      <nav>
        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/students">
          Students
        </Link>
      </nav>
    </aside>
  );
}