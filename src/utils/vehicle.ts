import Vector from "./vector";

export default class Vehicle {
  position: Vector;
  velocity: Vector = new Vector(0, -2);
  acceleration: Vector = new Vector(0, 0);
  radius: number = 6;
  maxforce: number = 0.4; // Maximum steering force
  maxspeed: number = 4; // Maximum speed
  readonly color =
    "#" + ((Math.random() * 0x949494 + 0xaaaaaa) | 0).toString(16);

  constructor(x: number, y: number);
  constructor(position: Vector);
  constructor(x: number | Vector, y?: number) {
    if (x instanceof Vector) {
      this.position = x;
    } else {
      this.position = new Vector(x, y);
    }
  }

  update(): void {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force: Vector): void {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  seek(target: Vector): void {
    let desired: Vector = target.sub(this.position); // A vector pointing from the position to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    let steer: Vector = desired.sub(this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const theta = this.velocity.heading() + Math.PI / 2;
    const x = this.position.x;
    const y = this.position.y;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(x, y);
    ctx.rotate(theta);
    ctx.beginPath();
    ctx.lineTo(0, -this.radius * 2);
    ctx.lineTo(-this.radius, this.radius * 2);
    ctx.lineTo(this.radius, this.radius * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
