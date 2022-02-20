function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber (number) {
    return Math.floor(Math.random() * number);
}

export { getRandomItem, getRandomNumber };