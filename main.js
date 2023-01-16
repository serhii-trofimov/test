const root = document.getElementById("root");
const totalCardAmount = 32;
const basePicturesURL = "https://picsum.photos/id";

function setSrc(imgEl, id, width, height) {
  imgEl.src = `${basePicturesURL}/${id}/${width}/${height}`;

  imgEl.onerror = () => {
    const newId = id + totalCardAmount * 3;
    imgEl.id = newId;
    setSrc(imgEl, newId, width, height);
    addListeners(imgEl);
  }
}

function createImgEl(id) {
  const imgEl = new Image();
  imgEl.classList.add("card-img");
  imgEl.id = id;
  setSrc(imgEl, id, 1300, 1300);

  return imgEl;
}

function createCardItem() {
  const divEl = document.createElement("div");
  divEl.classList.add("card");

  return divEl;
}

function addListeners(imgEl) {
  const initialSrc = imgEl.src;

  imgEl.addEventListener('mouseenter', () => {
    const newId = +imgEl.id + 1;

    setSrc(imgEl, newId, 1300, 1300);
  })

  imgEl.addEventListener('mouseleave', () => {
    imgEl.src = initialSrc;
  })
}

for (let i = 1; i <= totalCardAmount * 3; i += 3) {
  const card = createCardItem();
  const staticImage = createImgEl(i);
  const dynamicImage = createImgEl(i + 1);

  addListeners(dynamicImage);

  card.appendChild(staticImage);
  card.appendChild(dynamicImage);

  root.appendChild(card);
}

for (let i = 3; i <= totalCardAmount * 3; i += 3) {
  preloadImage(i)
}

function preloadImage(id) {
  setSrc(new Image(), id, 1300, 1300);
}
