// Definir la estructura del contexto
export interface UserContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}
