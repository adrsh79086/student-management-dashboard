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