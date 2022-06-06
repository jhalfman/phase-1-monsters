const URL_PREFIX='http://localhost:3000/';
let monsterID = 50;

const createMonsterForm = document.createElement("form");
const createMonsterContainer = document.getElementById("create-monster");
createMonsterForm.setAttribute("id", "create-monster-form");
createMonsterForm.innerHTML = `
<input id="name" placeholder="Monster Name">
<input id="age" placeholder="Monster Age">
<input id="description" placeholder="Monster Description">
<button id="create-monster-button">Create Monster</button>
`;
createMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newMonster = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    };
    addNewMonster(newMonster);
    fetch(`${URL_PREFIX}monsters`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
    e.target.reset();

    
})
createMonsterContainer.appendChild(createMonsterForm);

function getMonsters(page){
    fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(monster => addNewMonster(monster))
    });
}

let pageNumber = 1;
getMonsters(1);

function addNewMonster(monster) {
    const monsterParagraph = document.createElement("p");
    const monsterContainer = document.querySelector("#monster-container");
    monsterParagraph.innerText = (`Monster name: ${monster.name}
    Monster description: ${monster.description}
    Monster age: ${monster.age}`);
    monsterContainer.appendChild(monsterParagraph);
}

const forwardButton = document.getElementById("forward");
forwardButton.addEventListener("click", (e) => {
    const monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = "";
    pageNumber++;
    getMonsters(pageNumber);
    
})

const backButton = document.getElementById("back");
backButton.addEventListener("click", (e) => {
    const monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = "";
    if (pageNumber > 1) {
        pageNumber--;
    }
    getMonsters(pageNumber);
})