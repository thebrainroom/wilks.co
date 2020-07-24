const animate = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('fadein');
    } else {
      entry.target.classList.remove('fadein');
    }
  });
});

animate.forEach(el => {
  observer.observe(el);
});
