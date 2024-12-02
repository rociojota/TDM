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

  const bitsUtiles = dataInBits * channels; // Bits útiles
  const frameBits = bitsUtiles + syncInBits; // Bits totales (trama completa)
  const totalRateKbps = (frameBits * rateInBps / dataInBits) / 1000; // Convertir a kbps
  const frameDurationMs = (dataInBits / rateInBps) * 1000; // Convertir a ms

  // Calcular eficiencia
  const eficiencia = (bitsUtiles / frameBits) * 100;

  document.getElementById("frame-bits").textContent = `Tamaño de la trama de salida: ${frameBits}`;
  document.getElementById("transmission-rate-result").textContent = `Tasa de bits de salida: ${totalRateKbps.toFixed(2)} kbps`;
  document.getElementById("frame-duration").textContent = `Duración de la trama: ${frameDurationMs.toFixed(2)} ms`;
  document.getElementById("efficiency").textContent = `Eficiencia del sistema: ${eficiencia.toFixed(2)}%`;

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

  const channelHeight = 30; 
  const spacing = 10;
  const margin = 50;
  const totalHeight = channelCount * (channelHeight + spacing) + margin * 2;

  canvas.height = totalHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let startY = margin; 
  for (let i = 0; i < channelCount; i++) {
      const color = `hsl(${(i * 50) % 360}, 70%, 70%)`;
      ctx.fillStyle = color;
      ctx.fillRect(50, startY, 100, channelHeight);

      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(`Canal ${i + 1}`, 160, startY + channelHeight / 2 + 5);

      startY += channelHeight + spacing; 
  }

  const muxX = 200;
  const muxY = margin;
  const muxWidth = 70;
  const muxHeight = channelCount * (channelHeight + spacing);

  ctx.fillStyle = "#3498db";
  ctx.beginPath();
  ctx.moveTo(muxX, muxY);
  ctx.lineTo(muxX + muxWidth, muxY + muxHeight / 2);
  ctx.lineTo(muxX, muxY + muxHeight);
  ctx.closePath();
  ctx.fill();

  const outputWidth = 100;
  const outputHeight = 20;
  const outputX = muxX + muxWidth + 10;
  const outputY = muxY + muxHeight / 2 - 10;

  ctx.fillStyle = "#FF6347";
  ctx.fillRect(outputX, outputY, outputWidth, outputHeight);

  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  ctx.fillText("Salida", outputX + 30, outputY + 15);
}

