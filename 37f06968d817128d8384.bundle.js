(self.webpackChunkvk_filter_friends=self.webpackChunkvk_filter_friends||[]).push([[296],{766:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});const n='<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>VK-Filter-Friends</title> <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"><\/script> <script src="https://vk.com/js/api/openapi.js?169"><\/script> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=Roboto:wght@400;500&display=swap" rel="stylesheet"> </head> <body> <div class="container"> <div class="window"> <div class="choose-friends"> <h1 class="choose-friends__title">Выберите друзей</h1> </div> <div class="filter-container"> <form id="form"> <label for="friendSearch"></label> <input type="text" id="friendSearch" placeholder="Начните вводить имя друга" autocomplete="off"> <label for="bestFriendSearch"></label> <input type="text" id="bestFriendSearch" placeholder="Имя лучшего друга" autocomplete="off"> </form> <div class="friends-container waiting"> <div class="friends"> <h3 class="friends__title">Ваши друзья</h3> <ul id="allFriends" class="friends__list"> </ul> </div> <div class="best-friends"> <h3 class="friends__title">Лучшие друзья</h3> <ul id="allBestFriends" class="friends__list"> </ul> </div> </div> </div> <div class="bottom-block"></div> </div> </div> <script id="friendTemplate" type="text/x-handlebars-template"> {{#each items}}\r\n        <li class="friend" data-id="{{id}}">\r\n            <img src="{{photo_100}}" alt="avatar" class="friend__img">\r\n            <h4 class="friend__name">{{first_name}} {{last_name}}</h4>\r\n            <div class="arrow toBestFriend"></div>\r\n        </li>\r\n    {{/each}} <\/script> </body> </html> '},672:(e,t,s)=>{s(766),VK.init({apiId:7968262}),(async()=>{try{await new Promise(((e,t)=>{VK.Auth.login((s=>{s.session?e():t(new Error("Не удалось авторизоваться"))}),2)}));const t=await("friends.get",e={fields:"photo_100"},e.v="5.131",new Promise(((t,s)=>{VK.api("friends.get",e,(e=>{e.error?s(e.error):t(e.response)}))}))),s=document.querySelector("#friendTemplate").textContent,n=Handlebars.compile(s)(t),r=document.querySelector("#allFriends");document.querySelector(".friends-container").classList.remove("waiting"),r.innerHTML=n}catch(e){console.error(e.message)}var e})(),document.addEventListener("mousedown",(e=>{if("HTML"===e.target.tagName)return;const t=e.target.parentNode.classList.contains("friends__list"),s=e.target.parentNode.parentNode.classList.contains("friends__list");t&&(e.target.draggable=!0)||s&&(e.target.parentElement.draggable=!0)})),document.addEventListener("dragenter",(e=>{e.target.classList.contains("friends__list")&&e.target.classList.add("drop")})),document.addEventListener("dragleave",(e=>{e.target.classList.contains("drop")&&e.target.classList.remove("drop")})),document.addEventListener("dragstart",(e=>{e.target.classList.contains("friend")&&e.dataTransfer.setData("text/plain",e.target.dataset.id)}));let n="";document.addEventListener("dragover",(e=>{e.target.classList.contains("friend")&&e.preventDefault(),e.target.classList.contains("friends__list")&&e.preventDefault(),n=e.target})),document.addEventListener("drop",(e=>{const t=document.querySelector(`[data-id="${e.dataTransfer.getData("text/plain")}"]`);if(n!==t){if(n.parentElement.classList.contains("friends")?t.children[2].classList="arrow toBestFriend":t.children[2].classList="arrow toFriend",t.removeAttribute("draggable"),e.target.classList.contains("friend")){const s=n.getBoundingClientRect().y+n.getBoundingClientRect().height/2;if(e.clientY>s){if(null===n.nextElementSibling)return;n=n.nextElementSibling}n.parentElement.insertBefore(t,n),t.className=n.className}e.target.classList.contains("friends__list")&&(e.target.append(t),e.target.classList.contains("drop")&&e.target.classList.remove("drop"))}else n.removeAttribute("draggable")})),document.addEventListener("click",(e=>{const t=e.target.classList.contains("arrow"),s=e.target.classList.contains("toFriend"),n=e.target.classList.contains("toBestFriend");t&&(n?(e.target.classList="arrow toFriend",document.querySelector("#allBestFriends").appendChild(e.target.parentElement)):s&&(e.target.classList="arrow toBestFriend",document.querySelector("#allFriends").appendChild(e.target.parentElement)))}));const r=document.querySelector("#friendSearch"),a=document.querySelector("#bestFriendSearch");r.addEventListener("dragstart",(e=>{e.preventDefault()}));const i=document.querySelector("#allBestFriends"),d=document.querySelector("#allFriends");function l(e,t){if(e.length)for(const t of e){const e=t.children[1].innerText.toLowerCase();s(t,e)}function s(e,s){const n=t.value?t.value.toLowerCase():"";s.includes(n)?e.classList.contains("none")&&e.classList.remove("none"):e.classList.add("none")}}a.addEventListener("dragstart",(e=>{e.preventDefault()})),r.addEventListener("input",(()=>{l(d.children,r)})),a.addEventListener("input",(()=>{l(i.children,a)})),i.addEventListener("DOMNodeInserted",(()=>{l(i.children,a)})),d.addEventListener("DOMNodeInserted",(()=>{l(d.children,r)}))}},e=>{e(e.s=672)}]);