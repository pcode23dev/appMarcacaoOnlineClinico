export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
  user: {
    id: number;
    nome: string;
    email: string;
    role: string;
  };
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  nome: string;
  exp: number;
  iat: number;
}