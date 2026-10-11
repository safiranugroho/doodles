<script lang="ts">
  import Quagga from 'quagga';

  import config from './config.json';
  import { onMount } from 'svelte';

  type Point = { x: number; y: number };
  type Box = number[][];
  type QuaggaResult = { boxes?: Box[]; box?: Box; codeResult?: { code: string }; line?: Point[] };

  export let onDetected: (code: string) => void;

  onMount(() => {
    Quagga.init(config, (err: unknown) => {
      if (err) {
        console.log(err, 'error msg');
      }
      Quagga.start();
    });

    //detecting boxes on stream
    Quagga.onProcessed((result: QuaggaResult) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute('width')),
            Number(drawingCanvas.getAttribute('height'))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, {
            color: 'red',
            lineWidth: 3
          });
        }
      }
    });

    Quagga.onDetected(detected);
  });

  const detected = (result: Required<QuaggaResult>) => {
    onDetected(result.codeResult.code);
    Quagga.stop();
  };
</script>

<!-- If you do not specify a target, QuaggaJS would look for an element that matches the CSS
selector #interactive.viewport -->
<div id="interactive" class="viewport"></div>
