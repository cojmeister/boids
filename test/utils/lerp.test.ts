import lerp from "../../src/utils/lerp";

describe("lerp", () => {
  it("should throw error if x is outside boundaries", () => {
    expect(() => {
      lerp(-1, 0, 10, 20, 30);
    }).toThrowError(
      "can only interpolate within inputs - otherwise use extrapolation"
    );
    expect(() => {
      lerp(20, 0, 10, 20, 30);
    }).toThrowError(
      "can only interpolate within inputs - otherwise use extrapolation"
    );
  });

  it("should check that max values are bigger than min values", () => {
    expect(() => {
      lerp(5, 0, 10, 50, -100);
    }).toThrowError("max value should be bigger than min value");
    expect(() => {
      lerp(-2, 0, -10, 50, 100);
    }).toThrowError("max value should be bigger than min value");
    expect(() => {
      lerp(-2, 0, 0, 50, 100);
    }).toThrowError("max value should be bigger than min value");
    expect(() => {
      lerp(-2, 0, 10, 100, 100);
    }).toThrowError("max value should be bigger than min value");
  });

  it.each`
    x       | minX    | maxX   | minY   | maxY   | expected
    ${0}    | ${-5}   | ${5}   | ${-10} | ${10}  | ${0}
    ${1}    | ${-5}   | ${5}   | ${-10} | ${10}  | ${2}
    ${1}    | ${0}    | ${5}   | ${-5}  | ${5}   | ${-3}
    ${0.1}  | ${0}    | ${1}   | ${0}   | ${100} | ${10}
    ${-0.1} | ${-100} | ${0}   | ${-1}  | ${0}   | ${-0.001}
    ${100}  | ${50}   | ${150} | ${99}  | ${101} | ${100}
  `(
    "should properly interpolate",
    ({ x, minX, maxX, minY, maxY, expected }) => {
      expect(lerp(x, minX, maxX, minY, maxY)).toBeCloseTo(expected);
    }
  );
});
