document.getElementById("calculate-btn").addEventListener("click", function () {
  const channels = parseInt(document.getElementById("channels").value);
  const channelData = parseInt(document.getElementById("channel-data").value);
  const channelUnit = document.querySelector('input[name="channel-unit"]:checked').value;
  const transmissionRate = parseFloat(document.getElementById("transmission-rate").value);
  const transmissionUnit = document.getElementById("transmission-unit").value;
  const syncBits = parseInt(document.getElementById("sync-bits").value);
  const syncUnit = document.querySelector('input[name="sync-unit"]:checked').value;

  // Conversión de unidades
  const dataInBits = channelUnit === "bytes" ? channelData * 8 : channelData;
  const rateInBps =
      transmissionUnit === "kbps" ? transmissionRate * 1000 :
      transmissionUnit === "mbps" ? transmissionRate * 1000000 :
      transmissionRate;
  const syncInBits = syncUnit === "bytes" ? syncBits * 8 : syncBits;

  // Cálculos
  const frameBits = (dataInBits * channels) + syncInBits;
  const totalRateKbps = (frameBits * rateInBps / dataInBits) / 1000; // Convertir a kbps
  const frameDurationMs = (dataInBits / rateInBps) * 1000; // Convertir a ms

  // Actualización de resultados
  document.getElementById("frame-bits").textContent = `Bits totales de la trama de salida: ${frameBits}`;
  document.getElementById("transmission-rate-result").textContent = `Tasa de transmisión del enlace: ${totalRateKbps.toFixed(2)} kbps`;
  document.getElementById("frame-duration").textContent = `Duración de cada trama de entrada: ${frameDurationMs.toFixed(2)} ms`;

  document.getElementById("results").style.display = "flex";
});

const infoLink = document.getElementById('infoLink');
infoLink.addEventListener('click', (event) => {
    event.preventDefault(); 
    window.open('manual/ManualTDM.pdf', '_blank');
});