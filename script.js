const input = document.getElementById('unosZadatka');
const button = document.getElementById('DodajZadatak');
const listaZadataka = document.getElementById('listaZadataka');

listaZadataka.innerHTML = localStorage.getItem('listaZadataka') || '';

function obrisiZadatak(zadatak) {
    zadatak.remove();
    localStorage.setItem('listaZadataka', listaZadataka.innerHTML);
}

button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        const noviZadatak = document.createElement('li');
        noviZadatak.textContent = input.value;
        const obrisiDugme = document.createElement('button');
        obrisiDugme.textContent = 'Obriši';
        obrisiDugme.addEventListener('click', function() {
            obrisiZadatak(noviZadatak);
        });
        noviZadatak.appendChild(obrisiDugme);
        listaZadataka.appendChild(noviZadatak);
        localStorage.setItem('listaZadataka', listaZadataka.innerHTML);
        input.value = '';
    }
});
