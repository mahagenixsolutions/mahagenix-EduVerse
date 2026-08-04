export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface OptionItem<T = string> {
  label: string;
  value: T;
  icon?: string;
  disabled?: boolean;
}

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
