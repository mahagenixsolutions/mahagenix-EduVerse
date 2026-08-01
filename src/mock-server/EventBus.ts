export type EventType = 
  | 'HOMEWORK_CREATED'
  | 'HOMEWORK_SUBMITTED'
  | 'HOMEWORK_GRADED'
  | 'ATTENDANCE_PUBLISHED'
  | 'RESULT_PUBLISHED'
  | 'ANNOUNCEMENT_PUBLISHED'
  | 'NOTIFICATION_DISPATCHED'
  | 'OPEN_AI_ASSISTANT'
  | 'BEHAVIOUR_RECORDED'
  | 'MARKS_PUBLISHED'
  | 'LESSON_PUBLISHED'
  | 'MEETING_SCHEDULED'
  | 'TOGGLE_MOBILE_MENU';

type Listener<T = unknown> = (payload?: T) => void;

class EventBusClass {
  private listeners: Record<string, Listener<any>[]> = {};

  subscribe<T = unknown>(event: EventType, callback: Listener<T>): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  publish<T = unknown>(event: EventType, payload?: T): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(payload);
      } catch (err) {
        // Log in dev environment if needed
      }
    });
  }
}

export const EventBus = new EventBusClass();
