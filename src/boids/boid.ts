import Vehicle from "../utils/vehicle";
import Vector from "../utils/vector";
import lerp from "../utils/lerp";

/**
 * Class representing a singular Boid
 * @extends []{@link Vehicle}
 */
export class Boid extends Vehicle {
  constructor(width: number, height: number) {
    super(Math.random() * width, Math.random() * height);
  }

  /**
   * Allow the boid to seek targets
   * @param {Vector}target the target that the boids will seek
   * @param {boolean}[arrive=true] wether to arrive or circle the target
   */
  seek(target: Vector, arrive: boolean = true): void {
    let desired: Vector = target.sub(this.position); // A vector pointing from the position to the target

    let maxspeed: number;

    const dist = desired.mag();

    if (dist < this.threshold && arrive) {
      maxspeed = lerp(dist, 0, this.threshold, 0, this.maxspeed);
    } else {
      maxspeed = this.maxspeed;
    }
    // Scale to maximum speed
    desired.setMag(maxspeed);

    // Steering = Desired minus velocity
    let steer: Vector = desired.sub(this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  /**
   * Tell the boid to stay withing walls are not
   * @param walls the walls we want to stay within - we asusme that min X and min Y are 0 - can be improved
   */
  stayWithinWalls(walls: { maxX: number; maxY: number }) {
    if (this.position.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.x > walls.maxX) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0) {
      this.velocity.y *= -1;
    }
    if (this.position.y > walls.maxY) {
      this.velocity.y *= -1;
    }
  }

  /**
   * Animate the boid
   * @param target the target that it'll seek
   * @param ctx the Canvas ctx
   */
  animate(target: Vector, ctx: CanvasRenderingContext2D) {
    this.seek(target);
    this.update();
    this.draw(ctx);
  }
}
