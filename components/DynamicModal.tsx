import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
  incidentId: number;
  initialData: Record<string, any>;
  onSuccess: (updatedData: Record<string, any>) => void;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  modalId,
  incidentId,
  initialData,
  onSuccess,
}) => {
  const [modalConfig, setModalConfig] = useState<any>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await import(`@/config/modals/${modalId}.json`);
        setModalConfig(config);
      } catch (error) {
        console.error(`Failed to load modal config for ${modalId}:`, error);
        toast.error("Failed to load modal configuration");
        onClose();
      }
    };

    if (isOpen) {
      loadConfig();
    }
  }, [isOpen, modalId]);

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      const result = await api.post(modalConfig.apiEndpoint, {
        id: incidentId,
        ...formData,
      });
      if (result.status === 200) {
        onSuccess(formData);
        toast.success(`${modalConfig.title} successful`);
        onClose();
      } else {
        throw new Error(`Failed to update ${modalConfig.id}`);
      }
    } catch (err) {
      console.error(`Error updating ${modalConfig.id}:`, err);
      toast.error(`Failed to update ${modalConfig.title.toLowerCase()}`);
    }
  };

  if (!modalConfig) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='relative'>
        <button
          onClick={onClose}
          className='absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700'
        >
          &times;
        </button>
        <ModalContent
          title={modalConfig.title}
          fields={modalConfig.fields}
          initialData={initialData}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default DynamicModal;
