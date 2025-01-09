// Cargar datos desde el archivo JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Asignar los datos a las tarjetas de actividad
    const actividades = data;
    const actividadCajas = document.querySelectorAll('.caja');
    
    // Actualizar las tarjetas por defecto con el tiempo semanal
    function actualizarCajas(intervaloTiempo) {
        actividades.forEach((activity, index) => {
        const actividadCaja = actividadCajas[index];
        const titulo = actividadCaja.querySelector('h3');
        const horasRealizadas = actividadCaja.querySelector('h1');
        const horasPrevias = actividadCaja.querySelector('p');
        
        // Asignar los valores correspondientes del JSON al cambiar el "timeframe"
        titulo.textContent = activity.title;
        horasRealizadas.textContent = activity.timeframes[intervaloTiempo].current + 'hrs';
        horasPrevias.textContent = 'Previous - ' + activity.timeframes[intervaloTiempo].previous + 'hrs';
      });
    }
    
    // Llamar a la función para actualizar por defecto con el tiempo semanal
    actualizarCajas('daily');
    
    // Evento de clic en las opciones de tiempo (Daily, Weekly, Monthly)
    document.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', function () {
        // Remover la clase 'active' de todos los elementos
        document.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        
        // Añadir la clase 'active' al elemento clickeado
        li.classList.add('active');
        
        // Obtener el ID del elemento clickeado y actualizar las tarjetas
        const intervaloTiempo = li.id; // Puede ser 'daily', 'weekly', 'monthly'
        actualizarCajas(intervaloTiempo);
      });
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
