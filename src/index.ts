/* import Automerge from 'automerge'; */
import { Block, Document, Inline, Leaf, Mark, Text } from 'slate';

export interface SerializedDocument {
  object: 'document';
  data: any;
  nodes: SerializedBlock[];
}

export function serializeDocument(
  document: Document<{ [key: string]: any }>,
): SerializedDocument {
  const { object, nodes, data } = document;

  return {
    object,
    data: data.toJS(),
    nodes: nodes.toArray().map((n) => serializeBlock(n)),
  };
}

export interface SerializedBlock {
  object: 'block';
  data: { [key: string]: any };
  isVoid: false;
  nodes: Array<SerializedBlock | SerializedInline | SerializedText>;
  type: string;
}

function serializeBlock(block: Block): SerializedBlock {
  const { object, nodes, type, data } = block;

  return {
    object,
    data: data.toJS(),
    isVoid: false, // TODO
    nodes: nodes.toArray().map((n) => {
      switch (n.object) {
        case 'block':
          return serializeBlock(n);
        case 'inline':
          return serializeInline(n);
        case 'text':
          return serializeText(n);
      }
    }),
    type,
  };
}

export interface SerializedInline {
  object: 'inline';
  data: { [key: string]: any };
  isVoid: false;
  nodes: Array<SerializedInline | SerializedText>;
  type: string;
}

function serializeInline(inline: Inline): SerializedInline {
  const { object, data, nodes, type } = inline;

  return {
    object,
    data: data.toJS(),
    isVoid: false, // TODO
    nodes: nodes.toArray().map((n) => {
      switch (n.object) {
        case 'inline':
          return serializeInline(n);
        case 'text':
          return serializeText(n);
      }
    }),
    type,
  };
}

export interface SerializedText {
  object: 'text';
  leaves: SerializedLeaf[];
}

function serializeText(text: Text): SerializedText {
  const { object } = text;

  const leaves = text.getLeaves();
  return {
    object,
    leaves: leaves.toArray().map((leaf) => serializeLeaf(leaf)),
  };
}

export interface SerializedLeaf {
  object: 'leaf';
  marks: SerializedMark[];
  text: string[];
}

function serializeLeaf(leaf: Leaf): SerializedLeaf {
  const { text, object, marks } = leaf;

  return {
    object,
    marks: marks ? marks.toArray().map((mark) => serializeMark(mark)) : [],
    text: text.split(''),
  };
}

export interface SerializedMark {
  object: 'mark';
  data: { [key: string]: any };
  type: string;
}

function serializeMark(mark: Mark): SerializedMark {
  const { object, type, data } = mark;

  return {
    object,
    data: data.toJS(),
    type,
  };
}
