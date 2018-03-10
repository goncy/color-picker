import React, {Component} from "react";
import convert from "color-convert";

import "./App.css";

const getRatio = (position, max) => position * 100 / max;

class App extends Component {
  state = {
    x: 0,
    y: 0,
  };

  trackMove = event => {
    this.setState({
      x: getRatio(event.clientX, window.innerWidth),
      y: getRatio(event.clientY, window.innerHeight),
    });
  };

  copyToClipboard = color => {
    document.execCommand(color);
    alert(`${color} copied to clipboard`);
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.trackMove);
    window.addEventListener("touchmove", event =>
      this.trackMove(event.touches[0])
    );
  }

  render() {
    const {x, y} = this.state;

    const hsl = [x.toFixed(2), 100, y.toFixed(2)];
    const rgb = convert.hsl.rgb(hsl);
    const cmyk = convert.hsl.cmyk(hsl);
    const hex = convert.hsl.hex(hsl);

    const colors = {
      hsl: {
        label: "HSL",
        value: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
      },
      rgb: {
        label: "RGB",
        value: `rgb(${rgb.join(", ")})`,
      },
      cmyk: {
        label: "CMYK",
        value: `cmyk(${cmyk.join(", ")})`,
      },
      hex: {
        label: "HEX",
        value: `#${hex}`,
      },
    };

    return (
      <div
        style={{backgroundColor: colors.hsl.value}}
        className="App"
        onClick={() =>
          this.copyToClipboard(
            Object.values(colors)
              .map(color => color.value)
              .join(", ")
          )
        }
      >
        <div className="label">
          {Object.values(colors).map(color => (
            <p className="color" key={color.label}>
              <div className="name">{color.label}</div>: {color.value}
            </p>
          ))}
          <p className="legend">
            <small>Click anywhere to copy current colors to clipboard</small>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
