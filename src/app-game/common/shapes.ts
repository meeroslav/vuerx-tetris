import { BOARD_HEIGHT, BOARD_WIDTH } from './constants';

export interface Point2D {
  x: number;
  y: number;
}

export type Shape = number[][];

export interface Block {
  x: number;
  y: number;
  shape: Shape;
  colorIndex: number;
}

export const Shapes: Shape[] = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

export const BoardShape: Shape = Array(BOARD_HEIGHT)
  .fill(void 0)
  .map((_) => Array(BOARD_WIDTH)
    .fill(0));
