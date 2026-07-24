import React, { useState } from "react";
import { Card, Avatar, Badge, Button, Tabs } from "@/components/ui";
import { PageHeader } from "@/components/navigation/PageHeader";
import {
  Search,
  Mail,
  Phone,
  MessageSquare,
  CheckSquare,
  BookOpen,
  Award,
  X,
  User,
} from "lucide-react";
import styles from "./teacher.module.css";
import { useTeacherStudents } from "../hooks/useTeacher";

export interface Student {
  id: number | string;
  name: string;
  rollNo?: string;
  rollNumber?: string;
  class: string;
  section: string;
  attendance?: string | number;
  attendanceRate?: number;
  homeworkCompletion?: number;
  lastExamScore?: number;
  behaviourNotes?: string;
  guardianPhone?: string;
  grade?: string;
  guardianName?: string;
  contact?: string;
  email?: string;
  address?: string;
  status?: string;
  avatar?: string;
  performance?: string;
}

export const StudentsDirectoryPage: React.FC = () => {
  const { data: studentDirectory = [] } = useTeacherStudents();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const classes: string[] = [
    "all",
    ...Array.from(
      new Set((studentDirectory as Student[]).map((s) => `${s.class}-${s.section}`)),
    ) as string[],
  ];
  const filtered = (studentDirectory as Student[]).filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesClass =
      filterClass === "all" || `${s.class}-${s.section}` === filterClass;
    const matchesStatus = filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Student directory and academic overview"
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Students" }]}
      />

      {/* Search & Filters */}
      <Card style={{ padding: "var(--space-4)", marginTop: "var(--space-4)" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-3)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 250px",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              background: "var(--bg-color)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              padding: "8px 12px",
            }}
          >
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "var(--text-main)",
                fontFamily: "inherit",
                fontSize: "0.938rem",
              }}
            />
          </div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "var(--bg-color)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-main)",
              fontFamily: "inherit",
              fontSize: "0.875rem",
            }}
          >
            <option value="all">All Classes</option>
            {classes
              .filter((c: string) => c !== "all")
              .map((c: string) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "var(--bg-color)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-main)",
              fontFamily: "inherit",
              fontSize: "0.875rem",
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </Card>

      {/* Student Table */}
      <Card style={{ marginTop: "var(--space-4)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "left",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Student
              </th>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "left",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Class
              </th>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "center",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Attendance
              </th>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "center",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Homework
              </th>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "center",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Last Score
              </th>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "center",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "var(--space-3)",
                  textAlign: "right",
                  fontSize: "0.813rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student: Student) => (
              <tr
                key={student.id}
                style={{
                  borderBottom: "1px solid var(--border-color)",
                  transition: "background var(--transition-fast)",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedStudent(student)}
              >
                <td style={{ padding: "var(--space-3)" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                    }}
                  >
                    <Avatar src={student.avatar} alt={student.name} size="sm" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.938rem" }}>
                        {student.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Roll #{student.rollNumber}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "var(--space-3)", fontSize: "0.875rem" }}>
                  {student.class}-{student.section}
                </td>
                <td style={{ padding: "var(--space-3)", textAlign: "center" }}>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        (student.attendanceRate ?? 0) >= 90
                          ? "var(--success)"
                          : (student.attendanceRate ?? 0) >= 75
                            ? "var(--warning)"
                            : "var(--danger)",
                    }}
                  >
                    {student.attendanceRate ?? 0}%
                  </span>
                </td>
                <td style={{ padding: "var(--space-3)", textAlign: "center" }}>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        (student.homeworkCompletion ?? 0) >= 80
                          ? "var(--success)"
                          : (student.homeworkCompletion ?? 0) >= 60
                            ? "var(--warning)"
                            : "var(--danger)",
                    }}
                  >
                    {student.homeworkCompletion ?? 0}%
                  </span>
                </td>
                <td
                  style={{
                    padding: "var(--space-3)",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {student.lastExamScore}%
                </td>
                <td style={{ padding: "var(--space-3)", textAlign: "center" }}>
                  <Badge
                    variant={student.status === "active" ? "success" : "danger"}
                  >
                    {student.status}
                  </Badge>
                </td>
                <td style={{ padding: "var(--space-3)", textAlign: "right" }}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStudent(student);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            style={{
              padding: "var(--space-6)",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <User size={32} />
            <p style={{ marginTop: "var(--space-2)" }}>
              No students found matching your criteria.
            </p>
          </div>
        )}
      </Card>

      {/* Student Detail Modal (Teacher View) */}
      {selectedStudent && (
        <div className={styles.overlay}>
          <div className={styles.modal} style={{ maxWidth: "600px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "var(--space-4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                <Avatar
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  size="lg"
                />
                <div>
                  <h3 style={{ margin: 0 }}>{selectedStudent.name}</h3>
                  <p
                    style={{
                      fontSize: "0.813rem",
                      color: "var(--text-muted)",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {selectedStudent.class}-{selectedStudent.section} • Roll #
                    {selectedStudent.rollNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Student Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <div
                style={{
                  padding: "var(--space-3)",
                  background: "var(--bg-color)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color:
                      (selectedStudent.attendanceRate ?? 0) >= 90
                        ? "var(--success)"
                        : "var(--warning)",
                  }}
                >
                  {selectedStudent.attendanceRate ?? 0}%
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  Attendance
                </div>
              </div>
              <div
                style={{
                  padding: "var(--space-3)",
                  background: "var(--bg-color)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--primary-color)",
                  }}
                >
                  {selectedStudent.homeworkCompletion}%
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  Homework
                </div>
              </div>
              <div
                style={{
                  padding: "var(--space-3)",
                  background: "var(--bg-color)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--secondary-color)",
                  }}
                >
                  {selectedStudent.lastExamScore}%
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  Last Exam
                </div>
              </div>
            </div>

            {/* Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                marginBottom: "var(--space-4)",
              }}
            >
              <div
                style={{
                  padding: "var(--space-3)",
                  background: "var(--bg-color)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Behaviour Notes
                </label>
                <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>
                  {selectedStudent.behaviourNotes}
                </p>
              </div>
              <div
                style={{
                  padding: "var(--space-3)",
                  background: "var(--bg-color)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Guardian Contact
                </label>
                <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>
                  {selectedStudent.guardianName} •{" "}
                  {selectedStudent.guardianPhone}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-2)",
              }}
            >
              <Button size="sm" variant="primary">
                <MessageSquare size={14} /> Message Parent
              </Button>
              <Button size="sm" variant="outline">
                <Mail size={14} /> Message Student
              </Button>
              <Button size="sm" variant="outline">
                <CheckSquare size={14} /> View Attendance
              </Button>
              <Button size="sm" variant="outline">
                <BookOpen size={14} /> View Homework
              </Button>
              <Button size="sm" variant="outline">
                <Award size={14} /> Grade Assignment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
