import React, { useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "./minimal-tiptap";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent,
  onSave,
}) => {
  const [value, setValue] = useState<Content>(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (typeof value === "string") {
      onSave(value);
      setIsEditing(false);
    } else {
      console.error("Unexpected value type");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!isEditing) {
    return (
      <div
        className='bg-white p-4 rounded-md cursor-pointer'
        onClick={handleEdit}
        dangerouslySetInnerHTML={{
          __html: typeof value === "string" ? value : "",
        }}
      />
    );
  }

  return (
    <div className='space-y-4'>
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className='w-full'
        editorContentClassName='p-5'
        output='html'
        placeholder='Type your description here...'
        autofocus={true}
        editable={true}
        editorClassName='focus:outline-none'
      />
      <div className='space-x-2'>
        <Button onClick={handleSave}>Save</Button>
        <Button variant='outline' onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditor;
