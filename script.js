const dadosCursos = {
   publicidade: { titulo: "Publicidade", preco: 150.00, imagem: "publicidade.jpg", descricao: "Aprenda os fundamentos da publicidade e coloque em prática todos os conhecimentos adquiridos." },
   design: { titulo: "Design", preco: 180.00, imagem: "design.jpg", descricao: "Aprenda os fundamentos do design e coloque em prática todos os conhecimentos adquiridos." },
   programacao: { titulo: "Programação", preco: 250.00, imagem: "programacao.jpg", descricao: "Aprenda os fundamentos da programação e coloque em prática todos os conhecimentos adquiridos." },
office: { titulo: "Pacote Office", preco: 120.00, imagem: "pacote-office.jpg", descricao: "Aprenda os fundamentos do pacote Office e coloque em prática todos os conhecimentos adquiridos." }
};


let carrinho = [];
let usuarioLogado = false;


function esconderTodas() {
   const ids = ['pagina-home', 'pagina-curso', 'pagina-login', 'pagina-cadastro', 'pagina-carrinho', 'pagina-perfil'];
   ids.forEach(id => {
       const el = document.getElementById(id);
       if (el) el.style.display = 'none';
   });
}


function mostrarHome() {
   esconderTodas();
   document.getElementById('pagina-home').style.display = 'block';
   document.getElementById('hero-section').style.display = 'flex';
   document.getElementById('secao-lista-cursos').style.display = 'flex';
}


function mostrarApenasCursos() {
   esconderTodas();
   document.getElementById('pagina-home').style.display = 'block';
   document.getElementById('secao-lista-cursos').style.display = 'flex';
   document.getElementById('hero-section').style.display = 'none';
}


function abrirCurso(id) {
   const curso = dadosCursos[id];
   if (!curso) return;


   esconderTodas();


   document.getElementById('curso-titulo').innerText = curso.titulo;
   document.getElementById('curso-descricao').innerText = curso.descricao;
   document.getElementById('curso-imagem').src = curso.imagem;


   const btn = document.querySelector('#pagina-curso .btn-continuar');
   if (btn) {
       btn.onclick = function () {
           adicionarAoCarrinho(id);
       };
   }


   document.getElementById('pagina-curso').style.display = 'block';
   window.scrollTo(0, 0);
}


function gerenciarPerfil() {
   if (usuarioLogado) {
       abrirPerfil();
   } else {
       abrirLogin();
   }
}


function abrirLogin() {
   esconderTodas();
   document.getElementById('pagina-login').style.display = 'flex';
}


function abrirCadastro() {
   esconderTodas();
   document.getElementById('pagina-cadastro').style.display = 'flex';
}


function realizarLogin() {
   usuarioLogado = true;
   const emailInput = document.querySelector('#pagina-login input[type="email"]');
   const nome = emailInput && emailInput.value ? emailInput.value.split('@')[0] : "Estudante";
   const nomeDisplay = document.getElementById('nome-aluno');
   if (nomeDisplay) nomeDisplay.innerText = nome;


   mostrarHome();
   alert("Bem-vindo, " + nome + "!");
}


function abrirPerfil() {
   esconderTodas();
   document.getElementById('pagina-perfil').style.display = 'block';
}


function fazerLogout() {
   usuarioLogado = false;
   mostrarHome();
   alert("Você saiu da conta.");
}


function abrirCarrinho() {
   esconderTodas();
   document.getElementById('pagina-carrinho').style.display = 'block';
   renderizarCarrinho();
}


function renderizarCarrinho() {
   const lista = document.getElementById('itens-carrinho');
   const resumo = document.getElementById('resumo-carrinho');


   if (!lista) return;


   lista.innerHTML = "";


   if (carrinho.length === 0) {
       lista.innerHTML = '<p style="text-align: center; padding: 50px; color: #888;">Seu carrinho está vazio.</p>';
       resumo.style.display = 'none';
   } else {
       resumo.style.display = 'block';


       carrinho.forEach((item, index) => {
           lista.innerHTML += `
               <div class="course-card" style="cursor: default;">
                   <div class="course-img-box" style="width: 80px; height: 60px;">
                       <img src="${item.imagem}">
                   </div>
                   <div class="course-info">
                       <h3>${item.titulo}</h3>
                       <p>R$ ${item.preco.toFixed(2)}</p>
                   </div>
                   <button onclick="removerDoCarrinho(${index})">Remover</button>
               </div>
           `;
       });


       const total = carrinho.reduce((acc, curr) => acc + curr.preco, 0);
       document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2)}`;
   }
}


function adicionarAoCarrinho(id) {
   const curso = dadosCursos[id];
   if (curso) {
       carrinho.push({ ...curso });
       alert(curso.titulo + " foi adicionado!");
       abrirCarrinho();
   }
}


function removerDoCarrinho(index) {
   carrinho.splice(index, 1);
   renderizarCarrinho();
}


function finalizarCompra() {
   alert("Inscrição realizada com sucesso!");
   carrinho = [];
   mostrarHome();
}
