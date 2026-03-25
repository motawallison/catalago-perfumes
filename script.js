document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const cards = document.querySelectorAll('.card');

    campoBusca.addEventListener('keyup', () => {
        const termoBusca = campoBusca.value.toLowerCase().trim();

        cards.forEach(card => {
            // Pega o nome do perfume (h3)
            const nomePerfume = card.querySelector('h3').textContent.toLowerCase();
            // Pega a marca (p.brand), se existir
            const marcaPerfumeElement = card.querySelector('.brand');
            const marcaPerfume = marcaPerfumeElement ? marcaPerfumeElement.textContent.toLowerCase() : '';

            // Verifica se o termo está no nome OU na marca
            if (nomePerfume.includes(termoBusca) || marcaPerfume.includes(termoBusca)) {
                // Mostra o card
                card.style.display = 'block';
            } else {
                // Esconde o card
                card.style.display = 'none';
            }
        });
    });
});