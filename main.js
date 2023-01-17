const root = document.getElementById("root");
const totalCardAmount = 36;
const basePicturesURL = "https://picsum.photos/id";
let cardToDisplay = totalCardAmount;
let initialIndex = 1;
const prefetchItemsCount = totalCardAmount / 3;

function setSrc(imgEl, id, width, height) {
  imgEl.src = `${basePicturesURL}/${id}/${width}/${height}`;

  imgEl.onerror = () => {
    const newId = id + totalCardAmount * 3;
    imgEl.id = newId;
    setSrc(imgEl, newId, width, height);
    addListeners(imgEl);
  };
}

function createImgEl(id) {
  const imgEl = new Image();
  imgEl.classList.add("card-img");
  imgEl.id = id;
  setSrc(imgEl, id, 1800, 1800);

  return imgEl;
}

function createCardItem() {
  const divEl = document.createElement("div");
  divEl.classList.add("card");

  return divEl;
}

function addListeners(imgEl) {
  const initialSrc = imgEl.src;

  imgEl.addEventListener("mouseenter", () => {
    const newId = +imgEl.id + 1;

    setSrc(imgEl, newId, 1800, 1800);
  });

  imgEl.addEventListener("mouseleave", () => {
    imgEl.src = initialSrc;
  });
}

function generateCards() {
  for (let i = initialIndex; i <= cardToDisplay * 3; i += 3) {
    const card = createCardItem();
    const staticImage = createImgEl(i);
    const dynamicImage = createImgEl(i + 1);

    addListeners(dynamicImage);

    card.appendChild(staticImage);
    card.appendChild(dynamicImage);

    root.appendChild(card);
  }

  for (let i = initialIndex; i <= cardToDisplay * 3; i += 3) {
    preloadImage(i);
  }

  if (cardToDisplay >= totalCardAmount) {
    root.removeEventListener("scroll", scrollListener);
  }
}

function scrollListener() {
  if (root.scrollTop >= (root.scrollHeight - root.clientHeight) * 0.8) {
    initialIndex = cardToDisplay * 3 + 1;
    cardToDisplay += prefetchItemsCount;
    generateCards();
  }
}

function preloadImage(id) {
  setSrc(new Image(), id, 1800, 1800);
}

root.addEventListener("scroll", scrollListener);

generateCards();
