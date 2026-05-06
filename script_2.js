document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const botoesGenero = document.querySelectorAll('.btn-filtro');
    const itensCategoria = document.querySelectorAll('.item-categoria');
    const cards = document.querySelectorAll('.card');

    function filtrar() {
        const textoBusca = campoBusca.value.toLowerCase();
        
        // Pega o gênero ativo (Todos, Masculino ou Feminino)
        const btnGeneroAtivo = document.querySelector('.btn-filtro.active');
        const generoAtivo = btnGeneroAtivo ? btnGeneroAtivo.getAttribute('data-genero').toLowerCase() : 'todos';
        
        // Pega a categoria ativa da sidebar (Todos, Árabes ou Miniaturas)
        const itemCatAtivo = document.querySelector('.item-categoria.active');
        const categoriaAtiva = itemCatAtivo ? itemCatAtivo.getAttribute('data-categoria') : 'todos';

        cards.forEach(card => {
            const nomePerfume = card.querySelector('.nome_perfume').textContent.toLowerCase();
            const generoCard = card.querySelector('.badge').textContent.trim().toLowerCase();
            
            // Validação 1: Nome
            const combinaNome = nomePerfume.includes(textoBusca);
            
            // Validação 2: Gênero
            const combinaGenero = (generoAtivo === 'todos' || generoCard === generoAtivo);
            
            // Validação 3: Categoria (Classe 'arabe' ou 'miniatura')
            let combinaCategoria = false;
            if (categoriaAtiva === 'todos') {
                combinaCategoria = true;
            } else {
                // Verifica se o card tem a classe exata (ex: 'arabe' ou 'miniatura')
                // Usamos 'arabe' no singular conforme seu HTML
                const classeAlvo = categoriaAtiva === 'arabes' ? 'arabe' : 'miniatura';
                if (card.classList.contains(classeAlvo)) {
                    combinaCategoria = true;
                }
            }

            // Exibe apenas se passar em todos os critérios
            if (combinaNome && combinaGenero && combinaCategoria) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Gerencia o clique nos botões de Gênero
    botoesGenero.forEach(btn => {
        btn.addEventListener('click', () => {
            botoesGenero.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrar();
        });
    });

    // Gerencia o clique nas Categorias da Sidebar
    itensCategoria.forEach(item => {
        item.addEventListener('click', () => {
            itensCategoria.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filtrar();
        });
    });

    campoBusca.addEventListener('input', filtrar);
});