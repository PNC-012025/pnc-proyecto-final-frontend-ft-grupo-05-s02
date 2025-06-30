import { api } from "../lib/api";

import { Estudiante, GetEstudiantesResponse } from "@/app/types/types";

export const getAlumnos = async (): Promise<Estudiante[]> => {
  const response = await api.get<GetEstudiantesResponse>(
    "/user-x-work-groups/alumnos"
  );
  console.log("Datos obtenidos:", response);
  return response.data.data;
};

export const deleteAlumno = async (id: string): Promise<void> => {
    console.log("alumno a eliminar:", id);
    await api.delete(`/users/${id}`);
};

export const createAlumno = async (alumno: Partial<Estudiante>): Promise<Estudiante> => {
  alumno.imageDocumentId = "c745d3cb-ab8b-49eb-bcda-70059b1d2d61";
  alumno.roleName = "alumno";
  const response = await api.post<Estudiante>("/users", alumno);

  return response.data;
};

export const updateAlumno = async (
  alumno: Partial<Estudiante>
): Promise<Partial<Estudiante>> => {
  const response = await api.patch<Partial<Estudiante>>(
    `/alumno/${alumno._id}`,
    alumno
  );
  return response.data;
};
