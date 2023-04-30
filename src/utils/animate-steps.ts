export const animateSteps = (totalFrames: number, callback: (props: {
  frame: number,
  timestamp: number,
}) => void) => {
  let frame = 0;
  const looper = (timestamp: number) => {
    const _frame = frame++;
    callback({ frame: _frame, timestamp });
    if (frame < totalFrames) {
      window.requestAnimationFrame(looper);
    }
  }

  window.requestAnimationFrame(looper);
}