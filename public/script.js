document.addEventListener('DOMContentLoaded', () => {
    const devicesContainer = document.getElementById('devices');
  
    // Obtener la configuración de los dispositivos
    fetch('/api/config')
      .then(response => response.json())
      .then(data => {
        for (const [elemento, valor] of Object.entries(data)) {
          const deviceDiv = document.createElement('div');
          deviceDiv.className = 'device';
          
          if (elemento.startsWith('led') || elemento === 'buzzer') {
            deviceDiv.innerHTML = `
              <h2>${elemento}</h2>
              <input type="range" min="0" max="255" value="${valor}" id="${elemento}" />
              <button onclick="updateDevice('${elemento}')">Actualizar</button>
            `;
          } else if (elemento === 'servo' || elemento === 'potenciometro') {
            deviceDiv.innerHTML = `
              <h2>${elemento}</h2>
              <input type="number" min="0" max="180" value="${valor}" id="${elemento}" />
              <button onclick="updateDevice('${elemento}')">Actualizar</button>
            `;
          } else if (elemento === 'sensor_temperatura') {
            deviceDiv.innerHTML = `
              <h2>${elemento}</h2>
              <input type="number" value="${valor}" id="${elemento}" readonly />
            `;
          }
          
          devicesContainer.appendChild(deviceDiv);
        }
      })
      .catch(error => console.error('Error al obtener la configuración:', error));
  });
  
  function updateDevice(elemento) {
    const valor = document.getElementById(elemento).value;
    const data = { elemento, valor: parseInt(valor) };
  
    fetch(`/api/config/${elemento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Configuración actualizada:', data);
      })
      .catch(error => console.error('Error al actualizar la configuración:', error));
  }