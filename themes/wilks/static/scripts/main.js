WebFontConfig = {
  google: {
    families: ['Quicksand:400,500,700,800&display=swap']
  },
  timeout: 2000
};
(function () {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

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
