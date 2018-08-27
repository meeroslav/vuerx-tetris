import { Block, BoardShape, Shape, Shapes } from '../common/shapes';
import { BOARD_WIDTH, ShapeColors } from '../common/constants';

export function generateBlock() {
  const shape = getRandomShape();

  return {
    shape,
    colorIndex: getRandomColorIndex(),
    x: ~~((BOARD_WIDTH - shape[0].length) / 2),
    y: -shape.length + 1,
  };
}

export function getRandomShape() {
  return Shapes[~~(Math.random() * Shapes.length)];
}

export function getRandomColorIndex() {
  return ~~(Math.random() * (ShapeColors.length - 1) + 1);
}

export interface Scene {
  board: Shape;
  block: Block;
}

export interface State {
  scene: Scene;
}

export function generateState(): State {
  return {
    scene: {
      board: BoardShape,
      block: generateBlock(),
    }
  };
}
