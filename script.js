window.onload = () => {
    //declaração de variáveis que capturam os elementos.
    const colors = document.querySelectorAll('.color');
    const btnRandomColors = document.getElementById('button-random-color');
    const inputValue = document.getElementById('board-size');
    const btnVQV = document.getElementById('generate-board');
    const btnClear = document.getElementById('clear-board');
    const pixelBoard = document.getElementById('pixel-board');
    const paletteArray = [];
    
    //
    createBoard(localStorage.getItem('boardSize') || 5);
    
    //funções da paleta
    const setBlack = () => {
        colors[0].style.backgroundColor = 'black';
        paletteArray[0] = 'black';
    }
    setBlack();
    
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        let hexa = '#';
        while (hexa.length < 7) {
            hexa += letters[Math.floor(Math.random() * 16)];
        }
        return hexa;
    }

    const setRandomColor = () => {
        for (let i = 1; i < colors.length; i++) {
            colors[i].style.backgroundColor = getRandomColor();
            if (colors[i] === 'black' || colors[i] === colors[i - 1]) {
                i--;
            }
            paletteArray[i] = colors[i].style.backgroundColor;
        }
        localStorage.setItem('colorPalette', JSON.stringify(paletteArray));
    }

    const restorePalette = () => {
        if (localStorage.getItem('colorPalette') == null) {
            for (let i = 1; i < colors.length; i++) {
                colors[i].style.backgroundColor = getRandomColor();
            }
        } else {
            let savePalette = JSON.parse(localStorage.getItem('colorPalette'));
            for (let index = 1; index < colors.length; index++) {
                colors[index].style.backgroundColor = savePalette[index];
            }
        }
    }
    restorePalette();
    btnRandomColors.addEventListener('click', setRandomColor);

    //funções do board
    function  createBoard(size) {
        for (let i = 0; i < size; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            pixelBoard.appendChild(row);
            for (let j = 0; j < size; j++) {
                const pixel = document.createElement('div');
                pixel.classList.add('pixel');
                row.appendChild(pixel);
                pixel.style.background = 'white';
            }
        }
    }

    const inputBoard = () => {
        if(inputValue.value) {
            let input = inputValue.value;
            if (input < 5) {
                input = 5;
            } else if (input > 50) {
                input = 50;
            }
            pixelBoard.innerHTML = '';
            localStorage.setItem('boardSize', input);
            createBoard(input);
        } else {
            alert('Board inválido!')
        }
    }
    btnVQV.addEventListener('click', inputBoard);

    const pixelElement = document.querySelectorAll('.pixel');
    let boardArray = [];
    const localStorageBoard = () => {
        for (let index = 0; index < pixelElement.length; index++) {
            boardArray[index] = pixelElement[index].style.backgroundColor;
        }
        localStorage.setItem('pixelBoard', JSON.stringify(boardArray)); 
    }

    const setLocalStorageBoard = () => {
        let saveBoard = JSON.parse(localStorage.getItem('pixelBoard'));
        if (saveBoard === null) {
            for (let index = 0; index < pixelElement.length; index++) {
                pixelElement[index].style.backgroundColor = 'white';
            }
        } else {
            for (let index = 0; index < pixelElement.length; index++) {
                pixelElement[index].style.backgroundColor = saveBoard[index];
            }
        }
    }
    setLocalStorageBoard();

    //funções de interação
    const selectColor = (event) => {
        const selectedColor = document.querySelector('.selected');
        selectedColor.classList.remove('selected');
        event.target.classList.add('selected');
    }
    for (let index = 0; index < colors.length; index++) {
        colors[index].addEventListener('click', selectColor);
    }

    const fillPixel = (event) => {
        const selectedColor = document.querySelector('.selected');
        if (selectColor) {
            event.target.style.backgroundColor = selectedColor.style.backgroundColor;
        }
        localStorageBoard();
    }
    for (let indexj = 0; indexj < pixelElement.length; indexj++) {
        pixelElement[indexj].addEventListener('click', fillPixel);
    }

    const clearBoard = () => {
        for (let index = 0; index < pixelElement.length; index++) {
            pixelElement[index].style.backgroundColor = 'white';
        }
        localStorage.removeItem('pixelBoard');
    }

    btnClear.addEventListener('click', clearBoard);
}