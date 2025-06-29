"use client"

import { useState } from "react";
import PageHeader from "@/app/components/Dashboard/PageHeader";
import Table from "@/app/components/Tables/Table";
import { deleteAlumno, getAlumnos } from '@/app/services/alumnos.service';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Estudiante, Column } from '@/app/types/types';
import CardStudent from '@/app/components/CardViews/StudentCard';
import ListGridLayout from "@/app/components/Dashboard/ListGridLayout";
import { DeleteModal } from "@/app/components/Popups/DeleteModal";
import { Loading } from "@/app/components/Loading";
import { toast } from "@pheralb/toast";
import Image from "next/image";

export default function Page() {
  const [isCardView, setIsCardView] = useState(false);

  const [modalState, setModalState] = useState<{
    type: 'add' | 'edit' | 'delete' | null;
    selected: Estudiante | null;
  }>({ type: null, selected: null });

  const {
    data: alumnos,
    error,
    isLoading,
    isError,
  } = useQuery<Estudiante[], Error>({
    queryKey: ["estudiantes"],
    queryFn: getAlumnos,
  });

  const queryClient = useQueryClient();

  const deleteAlumnoMutation = useMutation({
    mutationFn: deleteAlumno,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estudiantes'] });
    },
  });


  const ContactInfo = ({ email }: { email: string }) => (
    <div className="flex flex-col">
      <span>{email}</span>
    </div>
  );

  const handleDelete = async () => {
    if (!modalState.selected) return;
    try {
      toast.loading({
        text: "Eliminando alumno...",
        options: {
          promise: deleteAlumnoMutation.mutateAsync(modalState.selected._id),
          success: "Alumno eliminado exitosamente",
          error: "Error al eliminar el alumno",
          autoDismiss: true,
          onSuccess: () => {
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['estudiantes'] });
          },
          onError: (error) => {
            console.error("Error de eliminacion:", error);
          }
        }
      });
    } catch {
      throw new Error("Error al eliminar el alumno");
    }
  };

  const closeModal = () => setModalState({ type: null, selected: null, });

  const columns: Column<Estudiante>[] = [
    {
      header: "Imagen",
      accessor: (row) => (
        <Image
          src={row.image}
          alt={`Avatar de ${row.image}`}
          className="w-10 h-10 rounded-full object-cover"
          width={40}
          height={40}
          priority
        />
      )
    },
    {
      header: "Nombre",
      accessor: (row) => (<span>{row.nombre}</span>),
    },

    {
      header: "Contacto",
      accessor: (row) => <ContactInfo email={row.email}  />
    },

    {
      header: "Work Group",
      accessor: "workgroups"
    },
  ]

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className='p-10'>
      <PageHeader
        title="Alumnos"
      />


      <ListGridLayout isCardView={isCardView} setIsCardView={setIsCardView} />
      {
        isCardView ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {alumnos?.map((alumno) => (
              <CardStudent
                key={alumno._id}
                alumno={alumno}
                setModalState={setModalState}
              />
            ))}
          </div>
        ) :
          (
            <div className="mt-4">
              <Table
                data={alumnos ?? []}
                loading={isLoading}
                columns={columns}
                hasMove={false}
                handleMove={(row) => setModalState({ type: 'edit', selected: row })}
                onDelete={(id) => {
                  const selected = alumnos?.find(r => r._id === id);
                  if (selected) {
                    setModalState({ type: 'delete', selected });
                  }
                }}
              />
            </div>
          )
      }



      <DeleteModal<Estudiante>
        isOpen={modalState.type === 'delete'}
        title="Eliminar alumno"
        item={modalState.selected!}
        onClose={closeModal}
        onConfirm={handleDelete}
        description={(item) => (
          <p>
            ¿Estás seguro de eliminar el alumno{" "}
            <strong className="text-red-600">{item?.nombre}</strong>?
            <br />
            <span className="text-sm text-gray-500">Esta acción no se puede deshacer</span>
          </p>
        )}
      />
    </div>
  )
}