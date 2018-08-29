import { MutationTree } from 'vuex';
import { generateBlock, generateState, State } from './state';
import { invertShape, mergeBlockToBoard, moveBlock, removeFullRows, rotateBlock } from '../common/game-logic';
import { INIT, Keys } from '@/app-game/common/constants';

export const mutations: MutationTree<State> = {
  [INIT](state: State) {
    state.scene = generateState().scene;
  },
  [Keys.Space](state: State) {
    const rotated = rotateBlock(state.scene);
    if (rotated) {
      state.scene = rotated;
    }
  },
  [Keys.ArrowRight](state: State) {
    const result = moveBlock(state.scene, 1, 0);
    if (result) {
      state.scene = result;
    }
  },
  [Keys.ArrowLeft](state: State) {
    const result = moveBlock(state.scene, -1, 0);
    if (result) {
      state.scene = result;
    }
  },
  [Keys.ArrowDown](state: State) {
    const result = moveBlock(state.scene, 0, 1);
    if (result) {
      state.scene = result;
    } else {
      if (state.scene.block.y >= 0) {
        const board = mergeBlockToBoard(state.scene);
        state.scene = {
          board: removeFullRows(board), // remove lines if possible
          block: generateBlock(), // generate new block
        };
      } else {
        state.scene.block.shape = invertShape(state.scene.block.shape);
      }
    }
  },
};
