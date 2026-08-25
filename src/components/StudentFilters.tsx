"use client";

import {
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  COURSES,
  SCORE_RANGES,
  STATUSES,
} from "@/types/student";

interface StudentFiltersProps {
  search: string;
  course: string;
  status: string;
  scoreRange: string;

  onSearchChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onScoreRangeChange: (value: string) => void;

  onApply: () => void;
  onReset: () => void;
}

export default function StudentFilters({
  search,
  course,
  status,
  scoreRange,
  onSearchChange,
  onCourseChange,
  onStatusChange,
  onScoreRangeChange,
  onApply,
  onReset,
}: StudentFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Search"
        placeholder="Name or Email"
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        size="small"
      />

      <TextField
        select
        label="Course"
        value={course}
        onChange={(e) =>
          onCourseChange(e.target.value)
        }
        size="small"
      >
        <MenuItem value="All">All</MenuItem>

        {COURSES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
        size="small"
      >
        <MenuItem value="All">All</MenuItem>

        {STATUSES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Score"
        value={scoreRange}
        onChange={(e) =>
          onScoreRangeChange(e.target.value)
        }
        size="small"
      >
        <MenuItem value="All">All</MenuItem>

        {SCORE_RANGES.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        onClick={onApply}
      >
        Apply Filters
      </Button>

      <Button
        variant="outlined"
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
}