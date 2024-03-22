const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function drawPetal(x, y, radiusX, scaleY, rotation, color, steps) {
  const angleIncrement = (Math.PI / steps) * 2;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(1, scaleY);
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const currentAngle = i * angleIncrement;
    const currentRadius = Math.sin(currentAngle) * radiusX;
    const pointY = Math.sin(currentAngle) * currentRadius;
    const pointX = Math.cos(currentAngle) * currentRadius;
    if (i === 0) {
      ctx.moveTo(pointX, pointY);
    } else {
      ctx.lineTo(pointX, pointY);
    }
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawFlower(x, y, petalCount, petalRadiusX, petalRadiusY, stemHeight) {
  const stemSteps = 50;
  const stemHeightIncrement = stemHeight / stemSteps;
  let newY = y;

  function drawStem() {
    if (newY < y + stemHeight) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, newY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'green'; // Cambiando el color del tallo a verde
      ctx.stroke();
      newY += stemHeightIncrement;
      setTimeout(() => requestAnimationFrame(drawStem), 100); // Haciendo la animación más lenta ajustando el valor de 100
    } else {
      const petalSteps = 50;
      let currentStep = 0;

      function drawPetalOnStem() {
        if (currentStep <= petalSteps) {
          const petalY = y + 250 - petalRadiusY;
          const petalY2 = y + 200 - petalRadiusY;
          drawPetal(500, petalY, 15, 2, 300, 'green', currentStep);
          drawPetal(470, petalY2, 15, 2, 300, 'green', currentStep);
          currentStep++;
          setTimeout(() => requestAnimationFrame(drawPetalOnStem), 100); // Haciendo la animación más lenta ajustando el valor de 100
        }
      }

      drawPetalOnStem();
    }
  }

  drawStem();

  const angleIncrement = (Math.PI * 2) / petalCount;
  let currentPetal = 0;

  function drawNextPetal() {
    if (currentPetal <= petalCount) {
      const angle = currentPetal * angleIncrement;
      drawPetal(x, y, petalRadiusX, 2, angle, 'yellow', 100);
      currentPetal++;
      setTimeout(() => requestAnimationFrame(drawNextPetal), 100); // Haciendo la animación más lenta ajustando el valor de 100
    }
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  drawNextPetal();
}

function drawFlowerWithoutStem(x, y, petalCount, petalRadiusX, petalRadiusY, stemHeight) {
  const stemSteps = 50;
  const stemHeightIncrement = stemHeight / stemSteps;
  let newY = y;

  function drawStem() {
    if (newY < y + stemHeight) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, newY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'green'; // Cambiando el color del tallo a verde
      ctx.stroke();
      newY += stemHeightIncrement;
      setTimeout(() => requestAnimationFrame(drawStem), 100); // Haciendo la animación más lenta ajustando el valor de 100
    }
  }

  drawStem();

  const angleIncrement = (Math.PI * 2) / petalCount;
  let currentPetal = 0;

  function drawNextPetal() {
    if (currentPetal <= petalCount) {
      const angle = currentPetal * angleIncrement;
      drawPetal(x, y, petalRadiusX, 2, angle, 'yellow', 100);
      currentPetal++;
      setTimeout(() => requestAnimationFrame(drawNextPetal), 100); // Haciendo la animación más lenta ajustando el valor de 100
    }
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  drawNextPetal();
}

function createMultipleFlowers() {
  const numFlowers = 12;
  const spaceX = canvas.width / 4;
  const spaceY = canvas.height / 3;
  const flowerSize = 130;

  for (let i = 0; i < numFlowers; i++) {
    const row = Math.floor(i / 4);
    const column = i % 4;
    const x = spaceX * column + spaceX / 2;
    const y = spaceY * row + spaceY / 2;

    drawFlowerWithoutStem(x, y, 8, 30, 80, flowerSize);
  }
}

let originalTitle = document.title;

window.addEventListener('blur', () => {
  originalTitle = document.title;
  document.title = "No te vayas, regresa :(";
});

window.addEventListener('focus', () => {
  document.title = originalTitle;
});

const h1 = document.getElementById("Titulo");
const button1 = document.getElementById("B1");
button1.addEventListener('click', function() {
  const buttonContainer = document.querySelector(".Con");
  document.querySelector(".Texto").style.display = "block";
  buttonContainer.style.display = "none";
  drawFlower(500, 100, 6, 30, 100, 200);
  h1.remove();
});

document.getElementById("B12").addEventListener('click', function() {
  const buttonContainer = document.querySelector(".Con");
  buttonContainer.style.display = "none";
  document.querySelector(".Texto").style.display = "block";
  createMultipleFlowers();
  h1.remove();
});
