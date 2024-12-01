document.getElementById("calculate-btn").addEventListener("click", function () {
  const channels = parseInt(document.getElementById("channels").value);
  const channelData = parseInt(document.getElementById("channel-data").value);
  const channelUnit = document.querySelector('input[name="channel-unit"]:checked').value;
  const transmissionRate = parseFloat(document.getElementById("transmission-rate").value);
  const transmissionUnit = document.getElementById("transmission-unit").value;
  const syncBits = parseInt(document.getElementById("sync-bits").value);
  const syncUnit = document.querySelector('input[name="sync-unit"]:checked').value;

  const dataInBits = channelUnit === "bytes" ? channelData * 8 : channelData;
  const rateInBps =
      transmissionUnit === "kbps" ? transmissionRate * 1000 :
      transmissionUnit === "mbps" ? transmissionRate * 1000000 :
      transmissionRate;
  const syncInBits = syncUnit === "bytes" ? syncBits * 8 : syncBits;

  const frameBits = (dataInBits * channels) + syncInBits;
  const totalRateKbps = (frameBits * rateInBps / dataInBits) / 1000; // Convertir a kbps
  const frameDurationMs = (dataInBits / rateInBps) * 1000; // Convertir a ms

  document.getElementById("frame-bits").textContent = `Bits totales de la trama de salida: ${frameBits}`;
  document.getElementById("transmission-rate-result").textContent = `Tasa de transmisión del enlace: ${totalRateKbps.toFixed(2)} kbps`;
  document.getElementById("frame-duration").textContent = `Duración de cada trama de entrada: ${frameDurationMs.toFixed(2)} ms`;

  document.getElementById("results").style.display = "flex";

  drawMultiplexor(channels, dataInBits, syncInBits);
});

const infoLink = document.getElementById('infoLink');
infoLink.addEventListener('click', (event) => {
    event.preventDefault(); 
    window.open('manual/ManualTDM.pdf', '_blank');
});

function drawMultiplexor(channelCount, dataInBits, syncInBits) {
  const canvas = document.getElementById("multiplexorCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const channelHeight = 30;
  const channelWidth = 100;
  let startY = 50;

  for (let i = 0; i < channelCount; i++) {
    const color = `hsl(${(i * 50) % 360}, 70%, 70%)`; 
    ctx.fillStyle = color;
    ctx.fillRect(50, startY, channelWidth, channelHeight);

    ctx.fillStyle = "#000";
    ctx.fillText(`Canal ${i + 1}`, 160, startY + 20);

    startY += channelHeight + 10;
  }

  const muxX = 200;
  const muxY = 50;
  const muxWidth = 70;
  const muxHeight = channelCount * (channelHeight + 10);

  ctx.fillStyle = "#3498db";
  ctx.beginPath();
  ctx.moveTo(muxX, muxY);
  ctx.lineTo(muxX + muxWidth, muxY + muxHeight / 2);
  ctx.lineTo(muxX, muxY + muxHeight);
  ctx.closePath();
  ctx.fill();

  // Dibujar la salida (trama resultante)
  const outputWidth = 100;    // Ancho de la salida
  const outputHeight = 20;    // Alto de la salida
  const outputX = muxX + muxWidth + 10;  // Posición X de la salida
  const outputY = muxY + muxHeight / 2 - 10; // Posición Y de la salida

  ctx.fillStyle = "#FF6347";  
  ctx.fillRect(outputX, outputY, outputWidth, outputHeight);

  ctx.fillStyle = "#000";
  ctx.font = '12px Arial';
  ctx.fillText("Salida", outputX + 40, outputY + 12);
}
