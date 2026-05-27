import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough, Heading2, List, ListOrdered, Quote } from "lucide-react";

const ToggleButton = ({ onClick, isActive, children }) => (
  <button
    type="button"
    // disabled={disabled}
    onClick={onClick}
    className={`p-2 rounded hover:bg-background dark:text-white transition-colors ${isActive ? "bg-background text-black font-bold" : "text-gray-600"}`}
  >
    {children}
  </button>
);

const TextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[150px] w-full px-4 py-2 text-sm bg-background border border-border border-t-0 rounded-b-lg focus:outline-none transition-all duration-200 disabled:opacity-100 disabled:cursor-not-allowed [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic",
      },
    },
    onUpdate: ({ editor }) => {
      // Send the HTML content back to the parent component
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Helper component for toolbar buttons

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-muted border border-border rounded-t-lg border-b-0">
        <ToggleButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
          <Bold size={16} />
        </ToggleButton>

        <ToggleButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
          <Italic size={16} />
        </ToggleButton>

        <ToggleButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")}>
          <Strikethrough size={16} />
        </ToggleButton>

        <div className="h-4 w-[1px] bg-gray-500 dark:bg-white mx-1" />

        <ToggleButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })}>
          <Heading2 size={16} />
        </ToggleButton>

        <ToggleButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")}>
          <List size={16} />
        </ToggleButton>

        <ToggleButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")}>
          <ListOrdered size={16} />
        </ToggleButton>

        <ToggleButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")}>
          <Quote size={16} className="dark:text-white" />
        </ToggleButton>
      </div>

      {/* Editor Surface */}
      <div className="bg-background">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
