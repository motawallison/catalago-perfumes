document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const botoesGenero = document.querySelectorAll('.btn-filtro');
    const itensCategoria = document.querySelectorAll('.item-categoria');
    const cards = document.querySelectorAll('.card');

    function filtrar() {
        const textoBusca = campoBusca.value.toLowerCase();
        
        // Pega o gênero ativo do topo
        const generoAtivo = document.querySelector('.btn-filtro.active').getAttribute('data-genero').toLowerCase();
        
        // Pega a categoria ativa da lateral
        const categoriaAtiva = document.querySelector('.item-categoria.active').getAttribute('data-categoria');

        cards.forEach(card => {
            const nomePerfume = card.querySelector('.nome_perfume').textContent.toLowerCase();
            const generoCard = card.querySelector('.badge').textContent.trim().toLowerCase();
            
            // Filtro 1: Nome
            const combinaNome = nomePerfume.includes(textoBusca);
            
            // Filtro 2: Gênero
            const combinaGenero = (generoAtivo === 'todos' || generoCard === generoAtivo);
            
            // Filtro 3: Categoria (Verifica se o card tem a classe miniatura ou arabe)
            let combinaCategoria = false;
            if (categoriaAtiva === 'todos') {
                combinaCategoria = true;
            } else if (categoriaAtiva === 'miniaturas' && card.classList.contains('miniatura')) {
                combinaCategoria = true;
            } else if (categoriaAtiva === 'arabes' && card.classList.contains('arabe')) {
                combinaCategoria = true;
            }

            // Regra para empurrar os esgotados para o fim
            // Verifica se existe a classe .esgotado dentro do card
            const estaEsgotado = card.querySelector('.esgotado') !== null;
            if (estaEsgotado) {
                card.style.order = '1'; // Joga para o fim
            } else {
                card.style.order = '0'; // Mantém no topo
            }

            // Mostra apenas se passar nos TRÊS testes
            if (combinaNome && combinaGenero && combinaCategoria) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Eventos de clique para Gênero e Categorias
    [...botoesGenero, ...itensCategoria].forEach(elemento => {
        elemento.addEventListener('click', function() {
            // Remove active apenas do grupo correto
            const irmaos = this.parentElement.querySelectorAll(this.tagName.toLowerCase() === 'li' ? '.item-categoria' : '.btn-filtro');
            irmaos.forEach(i => i.classList.remove('active'));
            
            this.classList.add('active');
            filtrar();
        });
    });

    campoBusca.addEventListener('input', filtrar);

    // Executa a função uma vez ao carregar a página para ordenar os esgotados de início
    filtrar();
});