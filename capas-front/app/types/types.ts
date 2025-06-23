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

export interface FileNew {
  id: string;
  originalFileName: string;
  url: string;
  tipo: string;
  category: string;
  file: File;
  data: {
    url: string;
    documentId: string;
    fileName: string;
  };
}

export type FilePublicacion = Pick<
  FileNew,
  "id" | "originalFileName" | "url" | "tipo"
>;


export interface Publicacion {
  _id: string;
  descripcion: string;
  categoria: string;
  files: FilePublicacion[];
  seccionId: string;
  titulo: string;
  createdAt: string;
  updatedAt: string;
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

export interface ColumnWithKey<T> {
  header: string;
  accessor: keyof T;
  sortable?: boolean;
}

export interface ColumnWithFunction<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export type Column<T> = ColumnWithKey<T> | ColumnWithFunction<T>;

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

export interface TableProps<T> {
  data: T[];
  loading: boolean;
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (itemId: string) => void;
  handleMove?: (item: T) => void;
  hasMove?: boolean;
  hasEdit?: boolean;
}

export interface Image {
  originalFilename: string;
  category: string;
  file: File;
}

export interface ImageResponse {
  message: string;
  data: {
    url: string;
    imageId: string;
    fileName: string;
  };
}

export interface AsistenciaAlumno {
  id?: string;
  alumnoId: string;
  fecha: string;
  estado: string;
  nombre: string;
  imagen: string;
}

export interface AsistenciaEncargado {
  id?: string;
  _id?: string;
  userId: string;
  fecha: string;
  estado: string;
  hora_inicio: string;
  hora_fin: string;
  nombre?: string;
  imagen?: string;
}

export interface HistoryAsistenciaResponse<T> {
  statusCode: number;
  message: string;
  data: Record<string, T[]>;
}

export interface Asistencia {
  _id: string;
  seccionId: string;
  alumnos: AsistenciaAlumno[];
  encargados: AsistenciaEncargado[];
}

export interface AsistenciaResponse {
  statusCode: number;
  message: string;
  data: Asistencia[];
  size: number;
  totalPages: number;
  page: number;
  limit: number;
}