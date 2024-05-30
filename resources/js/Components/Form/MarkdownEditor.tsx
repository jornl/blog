import { RefAttributes, useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { cn } from "@/Utilities/utils";

import "remixicon/fonts/remixicon.css";
import "../../../css/placeholder.css";
import MarkdownMenuButton from "@/Components/Buttons/MarkdownMenuButton";

type EditorType = {
  placeholder?: string;
  className?: string;
  content?: string;
  onChange: (e: any) => void;
  error?: boolean;
};

const MarkdownEditor = function ({
  placeholder = "",
  className = "",
  onChange,
  content = "",
  error = false,
  ...props
}: EditorType & RefAttributes<HTMLDivElement>) {
  const href = () => {};

  const ref = useRef<HTMLDivElement>(null);

  const editorClasses = cn(
    "textarea textarea-bordered prose py-2 px-3 min-h-[38rem] w-full max-w-none rounded-t-none text-base-content",
    className,
    { "textarea-error": error },
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Markdown,
      Underline,
      Link,
      Placeholder.configure({
        placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class: editorClasses,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }

    if (editor) {
      editor.commands.resetAttributes(
        "class",
        cn(
          "textarea textarea-bordered prose py-2 px-3 min-h-[38rem] w-full max-w-none rounded-t-none text-base-content",
          { "textarea-error": error },
        ),
      );
    }
  }, [editor, content, error]);

  return (
    <>
      {editor && (
        <div className="rounded-md border-0">
          <menu className="flex flex-wrap divide-x divide-y md:divide-y-0 divide-base-100">
            <li>
              <MarkdownMenuButton
                active={editor.isActive("heading", { level: 2 })}
                className="rounded-tl-md"
                title="Heading 1"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <i className="ri-h-1" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("heading", { level: 3 })}
                title="Heading 2"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <i className="ri-h-2" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("heading", { level: 4 })}
                title="Heading 3"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
              >
                <i className="ri-h-3" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("bold")}
                title="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <i className="ri-bold" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("italic")}
                title="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <i className="ri-italic" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("underline")}
                title="Underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <i className="ri-underline" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("strike")}
                title="Strikethrough"
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <i className="ri-strikethrough" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("orderedList")}
                title="Ordered List"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <i className="ri-list-ordered" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("bulletList")}
                title="Unordered List"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <i className="ri-list-unordered" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("link")}
                title="Add link"
                onClick={() => {}}
              >
                <i className="ri-link" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("code")}
                title="Code"
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <i className="ri-code-line" />
              </MarkdownMenuButton>
            </li>
            <li>
              <MarkdownMenuButton
                active={editor.isActive("codeBlock")}
                title="Code Block"
                className="rounded-tr-md"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <i className="ri-code-block" />
              </MarkdownMenuButton>
            </li>
          </menu>
          <EditorContent
            editor={editor}
            content={content}
            {...props}
            ref={ref}
          />
        </div>
      )}
    </>
  );
};

export default MarkdownEditor;
