let itens = document.querySelectorAll('.progresso-tabela-item');
let btnCompletar = document.getElementById('btn-completar');
let btnLimpar = document.getElementById('btn-limpar');
let btnCompartilharFaltantes = document.getElementById('btn-compartilhar-faltantes');

let badgeTotalFigurinhas = document.getElementById('badge-total-figurinhas');
let badgeFaltantes = document.getElementById('badge-faltantes');

badgeFaltantes.innerText = document.querySelectorAll('.fig-blank').length;
badgeTotalFigurinhas.innerText = itens.length;

for (let i = 0; i < itens.length; i++) {
    itens[i].addEventListener('click', () => {
        if (itens[i].classList.contains('fig-blank')) {
            itens[i].classList.add('fig-ok');
            itens[i].classList.remove('fig-blank');
            itens[i].children[0].classList.add('fig-ok-btn-text');
            itens[i].children[0].classList.remove('fig-blank-btn-text');
            itens[i].querySelector('input[name="status"]').value = 'ok';
            badgeFaltantes.innerText = document.querySelectorAll('.fig-blank').length;
        } else {
            itens[i].classList.add('fig-blank');
            itens[i].classList.remove('fig-ok');
            itens[i].children[0].classList.add('fig-blank-btn-text');
            itens[i].children[0].classList.remove('fig-ok-btn-text');
            itens[i].querySelector('input[name="status"]').value = '';
            badgeFaltantes.innerText = document.querySelectorAll('.fig-blank').length;
        }
    });
}

btnCompletar.addEventListener('click', () => {
    if (window.confirm("Esta ação vai marcar todas as figurinhas. Deseja continuar?")) {
        for (let i = 0; i < itens.length; i++) {
            itens[i].classList.add('fig-ok');
            itens[i].classList.remove('fig-blank');
            itens[i].children[0].classList.add('fig-ok-btn-text');
            itens[i].children[0].classList.remove('fig-blank-btn-text');
            itens[i].querySelector('input[name="status"]').value = 'ok';
            document.getElementById('badge-faltantes').innerText = document.querySelectorAll('.fig-blank').length;
        }
    }
});

btnLimpar.addEventListener('click', () => {
    if (window.confirm("Esta ação vai desmarcar todas as figurinhas. Deseja continuar?")) {
        for (let i = 0; i < itens.length; i++) {
            itens[i].classList.add('fig-blank');
            itens[i].classList.remove('fig-ok');
            itens[i].children[0].classList.add('fig-blank-btn-text');
            itens[i].children[0].classList.remove('fig-ok-btn-text');
            itens[i].querySelector('input[name="status"]').value = '';
            document.getElementById('badge-faltantes').innerText = document.querySelectorAll('.fig-blank').length;
        }
    }
});

btnCompartilharFaltantes.addEventListener('click', () => {
    let arrayFaltantes = [];
    let stringFaltantes = '';
    let faltantesBody = document.getElementById('faltantes-body');
    let faltantesQtde = document.getElementById('code-pre-quantidade-faltantes');

    for (let i = 0; i < itens.length; i++) {
        if (itens[i].classList.contains('fig-blank')) {
            arrayFaltantes.push(itens[i].querySelector('input[name="item-button"]').value);
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

    faltantesQtde.innerText = document.querySelectorAll('.fig-blank').length;
    faltantesBody.innerText = stringFaltantes;
});

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const code = document.getElementById('code-body');
        const textToCopy = code.innerText;

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Fornece feedback ao usuário
            button.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> Copiado!';
            setTimeout(() => {
                button.innerHTML = '<i class="fa fa-clone" aria-hidden="true"></i> Copiar';
            }, 2000);
        }).catch(err => {
            console.log('Erro no processo de cópia do texto: ', err);
        });
    });
});

