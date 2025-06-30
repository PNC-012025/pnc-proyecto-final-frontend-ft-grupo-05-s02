import { api } from '@/app/lib/api';

import { Tutor, TutorResponse } from '@/app/types/types'

export const getTutors = async (): Promise<Tutor[]> => {
  const response = await api.get<TutorResponse>('/user-x-work-groups/tutores');
  return response.data.data;
};

export const addTutor = async (recomendador: Tutor): Promise<Partial<Tutor>> => {
  const response = await api.post<Partial<Tutor>>('/tutores', recomendador);
  return response.data;
};

export const deleteTutor = async (id: string): Promise<void> => {
    await api.delete(`/tutores/${id}`);
}
    