import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// 1. Import the new extensions
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
// 2. Import additional Lucide icons for UI representation
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Link2,
  Image as ImageIcon,
} from "lucide-react";

const ToggleButton = ({ onClick, isActive, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded hover:bg-background dark:text-white transition-colors ${
      isActive ? "bg-background text-black font-bold" : "text-gray-600"
    }`}
  >
    {children}
  </button>
);

const TextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          keepMarks: true,
          dropEmptyBlocks: false,
        },
        // StarterKit includes Headings, but defaults to levels 1-6.
        // We ensure it fits nicely here.
      }),
      // 3. Register the newly added extensions
      Image,
      Link.configure({
        openOnClick: false, // Prevents navigating away while editing
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer hover:text-blue-800",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        // 4. Added styling hooks for your new headings, links, and images
        class:
          "prose max-w-none min-h-[250px]  w-full px-4 py-2 text-sm bg-background border border-border border-t-0 rounded-b-lg focus:outline-none transition-all duration-200 disabled:opacity-100 disabled:cursor-not-allowed " +
          "[&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_h4]:text-base [&_h4]:font-bold [&_h5]:text-sm [&_h5]:font-bold " +
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic " +
          "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md [&_img]:my-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  // 5. Action Handlers for Link & Image prompts
  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // Cancelled prompt
    if (url === null) return;

    // Empty URL removes the link
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-linear-to-r from-indigo-200 to-purple-200 via-yellow-100 border border-border  rounded-t-lg">
        {/* Inline Formatting */}
        <ToggleButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
          <Bold size={16} />
        </ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
          <Italic size={16} />
        </ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive("strike")}>
          <Strikethrough size={16} />
        </ToggleButton>

        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Headings h2 - h5 */}
        <ToggleButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })}>
          <Heading2 size={16} />
        </ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })}>
          <Heading3 size={16} />
        </ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} isActive={editor.isActive("heading", { level: 4 })}>
          <Heading4 size={16} />
        </ToggleButton>
        <ToggleButton onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} isActive={editor.isActive("heading", { level: 5 })}>
          <Heading5 size={16} />
        </ToggleButton>

        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Links & Media */}
        <ToggleButton onClick={addLink} isActive={editor.isActive("link")}>
          <Link2 size={16} />
        </ToggleButton>
        <ToggleButton onClick={addImage} isActive={false}>
          <ImageIcon size={16} />
        </ToggleButton>

        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Blocks */}
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
