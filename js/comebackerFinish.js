window.addEventListener('DOMContentLoaded', function () {
  (function () {
    window.addEventListener('load', () => {
      localStorage.removeItem('isShown');
      localStorage.setItem('active', true);
    });
  })();
});
