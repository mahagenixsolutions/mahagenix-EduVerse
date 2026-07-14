export const homeworkItems = [
  { id: 1, subject: 'Mathematics', title: 'Calculus Exercises 1-20', dueDate: 'Today, 11:59 PM', status: 'pending' as const, teacher: 'Mr. Smith', attachments: 1 },
  { id: 2, subject: 'Physics', title: 'Lab Report: Kinematics Experiment', dueDate: 'Tomorrow', status: 'submitted' as const, teacher: 'Mrs. Davis', attachments: 2 },
  { id: 3, subject: 'English', title: 'Read Chapters 4 & 5, Write Summary', dueDate: 'Wednesday', status: 'pending' as const, teacher: 'Ms. Wilson', attachments: 0 },
  { id: 4, subject: 'Chemistry', title: 'Balance Redox Reactions Worksheet', dueDate: 'Thursday', status: 'pending' as const, teacher: 'Dr. Patel', attachments: 1 },
  { id: 5, subject: 'Computer Science', title: 'Implement Stack Data Structure', dueDate: 'Friday', status: 'overdue' as const, teacher: 'Mr. Johnson', attachments: 0 },
  { id: 6, subject: 'Biology', title: 'Cell Division Diagram', dueDate: 'Last Monday', status: 'reviewed' as const, teacher: 'Mrs. Chen', attachments: 1, grade: 'A' },
];
