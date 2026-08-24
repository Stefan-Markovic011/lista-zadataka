const input = document.getElementById('unosZadatka');
const button = document.getElementById('dodajZadatak');
const listaZadataka = document.getElementById('listaZadataka');
const praznaLista = document.getElementById('praznaLista');

let zadaci = JSON.parse(
    localStorage.getItem('zadaci')
) || [];

function sacuvajZadatke() {
    localStorage.setItem(
        'zadaci',
        JSON.stringify(zadaci)
    );
}

function prikaziZadatke() {
    listaZadataka.innerHTML = '';

    if (zadaci.length === 0) {
        praznaLista.style.display = 'block';
        return;
    }

    praznaLista.style.display = 'none';

    zadaci.forEach(function(zadatak) {
        const li = document.createElement('li');

        li.classList.add('zadatak');

        if (zadatak.zavrsen) {
            li.classList.add('zavrsen');
        }

        const tekst = document.createElement('span');

        tekst.classList.add('zadatak-tekst');

        tekst.textContent = zadatak.tekst;

        const dugmad = document.createElement('div');

        dugmad.classList.add('dugmad');

        const zavrsiDugme = document.createElement('button');

        zavrsiDugme.classList.add('zavrsi');

        zavrsiDugme.textContent =
            zadatak.zavrsen ? 'Vrati' : 'Završi';

        zavrsiDugme.addEventListener('click', function() {
            zadatak.zavrsen = !zadatak.zavrsen;

            sacuvajZadatke();
            prikaziZadatke();
        });

        const obrisiDugme = document.createElement('button');

        obrisiDugme.classList.add('obrisi');

        obrisiDugme.textContent = 'Obriši';

        obrisiDugme.addEventListener('click', function() {
            zadaci = zadaci.filter(function(item) {
                return item.id !== zadatak.id;
            });

            sacuvajZadatke();
            prikaziZadatke();
        });

        dugmad.appendChild(zavrsiDugme);
        dugmad.appendChild(obrisiDugme);

        li.appendChild(tekst);
        li.appendChild(dugmad);

        listaZadataka.appendChild(li);
    });
}

function dodajZadatak() {
    const tekst = input.value.trim();

    if (tekst === '') {
        return;
    }

    const noviZadatak = {
        id: Date.now(),
        tekst: tekst,
        zavrsen: false
    };

    zadaci.push(noviZadatak);

    sacuvajZadatke();
    prikaziZadatke();

    input.value = '';
    input.focus();
}

button.addEventListener('click', dodajZadatak);

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        dodajZadatak();
    }
});

prikaziZadatke();
