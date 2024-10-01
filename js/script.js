document.addEventListener('DOMContentLoaded', function () {
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('div.iframe-container');
    const title = document.getElementById('title');

    // Agregar la clase 'active' al cargar la página para que el sidebar esté visible
    sidebar.classList.add('active');

    // Colapsar/expandir el sidebar cuando se hace clic en el botón
    toggleSidebar.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });

    // Agregar funcionalidad para cargar el iframe y ocultar el sidebar al seleccionar una opción
    document.querySelectorAll('.option').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const newContent = this.getAttribute('data-content');
            
            let newSaga = "";
            const elem = item.parentElement.parentElement.previousElementSibling;
            if (elem && elem.tagName === 'A' && elem.classList.contains('saga')) {
                newSaga = elem.innerHTML;
            }

            const newEpisode = this.innerHTML;
            title.innerHTML = `<h3 class="mt-3">${newSaga}</h3> <h5>${newEpisode}</h5>`;
            content.innerHTML = `<iframe src="${newContent}" frameborder="0" allowfullscreen></iframe>`;
            
            // Colapsar el sidebar después de seleccionar una opción
            sidebar.classList.remove('active');
        });
    });

    // Manejador para colapsar/expandir las secciones anidadas
    document.querySelectorAll('.collapsible .toggle').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const nestedList = this.nextElementSibling; // La lista anidada
            nestedList.classList.toggle('active');
        });
    });
});
