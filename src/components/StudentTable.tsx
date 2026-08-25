"use client";

import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
}

export default function StudentTable({
  students,
  onDelete,
}: StudentTableProps) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "firstName",
      headerName: "Name",
      width: 180,
      valueGetter: (_, row) =>
        `${row.firstName} ${row.lastName}`,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "course",
      headerName: "Course",
      width: 150,
    },
    {
      field: "batch",
      headerName: "Batch",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "score",
      headerName: "Score",
      width: 100,
    },

    // ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          {/* VIEW */}
          <Button
            component={Link}
            href={`/students/${params.row.id}`}
            size="small"
            variant="outlined"
          >
            View
          </Button>

          {/* EDIT */}
          <Button
            component={Link}
            href={`/students/${params.row.id}/edit`}
            size="small"
            variant="outlined"
          >
            Edit
          </Button>

          {/* DELETE */}
          <Button
            size="small"
            variant="outlined"
            color="error"
             onClick={() =>
              handleDelete(params.row.id)
            }
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        disableColumnMenu
        disableColumnSorting
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
      />
    </div>
  );
}