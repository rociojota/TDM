document.getElementById("tdmForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const channels = parseInt(document.getElementById("channels").value);
    const bps = parseInt(document.getElementById("bps").value);
    const syncBits = parseInt(document.getElementById("syncBits").value);

    if (isNaN(channels) || isNaN(bps) || isNaN(syncBits) || channels <= 0 || bps <= 0 || syncBits < 0) {
        alert("Por favor, ingresa valores válidos en todos los campos.");
        return;
    }

    const bitsPerFrame = channels + syncBits; 
    const linkRate = bitsPerFrame * bps; 
    const frameDuration = (bitsPerFrame / linkRate) * 1000; 

    document.getElementById("bitCount").textContent = `Cantidad de bits por trama: ${bitsPerFrame} bits`;
    document.getElementById("linkRate").textContent = `Tasa de transmisión del enlace: ${linkRate} bps`;
    document.getElementById("frameDuration").textContent = `Duración de cada trama de entrada: ${frameDuration.toFixed(3)} ms`;

    document.getElementById("results").style.display = "flex";
});

const infoLink = document.getElementById('infoLink');
infoLink.addEventListener('click', (event) => {
    event.preventDefault(); 
    window.open('manual/ManualTDM.pdf', '_blank');
});