import {
  NodeViewWrapper,
  NodeViewContent,
  NodeViewContentProps,
} from "@tiptap/react";

import "highlight.js/styles/atom-one-dark.css";

type CodeBlockProps = {} & NodeViewContentProps;

const MarkdownCodeBlock = ({
                             node: {
                               attrs: { language: defaultLanguage },
                             },
                             extension,
                             updateAttributes,
                           }: CodeBlockProps) => {
  return (
    <NodeViewWrapper className="code-block relative">
      <select
        defaultValue={defaultLanguage}
        onChange={(e) => updateAttributes({ language: e.target.value })}
        className="select select-bordered select-sm absolute top-0 right-0 m-2"
      >
        <option value="null">Auto</option>
        <option disabled>-</option>

        {extension.options.lowlight.listLanguages().map((language: string) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default MarkdownCodeBlock;
