import { Block, Shape } from './shapes';
import { BOARD_WIDTH } from './constants';
import { Scene, State } from '../store/state';

export function invertShape(shape: Shape): Shape {
  const inverted: Shape = [];
  shape.forEach((row: number[], i: number) => {
    inverted[i] = [];
    row.forEach((cell, j: number) => {
      inverted[i][j] = cell ? -cell : cell;
    });
  });
  return inverted;
}

export function isGameOver(scene: Scene): boolean {
  return scene.block.shape.some((row) => row.some((cell) => cell < 0));
}

export function moveBlock(scene: Scene, deltaX: number = 0, deltaY: number = 0): Scene | undefined {
  if (canMove(scene.board, scene.block, deltaX, deltaY)) {
    return {
      board: scene.board,
      block: {
        shape: scene.block.shape,
        colorIndex: scene.block.colorIndex,
        x: scene.block.x + deltaX,
        y: scene.block.y + deltaY,
      },
    };
  }
  return;
}

export function rotateBlock(scene: Scene): Scene | undefined {
  if (canRotate(scene.board, scene.block)) {
    return {
      board: scene.board,
      block: {
        shape: rotateShape(scene.block.shape),
        colorIndex: scene.block.colorIndex,
        x: scene.block.x,
        y: scene.block.y,
      },
    };
  }
  return;
}

export function removeFullRows(board: Shape): Shape {
  const indexes = board.reduce((acc, row, index) => {
    if (row.every((cell) => !!cell)) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (indexes.length) {
    const emptyLines = Array(indexes.length)
      .fill(void 0)
      .map((_) => Array(BOARD_WIDTH).fill(0));

    const result = [
      ...emptyLines,
      ...board.filter((_, i) => indexes.indexOf(i) === -1),
    ];
    return result;
  }
  return board;
}

export function mergeBlockToBoard(scene: Scene): Shape {
  const { x, y, shape, colorIndex } = scene.block;
  shape.forEach((row: number[], i: number) =>
    row.forEach((cell: number, j: number) => {
      if (cell) {
        scene.board[y + i][x + j] = colorIndex;
      }
    }),
  );
  return scene.board;
}

function canMove(board: Shape, block: Block, deltaX: number = 0, deltaY: number = 0): boolean {
  const clone = { ...block } as Block;
  clone.x += deltaX;
  clone.y += deltaY;
  return !isInCollision(board, clone);
}

function canRotate(board: Shape, block: Block): boolean {
  const clone = { ...block } as Block;
  clone.shape = rotateShape(clone.shape);
  return !isInCollision(board, clone);
}

function rotateShape(shape: Shape): Shape {
  const rotated: Shape = [];
  shape.forEach((row: number[], i: number) => {
    rotated[i] = [];
    row.forEach((_, j: number) => {
      rotated[i][j] = shape[row.length - 1 - j][i];
    });
  });
  return rotated;
}

function isInCollision(board: Shape, block: Block): boolean {
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
    }),
  );
}
