(() => {
  "use strict";
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let e = (t, e = 500, o = 0) => {
      t.classList.contains("_slide") ||
        (t.classList.add("_slide"),
        (t.style.transitionProperty = "height, margin, padding"),
        (t.style.transitionDuration = e + "ms"),
        (t.style.height = `${t.offsetHeight}px`),
        t.offsetHeight,
        (t.style.overflow = "hidden"),
        (t.style.height = o ? `${o}px` : "0px"),
        (t.style.paddingTop = 0),
        (t.style.paddingBottom = 0),
        (t.style.marginTop = 0),
        (t.style.marginBottom = 0),
        window.setTimeout(() => {
          (t.hidden = !o),
            !o && t.style.removeProperty("height"),
            t.style.removeProperty("padding-top"),
            t.style.removeProperty("padding-bottom"),
            t.style.removeProperty("margin-top"),
            t.style.removeProperty("margin-bottom"),
            !o && t.style.removeProperty("overflow"),
            t.style.removeProperty("transition-duration"),
            t.style.removeProperty("transition-property"),
            t.classList.remove("_slide");
        }, e));
    },
    o = (t, e = 500, o = 0) => {
      if (!t.classList.contains("_slide")) {
        t.classList.add("_slide"),
          (t.hidden = !t.hidden && null),
          o && t.style.removeProperty("height");
        let n = t.offsetHeight;
        (t.style.overflow = "hidden"),
          (t.style.height = o ? `${o}px` : "0px"),
          (t.style.paddingTop = 0),
          (t.style.paddingBottom = 0),
          (t.style.marginTop = 0),
          (t.style.marginBottom = 0),
          t.offsetHeight,
          (t.style.transitionProperty = "height, margin, padding"),
          (t.style.transitionDuration = e + "ms"),
          (t.style.height = n + "px"),
          t.style.removeProperty("padding-top"),
          t.style.removeProperty("padding-bottom"),
          t.style.removeProperty("margin-top"),
          t.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            t.style.removeProperty("height"),
              t.style.removeProperty("overflow"),
              t.style.removeProperty("transition-duration"),
              t.style.removeProperty("transition-property"),
              t.classList.remove("_slide");
          }, e);
      }
    },
    n = !0,
    s = (t = 500) => {
      document.documentElement.classList.contains("lock") ? i(t) : r(t);
    },
    i = (t = 500) => {
      let e = document.querySelector("body");
      if (n) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, t);
      }
    },
    r = (t = 500) => {
      let e = document.querySelector("body");
      if (n) {
        let o = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < o.length; t++) {
          o[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, t);
      }
    };
  function l(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function a(t, e) {
    const o = Array.from(t).filter(function (t, o, n) {
      if (t.dataset[e]) return t.dataset[e].split(",")[0];
    });
    if (o.length) {
      const t = [];
      o.forEach((o) => {
        const n = {},
          s = o.dataset[e].split(",");
        (n.value = s[0]),
          (n.type = s[1] ? s[1].trim() : "max"),
          (n.item = o),
          t.push(n);
      });
      let n = t.map(function (t) {
        return (
          "(" + t.type + "-width: " + t.value + "px)," + t.value + "," + t.type
        );
      });
      n = (function (t) {
        return t.filter(function (t, e, o) {
          return o.indexOf(t) === e;
        });
      })(n);
      const s = [];
      if (n.length)
        return (
          n.forEach((e) => {
            const o = e.split(","),
              n = o[1],
              i = o[2],
              r = window.matchMedia(o[0]),
              l = t.filter(function (t) {
                if (t.value === n && t.type === i) return !0;
              });
            s.push({ itemsArray: l, matchMedia: r });
          }),
          s
        );
    }
  }
  document.addEventListener("click", function (t) {
    t.target.classList.contains("header") &&
      (document.documentElement.classList.remove("menu-open"),
      i(),
      document.documentElement.classList.remove("menu-open"));
  });
  class c {
    constructor(t, e, o) {
      (this._deadline = t),
        (this._cbChange = e),
        (this._cbComplete = o),
        (this._timerId = null),
        (this._out = {
          minutes: "",
          seconds: "",
          minutesTitle: "",
          secondsTitle: "",
        }),
        this._start();
    }
    static declensionNum(t, e) {
      return e[
        t % 100 > 4 && t % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][t % 10 < 5 ? t % 10 : 5]
      ];
    }
    _start() {
      this._calc(), (this._timerId = setInterval(this._calc.bind(this), 1e3));
    }
    _calc() {
      const t = this._deadline - new Date(),
        e = t > 0 ? Math.floor(t / 1e3 / 60) % 60 : 0,
        o = t > 0 ? Math.floor(t / 1e3) % 60 : 0;
      (this._out.minutes = e < 10 ? "0" + e : e),
        (this._out.seconds = o < 10 ? "0" + o : o),
        (this._out.minutesTitle = c.declensionNum(e, [
          "минута",
          "минуты",
          "минут",
        ])),
        (this._out.secondsTitle = c.declensionNum(o, [
          "секунда",
          "секунды",
          "секунд",
        ])),
        this._cbChange && this._cbChange(this._out),
        t <= 0 &&
          (clearInterval(this._timerId),
          this._cbComplete && this._cbComplete());
    }
  }
  const d = () => {
      const t = document.querySelector(".timer .timer__minutes"),
        e = document.querySelector(".timer .timer__seconds"),
        o = new Date(Date.now() + 600999);
      t &&
        new c(
          o,
          (o) => {
            (t.textContent = o.minutes),
              (e.textContent = o.seconds),
              (t.dataset.title = o.minutesTitle),
              (e.dataset.title = o.secondsTitle);
          },
          () => {
            document.querySelector(".timer-1 .timer__result").textContent =
              "Таймер завершился!";
          }
        );
    },
    u = () => {
      let t = document.querySelectorAll("input[data-tel-input]"),
        e = function (t) {
          return t.value.replace(/\D/g, "");
        },
        o = function (t) {
          let o = t.target,
            n = e(o),
            s = t.clipboardData || window.clipboardData;
          if (s) {
            let t = s.getData("Text");
            if (/\D/g.test(t)) return void (o.value = n);
          }
        },
        n = function (t) {
          let o = t.target,
            n = e(o),
            s = o.selectionStart,
            i = "";
          if (!n) return (o.value = "");
          if (o.value.length == s) {
            if (["5", "8", "9"].indexOf(n[0]) > -1) {
              "9" == n[0] && (n = "5" + n);
              let t = (n[0], "+506");
              (i = o.value = t + " "),
                n.length > 1 && (i += "(" + n.substring(1, 4)),
                n.length >= 5 && (i += ") " + n.substring(4, 7)),
                n.length >= 8 && (i += "-" + n.substring(7, 9)),
                n.length >= 10 && (i += "-" + n.substring(9, 11));
            } else i = "+" + n.substring(0, 16);
            o.value = i;
          } else t.data && /\D/g.test(t.data) && (o.value = n);
        },
        s = function (t) {
          let e = t.target.value.replace(/\D/g, "");
          8 == t.keyCode && 1 == e.length && (t.target.value = "");
        };
      for (let e of t)
        e.addEventListener("keydown", s),
          e.addEventListener("input", n, !1),
          e.addEventListener("paste", o, !1);
    },
    m = () => {
      const t = document.querySelectorAll("form");
      if (t) {
        async function e(t, e) {
          let o = await fetch(`${t}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(e),
          });
          if (!o.ok)
            throw new Error(`Could not fetch ${t}, status:${o.status} `);
          return await o.json();
        }
        t.forEach((t) => {
          t.addEventListener("submit", function (o) {
            let n = new FormData(t),
              s = {};
            n.forEach((t, e) => {
              s[e] = t;
            }),
              console.log(s),
              e("http://localhost:3000/posts", s),
              localStorage.setItem("test", 3),
              console.log(localStorage.getItem("test"));
          });
        });
      }
    };
  let h = (t, e = !1, o = 500, n = 0) => {
      const s = document.querySelector(t);
      if (s) {
        let r = "",
          a = 0;
        e &&
          ((r = "header.header"), (a = document.querySelector(r).offsetHeight));
        let c = {
          speedAsDuration: !0,
          speed: o,
          header: r,
          offset: n,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (i(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(s, "", c);
        else {
          let t = s.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: a ? t - a : t, behavior: "smooth" });
        }
        l(`[gotoBlock]: Юхуу...едем к ${t}`);
      } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${t}`);
    },
    p = !1;
  setTimeout(() => {
    if (p) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !1),
    t.any() && document.documentElement.classList.add("touch"),
    (function () {
      let t = document.querySelector(".icon-menu"),
        e = document.querySelector(".header-burger__close");
      t &&
        t.addEventListener("click", function (t) {
          n && (s(), document.documentElement.classList.add("menu-open"));
        }),
        e &&
          e.addEventListener("click", function (t) {
            n && (s(), document.documentElement.classList.remove("menu-open"));
          });
    })(),
    (function () {
      const t = document.querySelectorAll("[data-spollers]");
      if (t.length > 0) {
        const n = Array.from(t).filter(function (t, e, o) {
          return !t.dataset.spollers.split(",")[0];
        });
        n.length && i(n);
        let s = a(t, "spollers");
        function i(t, e = !1) {
          t.forEach((t) => {
            (t = e ? t.item : t),
              e.matches || !e
                ? (t.classList.add("_spoller-init"),
                  r(t),
                  t.addEventListener("click", l))
                : (t.classList.remove("_spoller-init"),
                  r(t, !1),
                  t.removeEventListener("click", l));
          });
        }
        function r(t, e = !0) {
          const o = t.querySelectorAll("[data-spoller]");
          o.length > 0 &&
            o.forEach((t) => {
              e
                ? (t.removeAttribute("tabindex"),
                  t.classList.contains("_spoller-active") ||
                    (t.nextElementSibling.hidden = !0))
                : (t.setAttribute("tabindex", "-1"),
                  (t.nextElementSibling.hidden = !1));
            });
        }
        function l(t) {
          const n = t.target;
          if (n.closest("[data-spoller]")) {
            const s = n.closest("[data-spoller]"),
              i = s.closest("[data-spollers]"),
              r = !!i.hasAttribute("data-one-spoller");
            i.querySelectorAll("._slide").length ||
              (r && !s.classList.contains("_spoller-active") && c(i),
              s.classList.toggle("_spoller-active"),
              ((t, n = 500) => {
                t.hidden ? o(t, n) : e(t, n);
              })(s.nextElementSibling, 500)),
              t.preventDefault();
          }
        }
        function c(t) {
          const o = t.querySelector("[data-spoller]._spoller-active");
          o &&
            (o.classList.remove("_spoller-active"),
            e(o.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((t) => {
            t.matchMedia.addEventListener("change", function () {
              i(t.itemsArray, t.matchMedia);
            }),
              i(t.itemsArray, t.matchMedia);
          });
      }
    })(),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const o = e.closest("[data-goto]"),
              n = o.dataset.goto ? o.dataset.goto : "",
              s = !!o.hasAttribute("data-goto-header"),
              i = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            h(n, s, i), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            o = e.target;
          if ("navigator" === o.dataset.watch) {
            const t = o.id,
              n =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? n && n.classList.add("_navigator-active")
              : n && n.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })(),
    (function () {
      p = !0;
      const t = document.querySelector("header.header"),
        e = t.hasAttribute("data-scroll-show"),
        o = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
        n = t.dataset.scroll ? t.dataset.scroll : 1;
      let s,
        i = 0;
      document.addEventListener("windowScroll", function (r) {
        const l = window.scrollY;
        clearTimeout(s),
          l >= n
            ? (!t.classList.contains("_header-scroll") &&
                t.classList.add("_header-scroll"),
              e &&
                (l > i
                  ? t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")
                  : !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show"),
                (s = setTimeout(() => {
                  !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show");
                }, o))))
            : (t.classList.contains("_header-scroll") &&
                t.classList.remove("_header-scroll"),
              e &&
                t.classList.contains("_header-show") &&
                t.classList.remove("_header-show")),
          (i = l <= 0 ? 0 : l);
      });
    })(),
    (p = !0),
    (function () {
      const t = document.querySelectorAll("[data-sticky]");
      t.length &&
        t.forEach((t) => {
          let e = {
            top: t.dataset.stickyTop ? parseInt(t.dataset.stickyTop) : 0,
            bottom: t.dataset.stickyBottom
              ? parseInt(t.dataset.stickyBottom)
              : 0,
            header: t.hasAttribute("data-sticky-header")
              ? document.querySelector("header.header").offsetHeight
              : 0,
          };
          !(function (t, e) {
            const o = t.querySelector("[data-sticky-item]"),
              n = e.header + e.top,
              s = o.getBoundingClientRect().top + scrollY - n;
            document.addEventListener("windowScroll", function (i) {
              const r =
                t.offsetHeight +
                t.getBoundingClientRect().top +
                scrollY -
                (n + o.offsetHeight + e.bottom);
              let l = {
                position: "relative",
                bottom: "auto",
                top: "0px",
                left: "0px",
                width: "auto",
              };
              n + e.bottom + o.offsetHeight < window.innerHeight &&
                (scrollY >= s && scrollY <= r
                  ? ((l.position = "fixed"),
                    (l.bottom = "auto"),
                    (l.top = `${n}px`),
                    (l.left = `${o.getBoundingClientRect().left}px`),
                    (l.width = `${o.offsetWidth}px`))
                  : scrollY >= r &&
                    ((l.position = "absolute"),
                    (l.bottom = `${e.bottom}px`),
                    (l.top = "auto"),
                    (l.left = "0px"),
                    (l.width = `${o.offsetWidth}px`))),
                (function (t, e) {
                  t.style.cssText = `position:${e.position};bottom:${e.bottom};top:${e.top};left:${e.left};width:${e.width};`;
                })(o, l);
            });
          })(t, e);
        });
    })(),
    d(),
    u(),
    m();
})();
