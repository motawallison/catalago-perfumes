document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cards = document.querySelectorAll('.card');

    function filtrar() {
        const textoBusca = campoBusca.value.toLowerCase();
        const botaoAtivo = document.querySelector('.btn-filtro.active');
        const generoFiltro = botaoAtivo.getAttribute('data-genero').toLowerCase();

        cards.forEach(card => {
            const nomePerfume = card.querySelector('.nome_perfume').textContent.toLowerCase();
            const generoCard = card.querySelector('.badge').textContent.trim().toLowerCase();
            
            const combinaNome = nomePerfume.includes(textoBusca);
            const combinaGenero = (generoFiltro === 'todos' || generoCard === generoFiltro);

            if (combinaNome && combinaGenero) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Evento para os botões de filtro
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach(btn => btn.classList.remove('active'));
            botao.classList.add('active');
            filtrar();
        });
    });

    // Evento para a barra de busca
    campoBusca.addEventListener('input', filtrar);
});