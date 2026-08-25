export interface Student {
  id: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  dateOfBirth: string;

  course: string;
  batch: string;
  startDate: string;
  trainer: string;
  experience: string;

  status: "Active" | "Completed" | "Inactive";

  score: number;
  pendingAssignments: number;
}

export interface StudentInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  dateOfBirth: string;

  course: string;
  batch: string;
  startDate: string;
  trainer: string;
  experience: string;

  status: "Active" | "Completed" | "Inactive";

  score: number;
  pendingAssignments: number;
}


// =========================
// FILTER OPTIONS
// =========================

export const COURSES = [
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "JavaScript",
  "TypeScript",
] as const;


export const STATUSES = [
  "Active",
  "Completed",
  "Inactive",
] as const;


export const SCORE_RANGES = [
  "0-40",
  "41-60",
  "61-80",
  "81-100",
] as const;