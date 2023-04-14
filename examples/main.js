import Resizer from "@chenziappu/resizer";

const resizer = new Resizer();

function resize({ width, height, dpr }) {
  console.log(`Window size changed to ${width}x${height} at ${dpr}x DPR.`);
}

resizer.add(resize);