import images from "./gallery-items.js";

// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.Превью результата посмотри по ссылке.

// Разбей задание на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2. Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе img, и указываться в href ссылки(это необходимо для доступности).

// < li class="gallery__item" >
//     <a
//         class="gallery__link"
//         href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//     >
//         <img
//             class="gallery__image"
//             src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//             data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//             alt="Tulips"
//         />
//     </a>
// </li >
//     Дополнительно
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCloseBtn = document.querySelector('[data-action="close-lightbox"]');

const galleryItems = createGalleryItems(images);
gallery.insertAdjacentHTML('beforeend', galleryItems);

gallery.addEventListener("click", (e) => {
  e.preventDefault();
  onModalOpen(e);
  copyGalleryAttributesToLightbox(e);
});
lightbox.addEventListener("click", onModalClose);


function createGalleryItems(galleryList) {
  return galleryList.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image"
          src="${preview}" 
          data-source="${original}" 
          alt="${description}"/>
      </a>
    </li >
    `
  }).join("");
};

function onModalOpen(event) {
  if (event.target.nodeName === "IMG") {
    lightbox.classList.add("is-open");
  }
  window.addEventListener("keydown", onModalCloseByEsc);
}

function copyGalleryAttributesToLightbox(event) {
  const imageSrc = event.target.getAttribute("data-source");
  const imageAlt = event.target.getAttribute("alt");
  lightboxImage.setAttribute("src", imageSrc);
  lightboxImage.setAttribute("alt", imageAlt);
}

function setLightboxAttributesByIndex(index) {
  const imageSrc = images[index].original;
  const imageAlt = images[index].description;
  lightboxImage.setAttribute("src", imageSrc);
  lightboxImage.setAttribute("alt", imageAlt);
}

function getCurrentImageIndexByOriginal() {
    return images.findIndex(elem => lightboxImage.src === elem.original);
}

function closeModal() {
  window.removeEventListener("keydown", onModalCloseByEsc);
  lightbox.classList.remove("is-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.removeAttribute("alt");
}


function onModalCloseByEsc(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

function onModalClose(event) {
  if (event.target === lightboxOverlay || event.target === lightboxCloseBtn) {
    closeModal();
  }
}

