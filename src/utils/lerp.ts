/**
 * Linear interpolation of x between minIn and maxIn will return value between minOut and maxOut
 * @param {number}x Input value
 * @param {number}minIn min input
 * @param {number}maxIn max input
 * @param {number}minOut min output
 * @param {number}maxOut max output
 * @returns {number} the interpolated value
 */
export default function lerp(
  x: number,
  minIn: number,
  maxIn: number,
  minOut: number,
  maxOut: number
): number {
  if (maxOut <= minOut || maxIn <= minIn) {
    throw new Error("max value should be bigger than min value");
  }
  if (x < minIn || maxIn < x) {
    throw new Error(
      "can only interpolate within inputs - otherwise use extrapolation"
    );
  }
  return minOut + ((x - minIn) * (maxOut - minOut)) / (maxIn - minIn);
}
