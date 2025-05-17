const corInput = document.getElementById('colorInput');
const listaDeCores = document.getElementById("listinha-de-cores");
let cores = [];

corInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const nomeDaCor = corInput.value.trim();
        if (nomeDaCor) {
            adicionarCor(nomeDaCor);
            corInput.value = ''; // Limpa o campo de entrada
        }
    }
});

function adicionarCor(nome) {
  const novaCor = { nome: nome, codigo: obterCodigoHex(nome) };
  cores.unshift(novaCor);
  atualizarLista();
}

function obterCodigoHex(nome) {
    // Uma lógica simples para algumas cores comuns
    const coresPredefinidas = {
        red: '#FF0000',
        blue: '#0000FF',
        purple: '#800080',
        yellow: '#FFFF00',
        green: '#008000',
        orange: '#FFA500',
        pink: '#FFC0CB',
    };
    return coresPredefinidas[nome.toLowerCase()] || nome; // Retorna o código ou o próprio nome
}

function atualizarLista() {
  listaDeCores.innerHTML = "";
  cores.forEach((cor) => {
    const li = document.createElement("li");
    li.classList.add("cor");
    li.textContent = cor.nome;
    if (cor.codigo) {
      li.style.backgroundColor = cor.codigo;
    }
    listaDeCores.appendChild(li);
  });
}