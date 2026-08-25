"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

import { getStudentById } from "@/services/studentService";
import { Student } from "@/types/student";

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [student, setStudent] =
    useState<Student | undefined>();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const data = await getStudentById(id);

        setStudent(data);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  if (loading) {
    return <p>Loading student...</p>;
  }

  if (!student) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">
          Student not found
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() =>
            router.push("/students")
          }
        >
          Back to Students
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4">
            Student Details
          </Typography>

          <Typography color="text.secondary">
            {student.id}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() =>
              router.push("/students")
            }
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              router.push(
                `/students/${student.id}/edit`
              )
            }
          >
            Edit
          </Button>
        </Box>
      </Box>

      {/* Student Details */}
      <Card>
        <CardContent>
          <Grid container spacing={3}>

            {/* First Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                First Name
              </Typography>

              <Typography variant="body1">
                {student.firstName}
              </Typography>
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Last Name
              </Typography>

              <Typography variant="body1">
                {student.lastName}
              </Typography>
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Email
              </Typography>

              <Typography variant="body1">
                {student.email}
              </Typography>
            </Grid>

            {/* Phone */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Phone
              </Typography>

              <Typography variant="body1">
                {student.phone}
              </Typography>
            </Grid>

            {/* Date of Birth */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Date of Birth
              </Typography>

              <Typography variant="body1">
                {student.dateOfBirth}
              </Typography>
            </Grid>

            {/* Course */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Course
              </Typography>

              <Typography variant="body1">
                {student.course}
              </Typography>
            </Grid>

            {/* Batch */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Batch
              </Typography>

              <Typography variant="body1">
                {student.batch}
              </Typography>
            </Grid>

            {/* Start Date */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Start Date
              </Typography>

              <Typography variant="body1">
                {student.startDate}
              </Typography>
            </Grid>

            {/* Trainer */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Trainer
              </Typography>

              <Typography variant="body1">
                {student.trainer}
              </Typography>
            </Grid>

            {/* Experience */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Experience
              </Typography>

              <Typography variant="body1">
                {student.experience}
              </Typography>
            </Grid>

            {/* Status */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Status
              </Typography>

              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={student.status}
                  color={
                    student.status === "Active"
                      ? "success"
                      : student.status ===
                        "Completed"
                      ? "primary"
                      : "default"
                  }
                />
              </Box>
            </Grid>

            {/* Score */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Score
              </Typography>

              <Typography variant="h6">
                {student.score}%
              </Typography>
            </Grid>

            {/* Pending Assignments */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Pending Assignments
              </Typography>

              <Typography variant="h6">
                {student.pendingAssignments}
              </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}