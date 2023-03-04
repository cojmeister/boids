import Vector, { Position } from "../../src/utils/vector";

describe("Vector", () => {
  const vectorA2D = new Vector(0, 1);
  const vectorB2D = new Vector(1, 0);
  const vectorC2D = new Vector(1, 1);
  const vectorA3D = new Vector(0, 1, 1);
  const vectorB3D = new Vector(0, 1, 1);
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

  it("should add", () => {
    expect(vectorC2D.copy().sub(vectorB2D)).toEqual(vectorA2D);
    expect(vectorC2D.copy().sub([0, 1])).toEqual(vectorB2D);
    expect(vectorC3D.copy().sub([1, 0, 0])).toEqual(vectorA3D);
    expect(vectorC3D.copy().sub(1, 0, 0)).toEqual(vectorA3D);
  });
});
