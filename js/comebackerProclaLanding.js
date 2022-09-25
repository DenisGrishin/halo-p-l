window.addEventListener('DOMContentLoaded', function () {
  // selectorForm - указать селектор или id формы на лендинге
  // srcPath - указать путь для изображения в модальном окне
  // heightImg - если картинка крива показывается поменять значения
  // параметры на самом дне прописывать

  (function (selectorForm, srcPath, heigthImg = '300') {
    comebacker(selectorForm, srcPath);

    function comebacker(formSelector) {
      if (!localStorage.getItem('activeUserPage')) {
        history.pushState({}, '', location.href);
      }

      window.addEventListener('popstate', function () {
        if (localStorage.getItem('activeUserPage')) {
          location.removeItem('showModulWindLed');
          return;
        }
        if (localStorage.getItem('showModulWindLed')) {
          this.location.href = link;
          return;
        }

        createModulWindow(srcPath, heigthImg);

        localStorage.setItem('showModulWindLed', true);
      });

      function createModulWindow(srcPath, heigthImg) {
        const styleModal = `
        .modul-bg {
          padding: 20px;
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          visibility: hidden;
        }
        
        .modul-bg.active { 
          z-index: 1000000;
          overflow: auto;
          display: flex;
          justify-content: center;
        visibility: visible;

      }
     
      .modul-wrapper{
        padding: 15px;
        width: 100%;
        max-width: 600px;
       
      }
     
      .modul {
        border-radius: 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: #fff;
        padding: 55px 25px 25px 25px ;
        flex-direction: column;
    
        transform: scale(0);
        transition: transform 0.4s ease-in 0s;
      }
      .modul.active { 
        transform: scale(1);
    }
      .module-btn-close {
        font-size: 20px;
        position: absolute;
        right: 20px;
        top: 20px;
        text-transform: uppercase;
        font-weight: 700;
      }
      .modul-title{
        line-height: 1.3;
        font-size: 22px;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 20px;
        color: #f91155;
      }
      .modul-img{
        width: ${heigthImg}px;
        
        max-width: 100%;
        margin-bottom: 20px;
      }
      body {
        overflow: hidden;
        touch-action: none;
        
      }
      body::before{
        content: "";
        transition: all 0.4s ease 0s;
        opacity:0;
        visibility: hidden;
      }
     
      body.bg-show-modal::before {
        content: "";
        visibility: visible;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 100000;
        left: 0;
        opacity:0.5;
        background-color: rgba(0, 0, 0, 1);
      }
     
      form{  
        color: #000;
        background-color: #fff !important;
        width:100% !important;
      }
      
      input{
        margin-top: 0.5rem !important;
        padding: 0.625rem !important;
        width: 100% !important;
        border: 2px solid #000 !important;
        outline: none !important;
        background-color: #fff !important;
      }
      `;

        const modulBg = document.createElement('div'),
          modulWrapper = document.createElement('div'),
          modul = document.createElement('div'),
          btnClose = document.createElement('button'),
          titleModul = document.createElement('h1'),
          imgBlockModul = document.createElement('div'),
          imgModul = document.createElement('img'),
          form = document.querySelector(formSelector).cloneNode(true),
          style = document.createElement('style');

        imgBlockModul.classList.add('modul-block-img');
        modulBg.classList.add('modul-bg');
        modulWrapper.classList.add('modul-wrapper');
        modul.classList.add('modul');
        btnClose.classList.add('module-btn-close');
        imgModul.classList.add('modul-img');
        titleModul.classList.add('modul-title');

        imgModul.setAttribute('src', srcPath);
        style.innerHTML = styleModal;
        titleModul.innerHTML =
          'Wait! We have a unique offer for you - 50% discount!';
        btnClose.innerHTML = 'close';

        modul.appendChild(imgBlockModul);
        document.body.appendChild(modulBg);
        modulBg.appendChild(modulWrapper);
        modulWrapper.appendChild(modul);
        modul.appendChild(btnClose);
        modul.appendChild(titleModul);
        modul.appendChild(imgModul);
        modul.appendChild(form);
        modulBg.appendChild(style);

        setTimeout(() => {
          showModal(modulBg, btnClose, modul);
        }, 1);
      }

      function showModal(modulBg, btnClose, modul) {
        if (modulBg) {
          let scroll = calcScroll();
          modulBg.classList.add('active');
          modul.classList.add('active');

          document.body.classList.add('bg-show-modal');
          document.body.style.paddingRight = `${scroll}px`;
          closeModal(modulBg, btnClose, modul);
        }
      }

      function closeModal(modulBg, btnClose, modul) {
        document.addEventListener('click', (e) => {
          if (e.target === modulBg || e.target === btnClose) {
            modul.classList.remove('active');

            localStorage.removeItem('showModulWindLed');
            setTimeout(() => {
              document.body.classList.remove('bg-show-modal');
              modulBg.classList.remove('active');
              modulBg.remove();
              document.body.style.paddingRight = `0px`;
            }, 300);
          }
        });

        window.addEventListener('unload', function () {
          document.body.classList.remove('bg-show-modal');
          modulBg.classList.remove('active');
          modulBg.remove();
          document.body.style.paddingRight = `0px`;
          localStorage.removeItem('showModulWindLed');
        });
      }

      function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
      }
    }
  })(
    '.form-order',
    'https://funart.pro/uploads/posts/2022-06/1654756218_58-funart-pro-p-samii-malenkii-yezhik-v-mire-zhivotnie-kra-63.jpg',
    '300',
    'https://denisgrishin.github.io/halo/'
  );
});
// ('https://denisgrishin.github.io/halo/');
