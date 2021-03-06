const canvas = document.getElementById("game");//CHAMA LA NO INDEX.HTML A ID GAME
const ctx = canvas.getContext("2d");//FUNCTION DO CANVAS É FEITA EM 2DIMENSÕES
const infoTela = document.getElementById("infotela")//Caminho das informacoes que quero mostrar .

class ParteCobra {//AQUI EU USEI CLASS PARA "TESTAR" ALGO QUE ESTOU APRENDENDO AOS POUCOS, MAS PELO QUE EU ENTENDI, A CLASS TEM QUASE A MESMA FUNÇÃO DA FUNCTION, SÓ QUE SE USA CLASS NO LUGAR. NESSE CASO EU USEI E DEU CERTO, IREI PROCURAR MAIS INFORMAÇÕES A RESPEITO DA DIFERENÇA ENTRE CLASS E FUNCTION NO ARQUIVO JAVASCRIPT
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const Restart = document.getElementById("Restart");//BOTAO RESTART

Restart.addEventListener("click", function() {
    
    location.reload();//FUNÇAO DA INTERNET PARA DAR RELOAD NA PAGINA. SIMPLES.

})

let velocidade = 8; //VELOCIDADE PADRAO DA COBRINHA, POREM VAI AUMENTAR DEPOIS DE PEGAR ALGUMAS MAÇÃS
let nivel = 1 //NIVEL INICIAL DO GAME

let ContadorQuadrado = 20;
let TamanhoQuadrado = canvas.width / ContadorQuadrado - 2;

let CabecaX = 10;//TAMANHO DA CABEÇA NO EIXO X
let CabecaY = 10;//TAMANHO DA CABEÇA NO EIXO Y
const partesCobrita = [];//COMO PODEMOS VER ACIMA, X = 10 E Y = 10, E O TAMANHO DE CADA QUADRADO, ELE TRABALHA MAIS OU MENOS COMO X = Y = 10
let TamanhoCauda = 2;

let MacaX = 5;//POSIÇÃO INICIAL DA COMIDA
let MacaY = 5;//POSIÇÃO INICIAL DA COMIDA
// MESMA COISA DO TAMANHO DO QUADRADO, ACIMA ELES ESTAO SE COMPLETANDO 5+5=10(TAMANHO DO QUADRADO)
let VelocidadeX = 0;//VELOCIDADE INICIAL ANTES DE APERTAR BOTOES
let VelocidadeY = 0;//VELOCIDADE INICIAL ANTES DE APERTAR BOTOES

let VeloInicial = 0;//VELOCIDADE INICIAL = 0 OU SEJA COBRINHA PARADA
let VeloInicialY = 0;//VELOCIDADE INICIAL = 0 OU SEJA COBRINHA PARADA

let Pontos = 0;//PONTOS VALEM 10 COM VALOR INICIAL DE 0
let valorPontos = 10

//game loop
function drawPontos() {//AQUI É O CONTADOR DE PONTOS NO CANTO SUPERIOR DIREITO
  infoTela.textContent = `Nivel: ${nivel} Pontos: ${Pontos}`+"       "
  
}
function drawGame() {
  VeloInicial = VelocidadeX;//AMBOS SAO 0, ENTAO SAO IGUAIS
  VeloInicialY = VelocidadeY;//AMBOS SAO 0, ENTAO SAO IGUAIS

  MudarPosiçaoCobra();
  
  let Resultado = isGameOver();
  if (Resultado) {
    return;
  }

  LimpaTela();
  ChecarPosicaoMaça();
  DesenharMaca();
  DesenharCobras();
  drawPontos();

  if (Pontos >=100) {
    velocidade = 11;
    valorPontos=20
    nivel = 2;
  }
  if (Pontos >= 300) {//AQUI PODE SE COLOCAR MAIS IFS CASO QUEIRA QUE A VELOCIDADE SEJA MAIOR. SÓ COLOCAR QUANTOS PONTOS A MAIS  E QUAL A VELOCIDADE A MAIS QUE DESEJAR
    velocidade = 12;
    valorPontos=50
    nivel = 3;
  }
 
  setTimeout(drawGame, 1000 / velocidade); //AQUI FAZ COM QUE A TELA SE "ATUALIZE A CADA 1000MS, OU SEJA, 1SEGUNDO, PODENDO FAZER COM QUE A VELOCIDADE DA COBRINHA MUDE AQUI NO CÓDIGO CASO ALGUÉM QUEIRA."
}

function isGameOver() {
  let gameOver = false;
  let fimdejogo = false

  if (VeloInicialY === 0 && VeloInicial === 0) {
    return false;
  }
 if(Pontos == 800){//AQUI SE OS PONTOS FOREM MAIORES DO QUE 500, O JOGO IRÁ ENCERRAR.
    
    fimdejogo = true
  }
  //AQUI IRÁ IMPEDIR QUE A COBRA BATA NA PAREDE, SE BATER, PERDE
  if (CabecaX < 0) {
    gameOver = true;
  } else if (CabecaX === ContadorQuadrado) {
    gameOver = true;
  } else if (CabecaY < 0) {
    gameOver = true;
  } else if (CabecaY === ContadorQuadrado) {
    gameOver = true;
  }

  for (let i = 0; i < partesCobrita.length; i++) {
    let part = partesCobrita[i];
    if (part.x === CabecaX && part.y === CabecaY) {
      gameOver = true;
      break;
    }
    for (let o = 0;o < partesCobrita.length;o++){
      let part = partesCobrita[o]
      if (part.x ===MacaX && part.y===MacaY){
        MacaX = Math.floor(Math.random() * ContadorQuadrado);
        MacaY = Math.floor(Math.random() * ContadorQuadrado);
      }
    }
  }

  if (gameOver){
    let fimdejogo = document.getElementById("gameover")
    fimdejogo.textContent = "GAME OVER"
  } 
  if (fimdejogo){
    let fimdejogo = document.getElementById("gameover")
    fimdejogo.textContent = "PARABENS VOCE FINALIZOU O GAME :)"
    return gameOver

    
    
  } 

  return gameOver;
}


function LimpaTela() {//GRID DO JOGO
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function DesenharCobras() {//COR DO CORPO DA COBRINHA DEPOIS QUE COME AS COMIDAS
  ctx.fillStyle = "green";
  for (let i = 0; i < partesCobrita.length; i++) {
    let part = partesCobrita[i];
    ctx.fillRect(part.x * ContadorQuadrado, part.y * ContadorQuadrado, TamanhoQuadrado, TamanhoQuadrado);
  }

  partesCobrita.push(new ParteCobra(CabecaX, CabecaY));
  while (partesCobrita.length > TamanhoCauda) {
    partesCobrita.shift(); //.SHIFT ADICIONA UM QUADRADO NO FINAL DA COBRINHA, ADICIONANDO UM PONTO
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(CabecaX * ContadorQuadrado, CabecaY * ContadorQuadrado, TamanhoQuadrado, TamanhoQuadrado);
}

function MudarPosiçaoCobra() {
  CabecaX = CabecaX + VeloInicial;
  CabecaY = CabecaY + VeloInicialY;
}

function DesenharMaca() {//FUNÇAO PARA DESENHAR A MAÇÃ
    ctx.fillStyle="red"
    ctx.beginPath()
    ctx.arc(MacaX * ContadorQuadrado+10,MacaY * ContadorQuadrado+10,9,0,2*3)
    ctx.fill()
    ctx.fillStyle="green"
    ctx.beginPath()
    ctx.arc(MacaX * ContadorQuadrado+2,MacaY * ContadorQuadrado+8,8,4,2*3)
    ctx.fill()

}

function ChecarPosicaoMaça() {
  if (MacaX === CabecaX && MacaY === CabecaY) {
    MacaX = Math.floor(Math.random() * ContadorQuadrado);
    MacaY = Math.floor(Math.random() * ContadorQuadrado);
    TamanhoCauda++;
    Pontos+= valorPontos;

  }//AQUI CASO A COBRINHA PASSE POR CIMA DA COMIDINHA, ELA IRÁ SOMAR NO TAMANHO DA CAUDA E TAMBÉM NOS PONTOS NO CANTO SUPERIOR DIREITO
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //CIMA
  if (event.keyCode == 38 || event.keyCode == 87) {
    //87 >>> W
    if (VelocidadeY == 1) return;
    VelocidadeY = -1;//ESSE -1 SERVE PARA A COBRINHA NAO DESCER ENQUANTO ESTIVER SUBINDO
    VelocidadeX = 0;
  }

  //BAIXO
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 >>> S
    if (VelocidadeY == -1) return;
    VelocidadeY = 1;//A MESMA COISA AQUI, SE A COBRINHA ESTIVER DESCENDO E ELA TENTAR SUBIR, NÃO IRÁ CONSEGUIR, TEM QUE IR PARA ALGUM DOS LADOS PRIMEIRO
    VelocidadeX = 0;
  }

  //ESQUERDA
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 >>> A
    if (VelocidadeX == 1) return;
    VelocidadeY = 0;
    VelocidadeX = -1;
  }

  //DIREITA
  if (event.keyCode == 39 || event.keyCode == 68) {
    //68 >>> D
    if (VelocidadeX == -1) return;
    VelocidadeY = 0;
    VelocidadeX = 1;
  }
}

drawGame();//AQUI DESENHA O JOGO INTEIRO


//CONSIDERAÇÕES FINAIS PEDRO:

/*

ESSE JOGUINHO FOI BEM DESAFIADOR E TIVE QUE PEGAR VÁRIAS DICAS EM VÁRIOS LINKS 
DIFERENTES DO STACKOVERFLOW E TAMBÉM TIVE QUE LER UM POUCO SOBRE A FUNÇÃO CANVAS, 
QUE CREIO QUE FOI O QUE MAIS DIFICULTOU ESSE CÓDIGO, POIS CERCA DE 90% DO CÓDIGO 
TEM AS FUNÇÕES .fillRect, .fillFont e .fillStyle, E NUNCA TINHA VISTO ESSE TIPO 
DE FUNÇÃO ANTES, ENTÃO NÃO SABIA COMO UTILIZAR, COMO CHAMAR, COMO FAZER E COMO 
MANIPULAR, MAS DEPOIS DE ALGUM TEMPO FUI CONSEGUINDO NA TENTATIVA E ERRO ATÉ 
ENTENDER +- O QUE CADA UMA FAZIA. 

O ÚNICO "ERRO" DESSE JOGO É QUE EU NÃO CONSEGUI ENCONTRAR UM LUGAR PARA ENCAIXAR
UM  "RESTART", CASO A PESSOA PERDESSE. ENTÃO SEMPRE QUE O JOGADOR PERDE É 
NECESSÁRIO RECARREGAR A PÁGINA COM F5 QUE O JOGO IRÁ RECOMEÇAR.

OUTRO PONTO IMPORTANTE: USEI LET AO INVÉS DE VAR POIS OS DOIS FAZEM EXATAMENTE A 
MESMA COISA, SÓ QUE O LET É UMA FORMA DE VARIÁVEL MAIS ATUALIZADA E QUE ENGLOBA 
MAIS FUNÇÕES E MANEIRAS DE SER USADA DO QUE A VAR, ENTÃO VOU COMEÇAR A USAR LET 
NOS MEUS CÓDIGOS POIS DIZEM QUE COM O TEMPO TALVEZ A VAR FIQUE OBSOLETA. 

-------------------------------------------------------------
PARTICIPANTES DO GRUPO: PEDRO GASPAR, BENTO GABRIEL E JOSIAS OLIVEIRA
-------------------------------------------------------------
*/


