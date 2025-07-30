//player 1
const player1Name = document.querySelector("#p1_name");
const player1Score = document.querySelector("#p1_score");
let score1 = 0;
//card 1
const poke1Image = document.querySelector("#img1");
const poke1Name = document.querySelector("#card1 #name");
const poke1Exp = document.querySelector("#card1 #experience");
const poke1Abi = document.querySelector("#card1 #abilities");

//player 2
const player2Name = document.querySelector("#p2_name");
const player2Score = document.querySelector("#p2_score");
let score2 = 0;
//card 1
const poke2Image = document.querySelector("#img2");
const poke2Name = document.querySelector("#card2 #name");
const poke2Exp = document.querySelector("#card2 #experience");
const poke2Abi = document.querySelector("#card2 #abilities");

player1Name.textContent = "jonah";
player1Score.textContent = `${score1}`;

player2Name.textContent = "amy";
player2Score.textContent = `${score2}`;

//generate random number function
function generateRandomNum(min, max) {
    let num = Math.floor((Math.random() * (max - min)) + min);
    return num;
};


// fetch data from api
let pokemonList = [];

async function getPokemon() {
    const request = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await request.json();
    pokemonList = data.results;
}
getPokemon();

const fightBtn = document.querySelector("#fight");
fightBtn.addEventListener('click', async () => {
    let num1 = generateRandomNum(0, 20);
    let num2 = generateRandomNum(0, 20);

    // card1
    poke1Url = pokemonList[num1].url;
    const poke1Data = await fetch(poke1Url).then(res => res.json());
    poke1Image.src = poke1Data.sprites.front_default;
    poke1Name.textContent = pokemonList[num1].name;
    poke1Exp.textContent = poke1Data.base_experience;
    poke1Abi.textContent = poke1Data.abilities.map(obj => obj.ability.name).join(', ');

    // card2
    poke2Url = pokemonList[num2].url;
    const poke2Data = await fetch(poke2Url).then(res => res.json());
    poke2Image.src = poke2Data.sprites.front_default;
    poke2Name.textContent = pokemonList[num2].name;
    poke2Exp.textContent = poke2Data.base_experience;
    poke2Abi.textContent = poke2Data.abilities.map(obj => obj.ability.name).join(', ');

    //score 
    if(poke1Data.base_experience > poke2Data.base_experience) {
        score1 ++;
        player1Score.textContent = `${score1}`;
    }
    else if(poke1Data.base_experience < poke2Data.base_experience) {
        score2 ++;
        player2Score.textContent = `${score2}`;
    }
});