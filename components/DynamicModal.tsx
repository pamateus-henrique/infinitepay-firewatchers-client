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

interface Option {
  id: number | string;
  name: string;
  avatar?: string;
}

interface ModalField {
  name: string;
  data: string;
  label: string;
  initialData: string;
  type: "text" | "select" | "radio" | "userSelect";
  optionsEndpoint?: string;
  description?: string;
  optional?: boolean;
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
    if (!isOpen) return;

    const loadConfigAndOptions = async () => {
      try {
        // Update the import statement to handle TypeScript modules
        const configModule = await import(`@/config/modals/${modalId}`);
        const config: ModalConfig = configModule.default;
        setModalConfig(config);

        // Setup initial form data
        const initialFormData = config.fields.reduce((acc, field) => {
          const value = initialData[field.initialData];
          if (value !== undefined) {
            if (
              field.type === "userSelect" &&
              typeof value === "object" &&
              value.id
            ) {
              acc[field.name] = value.id.toString();
            } else {
              acc[field.name] = value.toString();
            }
          }
          return acc;
        }, {} as Record<string, string>);

        setFormData(initialFormData);

        // Fetch options for fields
        const optionsPromises = config.fields
          .filter((field) => field.optionsEndpoint)
          .map(async (field) => {
            const response = await api.get(field.optionsEndpoint!);
            const optionsArray: Option[] = response.data[field.data] || [];
            return { [field.name]: optionsArray };
          });

        const optionsArray = await Promise.all(optionsPromises);
        const options = Object.assign({}, ...optionsArray);
        setFieldOptions(options);
      } catch (error) {
        console.error(`Failed to load modal config for ${modalId}:`, error);
        toast.error("Failed to load modal configuration");
        onClose();
      }
    };

    loadConfigAndOptions();
  }, [isOpen, modalId, initialData, onClose]);

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
      console.error(`Error updating ${modalConfig?.id}:`, err);
      toast.error(
        err instanceof Error
          ? err.message
          : `Failed to update ${modalConfig?.title.toLowerCase()}`
      );
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderField = (field: ModalField) => {
    const value = formData[field.name] || "";
    switch (field.type) {
      case "select":
        return (
          <Select
            name={field.name}
            value={value}
            onValueChange={(val) => handleInputChange(field.name, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select an option' />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions[field.name]?.map((option) => (
                <SelectItem key={option.id} value={option.name.toString()}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup
            name={field.name}
            value={value}
            onValueChange={(val) => handleInputChange(field.name, val)}
          >
            {fieldOptions[field.name]?.map((option) => (
              <div key={option.id} className='flex items-center space-x-2'>
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
        );
      case "userSelect":
        return (
          <Select
            name={field.name}
            value={value}
            onValueChange={(val) => handleInputChange(field.name, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a user' />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions[field.name]?.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  <div className='flex items-center'>
                    {option.avatar && (
                      <img
                        src={option.avatar}
                        alt={option.name}
                        className='w-6 h-6 rounded-full mr-2'
                      />
                    )}
                    {option.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "text":
        return (
          <input
            type='text'
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className='input-class'
          />
        );
      default:
        return null;
    }
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
                {renderField(field)}
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
