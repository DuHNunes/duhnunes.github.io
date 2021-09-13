const searchBar = document.getElementById('searchBar');
const lists = {
  localList: {
    api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/local.json'
  },
  itemList: {
    api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/item.json'
  },
  personaList: {
      api: 'https://duhnunes.github.io/api/vocabulary/skyrimsei/persona.json'
  },
  animalList: {
      api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/animal.json'
  },
  foodList: {
      api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/food.json'
  },
  diseaseList: {
      api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/disease.json'
  },
  uiList: {
      api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/ui.json'
  },
  miscList: {
      api: 'https://duhnunes.github.io/api/vocabulary/skyrimse/misc.json'
  }
};

Object.entries(lists).forEach(([id, list]) => {
  list.element = document.getElementById(id);
});

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  Object.values(lists).forEach((list) => {
    list.filteredWords = list.words.filter((word) => {
      return word.name.toLowerCase().includes(searchString);
    });
  });

  displayCharacters();
});

const loadCharacters = async () => {
  try {
    await Promise.all(
      Object.values(lists).map(async (list) => {
        const response = await fetch(list.api);
        list.words = await response.json();
      })
    );

    displayCharacters();
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = () => {
  Object.values(lists).forEach((list) => {
    list.element.innerHTML = (list.filteredWords ?? list.words)
      .map((word) => `
        <div class="voc-box-content">
          <h5>${word.name} - ${word.trans} [${word.type} - ${word.type2}]</h5>
          <p>${word.description}</p>
        </div>`)
      .join('');
  });
};

loadCharacters();