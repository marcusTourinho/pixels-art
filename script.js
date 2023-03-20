window.onload = () => {
    //declaração de variáveis
    const paletteColors = document.querySelectorAll('.color');
    const btnRandomColor = document.getElementById('button-random-color');
    const pixelBoard = document.getElementById('pixel-board');
    const pixelColor = document.getElementsByClassName('pixel');
    const btnReset = document.getElementById('clear-board');
    const btnVQV = document.getElementById('generate-board');
    const boardInput = document.getElementById('board-size');

    //função que seta a cor preta como primeira
    const setFirstColor = () => {
        const firstColor = document.getElementById('color-palette').firstElementChild;
        return firstColor.style.backgroundColor = 'black';
    }
    setFirstColor();

    //função que gera cores aleatórias
    const getRandomColor = () => {
        const hexa = '0123456789ABCDEF';
        let color = '#';
        while (color.length < 7) {
            color += hexa[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //função que guarda a paleta no local storage
    const localStoragePalette = () => {
        let paletteArray = [];
        for (let index = 0; index < paletteColors.length; index++) {
            paletteArray[index] = paletteColors[index].style.backgroundColor;
        }
        localStorage.setItem('colorPalette', JSON.stringify(paletteArray));           
    }

    //função que puxa as cores da paleta pelo localStorage
    const setLocalStoragePalette = () => {
        if (localStorage.getItem('colorPalette') === null) {
            for (let index = 1; index < paletteColors.length; index++) {
                paletteColors[index].style.backgroundColor = getRandomColor();
            } 
        } else {
            let savePalette = JSON.parse(localStorage.getItem('colorPalette'));
            for (let index = 1; index < paletteColors.length; index++) {
                paletteColors[index].style.backgroundColor = savePalette[index];
            }
        }
    }
    setLocalStoragePalette();

    //função que seta as cores na paleta
    const setRandomColors = () => {
        for (let index = 1; index < paletteColors.length; index++) {
            paletteColors[index].style.backgroundColor = getRandomColor();
            if (paletteColors[index] === 'black' || paletteColors[index] === paletteColors[index - 1]) {
                index--;
            }
        }
        localStoragePalette();
    }
    btnRandomColor.addEventListener('click', setRandomColors);

    //função que guarda o board no localStorage
    let boardArray = [];
    const localStorageBoard = () => {
        for (let index = 0; index < pixelColor.length; index++) {
            boardArray[index] = pixelColor[index].style.backgroundColor;
        }
        localStorage.setItem('pixelBoard', JSON.stringify(boardArray)); 
    }

    
    //função que cria os pixels
    const createPixels = (pixels) => {
        for (let index = 0; index < pixels; index++) {
            const row = document.createElement('div');
            row.classList.add('row');
            pixelBoard.appendChild(row);
            for (let indexj = 0; indexj < pixels; indexj++) {
                const pixelElement = document.createElement('div');
                pixelElement.classList.add('pixel');
                row.appendChild(pixelElement);
                pixelElement.style.background = 'white';
            }
        }
    }
    createPixels(localStorage.getItem('boardSize') || 5);

    //função que define o tamanho do board
    const variablePixels = () => {
        let input = boardInput.value;
        if (input) {
            if(input < 5) {
                input = 5;
            } else if (input > 12) {
                input = 12;
            }
            pixelBoard.innerHTML = '';
            createPixels(input);
            pixelElement.style.background = 'white';
        } else {
            alert('Board inválido!')
        }
    }
    btnVQV.addEventListener('click', variablePixels);

    //função que retorna as cores dos pixels pelo localStorage
    const setLocalStorageBoard = () => {
        let saveBoard = JSON.parse(localStorage.getItem('pixelBoard'));
        if (saveBoard === null) {
            for (let index = 0; index < pixelColor.length; index++) {
                pixelColor[index].style.backgroundColor = 'white';
            }
        } else {
            for (let index = 0; index < pixelColor.length; index++) {
                pixelColor[index].style.backgroundColor = saveBoard[index];
            }
        }
            
    }
    setLocalStorageBoard();

    //função que seleciona as cores
    const selectColor = (event) => {
        const selectedColor = document.querySelector('.selected');
        selectedColor.classList.remove('selected');
        event.target.classList.add('selected');
    }
    for (let index = 0; index < paletteColors.length; index++) {
        paletteColors[index].addEventListener('click', selectColor);
    }

    //função que pinta os pixels 
    const fillPixel = (event) => {
        const selectedColor = document.querySelector('.selected');
        if (selectedColor) {
            event.target.style.backgroundColor = selectedColor.style.backgroundColor;
        }
        localStorageBoard();
    }
    for (let index = 0; index < pixelColor.length; index++) {
        pixelColor[index].addEventListener('click', fillPixel);
    }

    //função do botão limpar
    const resetBoard = () => {
        for (let index = 0; index < pixelColor.length; index++) {
            pixelColor[index].style.backgroundColor = 'white';
        }
        localStorageBoard();
    }
    btnReset.addEventListener('click', resetBoard);
}