const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco') ;
const curtoBt = document.querySelector('.app__card-button--curto') ;
const longoBt = document.querySelector('.app__card-button--longo') ;
const startPauseBt = document.querySelector('#start-pause');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const contadorIniciado = new Audio('/sons/play.wav');
const contadorPausado = new Audio('/sons/pause.mp3');
const fimContador = new Audio('/sons/beep.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconePlayPause = document.querySelector('.app__card-primary-butto-icon');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true

musicaFocoInput.addEventListener('change', ()=>{
    if (musica.paused){
        musica.play();
        
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})
curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})
longoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

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

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <=0 ){
        fimContador.play()
        zerar();
        alert('Tempo Finalizado');
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

function zerar (){
    clearInterval(intervaloId);
    intervaloId = null;
}
function mostrarTempo(){
const tempo = new Date(tempoDecorridoEmSegundos * 1000);
const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();