import { Block, Shape, Shapes } from './shapes';
import { BOARD_WIDTH, ShapeColors } from './constants';

export interface Scene {
  board: Shape;
  block: Block;
}

export function getRandomShape() {
  return Shapes[~~(Math.random() * Shapes.length)];
}

export function getRandomColorIndex() {
  return ~~(Math.random() * (ShapeColors.length - 1) + 1);
}

export function invertShape(shape: Shape): Shape {
  let inverted: Shape = [];
  shape.forEach((row: number[], i: number) => {
    inverted[i] = [];
    row.forEach((cell, j: number) => {
      inverted[i][j] = cell ? -cell : cell;
    });
  });
  return inverted;
}

export function isGameOver(scene: Scene): boolean {
  return scene.block.shape.some(row => row.some(cell => cell < 0));
}

export function moveBlock(scene: Scene, deltaX: number = 0, deltaY: number = 0) {
  if (canMove(scene.board, scene.block, deltaX, deltaY)) {
    return {
      board: scene.board,
      block: {
        shape: scene.block.shape,
        colorIndex: scene.block.colorIndex,
        x: scene.block.x + deltaX,
        y: scene.block.y + deltaY
      }
    };
  }
  return;
}

export function rotate(scene: Scene) {
  if (canRotate(scene.board, scene.block)) {
    return {
      board: scene.board,
      block: {
        shape: rotateShape(scene.block.shape),
        colorIndex: scene.block.colorIndex,
        x: scene.block.x,
        y: scene.block.y
      }
    };
  }
  return;
}

export function removeFullRows(board: Shape): Shape {
  const indexes = board.reduce((acc, row, index) => {
    if (row.every(cell => !!cell)) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (indexes.length) {
    const emptyLines = Array(indexes.length)
      .fill(void 0)
      .map(_ => Array(BOARD_WIDTH).fill(0));

    const result = [
      ...emptyLines,
      ...board.filter((_, i) => indexes.indexOf(i) === -1)
    ];
    return result;
  }
  return board;
}

export function mergeBlockToBoard(board: Shape, block: Block) {
  const { x, y, shape, colorIndex } = block;
  shape.forEach((row: number[], i: number) =>
    row.forEach((cell: number, j: number) => {
      if (cell) {
        board[y + i][x + j] = colorIndex;
      }
    })
  );
  return board;
}

function canMove(board: Shape, block: Block, deltaX: number = 0, deltaY: number = 0) {
  const clone = { ...block } as Block;
  clone.x += deltaX;
  clone.y += deltaY;
  return !isInCollision(board, clone);
}

function canRotate(board: Shape, block: Block) {
  const clone = { ...block } as Block;
  clone.shape = rotateShape(clone.shape);
  return !isInCollision(board, clone);
}

function rotateShape(shape: Shape): Shape {
  let rotated: Shape = [];
  shape.forEach((row: number[], i: number) => {
    rotated[i] = [];
    row.forEach((_, j: number) => {
      rotated[i][j] = shape[row.length - 1 - j][i];
    });
  });
  return rotated;
}

function isInCollision(board: Shape, block: Block) {
  return block.shape.some((row: number[], i: number) =>
    row.some((cell: number, j: number) => {
      if (!cell) {
        return false;
      }
      const { x, y } = block;
      if (y + i < 0) {
        return false;
      }
      return !board[y + i] || (board[y + i][x + j] !== 0);
    })
  );
}