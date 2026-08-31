const html = document.querySelector('html');
//Declaração das var dos botões foco, descanso curto, descanso longo
const focoBt = document.querySelector('.app__card-button--foco') ;
const curtoBt = document.querySelector('.app__card-button--curto') ;
const longoBt = document.querySelector('.app__card-button--longo') ;
//Declaração das var do botão de start/pause
const startPauseBt = document.querySelector('#start-pause');
const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer')
//Músicas utilizadas no projeto, para alterar basta colocar o caminho correto
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true // para reprodução em loop
const contadorIniciado = new Audio('/sons/play.wav');
const contadorPausado = new Audio('/sons/pause.mp3');
const fimContador = new Audio('/sons/beep.mp3');

const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconePlayPause = document.querySelector('.app__card-primary-butto-icon');

let tempoDecorridoEmSegundos = 1500; // tempo atual
let intervaloId = null;

// método de reprodução da música
musicaFocoInput.addEventListener('change', ()=>{
    if (musica.paused){
        musica.play();
        
    }else{
        musica.pause()
    }
})
 
//timer 
focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 1500; //25 mins
    alterarContexto('foco');
    focoBt.classList.add('active');
})
curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 300 // 5 mins
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})
longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900; // 15 mins
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

//método de alterar fundo e imagem
function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    
    switch (contexto) {
        
        case 'foco':
        titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        
        case 'descanso-curto':
        titulo.innerHTML = `Que tal dar uma respirada?,<br>
                    <strong class="app__title-strong">Faça uma pausa curta!.</strong>`
        break;
        
        case 'descanso-longo':
        titulo.innerHTML = `Hora de voltar à superfície.,<br>
                <strong class="app__title-strong">Faça uma pausa longa..</strong>`
        break;    
        default:
        break;
    }
}
//Método do Timer
const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <=0 ){
        fimContador.play()
        zerar();
        alert('Tempo Finalizado');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
         const evento = new CustomEvent('FocoFinalizado')
         document.dispatchEvent(evento)   
        }
        iconePlayPause.setAttribute('src', `/imagens/play_arrow.png`);
        iniciarOuPausarBt.textContent = 'Começar'
                longoBt.removeAttribute('disabled', true) 
                curtoBt.removeAttribute('disabled', true) 
                focoBt.removeAttribute('disabled', true)

        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}
// Pausar-Retomar timer
startPauseBt.addEventListener("click", iniciarOuPausar);
function iniciarOuPausar(){
    if(intervaloId){
        iniciarOuPausarBt.textContent = 'Retomar'
        iconePlayPause.setAttribute('src', `/imagens/play_arrow.png`);
        contadorPausado.play()
                zerar();
                longoBt.removeAttribute('disabled', true) 
                curtoBt.removeAttribute('disabled', true) 
                focoBt.removeAttribute('disabled', true)
                return;     
    }
    iconePlayPause.setAttribute('src', `/imagens/pause.png`);
    iniciarOuPausarBt.textContent = 'Pausar'
    contadorIniciado.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    longoBt.setAttribute('disabled', true) 
    curtoBt.setAttribute('disabled', true) 
    focoBt.setAttribute('disabled', true)
} 

//zerar Timer 
function zerar (){
    clearInterval(intervaloId);
    intervaloId = null;
}

//Conversão e exibição do tempo na tela
function mostrarTempo(){
const tempo = new Date(tempoDecorridoEmSegundos * 1000);
const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();