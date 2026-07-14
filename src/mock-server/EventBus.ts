export type EventType = 
  | 'HOMEWORK_CREATED'
  | 'HOMEWORK_SUBMITTED'
  | 'HOMEWORK_GRADED'
  | 'ATTENDANCE_PUBLISHED'
  | 'RESULT_PUBLISHED'
  | 'ANNOUNCEMENT_PUBLISHED'
  | 'NOTIFICATION_DISPATCHED'
  | 'OPEN_AI_ASSISTANT';

type Listener = (payload: any) => void;

class EventBusClass {
  private listeners: Record<string, Listener[]> = {};

  subscribe(event: EventType, callback: Listener): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  publish(event: EventType, payload?: any): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(payload);
      } catch (err) {
        console.error(`Error in event listener for ${event}:`, err);
      }
    });
  }
}

export const EventBus = new EventBusClass();
