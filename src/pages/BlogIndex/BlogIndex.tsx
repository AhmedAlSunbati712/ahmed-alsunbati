import { Link } from "react-router-dom";
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import { Editor, EditorContent, useEditor } from '@tiptap/react';

const EditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="w-full rounded-md flex items-center gap-2">
      <button className="p-2 rounded-md hover:bg-surface-subtle" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>h1</button>
      <button className="p-2 rounded-md hover:bg-surface-subtle" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>h2</button>
      <button className="p-2 rounded-md hover:bg-surface-subtle" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>h3</button>
      <button className="p-2 rounded-md hover:bg-surface-subtle" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>h4</button>
      <button className="p-2 rounded-md hover:bg-surface-subtle" onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>h5</button>
      <button className="p-2 rounded-md hover:bg-surface-subtle" onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>h6</button>
    </div>
  )
}

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      })
    ],
    content: `<h1>Hello, World!</h1>`,
  })
  if (!editor) return null;
  return (
    <div className="w-full max-w-3xl min-h-[200px] border border-border rounded-md p-4 mx-auto">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  )
}

export const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-3xl px-6 py-24 text-left">
        <TextEditor />
        <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
          Blog
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          Writing is coming soon.
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground mb-10">
          This section is reserved for long-form notes on software engineering,
          systems thinking, and project breakdowns.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-subtle transition-colors"
        >
          Back to portfolio
        </Link>
      </main>
    </div>
  );
};
