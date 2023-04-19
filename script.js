var intervalo = null;
var divArrow = document.querySelector('#arrow');
var divAndar = document.querySelector('#andarDestino');
const ctx = canvas.getContext("2d");
const elevador = {
    x: 130,
    y: 410,
    largura: 40,
    altura: 80,
    filaDeChamada: [],
    cor: "#70e000",
    emMovimento: false,
    portaAberta: false,
    destino: 410
}

function desenhaAndares(){
    const andar = { x: 0, y: 100} ;
    
    for (i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 5;
        ctx.moveTo(0, (andar.y * i));
        ctx.lineTo(120, (andar.y * i));
        ctx.moveTo(180, (andar.y * i));
        ctx.lineTo(300, (andar.y * i));
        ctx.stroke();
    }
}

function desenhaElevador(elevador){
    ctx.beginPath();
    ctx.strokeStyle = elevador.cor;
    ctx.rect(elevador.x, elevador.y, elevador.largura, elevador.altura);
    ctx.stroke();
}

function adicionaNaFila(proximoAndar){

    elevador.filaDeChamada.push(proximoAndar);   
}

function mostraProximoAndar(andarDestino){
    
    if(andarDestino ===  10) return "04";
    if(andarDestino === 110) return "03";
    if(andarDestino === 210) return "02";
    if(andarDestino === 310) return "01";
    if(andarDestino === 410) return  "T";
}

intervalo = setInterval( () => {
    
    if (elevador.filaDeChamada.length !== 0) {
        elevador.destino = elevador.filaDeChamada[0];
    }
    
    if (elevador.destino < elevador.y) {
    
        elevador.y--
        elevador.cor = "#da2c38";
        elevador.emMovimento = true;
        elevador.portaAberta = false;
        divArrow.style.visibility = "";
        divArrow.innerHTML = "&#x2191;";
        divAndar.innerHTML = mostraProximoAndar(elevador.destino);
        
    } else if(elevador.destino > elevador.y) {
        
        elevador.y++;
        elevador.cor = "#da2c38";
        elevador.emMovimento = true;
        elevador.portaAberta = false;
        divArrow.style.visibility = "";
        divArrow.innerHTML = "&#x2193;";
        divAndar.innerHTML = mostraProximoAndar(elevador.destino);
        
    }else{
        elevador.cor = "#70e000";
        elevador.emMovimento = false;
        elevador.portaAberta = true;
        divArrow.style.visibility = "hidden";
        divAndar.innerHTML = mostraProximoAndar(elevador.destino);
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhaAndares();
    desenhaElevador(elevador);

    if (!elevador.emMovimento) {
        elevador.filaDeChamada.shift();
    }
    
}, 50);


