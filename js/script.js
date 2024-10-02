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

            // Consigo el nombre de la saga
            const elemSaga = item.parentElement.parentElement.previousElementSibling;
            if (elemSaga && elemSaga.tagName === 'A' && elemSaga.classList.contains('saga')) {
                newSaga = elemSaga.innerHTML;
            }

            const newEpisode = this.innerHTML;
            title.innerHTML = `<h3 class="mt-3">${newSaga}</h3> <h5>${newEpisode}</h5>`;

            content.innerHTML = `<button id="prevEpisode" class="nav-button left"><i class="bi bi-caret-left-fill"></i></button>
            <iframe src="${newContent}" frameborder="0" allowfullscreen></iframe>
            <button id="nextEpisode" class="nav-button right"><i class="bi bi-caret-right-fill"></i></button>`;

            // Linkeo el episodio anterior si existe
            if (item.parentElement.previousElementSibling != null) {
                const elemPrevEpisode = item.parentElement.previousElementSibling.firstChild;
                if (elemPrevEpisode && elemPrevEpisode.tagName === 'A' && elemPrevEpisode.classList.contains('option')) {
                    document.getElementById('prevEpisode').addEventListener('click', function() {
                        elemPrevEpisode.click();
                    });
                } else {
                    document.getElementById('prevEpisode').style.display = 'none';
                }
            } else {
                document.getElementById('prevEpisode').style.display = 'none';
            }
            

            // Linkeo el episodio siguiente si existe
            if (item.parentElement.nextElementSibling != null) {
                const elemNextEpisode = item.parentElement.nextElementSibling.firstChild;
                if (elemNextEpisode && elemNextEpisode.tagName === 'A' && elemNextEpisode.classList.contains('option')) {
                    document.getElementById('nextEpisode').addEventListener('click', function() {
                        elemNextEpisode.click();
                    });
                } else {
                    document.getElementById('nextEpisode').style.display = 'none';
                }
            } else {
                document.getElementById('nextEpisode').style.display = 'none';
            }

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
