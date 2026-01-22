
const interpolateColor = (color1, color2, factor) => {
  const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
  return result;
};

export const getGradientColor = (percent) => {
  const green = [34, 197, 94];   // green-500
  const yellow = [234, 179, 8];  // yellow-500
  const red = [239, 68, 68];     // red-500

  let color;
  if (percent <= 50) {
    const factor = percent / 50;
    color = interpolateColor(green, yellow, factor);
  } else {
    const factor = (percent - 50) / 50;
    color = interpolateColor(yellow, red, factor);
  }

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};