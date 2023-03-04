import Vehicle from "./utils/vehicle";
import Vector, { Position } from "./utils/vector";
import { Boid } from "./boids/boid";

export class Animation {
  private readonly ctx: CanvasRenderingContext2D;
  private raf: number;
  private continueAnimating = true;
  private readonly textBackgroundColor = "#333";
  private readonly mousePosition: Position = { x: 0, y: 0 };
  private readonly boid: Boid = new Boid(1000, 500);

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext("2d");

    this.canvas.addEventListener("mousemove", (e) => {
      this.calculateMouseRelativePositionInCanvas(e);
    });
    this.canvas.addEventListener("mouseenter", () => {
      this.raf = window.requestAnimationFrame(() => this.animate());
      this.continueAnimating = true;
    });
    this.canvas.addEventListener("mouseout", () => {
      window.cancelAnimationFrame(this.raf);
      this.continueAnimating = false; // stop animation when mouse out.
    });
  }

  draw() {
    this.drawBackground();

    this.animate();
  }

  private drawBackground() {
    this.ctx.fillStyle = this.textBackgroundColor;
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
  }

  private animate() {
    if (!this.continueAnimating) {
      return; // return when nothing needs to animate
    }

    const position = new Vector(this.mousePosition);
    this.drawBackground();
    this.boid.animate(position, this.ctx);
    window.requestAnimationFrame(() => this.animate());
  }

  private calculateMouseRelativePositionInCanvas(e: MouseEvent) {
    this.mousePosition.x =
      e.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft) -
      this.canvas.offsetLeft;
    this.mousePosition.y =
      e.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop) -
      this.canvas.offsetTop;
  }
}
