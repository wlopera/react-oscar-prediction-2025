export interface Category {
  name: string;
  nominees: string[];
}

export type ResultItem = Record<string, string | undefined>;

export interface UserResult {
  name: string;
  result: ResultItem[];
}

export interface SessionState {
  users: UserResult[];
}

export interface ResultsContextType {
  results: SessionState | null;
  updateResult: (name: string, category: string, value: string) => void;
  getResultsByUser: (name: string) => ResultItem[] | undefined;
  clearResultsByUser: (name: string) => void;
}
