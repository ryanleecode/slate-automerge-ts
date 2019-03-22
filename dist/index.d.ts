import { Document } from 'slate';

export interface Proxy {
  insertAt(index: number, ...values: any[]): void;
}

export interface SerializedDocument {
  object: 'document';
  data: any;
  nodes: SerializedBlock[] & Proxy;
}
export declare function serializeDocument(
  document: Document<{
    [key: string]: any;
  }>,
): SerializedDocument;
export interface SerializedBlock {
  object: 'block';
  data: {
    [key: string]: any;
  };
  isVoid: false;
  nodes: Array<SerializedBlock | SerializedInline | SerializedText>;
  type: string;
}
export interface SerializedInline {
  object: 'inline';
  data: {
    [key: string]: any;
  };
  isVoid: false;
  nodes: Array<SerializedInline | SerializedText>;
  type: string;
}
export interface SerializedText {
  object: 'text';
  leaves: SerializedLeaf[];
}
export interface SerializedLeaf {
  object: 'leaf';
  marks: SerializedMark[];
  text: string[] & Proxy;
}
export interface SerializedMark {
  object: 'mark';
  data: {
    [key: string]: any;
  };
  type: string;
}
