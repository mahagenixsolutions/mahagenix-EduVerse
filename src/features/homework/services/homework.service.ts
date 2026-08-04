import { MockServer, type HomeworkItem } from '@/mock-server/MockServer';

export const homeworkService = {
  getHomeworkList: () => MockServer.getHomework(),
  publishHomework: (hw: Omit<HomeworkItem, 'id' | 'status' | 'submissions' | 'attachments'>) => 
    MockServer.publishHomework(hw),
  submitHomework: (id: number, content: string) => 
    MockServer.submitHomework(id, content),
  gradeHomework: (id: number, grade: string, feedback: string) => 
    MockServer.gradeHomework(id, grade, feedback)
};

export const HomeworkService = homeworkService;
