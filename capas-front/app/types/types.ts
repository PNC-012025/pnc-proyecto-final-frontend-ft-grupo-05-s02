export interface RequestPassResponse {
  statusCode: number;
  message: string;
}

export interface UserInfo {
  nombreCompleto: string;
  email: string;
  image: string;
  isActive: boolean;
  role: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    token: string;
    info: UserInfo;
  };
}

export interface ActivateAccountRequirements {
  image?: string;
  telefono: string;
  password?: string;
  isActive: boolean;
}


export interface UserEdited {
  _id: string;
  nombres: string;
  imagen: string;
  email: string;
}
