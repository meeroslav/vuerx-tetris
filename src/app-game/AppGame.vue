<template>
  <canvas id="gameCanvas">
  </canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, GAME_SPEED, GAP_SIZE, INIT, Keys } from './common/constants';
import { renderGameOver, renderScene } from './common/renderer';
import { generateScene } from './store/state';
import { isGameOver } from './common/game-logic';
import { BehaviorSubject, Subject, fromEvent, interval } from 'rxjs';
import { filter, map, takeUntil, scan, takeWhile, withLatestFrom } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { sceneReducer } from './store/mutations';

@Component({})
export default class AppGame extends Vue {
  private destroy$ = new Subject<boolean>();


  public mounted() {
    const canvas = this.$el as HTMLCanvasElement;
    canvas.width = BOARD_WIDTH * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    canvas.height = BOARD_HEIGHT * (CELL_SIZE + GAP_SIZE) - GAP_SIZE;
    const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.initGame(canvasCtx);
  }

  public beforeDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initGame(canvasCtx: CanvasRenderingContext2D) {
    const actions$ = new BehaviorSubject(INIT);

    fromEvent(document, 'keydown')
      .pipe(
        map((event: KeyboardEvent) => Keys[event.code]),
        filter((key) => !!key),
        takeUntil(this.destroy$),
      )
      .subscribe(actions$);

    interval(GAME_SPEED)
      .pipe(
        map((_) => Keys.ArrowDown),
        takeUntil(this.destroy$),
      )
      .subscribe(actions$);

    const scene$ = actions$
      .pipe(
        scan(sceneReducer, generateScene()),
      );

    interval(0, animationFrame)
      .pipe(
        withLatestFrom(scene$, (_, scene) => scene),
        takeWhile((scene) => !isGameOver(scene)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (scene) => renderScene(canvasCtx, scene),
        complete: () => renderGameOver(canvasCtx),
      });
  }
}
</script>

<style scoped lang="scss">
</style>
