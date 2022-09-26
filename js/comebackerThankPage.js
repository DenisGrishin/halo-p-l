window.addEventListener('DOMContentLoaded', function () {
  (function () {
    window.addEventListener('load', () => {
      if (!localStorage.getItem('activeUserPage')) {
        localStorage.setItem('activeUserPage', true);
      }
    });
  })();
});
