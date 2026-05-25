const inputTarefa = document.querySelector("#inputTarefa");
const btnAdicionar = document.querySelector("#btnAdicionar");
const listaTarefas = document.querySelector("#listaTarefas");
const contadorContainer = document.querySelector("#contadorContainer");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#listaVazia");

let totalTarefas = 0;

function atualizarContador() {
  totalTarefas = listaTarefas.querySelectorAll(".col").length;

  if (totalTarefas === 0) {
    contadorContainer.classList.add("d-none");
    listaVazia.classList.remove("d-none");
  } else {
    contadorContainer.classList.remove("d-none");
    listaVazia.classList.add("d-none");
    contador.textContent = totalTarefas + (totalTarefas === 1 ? " tarefa" : " tarefas");
  }
}

function definirPrioridade(card, prioridade) {
  card.classList.remove("prioridade-alta", "prioridade-media", "prioridade-baixa");
  card.classList.add("prioridade-" + prioridade);
}

function criarCard(texto) {
  const col = document.createElement("div");
  col.classList.add("col-12", "col-sm-6", "col-md-4");

  const card = document.createElement("div");
  card.classList.add("card-tarefa");

  const textoParagrafo = document.createElement("p");
  textoParagrafo.classList.add("tarefa-texto");
  textoParagrafo.textContent = texto;

  const label = document.createElement("span");
  label.classList.add("prioridade-label");
  label.textContent = "Prioridade";

  const acoes = document.createElement("div");
  acoes.classList.add("d-flex", "align-items-center", "gap-1", "flex-wrap");

  const btnAlta = document.createElement("button");
  btnAlta.classList.add("btn-prioridade", "btn-alta");
  btnAlta.textContent = "Alta";

  const btnMedia = document.createElement("button");
  btnMedia.classList.add("btn-prioridade", "btn-media");
  btnMedia.textContent = "Média";

  const btnBaixa = document.createElement("button");
  btnBaixa.classList.add("btn-prioridade", "btn-baixa");
  btnBaixa.textContent = "Baixa";

  const btnRemover = document.createElement("button");
  btnRemover.classList.add("btn-remover");
  btnRemover.textContent = "Remover";

  btnAlta.addEventListener("click", function() {
    definirPrioridade(card, "alta");
  });

  btnMedia.addEventListener("click", function() {
    definirPrioridade(card, "media");
  });

  btnBaixa.addEventListener("click", function() {
    definirPrioridade(card, "baixa");
  });

  btnRemover.addEventListener("click", function() {
    col.remove();
    atualizarContador();
  });

  acoes.appendChild(btnAlta);
  acoes.appendChild(btnMedia);
  acoes.appendChild(btnBaixa);
  acoes.appendChild(btnRemover);

  card.appendChild(textoParagrafo);
  card.appendChild(label);
  card.appendChild(acoes);
  col.appendChild(card);

  return col;
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (texto === "") {
    inputTarefa.focus();
    return;
  }

  const card = criarCard(texto);
  listaTarefas.appendChild(card);

  inputTarefa.value = "";
  inputTarefa.focus();

  atualizarContador();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", function(e) {
  if (e.key === "Enter") adicionarTarefa();
});

atualizarContador();
