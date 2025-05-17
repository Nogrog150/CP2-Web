// Seletores dos elementos
const input = document.getElementById('aa-input');
const tutorial = document.getElementById('aa-p');

// Armazena os três números fornecidos
let numbers = [];

// Função para detectar o padrão
function detectarPadrao(nums) {
    if (nums.length !== 3) return "Insira três números.";

    const [a, b, c] = nums;

    // Verifica Progressão Aritmética
    if ((b - a === c - b)) {
        return `Progressão Aritmética (PA) de razão ${b - a}`;
    }

    // Verifica Progressão Geométrica (razão inteira positiva)
    if (a !== 0 && b % a === 0 && c % b === 0 && (b / a === c / b)) {
        return `Progressão Geométrica (PG) de razão ${b / a}`;
    }

    // Caso contrário, padrão personalizado (Fibonacci-like)
    if (c === a + b) {
        return `Padrão Personalizado: próximo termo é ${b} + ${c} = ${b + c} (sequência tipo Fibonacci)`;
    } else {
        return "Padrão Personalizado";
    }
}

// Evento para capturar números ao pressionar Enter
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const valor = parseInt(input.value.trim(), 10);

    // Validação: inteiro positivo
    if (isNaN(valor) || valor <= 0) {
      tutorial.innerHTML = "Por favor, digite apenas números inteiros positivos.";
      input.value = '';
      return;
    }

    // Adiciona o número se ainda não tiver 3
    if (numbers.length < 3) {
      numbers.push(valor);
    tutorial.innerHTML = `Número ${numbers.length} adicionado: ${valor}<br>`;

    // Se já tiver 3 números, mostra os próximos 5 do padrão
    if (numbers.length === 3) {
      const proximos = gerarProximos(numbers);
      if (proximos.length > 0) {
        tutorial.innerHTML += `Próximos 5 números: ${proximos.join(', ')}<br>`;
      }
    }
    }

    // Quando tiver 3, detecta o padrão e exibe
    if (numbers.length === 3) {
      const padrao = detectarPadrao(numbers);
      tutorial.innerHTML += `<strong>Padrão detectado:</strong> ${padrao}`;
      numbers = []; // Limpa para nova sequência
    }

    input.value = '';
  }
});

// Função para gerar os próximos 5 números da sequência, dado o padrão identificado
function gerarProximos(nums) {
    if (nums.length !== 3) return [];

    const [a, b, c] = nums;
    let resultado = [];

    // Progressão Aritmética
    if ((b - a === c - b)) {
        const razao = b - a;
        let ultimo = c;
        for (let i = 0; i < 5; i++) {
            ultimo += razao;
            resultado.push(ultimo);
        }
        return resultado;
    }

    // Progressão Geométrica (razão inteira positiva)
    if (a !== 0 && b % a === 0 && c % b === 0 && (b / a === c / b)) {
        const razao = b / a;
        let ultimo = c;
        for (let i = 0; i < 5; i++) {
            ultimo *= razao;
            resultado.push(ultimo);
        }
        return resultado;
    }

    // Padrão Personalizado tipo Fibonacci
    if (c === a + b) {
        let n1 = b, n2 = c;
        for (let i = 0; i < 5; i++) {
            let prox = n1 + n2;
            resultado.push(prox);
            n1 = n2;
            n2 = prox;
        }
        return resultado;
    }

    // Caso não reconheça o padrão, retorna vazio
    return [];
}


