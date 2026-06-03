document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const botoesGenero = document.querySelectorAll('.btn-filtro');
    const itensCategoria = document.querySelectorAll('.item-categoria');
    
    // --- SOLUÇÃO DEFINITIVA: ORDENAÇÃO DOS ESGOTADOS NO CARREGAMENTO ---
    const container = document.querySelector('.grid-perfumes');
    if (container) {
        // Captura todos os cards direto da tela
        const todosOsCards = Array.from(container.querySelectorAll('.card'));
        
        // Separa quem está disponível de quem está esgotado
        const disponiveis = [];
        const esgotados = [];
        
        todosOsCards.forEach(card => {
            // Verifica com precisão se o card possui a classe ou tag de esgotado
            const temClasseEsgotado = card.querySelector('.esgotado') !== null;
            const temTextoEsgotado = card.textContent.toUpperCase().includes('ESGOTADO');
            
            if (temClasseEsgotado || temTextoEsgotado) {
                esgotados.push(card);
            } else {
                disponiveis.push(card);
            }
        });
        
        // Junta as duas listas colocando os esgotados por último
        const listaOrdenada = [...disponiveis, ...esgotados];
        
        // Reinsere no HTML na ordem correta (isso move os elementos sem recriá-los)
        listaOrdenada.forEach(card => container.appendChild(card));
    }
    // -------------------------------------------------------------------

    // Captura os cards já na nova ordem definitiva para o filtro usar
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

            // Mostra apenas se passar nos TRÊS testes simultaneamente
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

    // Executa o filtro uma vez para alinhar tudo perfeitamente com o estado inicial dos botões
    filtrar();
});

// --- AUTOMAÇÃO DO CARROSSEL DE DESTAQUES ---
const wrapper = document.querySelector('.carrossel-wrapper');

if (wrapper) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        if (wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - 1)) {
            wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            wrapper.scrollBy({ left: 240, behavior: 'smooth' });
        }
    }, 4000);

    wrapper.addEventListener('mouseenter', () => clearInterval(slideTimer));
}