import { Node } from "@tiptap/core";

export const Columns = Node.create({
  name: "columns",
  group: "block",
  content: "column+",
  parseHTML() {
    return [
      {
        tag: "div.columns",
      },
    ];
  },
  renderHTML() {
    return ["div", { class: "columns" }, 0];
  },
});

export const Column = Node.create({
  name: "column",
  group: "block",
  content: "block+",
  parseHTML() {
    return [
      {
        tag: "div.column",
      },
    ];
  },
  renderHTML() {
    return ["div", { class: "column" }, 0];
  },
});

export const ColumnsSideBar = Node.create({
  name: "columnsbar",
  group: "block",
  content: "(columnsmall | columnbig)+",

  parseHTML() {
    return [{ tag: "div.columnsbar" }];
  },

  renderHTML() {
    return ["div", { class: "columnsbar" }, 0];
  },
});

export const ColumnSmall = Node.create({
  name: "columnsmall",
  group: "block",
  content: "block+",

  renderHTML() {
    return ["div", { class: "columnsmall" }, 0];
  },
});

export const ColumnBig = Node.create({
  name: "columnbig",
  group: "block",
  content: "block+",

  renderHTML() {
    return ["div", { class: "columnbig" }, 0];
  },
});
