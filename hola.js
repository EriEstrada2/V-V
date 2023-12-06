function redirigir() {
    var selectElement = document.getElementById('miOpcion');
    var selectedValue = selectElement.value;

    // Verifica el valor y redirige según la opción seleccionada
    if (selectedValue === 'opcion1') {
        // No hagas nada o puedes ejecutar alguna lógica específica
    } else if (selectedValue === 'opcion2') {
        window.location.href = 'index.html'; // Cambia esto al nombre de tu página docente
    }
    // Puedes agregar más condiciones según sea necesario
}
