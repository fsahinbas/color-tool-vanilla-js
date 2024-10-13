// javascript

const hexInputEl = document.getElementById("hexInput"),
  inputColorEl = document.getElementById("inputColor"),
  sliderEl = document.getElementById("slider"),
  sliderTextEl = document.getElementById("sliderText"),
  alteredColorEl = document.getElementById("alteredColor"),
  alteredColorTextEl = document.getElementById("alteredColorText"),
  lightenTextEl = document.getElementById("lightenText"),
  darkenTextEl = document.getElementById("darkenText"),
  toggleBtnEl = document.getElementById("toggleBtn");

const isValidHex = (hex) => {
  if (!hex) return false;
  const colorCode = hex.replace("#", "");
  return colorCode.length === 6 || colorCode.length === 3;
};

hexInputEl.addEventListener("keyup", () => {
  if (isValidHex(hexInput.value)) {
    inputColor.style.backgroundColor = hexInput.value.replace("#", "");
    reset();
  }
});

sliderEl.addEventListener("input", () => {
  if (!isValidHex(hexInputEl.value)) return;
  sliderTextEl.textContent = slider.value + "%";
  const value = toggleBtnEl.classList.contains("toggled")
    ? -slider.value
    : slider.value;
  const alteredHex = alterColor(hexInput.value, value);
  alteredColorEl.style.backgroundColor = alteredHex;
  alteredColorTextEl.textContent = `Alter Color (${alteredHex})`;
});

const convertHextoRGB = (hex) => {
  if (!hex) return null;
  let codeHex = hex.replace("#", "");
  codeHex =
    codeHex.length === 3
      ? codeHex[0] +
        codeHex[0] +
        codeHex[1] +
        codeHex[1] +
        codeHex[2] +
        codeHex[2]
      : codeHex;

  const r = parseInt(codeHex[0] + codeHex[1], 16);
  const g = parseInt(codeHex[2] + codeHex[3], 16);
  const b = parseInt(codeHex[4] + codeHex[5], 16);
  return { r, g, b };
};

const convertRGBtoHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  return "#" + firstPair + secondPair + thirdPair;
};

const alterColor = (hex, alpha) => {
  const { r, g, b } = convertHextoRGB(hex);
  const amount = Math.floor((alpha / 100) * 255);
  const newR = mapRange(r, amount);
  const newG = mapRange(g, amount);
  const newB = mapRange(b, amount);
  return convertRGBtoHex(newR, newG, newB);
};

const mapRange = (hex, amount) => {
  //   const newHex = hex + amount;
  //   if (newHex > 255) return 255;
  //   if (newHex < 0) return 0;
  //   return newHex;
  return Math.min(255, Math.max(0, hex + amount));
};

const reset = () => {
  sliderTextEl.textContent = "0%";
  slider.value = 0;
  alteredColorEl.style.backgroundColor = hexInput.value;
  alteredColorTextEl.innerText = `Altered Color (${hexInput.value})`;
  //   inputColor.style.backgroundColor = "#d6d5ac";
  //   alterColorEl.style.backgroundColor = "#d6d5ac";
  //   alteredColorTextEl.textContent = `Alter Color (#d6d5ac)`;
  //   toggleBtnEl.classList.remove("toggled");
  //   lightenTextEl.classList.remove("unselected");
  //   darkenTextEl.classList.add("unselected");
};

toggleBtnEl.addEventListener("click", () => {
  if (toggleBtnEl.classList.contains("toggled")) {
    toggleBtnEl.classList.remove("toggled");
    lightenTextEl.classList.remove("unselected");
    darkenTextEl.classList.add("unselected");
  } else {
    toggleBtnEl.classList.add("toggled");
    lightenTextEl.classList.add("unselected");
    darkenTextEl.classList.remove("unselected");
  }
  reset();
});
