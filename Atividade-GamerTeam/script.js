// ============================================
// 🌸 GamerGirls Manager — Lógica Principal
// ============================================

let equipe = [
    { nome: "Fallen", funcao: "Atiradora", pontuacao: 2500 },
    { nome: "Taco", funcao: "Suporte", pontuacao: 1800 },
    { nome: "Fer", funcao: "Iniciadora", pontuacao: 2100 }
  ];
  
  // ---------- RENDERIZAÇÃO ----------
  function renderizarLista() {
    const container = document.getElementById("listaJogadoras");
  
    if (equipe.length === 0) {
      container.innerHTML = '<p class="vazio">Nenhuma jogadora cadastrada ainda. Comece pela opção 1! 🌷</p>';
      return;
    }
  
    container.innerHTML = equipe.map(j => `
      <div class="card-jogadora">
        <span class="nome">💖 ${j.nome}</span>
        <span class="funcao">${j.funcao}</span>
        <span class="pontos">🏆 ${j.pontuacao} pts</span>
      </div>
    `).join("");
  }
  
  function renderizarEstatisticas() {
    const container = document.getElementById("estatisticas");
    if (equipe.length === 0) {
      container.innerHTML = "<p>Média da equipe: <strong>--</strong></p>";
      return;
    }
    const media = equipe.reduce((soma, j) => soma + j.pontuacao, 0) / equipe.length;
    container.innerHTML = `<p>Média da equipe: <strong>${media.toFixed(0)} pts</strong></p>`;
  }
  
  function mostrarResultado(html) {
    const painel = document.getElementById("painelResultado");
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = html;
    painel.style.display = "block";
    painel.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  
  // ---------- 1. CADASTRAR ----------
  function cadastrarJogadora() {
    const nome = prompt("🌸 Qual o nome da nova jogadora?");
    if (!nome || nome.trim() === "") {
      mostrarResultado('<span class="erro">❌ Nome inválido! Cadastro cancelado.</span>');
      return;
    }
  
    const funcao = prompt("🎯 Qual a função dela? (ex: Atiradora, Suporte, Iniciadora)");
    if (!funcao || funcao.trim() === "") {
      mostrarResultado('<span class="erro">❌ Função inválida! Cadastro cancelado.</span>');
      return;
    }
  
    const pontuacaoStr = prompt("🏆 Qual a pontuação inicial?");
    const pontuacao = Number(pontuacaoStr);
  
    if (isNaN(pontuacao) || pontuacao < 0) {
      mostrarResultado('<span class="erro">❌ Pontuação inválida! Digite um número maior ou igual a zero.</span>');
      return;
    }
  
    equipe.push({ nome: nome.trim(), funcao: funcao.trim(), pontuacao });
  
    renderizarLista();
    renderizarEstatisticas();
    mostrarResultado(`<span class="sucesso">✅ ${nome.trim()} entrou para a equipe! 💜</span>`);
  }
  
  // ---------- 2. LISTAR ----------
  function listarJogadoras() {
    renderizarLista();
    if (equipe.length === 0) {
      mostrarResultado('<span class="erro">A equipe está vazia.</span>');
    } else {
      mostrarResultado(`<span class="sucesso">📋 ${equipe.length} jogadora(s) na equipe. Veja a lista acima! 💜</span>`);
    }
  }
  
  // ---------- 3. BUSCA LINEAR ----------
  function buscarJogadora() {
    if (equipe.length === 0) {
      mostrarResultado('<span class="erro">A equipe está vazia. Cadastre jogadoras primeiro!</span>');
      return;
    }
  
    const nomeDesejado = prompt("🔎 Qual jogadora você quer buscar?");
    if (!nomeDesejado || nomeDesejado.trim() === "") {
      mostrarResultado('<span class="erro">❌ Nome inválido.</span>');
      return;
    }
  
    const alvo = nomeDesejado.trim().toLowerCase();
    let encontrou = false;
    let html = `<p>Buscando por: <strong>${nomeDesejado.trim()}</strong>...</p>`;
  
    for (let i = 0; i < equipe.length; i++) {
      const jogadoraAtual = equipe[i];
      if (jogadoraAtual.nome.toLowerCase() === alvo) {
        html += `<p class="sucesso">💖 JOGADORA ENCONTRADA!</p>
                 <p>Nome: <strong>${jogadoraAtual.nome}</strong> · Função: ${jogadoraAtual.funcao} · Pontos: <strong>${jogadoraAtual.pontuacao}</strong></p>`;
        encontrou = true;
        break;
      }
    }
  
    if (!encontrou) {
      html += `<p class="erro">😢 ${nomeDesejado.trim()} não faz parte da nossa equipe.</p>`;
    }
  
    mostrarResultado(html);
  }
  
  // ---------- 4. ESTATÍSTICAS ----------
  function exibirEstatisticas() {
    renderizarEstatisticas();
    if (equipe.length === 0) {
      mostrarResultado('<span class="erro">Sem jogadoras cadastradas para calcular.</span>');
      return;
    }
    const media = equipe.reduce((soma, j) => soma + j.pontuacao, 0) / equipe.length;
    const melhor = equipe.reduce((a, b) => (a.pontuacao > b.pontuacao ? a : b));
    mostrarResultado(`
      <p>👯 Total de jogadoras: <strong>${equipe.length}</strong></p>
      <p>📈 Média de pontuação: <strong>${media.toFixed(0)} pts</strong></p>
      <p>👑 Destaque da equipe: <strong>${melhor.nome}</strong> com ${melhor.pontuacao} pts 💜</p>
    `);
  }
  
  // ---------- 5. ATUALIZAR PONTOS ----------
  function atualizarPontuacao() {
    if (equipe.length === 0) {
      mostrarResultado('<span class="erro">A equipe está vazia. Cadastre jogadoras primeiro!</span>');
      return;
    }
  
    const nomeDesejado = prompt("--- ATUALIZAÇÃO DE RANKING ---\n\nQual jogadora deseja atualizar?");
    if (!nomeDesejado || nomeDesejado.trim() === "") {
      mostrarResultado('<span class="erro">❌ Nome inválido.</span>');
      return;
    }
  
    const alvo = nomeDesejado.trim().toLowerCase();
    let encontrou = false;
    let html = "";
  
    for (let i = 0; i < equipe.length; i++) {
      const jogadoraAtual = equipe[i];
      if (jogadoraAtual.nome.toLowerCase() === alvo) {
        encontrou = true;
  
        const pontosStr = prompt(`Quantos pontos ${jogadoraAtual.nome} ganhou hoje?`);
        const pontosNovos = Number(pontosStr);
  
        if (isNaN(pontosNovos) || pontosNovos < 0) {
          html = '<span class="erro">❌ Pontuação inválida! Digite um número maior ou igual a zero.</span>';
          break;
        }
  
        jogadoraAtual.pontuacao += pontosNovos;
  
        renderizarLista();
        renderizarEstatisticas();
  
        html = `<span class="sucesso">🎉 SUCESSO!</span> A pontuação de <strong>${jogadoraAtual.nome}</strong> subiu para <strong>${jogadoraAtual.pontuacao} pontos</strong>! 💜`;
        break;
      }
    }
  
    if (!encontrou) {
      html = `<span class="erro">😢 ${nomeDesejado.trim()} não faz parte da nossa equipe. Verifique o nome!</span>`;
    }
  
    mostrarResultado(html);
  }
  
  // ---------- INICIALIZAÇÃO ----------
  renderizarLista();
  renderizarEstatisticas();