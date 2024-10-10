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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.post(modalConfig.apiEndpoint, {
        id: incidentId,
        ...formData,
      });
      console.log(result);
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
    setFormData({ ...formData, [name]: value });
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
          {modalConfig.fields.map((field: any, index: number) => (
            <React.Fragment key={field.name}>
              {index > 0 && <Separator className='my-4' />}
              <div className='space-y-2'>
                <Label htmlFor={field.name} className='text-right'>
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <Select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onValueChange={(value) =>
                      handleInputChange(field.name, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an option' />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "radio" ? (
                  <RadioGroup
                    name={field.name}
                    value={formData[field.name] || ""}
                    onValueChange={(value) =>
                      handleInputChange(field.name, value)
                    }
                  >
                    {field.options.map((option: string) => (
                      <div
                        key={option}
                        className='flex items-center space-x-2 p-2 border border-input rounded-md'
                      >
                        <RadioGroupItem
                          value={option}
                          id={`${field.name}-${option}`}
                        />
                        <Label htmlFor={`${field.name}-${option}`}>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : null}
                {field.description && (
                  <p className='text-sm text-muted-foreground'>
                    {field.description}
                  </p>
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
