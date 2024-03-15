import { RefAttributes } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { cn } from "@/Utilities/utils";

import "remixicon/fonts/remixicon.css";
import "../../../css/placeholder.css";

type EditorType = {
  placeholder?: string;
  className?: string;
};

const MarkdownEditor = function ({
  placeholder = "",
  className = "",
  ...props
}: EditorType & RefAttributes<HTMLDivElement>) {
  const href = () => {};

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
        class: cn(
          "textarea textarea-bordered prose py-2 px-3 min-h-[600px] w-full max-w-none rounded-t-none ",
          className,
        ),
      },
    },
  });

  return (
    <>
      {editor && (
        <div className="rounded-md border-0">
          <menu className="flex flex-wrap divide-x divide-y md:divide-y-0 divide-base-100">
            <li>
              <button
                className={cn(
                  "rounded-tl-md px-3 py-2 bg-base-200 hover:bg-base-300 ",
                  {
                    "bg-base-300": editor.isActive("heading", { level: 2 }),
                  },
                )}
                type="button"
                title="Heading 1"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <i className="ri-h-1" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("heading", { level: 3 }),
                })}
                type="button"
                title="Heading 2"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <i className="ri-h-2" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("heading", { level: 4 }),
                })}
                type="button"
                title="Heading 3"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
              >
                <i className="ri-h-3" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("bold"),
                })}
                type="button"
                title="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <i className="ri-bold" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("italic"),
                })}
                type="button"
                title="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <i className="ri-italic" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("underline"),
                })}
                type="button"
                title="Strikethrough"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <i className="ri-underline" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("strike"),
                })}
                type="button"
                title="Strikethrough"
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <i className="ri-strikethrough" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("orderedList"),
                })}
                type="button"
                title="Ordered List"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <i className="ri-list-ordered" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("bulletList"),
                })}
                type="button"
                title="Unordered List"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <i className="ri-list-unordered" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("link"),
                })}
                type="button"
                title="Add link"
                onClick={() => {}}
              >
                <i className="ri-link" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("code"),
                })}
                type="button"
                title="Unordered List"
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <i className="ri-code-line" />
              </button>
            </li>
            <li>
              <button
                className={cn("px-3 py-2 bg-base-200 hover:bg-base-300 ", {
                  "bg-base-300": editor.isActive("codeBlock"),
                })}
                type="button"
                title="Unordered List"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <i className="ri-code-block" />
              </button>
            </li>
          </menu>
          <EditorContent editor={editor} {...props} />
        </div>
      )}
    </>
  );
};

export default MarkdownEditor;
