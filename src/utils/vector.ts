export default class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString(): string {
    return `p5.Vector Object : [${this.x}, ${this.y}, ${this.z}]`;
  }

  set(x?: number, y?: number, z?: number): Vector {
    if (x !== undefined) {
      this.x = x;
    }
    if (y !== undefined) {
      this.y = y;
    }
    if (z !== undefined) {
      this.z = z;
    }
    return this;
  }

  copy(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  add(x: number, y: number, z?: number): Vector;
  add(arr: number[]): Vector;
  add(otherVec: Vector): Vector;
  add(
    xArrOtherVec: number | number[] | Vector,
    y?: number,
    z?: number
  ): Vector {
    if (xArrOtherVec instanceof Vector) {
      this.x += xArrOtherVec.x;
      this.y += xArrOtherVec.y;
      this.z += xArrOtherVec.z;
    } else if (xArrOtherVec instanceof Array) {
      this.x += xArrOtherVec[0];
      this.y += xArrOtherVec[1];
      if (xArrOtherVec.length > 2) {
        this.z += xArrOtherVec[2];
      }
    } else {
      this.x += xArrOtherVec;
      this.y += y;
      this.z += z;
    }
    return this;
  }

  /// HELPERS FOR REMAINDER METHOD
  private _calculateRemainder2D(
    xComponent: number,
    yComponent: number
  ): Vector {
    if (xComponent !== 0) {
      this.x = this.x % xComponent;
    }
    if (yComponent !== 0) {
      this.y = this.y % yComponent;
    }
    return this;
  }

  private _calculateRemainder3D(
    xComponent: number,
    yComponent: number,
    zComponent: number
  ): Vector {
    if (xComponent !== 0) {
      this.x = this.x % xComponent;
    }
    if (yComponent !== 0) {
      this.y = this.y % yComponent;
    }
    if (zComponent !== 0) {
      this.z = this.z % zComponent;
    }
    return this;
  }

  rem(x: number, y: number, z?: number): Vector;
  rem(xyz: number[]): Vector;
  rem(otherVec: Vector): Vector;
  rem(
    xArrOtherVec: Vector | number | number[],
    _?: number,
    __?: number
  ): Vector {
    if (xArrOtherVec instanceof Vector) {
      if (
        Number.isFinite(xArrOtherVec.x) &&
        Number.isFinite(xArrOtherVec.y) &&
        Number.isFinite(xArrOtherVec.z)
      ) {
        return this._calculateRemainder3D(
          xArrOtherVec.x,
          xArrOtherVec.y,
          xArrOtherVec.z
        );
      }
    } else if (xArrOtherVec instanceof Array) {
      if (xArrOtherVec.every((element) => Number.isFinite(element))) {
        if (xArrOtherVec.length === 2) {
          return this._calculateRemainder2D(xArrOtherVec[0], xArrOtherVec[1]);
        }
        if (xArrOtherVec.length === 3) {
          return this._calculateRemainder3D.call(
            xArrOtherVec[0],
            xArrOtherVec[1],
            xArrOtherVec[2]
          );
        }
      }
    } else if (arguments.length === 1) {
      if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
        this.x = this.x % arguments[0];
        this.y = this.y % arguments[0];
        this.z = this.z % arguments[0];
        return this;
      }
    } else if (arguments.length === 2) {
      const vectorComponents = [...arguments];
      if (vectorComponents.every((element) => Number.isFinite(element))) {
        if (vectorComponents.length === 2) {
          return this._calculateRemainder2D(
            vectorComponents[0],
            vectorComponents[1]
          );
        }
      }
    } else if (arguments.length === 3) {
      const vectorComponents = [...arguments];
      if (vectorComponents.every((element) => Number.isFinite(element))) {
        if (vectorComponents.length === 3) {
          return this._calculateRemainder3D(
            vectorComponents[0],
            vectorComponents[1],
            vectorComponents[2]
          );
        }
      }
    }
    return this;
  }

  sub(x: number, y: number, z?: number): Vector;
  sub(arr: number[]): Vector;
  sub(otherVec: Vector): Vector;
  sub(
    xArrOtherVec: number | number[] | Vector,
    y?: number,
    z?: number
  ): Vector {
    if (xArrOtherVec instanceof Vector) {
      this.x -= xArrOtherVec.x;
      this.y -= xArrOtherVec.y;
      this.z -= xArrOtherVec.z;
    } else if (xArrOtherVec instanceof Array) {
      this.x -= xArrOtherVec[0];
      this.y -= xArrOtherVec[1];
      if (xArrOtherVec.length > 2) {
        this.z -= xArrOtherVec[2];
      }
    } else {
      this.x -= xArrOtherVec;
      this.y -= y;
      this.z -= z;
    }
    return this;
  }

  mult(scalar: number): Vector;
  mult(arr: number[]): Vector;
  mult(otherVec: Vector): Vector;
  mult(valIn: number | Vector | number[]): Vector {
    if (valIn instanceof Vector) {
      this.x *= valIn.x;
      this.y *= valIn.y;
      this.z *= valIn.z;
    } else if (valIn instanceof Array) {
      this.x *= valIn[0];
      this.y *= valIn[1];
      if (valIn.length > 2) {
        this.z *= valIn[2];
      }
    } else {
      this.x *= valIn;
      this.y *= valIn;
      this.z *= valIn;
    }
    return this;
  }

  div(scalar: number): Vector;
  div(arr: number[]): Vector;
  div(otherVec: Vector): Vector;
  div(valIn: number | Vector | number[]): Vector {
    if (valIn instanceof Vector) {
      this.x /= valIn.x;
      this.y /= valIn.y;
      this.z /= valIn.z;
    } else if (valIn instanceof Array) {
      if (valIn.filter((el) => el === 0).length > 0) {
        console.error("Division by zero");
      }
      this.x /= valIn[0];
      this.y /= valIn[1];
      if (valIn.length > 2) {
        this.z /= valIn[2];
      }
    } else {
      if (valIn === 0) {
        console.warn(`Dividing vector by 0 - ${this.toString()}`);
      }
      this.x /= valIn;
      this.y /= valIn;
      this.z /= valIn;
    }
    return this;
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  magSq(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  dot(x: number, y: number, z?: number): number;
  dot(otherVec: Vector): number;
  dot(xOrVec: number | Vector, y?: number, z?: number): number {
    if (xOrVec instanceof Vector) {
      return this.dot(xOrVec.x, xOrVec.y, xOrVec.z);
    }
    let x = xOrVec;
    return this.x * x + this.y * y + this.z * z;
  }

  cross(v: Vector): Vector {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector(x, y, z);
  }

  dist(v: Vector): number {
    return this.copy().sub(v).mag();
  }

  normalize(): Vector {
    const mag = this.mag();
    if (mag === 0) {
      console.error("Magnitude is zero");
      // throw new DivisionByZeroError
    }
    return this.div(mag);
  }

  limit(max: number): Vector {
    if (this.mag() > max) {
      return this.normalize().mult(max);
    }
    return this;
  }

  setMag(mag: number): Vector {
    return this.normalize().mult(mag);
  }

  heading(): number {
    return Math.atan2(this.y, this.x);
  }

  setHeading(a: number): Vector {
    let m = this.mag();
    this.x = m * Math.cos(a);
    this.y = m * Math.sin(a);
    return this;
  }

  rotate(a: number): Vector {
    let newHeading = this.heading() + a;
    const mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  angleBetween(v: Vector): number {
    const dotmagmag = this.dot(v) / (this.mag() * v.mag());
    // Mathematically speaking: the dotmagmag variable will be between -1 and 1
    // inclusive. Practically though it could be slightly outside this range due
    // to floating-point rounding issues. This can make Math.acos return NaN.
    //
    // Solution: we'll clamp the value to the -1,1 range
    let angle;
    angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    angle = angle * Math.sign(this.cross(v).z || 1);
    return angle;
  }

  array(): number[] {
    return [this.x, this.y, this.z];
  }

  equals(other: Vector): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  lerp() {
    throw new Error("Not implemented");
  }

  reflect() {
    throw new Error("Not implemented");
  }

  static fromAngle(angle: number, length?: number): Vector {
    if (length === undefined) {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  }

  static random2D(): Vector {
    return this.fromAngle(Math.random() * Math.PI * 2);
  }
}
