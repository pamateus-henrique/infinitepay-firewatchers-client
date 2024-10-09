import React, { useState } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "select" | "number";
  options?: string[];
}

interface ModalContentProps {
  title: string;
  fields: Field[];
  initialData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

const ModalContent: React.FC<ModalContentProps> = ({
  title,
  fields,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      {fields.map((field) => (
        <div key={field.name} className='mb-4'>
          <label htmlFor={field.name} className='block mb-1'>
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className='w-full p-2 border rounded'
            />
          )}
        </div>
      ))}
      <div className='flex justify-end'>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ModalContent;
