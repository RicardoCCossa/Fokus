const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startPauseBtn = document.querySelector('#start-pause')

const botoes =  document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')

const comecarOuPausar = document.querySelector('#start-pause span')
const mudarIconDeComecarOuPausar = document.querySelector('.app__card-primary-butto-icon')

const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('sons/luna-rise-part-one.mp3')
const somInicio = new Audio('sons/play.wav')
const somPause = new Audio('sons/pause.mp3')
const somFim = new Audio('sons/beep.mp3')
musica.loop = true

let tempoInicial = 1500
let tempoDecorridoEmSegundos = tempoInicial
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    }else {
        musica.pause()
    }
})

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
      botoes.forEach(function (contexto){
            contexto.classList.remove('active')
        })

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
       
        somFim.play()
        alert('Tempo finalizado!')
         zerar()
        return
    }

    tempoDecorridoEmSegundos -= 1
   mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        somPause.play()
        return
    }

    if (tempoDecorridoEmSegundos <= 0) {
        tempoDecorridoEmSegundos = tempoInicial
    }

    somInicio.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    comecarOuPausar.textContent = "Pausar"
    mudarIconDeComecarOuPausar.setAttribute('src', 'imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    comecarOuPausar.textContent = "Começar"
    mudarIconDeComecarOuPausar.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-MZ', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()