(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n,r,o,a,c,i,u){var l=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__image"),d=l.querySelector(".card__delete-button"),f=l.querySelector(".card__like-button"),p=l.querySelector(".card__like-count");s.src=t.link,s.alt=t.name,l.querySelector(".card__title").textContent=t.name,p.textContent=t.likes.length,a._id!==t.owner._id&&(d.style.display="none");var y,m=function(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var e=r.next();return i=e.done,e},e:function(e){u=!0,c=e},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw c}}}}(t.likes);try{for(m.s();!(y=m.n()).done;)if(y.value._id===a._id){f.classList.add("card__like-button_is-active");break}}catch(e){m.e(e)}finally{m.f()}return f.addEventListener("click",(function(e){f.classList.contains("card__like-button_is-active")?u(t).then((function(e){p.textContent=e.likes.length})):i(t).then((function(e){p.textContent=e.likes.length})),r(e)})),d.addEventListener("click",(function(){c(t).then((function(){n(l)}))})),s.addEventListener("click",(function(){return o(t)})),l}function n(e){e.remove()}function r(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function i(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}var s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"a8ddae83-1e8e-4769-862e-c763902ef95e","Content-Type":"application/json"}},d=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},f=function(e){return fetch("".concat(s.baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:s.headers}).then(d)},p=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:s.headers}).then(d)},y=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:s.headers}).then(d)};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var h=document.querySelector(".places__list"),v=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),b=document.querySelectorAll(".popup"),S=document.querySelector(".profile__image"),q=document.querySelector(".popup_type_new-avatar"),g=document.querySelector(".profile__edit-button"),C=document.querySelector(".popup_type_edit"),E=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),A=L.querySelector(".popup__image"),w=document.querySelector("[name = edit-profile]"),x=w.querySelector("[name = name]"),U=w.querySelector("[name = description]"),j=w.querySelector(".popup__button"),T=document.querySelector("[name = new-place]"),O=T.querySelector("[name = place-name]"),B=T.querySelector("[name = link]"),I=T.querySelector(".popup__button"),P=document.querySelector("[name = new-avatar]"),D=P.querySelector("[name = link-avatar]"),M=P.querySelector(".popup__button"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function J(e){o(L),A.src=e.link,A.alt=e.name,L.querySelector(".popup__caption").textContent=e.name}function H(e,t){t.textContent=e?"Сохранить...":"Сохранить"}!function(e){e.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return a(e)})),e.addEventListener("mousedown",(function(t){t.target===e&&a(e)})),e.classList.add("popup_is-animated")}))}(b),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(N),Promise.all([fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(d),fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(d)]).then((function(e){var o,a,c=(a=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(o,a)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(o,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=c[0],u=c[1];!function(e,t,n,r){t.textContent=e.name,n.textContent=e.about,r.setAttribute("style","background-image: url(".concat(e.avatar,")"))}(i,v,_,S),function(e,o,a){o.forEach((function(o){e.append(t(o,n,r,J,a,f,p,y))}))}(h,u,i)})).catch((function(e){console.log(e)})),g.addEventListener("click",(function(){o(C),i(w,N),x.value=v.textContent,U.value=_.textContent})),E.addEventListener("click",(function(){o(k),i(T,N)})),S.addEventListener("click",(function(){o(q),i(P,N)})),w.addEventListener("submit",(function(e){e.preventDefault(),H(!0,j),function(e,t){return fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:e.value,about:t.value})}).then(d)}(x,U).then((function(e){v.textContent=e.name,_.textContent=e.about})).catch((function(e){console.log(e)})).finally((function(){return H(!1,j)})),a(C)})),T.addEventListener("submit",(function(e){return function(e,o){e.preventDefault(),H(!0,I),function(e,t){return fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:e.value,link:t.value})}).then(d)}(O,B).then((function(e){o.prepend(t(e,n,r,J,e.owner,f,p,y))})).catch((function(e){console.log(e)})).finally((function(){return H(!1,I)})),T.reset(),a(k)}(e,h)})),P.addEventListener("submit",(function(e){e.preventDefault(),H(!0,M),function(e){return fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:e.value})}).then(d)}(D).then((function(e){S.setAttribute("style","background-image: url(".concat(e.avatar,")"))})).catch((function(e){console.log(e)})).finally((function(){return H(!1,M)})),P.reset(),a(q)}))})();