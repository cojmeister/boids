import { Boids } from "./boids/boids";

function main() {
  const canvas5 = <HTMLCanvasElement>document.getElementById("boids");
  const boids = new Boids(canvas5);
  boids.draw();
}

main();
