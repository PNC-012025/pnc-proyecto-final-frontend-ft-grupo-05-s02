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

export interface Publicacion {
  id: number;
  descripcion: string;
  categoria: string;
  files: {
    id: string;
    originalFileName: string;
    url: string;
    tipo: string;
  }[];
  seccionId: string;
  titulo: string;
}

export interface Course {
  _id: string;
  nombre: string;
  gradoId: string;
  backgroundImage: string;
  encargados: {
    _id: string;
    nombre: string;
    image: string;
    email: string;
    telefono: string;
  }[];
  alumnos: {
    _id: string;
    nombre: string;
    image: string;
    email: string;
    telefono: string;
  }[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  publicaciones?: Publicacion[];
}

export interface CourseResponse {
  statusCode: number;
  message: string;
  data: Course[] | Course;
  size: number;
  totalPages: number;
  page: number;
  limit: number;
}