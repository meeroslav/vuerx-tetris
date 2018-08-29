import { MutationTree } from 'vuex';
import { generateBlock, generateState, State } from './state';
import { invertShape, mergeBlockToBoard, moveBlock, removeFullRows, rotateBlock } from '../common/game-logic';

export const mutations: MutationTree<State> = {
  Init(state: State) {
    state.scene = generateState().scene;
  },
  Space(state: State) {
    const rotated = rotateBlock(state.scene);
    if (rotated) {
      state.scene = rotated;
    }
  },
  ArrowRight(state: State) {
    const result = moveBlock(state.scene, 1, 0);
    if (result) {
      state.scene = result;
    }
  },
  ArrowLeft(state: State) {
    const result = moveBlock(state.scene, -1, 0);
    if (result) {
      state.scene = result;
    }
  },
  ArrowDown(state: State) {
    const result = moveBlock(state.scene, 0, 1);
    if (result) {
      state.scene = result;
    } else {
      if (state.scene.block.y >= 0) {
        const board = mergeBlockToBoard(state.scene);
        state.scene = {
          board: removeFullRows(board), // remove lines if possible
          block: generateBlock() // generate new block
        }
      } else {
        state.scene.block.shape = invertShape(state.scene.block.shape);
      }
    }
  },
};
