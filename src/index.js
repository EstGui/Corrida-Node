const PLAYER1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const PLAYER2 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
};

// const PLAYER3 = {
//     nome: "Luigi",
//     velocidade: 3,
//     manobrabilidade: 4,
//     poder: 4,
//     pontos: 0,
// };

// const PLAYER4 = {
//     nome: "Peach",
//     velocidade: 3,
//     manobrabilidade: 4,
//     poder: 2,
//     pontos: 0,
// };

// const PLAYER5 = {
//     nome: "Yoshi",
//     velocidade: 2,
//     manobrabilidade: 4,
//     poder: 3,
//     pontos: 0,
// };

// const PLAYER6 = {
//     nome: "Donkey",
//     velocidade: 2,
//     manobrabilidade: 2,
//     poder: 5,
//     pontos: 0,
// };


const rollDice = () => Math.floor(Math.random() * 6) + 1;

function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "Reta";
            break;
        case random < 0.66:
            result = "Curva";
            break;
        default:
            result = "Confronto";
            break;
    }

    return result;
}

function logRollResult(char, block, diceResult) {
    let attr;

    switch (block) {
        case "Reta":
            attr = char.velocidade
            break;
        case "Curva":
            attr = char.manobrabilidade
            break;
    
        default:
            attr = char.poder
            break;
    }

    console.log(`${char.nome} rolou um dado de ${block} ${diceResult} + ${attr} = ${diceResult + attr}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 ${round}º rodada`);

        // sortear bloco
        let block = getRandomBlock();
        console.log(`Bloco: ${block}`)
        
        let diceResult1 = rollDice();
        let diceResult2 = rollDice();
        
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
        
        if (block === "Reta") {
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;
            
        } else if (block === "Curva") {
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;
        } else if(block === "Confronto") {
            let powerResult1 =  diceResult1 + character1.poder;
            let powerResult2 =  diceResult2 + character2.poder;

            console.log(`${character1.nome} confrontou ${character2.nome}!`);
            
            if (powerResult1 == powerResult2)
                console.log("Confronto empatado");
            else {
                let loser = powerResult1 > powerResult2 ? powerResult2 : powerResult1;
                loser.pontos -= loser.pontos > 0 ? 1 : 0; 
            }   
        }
        
        logRollResult(character1, block, diceResult1);
        logRollResult(character2, block, diceResult2);


        if (totalTestSkill1 === totalTestSkill2)
            console.log('Ninguém marcou ponto')
        else {
            let winner = totalTestSkill1 > totalTestSkill2 ? character1 : character2
            console.log(`${winner.nome} marcou um ponto!`)
            winner.pontos++;
        }
    }    
}

function declareWinner(char1, char2) {
    console.log("\nResultado final:")

    console.log(`${char1.nome}: ${char1.pontos} ponto(s)`)
    console.log(`${char2.nome}: ${char2.pontos} ponto(s)`)

    if (char1.pontos === char2.pontos)
        console.log('Empate')
    else {
        let winner = char1.pontos > char2.pontos ? char1 : char2;
        console.log(`${winner.nome} venceu a corrida!`);
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${PLAYER1.nome} e ${PLAYER2.nome} começando...\n`);

    await playRaceEngine(PLAYER1, PLAYER2);

    declareWinner(PLAYER1, PLAYER2);
})()
