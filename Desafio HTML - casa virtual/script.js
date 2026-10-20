(function () {
    // ===================== MAPA DA CASA =====================
    // Cada cômodo tem: nome, descrição, saídas (destino) e flag de vitória.
    // O objetivo é chegar ao "Quarto" onde a pessoa está presa.
    const house = {
      frente: {
        name: "Frente da Casa",
        desc: "Fumaça rosada sai pelas janelas. A porta de entrada está entreaberta.",
        exits: { "Entrar pela porta": "sala" }
      },
      sala: {
        name: "Sala de Estar",
        desc: "Móveis em chamas cor-de-rosa. Há um corredor à direita e uma porta à esquerda.",
        exits: {
          "Ir para o corredor": "corredor",
          "Abrir porta à esquerda": "cozinha",
          "Voltar para a frente": "frente"
        }
      },
      cozinha: {
        name: "Cozinha",
        desc: "Fogão em chamas, fumaça densa. Uma porta leva ao quarto de serviço.",
        exits: {
          "Ir ao quarto de serviço": "servico",
          "Voltar para a sala": "sala"
        }
      },
      servico: {
        name: "Quarto de Serviço",
        desc: "Pequeno e escuro. Um armário trancado. Nada indica vida aqui.",
        exits: {
          "Voltar para a cozinha": "cozinha"
        }
      },
      corredor: {
        name: "Corredor",
        desc: "Corredor estreito com fumaça lilás. Duas portas: uma à esquerda e uma ao fundo.",
        exits: {
          "Abrir porta à esquerda": "banheiro",
          "Abrir porta ao fundo": "quarto",
          "Voltar para a sala": "sala"
        }
      },
      banheiro: {
        name: "Banheiro",
        desc: "Chuveiro aberto, vapor e fumaça. Ninguém aqui.",
        exits: {
          "Voltar para o corredor": "corredor"
        }
      },
      quarto: {
        name: "Quarto",
        desc: "Uma menina está presa sob a cama! Você a resgata em segurança!",
        exits: {},
        win: true
      }
    };
  
    const START = "frente";
    let current = START;
    let steps = 0;
    let finished = false;
  
    // ===================== ELEMENTOS =====================
    const roomNameEl = document.getElementById("roomName");
    const roomDescEl = document.getElementById("roomDesc");
    const actionsEl  = document.getElementById("actions");
    const messageEl  = document.getElementById("message");
    const stepsEl    = document.getElementById("steps");
    const hintEl     = document.getElementById("hint");
    const restartBtn = document.getElementById("restartBtn");
  
    // ===================== RENDERIZAÇÃO =====================
    function render() {
      const room = house[current];
      roomNameEl.textContent = room.name;
      roomDescEl.textContent = room.desc;
      stepsEl.textContent = "Movimentos: " + steps;
  
      actionsEl.innerHTML = "";
  
      if (finished) {
        hintEl.textContent = "Missão cumprida";
        restartBtn.style.display = "block";
        return;
      }
  
      hintEl.textContent = "Casa em chamas";
      const entries = Object.entries(room.exits);
  
      if (entries.length === 0) {
        messageEl.textContent = "Não há saídas daqui...";
        return;
      }
  
      entries.forEach(([label, target]) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.addEventListener("click", () => goTo(target));
        actionsEl.appendChild(btn);
      });
    }
  
    // ===================== NAVEGAÇÃO =====================
    function goTo(target) {
      if (finished) return;
      current = target;
      steps++;
  
      const room = house[current];
  
      if (room.win) {
        finished = true;
        messageEl.textContent = "🌸 Você encontrou a pessoa e a resgatou! Guardiã das Chamas! 🌸";
        messageEl.className = "message win";
        actionsEl.innerHTML = "";
        restartBtn.style.display = "block";
        hintEl.textContent = "Missão cumprida";
        stepsEl.textContent = "Movimentos: " + steps;
        roomNameEl.textContent = room.name;
        roomDescEl.textContent = room.desc;
        return;
      }
  
      messageEl.textContent = "";
      messageEl.className = "message";
      render();
    }
  
    // ===================== REINÍCIO =====================
    function reset() {
      current = START;
      steps = 0;
      finished = false;
      messageEl.textContent = "";
      messageEl.className = "message";
      restartBtn.style.display = "none";
      render();
    }
  
    restartBtn.addEventListener("click", reset);
  
    // ===================== INÍCIO =====================
    render();
  })();