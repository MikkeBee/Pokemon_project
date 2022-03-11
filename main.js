const gridCont = document.querySelector(".gridContainer");
const searchBar = document.querySelector(".searchBar");
const cardSet = document.querySelectorAll(".cardSet");

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
    .then((res) => res.json())
    .then((data) => {
      //   console.log("fetch result", data);
      //     pokeCard(data.results);
      const fetches = data.results.map((item) => {
        return fetch(item.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        console.log(res);
        pokeCard(res);
      });
    });
};

// Sprites.other.dream_world.front_default;

const pokeCard = (data) => {
  //   console.log(data);
  //   console.log("pokecards and stuff", data);

  const cards = data
    .map((card) => {
      return `<div class="cardSet" id="${card.id}">
         <div class="card"><img src="${
           card.sprites.other.dream_world.front_default
         }" alt="${card.name}"></div>
         <p class="cardText">${card.name}</p>
         <p class="type">${card.types
           .map((pokeType) => pokeType.type.name)
           .join(", ")}
            </p>
       </div>`;
    })
    .join("");

  gridCont.innerHTML = cards;
};

const filterPoke = () => {
  const card = document.querySelectorAll(".cardText");
  card.forEach((pokemon) => {
    if (!pokemon.innerHTML.includes(searchBar.value.toLowerCase())) {
      pokemon.parentElement.classList.add("hidden");
    } else {
      pokemon.parentElement.classList.remove("hidden");
    }
  });
};

searchBar.addEventListener("keyup", filterPoke);
fetchData();
