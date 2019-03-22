import { Value } from 'slate';
import { serializeDocument } from '../';

const initialValue = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'This is the editor. Type here.',
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'ul_list',
        data: {
          style: {
            listStyleType: 'disc',
          },
        },
        nodes: [
          {
            object: 'block',
            type: 'list_item',
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                nodes: [
                  {
                    object: 'text',
                    leaves: [
                      {
                        text:
                          'This is node in a list. Hit [ENTER] and then hit [TAB]',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

const expected = {
  object: 'document',
  data: {},
  nodes: [
    {
      object: 'block',
      data: {},
      isVoid: false,
      nodes: [
        {
          object: 'text',
          leaves: [
            {
              object: 'leaf',
              marks: [],
              text: [
                'T',
                'h',
                'i',
                's',
                ' ',
                'i',
                's',
                ' ',
                't',
                'h',
                'e',
                ' ',
                'e',
                'd',
                'i',
                't',
                'o',
                'r',
                '.',
                ' ',
                'T',
                'y',
                'p',
                'e',
                ' ',
                'h',
                'e',
                'r',
                'e',
                '.',
              ],
            },
          ],
        },
      ],
      type: 'paragraph',
    },
    {
      object: 'block',
      data: { style: { listStyleType: 'disc' } },
      isVoid: false,
      nodes: [
        {
          object: 'block',
          data: {},
          isVoid: false,
          nodes: [
            {
              object: 'block',
              data: {},
              isVoid: false,
              nodes: [
                {
                  object: 'text',
                  leaves: [
                    {
                      object: 'leaf',
                      marks: [],
                      text: [
                        'T',
                        'h',
                        'i',
                        's',
                        ' ',
                        'i',
                        's',
                        ' ',
                        'n',
                        'o',
                        'd',
                        'e',
                        ' ',
                        'i',
                        'n',
                        ' ',
                        'a',
                        ' ',
                        'l',
                        'i',
                        's',
                        't',
                        '.',
                        ' ',
                        'H',
                        'i',
                        't',
                        ' ',
                        '[',
                        'E',
                        'N',
                        'T',
                        'E',
                        'R',
                        ']',
                        ' ',
                        'a',
                        'n',
                        'd',
                        ' ',
                        't',
                        'h',
                        'e',
                        'n',
                        ' ',
                        'h',
                        'i',
                        't',
                        ' ',
                        '[',
                        'T',
                        'A',
                        'B',
                        ']',
                      ],
                    },
                  ],
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'list_item',
        },
      ],
      type: 'ul_list',
    },
  ],
};

test('serialize', () => {
  expect(
    serializeDocument(Value.fromJSON(initialValue as any).document),
  ).toEqual(expected);
});
