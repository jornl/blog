import {
  forwardRef,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Editor,
  EditorContent,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { cn } from "@/Utilities/utils";
import { all, createLowlight } from "lowlight";
import "remixicon/fonts/remixicon.css";
import "../../../css/placeholder.css";
import MarkdownMenuButton from "@/Components/MarkdownEditor/MarkdownMenuButton";
import MarkdownCodeBlock from "@/Components/MarkdownEditor/MarkdownCodeBlock";

const lowlight = createLowlight(all);

type EditorType = {
  placeholder?: string;
  className?: string;
  content?: string;
  onChange: (e: string) => void;
  error?: boolean;
};

export type EditorMethods = {
  clearContent: () => void;
};

const MarkdownEditor = forwardRef(
  (
    {
      placeholder = "",
      className = "",
      onChange,
      content = "",
      error = false,
      ...props
    }: EditorType & RefAttributes<HTMLDivElement>,
    ref,
  ) => {
    const editorRef = useRef<Editor>(null);

    const editorClasses = cn(
      "textarea textarea-bordered prose py-2 px-3 min-h-[38rem] max-h-[65rem] w-full max-w-none rounded-t-none text-base-content overflow-x-auto",
      className,
    );

    const editor = useEditor(
      {
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [2, 3, 4],
            },
            codeBlock: false,
          }),
          Markdown,
          Underline,
          Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: "https",
          }),
          Placeholder.configure({
            placeholder,
          }),
          CodeBlockLowlight.extend({
            addNodeView() {
              return ReactNodeViewRenderer(MarkdownCodeBlock);
            },
          }).configure({ lowlight }),
        ],
        editorProps: {
          attributes: {
            class: editorClasses,
          },
        },
        onUpdate: ({ editor }) => {
          onChange(editor.storage.markdown.getMarkdown());
        },

        onCreate: ({ editor }) => {
          editor.commands.setContent(content, false);
        },
      },
      [content, error],
    );

    if (!editor) return null;

    const setLink = useCallback(() => {
      const previousUrl = editor.getAttributes("link").href;
      // TODO: Add a modal to add a link
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }, [editor]);

    useImperativeHandle(ref, () => ({
      clearContent: () => {
        editorRef.current?.commands.clearContent(true);
      },
    }));

    return (
      <>
        {editor && (
          <div className="rounded-md border-0">
            <menu className="flex flex-wrap divide-x divide-y md:divide-y-0 divide-base-100 join">
              <li>
                <MarkdownMenuButton
                  active={editor.isActive("heading", { level: 2 })}
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
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                >
                  <i className="ri-list-ordered" />
                </MarkdownMenuButton>
              </li>
              <li>
                <MarkdownMenuButton
                  active={editor.isActive("bulletList")}
                  title="Unordered List"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <i className="ri-list-unordered" />
                </MarkdownMenuButton>
              </li>
              <li>
                <MarkdownMenuButton
                  active={editor.isActive("link")}
                  title="Add link"
                  onClick={setLink}
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
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <i className="ri-code-block" />
                </MarkdownMenuButton>
              </li>
            </menu>
            <EditorContent editor={editor} />
          </div>
        )}
      </>
    );
  },
);

export default MarkdownEditor;
