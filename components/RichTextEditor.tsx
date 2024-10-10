import React, { useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "./minimal-tiptap";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";

interface RichTextEditorProps {
  initialContent: string;
  onSave: (content: { html: string; plainText: string }) => void;
  isSaving: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent,
  onSave,
  isSaving,
}) => {
  const [value, setValue] = useState<Content>(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (typeof value === "string") {
      const sanitizedHtml = DOMPurify.sanitize(value);
      const plainText =
        new DOMParser().parseFromString(sanitizedHtml, "text/html").body
          .textContent || "";
      onSave({ html: sanitizedHtml, plainText });
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
        className='w-full bg-white'
        editorContentClassName='p-5'
        output='html'
        placeholder='Type your description here...'
        autofocus={true}
        editable={true}
        editorClassName='focus:outline-none'
      />
      <div className='space-x-2'>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button
          variant='outline'
          onClick={() => setIsEditing(false)}
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditor;
