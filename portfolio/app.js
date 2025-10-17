const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// configurações do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

let disciplinas = [
  "Algoritmos e Lógica de Programação",
  "Desenvolvimento Web",
  "Banco de Dados",
  "Engenharia de Software",
  "Estrutura de Dados",
  "Matemática para Computação"
];

let projetos = [
  {
    id: 1,
    titulo: "API - Exportação e Importação SP",
    descricao:
      "Aplicação web para análise dos dados de exportação e importação do Estado de São Paulo.",
    link: "https://github.com/Templasan/DSM---Projeto-de-API-1-Semestre",
    concluido: true,
  },
  {
    id: 2,
    titulo: "Plataforma Integrada de Gestão",
    descricao: "Proposta de Plataforma Integrada para Gestão Administrativa.",
    link: "#",
    concluido: false,
  },
];

const tecnologias = ["HTML", "CSS", "JavaScript", "Python", "Figma", "TypeScript", "Node.js"];

app.get("/", (req, res) => {
  res.render("pages/index", { nome: "Laura Félix de Paula" });
});

app.get("/sobre", (req, res) => {
  const estudante = {
  nome: "Laura Félix de Paula",
  curso: "Desenvolvimento de Software Multiplataforma",
  instituicao: "FATEC São José dos Campos",
  ingresso: 2025,
};
  res.render("pages/sobre", { estudante });
});

app.get("/disciplinas", (req, res) => {
  res.render("pages/disciplinas", { disciplinas });
});

app.get("/projetos", (req, res) => {
  res.render("pages/projetos", { projetos });
});

app.get("/contato", (req, res) => {
  const contato = {
    email: "lauriinha686@gmail.com",
    linkedin: "https://www.linkedin.com/in/laura-f-382985351",
    github: "https://github.com/lauraflx",
  };
  res.render("pages/contato", { contato });
});

app.get("/dashboard", (req, res) => {
  const stats = {
    totalDisciplinas: disciplinas.length,
    projetosConcluidos: projetos.filter((p) => p.concluido).length,
    tecnologias,
  };
  res.render("pages/dashboard", { stats });
});

app.post("/projetos", (req, res) => {
  const { titulo, descricao, link } = req.body;
  const novoProjeto = {
    id: projetos.length + 1,
    titulo,
    descricao,
    link,
    concluido: false,
  };
  projetos.push(novoProjeto);
  res.redirect("/projetos");
});

app.post("/projetos/:id/concluir", (req, res) => {
  const id = parseInt(req.params.id);
  const projeto = projetos.find((p) => p.id === id);
  if (projeto) projeto.concluido = true;
  res.redirect("/projetos");
});

app.post("/projetos/:id/deletar", (req, res) => {
  const id = parseInt(req.params.id);
  projetos = projetos.filter((p) => p.id !== id);
  res.redirect("/projetos");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
