document.addEventListener('DOMContentLoaded', () => {
  const devicesContainer = document.getElementById('devices');

  // Obtener la configuración de los dispositivos
  fetch('/api/config')
    .then(response => response.json())
    .then(data => {
      // Iterar sobre los dispositivos obtenidos
      for (const [elemento, valor] of Object.entries(data)) {
        const deviceDiv = document.createElement('div');
        deviceDiv.className = 'device';

        if (elemento.startsWith('led') || elemento === 'buzzer') {
          deviceDiv.innerHTML = `
            <h2>${elemento}</h2>
            <label class="switch">
              <input type="checkbox" id="${elemento}" ${valor === 1 ? 'checked' : ''}>
              <span class="slider round"></span>
            </label>
            <button onclick="updateDevice('${elemento}', 'estado')">Actualizar</button>
          `;
        } else if (elemento === 'servo' || elemento === 'potenciometro') {
          deviceDiv.innerHTML = `
            <h2>${elemento}</h2>
            <input type="number" min="0" max="180" value="${valor}" id="${elemento}" />
            <button onclick="updateDevice('${elemento}', 'valor')">Actualizar</button>
          `;
        } else if (elemento === 'sensor_temperatura') {
          deviceDiv.innerHTML = `
            <h2>${elemento}</h2>
            <input type="number" min="-50" max="150" value="${valor}" id="${elemento}" />
            <button onclick="updateDevice('${elemento}', 'valor')">Actualizar</button>
          `;
        }
        
        devicesContainer.appendChild(deviceDiv);
      }
    })
    .catch(error => console.error('Error al obtener la configuración:', error));
});

function updateDevice(elemento, campo) {
  const inputElement = document.getElementById(elemento);
  let valor;

  // Verificar si el campo es un checkbox (buzzer, led) o un valor numérico (servo, sensor, potenciometro)
  if (inputElement.type === 'checkbox') {
    valor = inputElement.checked ? 1 : 0;
  } else {
    valor = parseInt(inputElement.value);
  }

  // Preparar el cuerpo del mensaje a enviar
  const data = {};
  data[campo] = valor;

  // Hacer la solicitud PUT para actualizar el valor
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
