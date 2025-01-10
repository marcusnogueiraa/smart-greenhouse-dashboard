function fetchSensorData() {
    fetch('/sensor-data')
        .then(response => response.json())
        .then(data => {
            console.log("Dados atualizados:", data);
            data.forEach(sensor => {
                if (sensor.sensor === "soil_moisture") {
                    document.getElementById('soil-moisture').textContent = `${sensor.value}%`;
                }
                if (sensor.sensor === "temperature") {
                    document.getElementById('temperature').textContent = `${sensor.value}°C`;
                }
                if (sensor.sensor === "light") {
                    document.getElementById('luminosity').textContent = `${sensor.value} lux`;
                }
            });
            setTimeout(fetchSensorData, 1000); 
        })
        .catch(err => {
            console.error("Erro ao buscar dados:", err);
            setTimeout(fetchSensorData, 5000); 
        });
}

document.addEventListener("DOMContentLoaded", fetchSensorData);
