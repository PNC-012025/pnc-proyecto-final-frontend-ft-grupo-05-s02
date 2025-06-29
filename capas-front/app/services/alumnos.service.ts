import { api } from '../lib/api';

import { Estudiante, GetEstudiantesResponse } from '@/app/types/types';

export const getAlumnos = async (): Promise<Estudiante[]> => {
  const response = await api.get<GetEstudiantesResponse>('/user-x-work-groups/alumno');
  console.log("Datos obtenidos:", response);
  return response.data.data;
};

export const deleteAlumno = async (id: string): Promise<void> => {
  await api.delete(`/alumno/${id}`);
}

export const updateAlumno = async (alumno: Partial<Estudiante>): Promise<Partial<Estudiante>> => {
  const response = await api.patch< Partial<Estudiante>>(`/alumno/${alumno._id}`, alumno);
  return response.data;
}