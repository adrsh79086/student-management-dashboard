"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";

import { useStudents } from "@/hooks/useStudents";

const steps = ["Personal", "Course", "Confirm"];

const schema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "10 digits required")
    .required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  experience: Yup.string().required("Required"),
  course: Yup.string().required("Required"),
  batch: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  trainer: Yup.string().required("Required"),
  status: Yup.string()
    .oneOf(["Active", "Completed", "Inactive"])
    .required("Required"),
  score: Yup.number().min(0).max(100).required("Required"),
  pendingAssignments: Yup.number().min(0).required("Required"),
});

export default function StudentForm() {
  const [step, setStep] = useState(0);
  const { addStudent } = useStudents();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      experience: "",
      course: "",
      batch: "",
      startDate: "",
      trainer: "",
      status: "Active",
      score: 0,
      pendingAssignments: 0,
    },

    validationSchema: schema,

    onSubmit: async (values) => {
      await addStudent({
        ...values,
        score: Number(values.score),
        pendingAssignments: Number(
          values.pendingAssignments
        ),
        status: values.status as
          | "Active"
          | "Completed"
          | "Inactive",
      });

      window.location.href = "/students";
    },
  });

  const field = (
    name: keyof typeof formik.values,
    label: string,
    type = "text"
  ) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched[name] &&
        Boolean(formik.errors[name])
      }
      helperText={
        formik.touched[name] &&
        formik.errors[name]
      }
      InputLabelProps={
        type === "date" ? { shrink: true } : undefined
      }
    />
  );

  const next = async () => {
    const errors = await formik.validateForm();

    const fields =
      step === 0
        ? [
            "firstName",
            "lastName",
            "email",
            "phone",
            "dateOfBirth",
            "experience",
          ]
        : [
            "course",
            "batch",
            "startDate",
            "trainer",
            "status",
            "score",
            "pendingAssignments",
          ];

    const hasError = fields.some(
      (name) =>
        errors[name as keyof typeof errors]
    );

    if (!hasError) {
      setStep((s) => s + 1);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        p: 4,
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      <Stepper activeStep={step}>
        {steps.map((item) => (
          <Step key={item}>
            <StepLabel>{item}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 4,
        }}
      >
        {step === 0 && (
          <>
            {field("firstName", "First Name")}
            {field("lastName", "Last Name")}
            {field("email", "Email", "email")}
            {field("phone", "Phone")}
            {field("dateOfBirth", "Date of Birth", "date")}
            {field("experience", "Experience")}
          </>
        )}

        {step === 1 && (
          <>
            {field("course", "Course")}
            {field("batch", "Batch")}
            {field("startDate", "Start Date", "date")}
            {field("trainer", "Trainer")}

            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Completed">
                Completed
              </MenuItem>

              <MenuItem value="Inactive">
                Inactive
              </MenuItem>
            </TextField>

            {field("score", "Score", "number")}
            {field(
              "pendingAssignments",
              "Pending Assignments",
              "number"
            )}
          </>
        )}

        {step === 2 && (
          <Box>
            <h2>Confirm Details</h2>

            {Object.entries(formik.values).map(
              ([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong>
                  {String(value)}
                </p>
              )
            )}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            disabled={step === 0}
            onClick={() =>
              setStep((s) => s - 1)
            }
          >
            Back
          </Button>

          {step < 2 ? (
            <Button
              variant="contained"
              onClick={next}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() =>
                formik.handleSubmit()
              }
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}