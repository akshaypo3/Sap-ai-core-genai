import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Card from "../titapCom/Card.jsx";

export default Node.create({
  name: "cardComponent",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      content: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "card-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["card-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Card);
  },
});
