"use client";

import { useState, useMemo } from "react";
import { Modal } from "./Modal";
import { Course } from "@/app/types/types";
import { InputField } from "../Fields/InputField";
import { ImageSelector } from "../Fields/ImageSelector";


interface FormModalProps {
  isOpen: boolean;
  initialData?: Course;
  onClose: () => void;
  title: string;
  onSubmit: (data: Course, image: File | string | null) => void;
}

export const CourseConfigModal = ({
  isOpen,
  onClose,
  title,
}: FormModalProps) => {
  const emptyForm = useMemo<Partial<Course>>(
    () => ({
      nombre: "",
      encargados: [],
    }),
    []
  );

  const [formData, setFormData] = useState<Partial<Course>>(emptyForm);
  const [imageFile, setImageFile] = useState<File | string | null>(null);


  const handleImageChange = (file: File | string | null) => {
    setImageFile(file);
  };

  const handleFieldChange = (field: keyof Course, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={handleCancel}
      buttons={
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-blue_principal rounded"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue_principal text-white rounded"
          >
            Guardar
          </button>
        </div>
      }
    >
      <form className="space-y-4 px-6">
        <InputField
          label="Nombre"
          type="text"
          value={formData.nombre || ""}
          onChange={(v) => handleFieldChange("nombre", v)}
          placeholder="Nombre del programa"
          isRequired={true}
        />


        <ImageSelector
          initialPreview={formData.backgroundImage}
          onImageChange={handleImageChange}
        />
      </form>
    </Modal>
  );
};