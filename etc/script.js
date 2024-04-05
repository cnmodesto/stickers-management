let itens = document.querySelectorAll('.item');
let btnCompletar = document.getElementById('btn-completar');
let btnLimpar = document.getElementById('btn-limpar');
let btnCompartilharFaltantes = document.getElementById('btn-compartilhar-faltantes');

for (let i = 0; i < itens.length; i++) {
    itens[i].addEventListener('click', () => {
        if (itens[i].classList.contains('fig-blank')) {
            itens[i].classList.add('fig-ok');
            itens[i].classList.remove('fig-blank');
        } else {
            itens[i].classList.add('fig-blank');
            itens[i].classList.remove('fig-ok');
        }
    });
}

btnCompletar.addEventListener('click', () => {
    if (window.confirm("Esta ação vai marcar todas as figurinhas. Deseja continuar?")) {
        for (let i = 0; i < itens.length; i++) {
            itens[i].classList.add('fig-ok');
            itens[i].classList.remove('fig-blank');
        }
    }
});

btnLimpar.addEventListener('click', () => {
    if (window.confirm("Esta ação vai desmarcar todas as figurinhas. Deseja continuar?")) {
        for (let i = 0; i < itens.length; i++) {
            itens[i].classList.add('fig-blank');
            itens[i].classList.remove('fig-ok');
        }
    }
});

btnCompartilharFaltantes.addEventListener('click', () => {
    let arrayFaltantes = [];
    let stringFaltantes = '';

    for (let i = 0; i < itens.length; i++) {
        if (itens[i].classList.contains('fig-blank')) { 
            arrayFaltantes.push(itens[i].innerHTML);
        }
    }

    // Cria string para mostrar conteúdo do array (temporário)
    for (let i = 0; i < arrayFaltantes.length; i++) {
        if (i == (arrayFaltantes.length - 1)) {
            stringFaltantes += arrayFaltantes[i];
        } else {
            stringFaltantes += arrayFaltantes[i] + ", ";
        }
        
    }
    console.log(stringFaltantes);
});