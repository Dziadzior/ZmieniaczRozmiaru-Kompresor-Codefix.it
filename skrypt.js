const przeslijBlok = document.querySelector('.przeslij-blok'),
    podgladObrazu = przeslijBlok.querySelector('img'),
    plikPole = przeslijBlok.querySelector('input'),
    szerokoscPole = document.querySelector('.szerokosc input'),
    wysokoscPole = document.querySelector('.wysokosc input'),
    wspolczynnikPole = document.querySelector('.wspolczynnik input'),
    rozdzielczoscPole = document.querySelector('.rozdzielczosc input'),
    pobierzPrzycisk = document.querySelector('.pobierz-przycisk');

let obrazWspolczynniki;

const zaladujPlik = (e) => {
    const plik = e.target.files[0]; //Jesli uzytkownik wybierze obraz
    if (!plik) return; //Jeśli uzytkownik nie wybierze obrazu 
    podgladObrazu.src = URL.createObjectURL(plik);
    podgladObrazu.addEventListener('load', () => {
        szerokoscPole.value = podgladObrazu.naturalWidth;
        wysokoscPole.value = podgladObrazu.naturalHeight;
        obrazWspolczynniki = podgladObrazu.naturalWidth / podgladObrazu.naturalHeight;
        document.querySelector('.blok').classList.add('aktywny');
    });
}

szerokoscPole.addEventListener('keyup', () => {
    const wysokosc = wspolczynnikPole.checked ? szerokoscPole.value / obrazWspolczynniki : wysokoscPole.value;
    wysokoscPole.value = Math.floor(wysokosc);
});

wysokoscPole.addEventListener('keyup', () => {
    const szerokosc = wspolczynnikPole.checked ? wysokoscPole.value * obrazWspolczynniki : szerokoscPole.value;
    szerokoscPole.value = Math.floor(szerokosc);
});


const zmniejszIPobierz = () => {
    const canvas = document.createElement('canvas'),   
    a = document.createElement('a'),   
    ctx = canvas.getContext('2d');

    const obrazRozdzielczosc = rozdzielczoscPole.checked ? 0.7 : 1.0;

    canvas.szerokosc = szerokoscPole.value;
    canvas.wysokosc = wysokoscPole.value;

    ctx.drawImage(podgladObrazu, 0, 0, canvas.szerokosc, canvas.wysokosc);
    
    a.href = canvas.toDataURL("image/jpeg", obrazRozdzielczosc);
    a.download = new Date().getTime();
    a.click();
}

pobierzPrzycisk.addEventListener('click', zmniejszIPobierz);
plikPole.addEventListener("change", zaladujPlik);
przeslijBlok.addEventListener("click", () => plikPole.click());
