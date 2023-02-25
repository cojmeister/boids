import { CandyText } from "./boids/candy-text";

function main() {
  const canvas5 = <HTMLCanvasElement>document.getElementById("boids");
  const candy = new CandyText(canvas5);
  candy.draw("Boobies");
}

main();
