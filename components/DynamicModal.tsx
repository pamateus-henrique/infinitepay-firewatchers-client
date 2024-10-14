//this will need a good refactor after the project is on prod

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ModalField {
  name: string;
  label: string;
  type: string;
  optionsEndpoint: string;
}

interface ModalConfig {
  id: string;
  title: string;
  fields: ModalField[];
  apiEndpoint: string;
}

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
  incidentId: number;
  initialData: Record<string, any>;
  onSuccess: (updatedData: Record<string, any>) => void;
}

interface Option {
  id: string | number;
  name: string;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  modalId,
  incidentId,
  initialData,
  onSuccess,
}) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [fieldOptions, setFieldOptions] = useState<Record<string, Option[]>>(
    {}
  );

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config: ModalConfig = await import(
          `@/config/modals/${modalId}.json`
        );
        setModalConfig(config);

        // Filter and format initial data
        const filteredData = config.fields.reduce((acc, field) => {
          if (initialData.hasOwnProperty(field.name)) {
            acc[field.name] = initialData[field.name];
          }
          return acc;
        }, {} as Record<string, any>);
        setFormData(filteredData);

        // Process options for all fields
        const allFieldOptions = await Promise.all(
          config.fields.map(async (field) => {
            const response = await api.get(field.optionsEndpoint);
            // Extract the correct array from the response data

            const optionsArray = response.data[field.name] || [];
            return { [field.name]: optionsArray };
          })
        );

        setFieldOptions(Object.assign({}, ...allFieldOptions));
        console.log(fieldOptions);
      } catch (error) {
        console.error(`Failed to load modal config for ${modalId}:`, error);
        toast.error("Failed to load modal configuration");
        onClose();
      }
    };

    if (isOpen) {
      loadConfig();
    }
  }, [isOpen, modalId, onClose, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalConfig) return;

    try {
      const result = await api.post(modalConfig.apiEndpoint, {
        id: incidentId,
        ...formData,
      });
      if (result.error === "false") {
        onSuccess(formData);
        toast.success(
          result.msg || `${modalConfig.title} updated successfully`
        );
        onClose();
      } else {
        throw new Error(result.msg || `Failed to update ${modalConfig.id}`);
      }
    } catch (err) {
      console.error(`Error updating ${modalConfig.id}:`, err);
      toast.error(
        err instanceof Error
          ? err.message
          : `Failed to update ${modalConfig.title.toLowerCase()}`
      );
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderSelectOptions = (field: ModalField) => {
    const options = fieldOptions[field.name] || [];
    return options.map((option: Option) => (
      <SelectItem key={option.id} value={option.name.toString()}>
        {option.name}
      </SelectItem>
    ));
  };

  if (!modalConfig) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{modalConfig.title}</DialogTitle>
          <Separator />
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {modalConfig.fields.map((field, index) => (
            <React.Fragment key={field.name}>
              {index > 0 && <Separator className='my-4' />}
              <div className='space-y-2'>
                <Label htmlFor={field.name} className='text-right'>
                  {field.label}
                </Label>
                {field.type === "select" && (
                  <Select
                    name={field.name}
                    value={formData[field.name]?.toString() || ""}
                    onValueChange={(value) =>
                      handleInputChange(field.name, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an option' />
                    </SelectTrigger>
                    <SelectContent>{renderSelectOptions(field)}</SelectContent>
                  </Select>
                )}
                {field.type === "radio" && (
                  <RadioGroup
                    name={field.name}
                    value={formData[field.name] || ""}
                    onValueChange={(value) =>
                      handleInputChange(field.name, value)
                    }
                  >
                    {fieldOptions[field.name]?.map((option: Option) => (
                      <div
                        key={option.id}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem
                          value={option.id.toString()}
                          id={`${field.name}-${option.id}`}
                        />
                        <Label htmlFor={`${field.name}-${option.id}`}>
                          {option.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </React.Fragment>
          ))}
          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicModal;
