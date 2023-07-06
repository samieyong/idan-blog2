const slides = document.querySelector('.slides');

setInterval(() => {
   let firstChild = slides.firstElementChild;
   firstChild.classList.add('faded-out');
   setTimeout(() => {
      slides.removeChild(firstChild);
      slides.appendChild(firstChild);
      setTimeout(() => {
         firstChild.classList.remove('faded-out');
      }, 1000);
   }, 1000);
}, 7000);

