import { EventStatus } from '../constants/status';

export interface CalendarEvent {
  id: number;
  title: string;
  category: 'Sports' | 'Academic' | 'Arts' | 'Tech' | 'General' | string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  fee?: number;
  maxSeats?: number;
  registeredCount?: number;
  status: `${EventStatus}` | 'published' | 'draft' | 'completed' | 'cancelled';
  description?: string;
  contactNumber?: string;
  registrationDeadline?: string;
  coverImage?: string;
}

export interface Registration {
  id: number;
  eventId: number;
  studentName: string;
  registrationDate: string;
  status: 'registered' | 'interested' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'free';
  transactionId?: string;
  ticketNumber?: string;
  amount?: number;
}

// Runtime object fallbacks to ensure JS ESM imports never throw runtime SyntaxError
export const CalendarEvent = {} as any;
export const Registration = {} as any;
