window.addEventListener('DOMContentLoaded', function () {
  // selectorForm - указать селектор или id формы на лендинге
  // srcPathImg - указать путь для изображения в модальном окне
  // heightImg - если картинка крива показывается поменять значения
  // linkLand - указать ссылку для переходу на лэд, если не надо оставляем пустую строчку ''
  // !!! параметры на самом дне прописывать

  (function (selectorForm, srcPathImg, linkLand, heigthImg = '300') {
    comebacker();
    console.log(linkLand);
    function comebacker() {
      if (!localStorage.getItem('activeUserPage')) {
        history.pushState({}, '', location.href);
      }

      window.addEventListener('popstate', function () {
        if (localStorage.getItem('activeUserPage')) {
          return;
        }
        if (localStorage.getItem('showModulWindLed')) {
          location.href = linkLand;
          return;
        }

        createModulWindow(srcPathImg, heigthImg);

        localStorage.setItem('showModulWindLed', 'true');
      });
      return;
    }
    // создаем окно
    function createModulWindow(srcPathImg, heigthImg) {
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
        cursor: pointer;
        background-color: inherit
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
      .modul-link-btn {
        font-size: 20px;
        width: 100%;
        color: #fff;
        padding: 20px 10px;
        background-color: #c00;
        box-shadow: 0 3px 5px #232323;
        border: 2px solid #c00;
        transform: translate(0px, 0px);
        text-transform: uppercase;
        background-image: -webkit-linear-gradient(45deg, #fff 50%, transparent 50%), 100%;
        background-image: linear-gradient(45deg, #fff 50%, transparent 50%);
        background-position: 100%;
        background-size: 400%;
        transition: all 0.4s ease-in-out 0s;
        }
        
        @media (any-hover: hover) {
        .modul-link-btn:hover {
          transform: translate(0px, 5px);
          background-position: 0;
          color: #c00;
        
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
        max-width: 350px;
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
        style = document.createElement('style');

      imgBlockModul.classList.add('modul-block-img');
      modulBg.classList.add('modul-bg');
      modulWrapper.classList.add('modul-wrapper');
      modul.classList.add('modul');
      btnClose.classList.add('module-btn-close');
      imgModul.classList.add('modul-img');
      titleModul.classList.add('modul-title');

      imgModul.setAttribute('src', srcPathImg);
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
      modulBg.appendChild(style);

      // проверить если форма,если нет рисуем кнопку
      if (document.querySelector(selectorForm)) {
        (form = document.querySelector(selectorForm).cloneNode(true)),
          modul.appendChild(form);
      } else {
        const linkBtn = document.createElement('a');
        console.log(linkLand);
        linkBtn.classList.add('modul-link-btn');
        linkBtn.setAttribute('href', linkLand);
        linkBtn.innerHTML = 'Go to view!';
        modul.appendChild(linkBtn);
      }

      setTimeout(() => {
        showModal(modulBg, btnClose, modul);
      }, 300);
    }
    //  показывает окно
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
    // закрывает окно
    function closeModal(modulBg, btnClose, modul) {
      document.addEventListener('click', (e) => {
        if (
          e.target === modulBg ||
          e.target === btnClose ||
          e.target === document.querySelector('.modul-link-btn')
        ) {
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
    // фикс скролла
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
  })(
    '.form-order',
    'https://funart.pro/uploads/posts/2022-06/1654756218_58-funart-pro-p-samii-malenkii-yezhik-v-mire-zhivotnie-kra-63.jpg',
    'https://denisgrishin.github.io/halo-p-l/home.html',
    '300'
  );
});
