const tiles = Array.from(document.querySelectorAll('.tile'));
const emptyTile = document.querySelector('.tile.empty');
const shuffleButton = document.getElementById('shuffle');
const message = document.getElementById('message');

shuffleButton.addEventListener('click', shuffleBoard);

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        if (isAdjacent(tile, emptyTile)) {
            swapTiles(tile, emptyTile);
            if (isPuzzleSolved()) {
                message.textContent = 'Congratulations! You solved the puzzle!';
            }
        }
    });
});

function shuffleBoard() {
    const order = [1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];  // Swap
    }
    tiles.forEach((tile, index) => {
        if (order[index] === 9) {
            tile.classList.add('empty');
            tile.textContent = '';
        } else {
            tile.classList.remove('empty');
            tile.textContent = order[index];
        }
    });
    message.textContent = '';
}

function swapTiles(tile1, tile2) {
    const temp = tile1.textContent;
    tile1.textContent = tile2.textContent;
    tile2.textContent = temp;

    tile1.classList.toggle('empty');
    tile2.classList.toggle('empty');
}

function isAdjacent(tile1, tile2) {
    const idx1 = tiles.indexOf(tile1);
    const idx2 = tiles.indexOf(tile2);
    const row1 = Math.floor(idx1 / 3);
    const col1 = idx1 % 3;
    const row2 = Math.floor(idx2 / 3);
    const col2 = idx2 % 3;

    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function isPuzzleSolved() {
    return tiles.every((tile, index) => {
        return tile.textContent == (index + 1) || (tile.textContent === '' && index === 8);
    });
}
