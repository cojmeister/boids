import Vector, { Position, isPosition } from "../../src/utils/vector";

describe("isPosition", () => {
  it("should return true when something is position", () => {
    const aa: Position = { x: 0, y: 0 };
    expect(isPosition(aa)).toBeTruthy();
  });

  it("should return false when something isn't position", () => {
    const aa = { x: 0, yArg: 0, z: 0 };
    expect(isPosition(aa)).toBeFalsy();
  });

  it("should return true for overlays of position", () => {
    const aa = { x: 0, y: 0, z: 0 };
    expect(isPosition(aa)).toBeTruthy();
  });
});

describe("Vector", () => {
  const vectorA2D = new Vector(0, 1);
  const vectorB2D = new Vector(1, 0);
  const vectorC2D = new Vector(1, 1);
  const vectorA3D = new Vector(0, 1, 1);
  const vectorC3D = new Vector(1, 1, 1);

  it("Should construct properly", () => {
    const xVal = 0;
    const yVal = 1;
    const zVal = 2;
    const actual = new Vector(xVal, yVal);
    expect(actual.x).toEqual(xVal);
    expect(actual.y).toEqual(yVal);
    const actual2 = new Vector(xVal, yVal, zVal);
    expect(actual2.x).toEqual(xVal);
    expect(actual2.y).toEqual(yVal);
    expect(actual2.z).toEqual(zVal);
    const pos = { x: 10, y: 101 } as Position;
    const actual3 = new Vector(pos);
    expect(actual3.x).toEqual(10);
    expect(actual3.y).toEqual(101);
  });

  it.each`
    arrIn        | xin  | yin  | zin
    ${[1, 2, 3]} | ${1} | ${2} | ${3}
    ${[1, 2]}    | ${1} | ${2} | ${0}
    ${[1, 0, 3]} | ${1} | ${0} | ${3}
    ${[0, 0, 3]} | ${0} | ${0} | ${3}
  `("should construct from array", ({ arrIn, xin, yin, zin }) => {
    const actual = new Vector(arrIn);
    const expected = new Vector(xin, yin, zin);
    expect(actual).toEqual(expected);
  });

  it("should properly turn to string", () => {
    expect(vectorA2D.toString()).toEqual(`Vector Object : [0, 1, 0]`);
    expect(vectorC2D.toString()).toEqual(`Vector Object : [1, 1, 0]`);
    expect(vectorC3D.toString()).toEqual(`Vector Object : [1, 1, 1]`);
  });

  it("set properly", () => {
    const ogVec = new Vector(1, 1);
    ogVec.set(2, 3);
    expect(ogVec.x).toEqual(2);
    expect(ogVec.y).toEqual(3);
    expect(ogVec.z).toEqual(0);
    ogVec.set(undefined, undefined, 10);
    expect(ogVec.z).toEqual(10);
  });

  it("should copy", () => {
    expect(vectorA2D.copy()).toBeInstanceOf(Vector);
  });

  it("should add", () => {
    expect(vectorA2D.copy().add(vectorB2D)).toEqual(vectorC2D);
    expect(vectorB2D.copy().add([0, 1])).toEqual(vectorC2D);
    expect(vectorA3D.copy().add([1, 0, 0])).toEqual(vectorC3D);
    expect(vectorA3D.copy().add(1, 0, 0)).toEqual(vectorC3D);
  });

  it("should substract", () => {
    expect(vectorC2D.copy().sub(vectorB2D)).toEqual(vectorA2D);
    expect(vectorC2D.copy().sub([0, 1])).toEqual(vectorB2D);
    expect(vectorC3D.copy().sub([1, 0, 0])).toEqual(vectorA3D);
    expect(vectorC3D.copy().sub(1, 0, 0)).toEqual(vectorA3D);
  });

  it.each`
    vec          | scalar | expectedIn
    ${[0, 1]}    | ${1}   | ${[0, 1]}
    ${[0, 0]}    | ${1}   | ${[0, 0]}
    ${[1, 1]}    | ${0}   | ${[0, 0]}
    ${[1, 1, 1]} | ${-1}  | ${[-1, -1, -1]}
    ${[1, 0, 1]} | ${1}   | ${[1, 0, 1]}
    ${[1, 1, 1]} | ${0}   | ${[0, 0, 0]}
  `("should multiply by scalar", ({ vec, scalar, expectedIn }) => {
    const actual = new Vector(vec);
    const expected = new Vector(expectedIn);
    expect(actual.mult(scalar)).toEqual(expected);
  });

  it.each`
    vec1          | vec2         | expectedIn
    ${[0, 1]}     | ${[1, 0]}    | ${[0, 0]}
    ${[0, 0]}     | ${[1, 1]}    | ${[0, 0]}
    ${[1, 1]}     | ${[1, 1]}    | ${[1, 1]}
    ${[1, -1]}    | ${[-1, 1]}   | ${[-1, -1]}
    ${[1, 1, -1]} | ${[0, 0, 1]} | ${[0, 0, -1]}
  `("should multiply by scalar", ({ vec1, vec2, expectedIn }) => {
    const actual = new Vector(vec1);
    const expected = new Vector(expectedIn);
    expect(actual.mult(vec2)).toEqual(expected);
  });

  it.each`
    vec1          | vec2         | expectedIn
    ${[0, 1]}     | ${[1, 0]}    | ${[0, 0]}
    ${[0, 0]}     | ${[1, 1]}    | ${[0, 0]}
    ${[1, 1]}     | ${[1, 1]}    | ${[1, 1]}
    ${[1, -1]}    | ${[-1, 1]}   | ${[-1, -1]}
    ${[1, 1, -1]} | ${[0, 0, 1]} | ${[0, 0, -1]}
  `("should multiply by scalar", ({ vec1, vec2, expectedIn }) => {
    const actual = new Vector(vec1);
    vec2 = new Vector(vec2);
    const expected = new Vector(expectedIn);
    expect(actual.mult(vec2)).toEqual(expected);
  });

  it("should throw error when dividing by zero", () => {
    // TODO: Check for console.error
    const vec = new Vector(1, 2, 3);
    expect(vec.div(0)).toStrictEqual(vec);
  });

  it.each`
    vecIn         | scalar | expected
    ${[1, 1]}     | ${1}   | ${[1, 1]}
    ${[1, 1, 1]}  | ${1}   | ${[1, 1, 1]}
    ${[1, 1, 1]}  | ${-1}  | ${[-1, -1, -1]}
    ${[1, 1]}     | ${-1}  | ${[-1, -1, -0]}
    ${[100, -10]} | ${10}  | ${[10, -1]}
    ${[-50, 0]}   | ${2}   | ${[-25, 0, 0]}
  `("should divide by scalar", ({ vecIn, scalar, expected }) => {
    const vec = new Vector(vecIn);
    const actualVec = new Vector(expected);
    expect(vec.div(scalar)).toEqual(actualVec);
  });

  it.each`
    vecIn              | other            | expected
    ${[1, 1]}          | ${[1, 1]}        | ${[1, 1]}
    ${[1, 1]}          | ${[0, 1]}        | ${[1, 1]}
    ${[1, 1, 1]}       | ${[1, 1, 1]}     | ${[1, 1, 1]}
    ${[1, 1, 1]}       | ${[-1, -1, -1]}  | ${[-1, -1, -1]}
    ${[1, 1]}          | ${[-1, 0, 1]}    | ${[-1, 1, 0]}
    ${[10, 100, 1000]} | ${[20, 10, 500]} | ${[0.5, 10, 2]}
    ${[10, 100]}       | ${[0.5, 0.25]}   | ${[20, 400]}
  `("should divide by another vector", ({ vecIn, other, expected }) => {
    const vec = new Vector(vecIn);
    const actualVec = new Vector(expected);
    const otherVec = new Vector(other);
    expect(vec.div(otherVec)).toEqual(actualVec);
  });

  it.each`
    vecIn              | other            | expected
    ${[1, 1]}          | ${[1, 1]}        | ${[1, 1]}
    ${[1, 1, 1]}       | ${[1, 1, 1]}     | ${[1, 1, 1]}
    ${[1, 1, 1]}       | ${[-1, -1, -1]}  | ${[-1, -1, -1]}
    ${[10, 100, 1000]} | ${[20, 10, 500]} | ${[0.5, 10, 2]}
    ${[10, 100]}       | ${[0.5, 0.25]}   | ${[20, 400]}
  `("should divide by an array", ({ vecIn, other, expected }) => {
    const vec = new Vector(vecIn);
    const actualVec = new Vector(expected);
    expect(vec.div(other)).toEqual(actualVec);
  });

  it.each`
    input        | magSq | mag
    ${[1, 1, 1]} | ${3}  | ${Math.sqrt(3)}
    ${[1, 1]}    | ${2}  | ${Math.sqrt(2)}
    ${[1, 0, 1]} | ${2}  | ${Math.sqrt(2)}
    ${[5, 5]}    | ${50} | ${Math.sqrt(50)}
    ${[-5, 5]}   | ${50} | ${Math.sqrt(50)}
    ${[-5, -5]}  | ${50} | ${Math.sqrt(50)}
    ${[0, 0]}    | ${0}  | ${Math.sqrt(0)}
  `("should calculate magnitude and it's square", ({ input, magSq, mag }) => {
    const vec = new Vector(input);
    expect(vec.magSq()).toStrictEqual(magSq);
    expect(vec.mag()).toStrictEqual(mag);
  });

  it("should throw not implemented on lerp", () => {
    const vec = new Vector(1, 2, 3);
    expect(() => {
      vec.lerp();
    }).toThrowError("Not implemented");
  });

  it("should throw not implemented on reflect", () => {
    const vec = new Vector(1, 2, 3);
    expect(() => {
      vec.reflect();
    }).toThrowError("Not implemented");
  });

  it("should equal equal vectors and not different ones", () => {
    const vec = vectorA2D.copy();
    const vec2 = vectorA3D.copy();
    expect(vec.equals(vectorA2D)).toBeTruthy();
    expect(vec2.equals(vectorA3D)).toBeTruthy();
    expect(vec.equals(vectorA3D)).toBeFalsy();
  });

  it("should turn into an array", () => {
    expect(vectorA2D.array()).toStrictEqual([0, 1, 0]);
    expect(vectorA3D.array()).toStrictEqual([0, 1, 1]);
    expect(vectorB2D.array()).toStrictEqual([1, 0, 0]);
  });
});
