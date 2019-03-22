"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serializeDocument(document) {
    var object = document.object, nodes = document.nodes, data = document.data;
    return {
        object: object,
        data: data.toJS(),
        nodes: nodes.toArray().map(function (n) { return serializeBlock(n); }),
    };
}
exports.serializeDocument = serializeDocument;
function serializeBlock(block) {
    var object = block.object, nodes = block.nodes, type = block.type, data = block.data;
    return {
        object: object,
        data: data.toJS(),
        isVoid: false,
        nodes: nodes.toArray().map(function (n) {
            switch (n.object) {
                case 'block':
                    return serializeBlock(n);
                case 'inline':
                    return serializeInline(n);
                case 'text':
                    return serializeText(n);
            }
        }),
        type: type,
    };
}
function serializeInline(inline) {
    var object = inline.object, data = inline.data, nodes = inline.nodes, type = inline.type;
    return {
        object: object,
        data: data.toJS(),
        isVoid: false,
        nodes: nodes.toArray().map(function (n) {
            switch (n.object) {
                case 'inline':
                    return serializeInline(n);
                case 'text':
                    return serializeText(n);
            }
        }),
        type: type,
    };
}
function serializeText(text) {
    var object = text.object;
    var leaves = text.getLeaves();
    return {
        object: object,
        leaves: leaves.toArray().map(function (leaf) { return serializeLeaf(leaf); }),
    };
}
function serializeLeaf(leaf) {
    var text = leaf.text, object = leaf.object, marks = leaf.marks;
    return {
        object: object,
        marks: marks ? marks.toArray().map(function (mark) { return serializeMark(mark); }) : [],
        text: text.split(''),
    };
}
function serializeMark(mark) {
    var object = mark.object, type = mark.type, data = mark.data;
    return {
        object: object,
        data: data.toJS(),
        type: type,
    };
}
