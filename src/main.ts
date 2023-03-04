import { Animation } from "./animation";

function main() {
  const canvas5 = <HTMLCanvasElement>document.getElementById("boids");
  const boids = new Animation(canvas5);
  boids.draw();
}

main();
