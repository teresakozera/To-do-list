!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){},,,,,,function(e,t,n){n(7),n(8),n(9),e.exports=n(0)},function(e,t,n){"use strict";n.r(t);n(0);var a,r=0,d=function(){var e=new XMLHttpRequest;window.localStorage.getItem("token");e.open("GET","http://localhost:3000/api/lists/"),e.setRequestHeader("x-auth-token",window.localStorage.getItem("token")),e.send(),e.onload=function(){if(200!=e.status)console.log("Error ".concat(e.status,": ").concat(e.statusText));else{$(".list").remove(),a=JSON.parse(e.response),a.length>0;for(var t=function(e){var t=document.getElementsByClassName("lists")[0];if(t.children.length>8)return"break";var n=document.createElement("div");n.setAttribute("data-id","".concat(a[e]._id)),$(n).addClass("list"),$(n).addClass("list".concat(e));var d=document.createElement("INPUT");d.setAttribute("value","".concat(a[e].name));var c="";d.addEventListener("keydown",(function(e){"Backspace"!==e.key?c+=e.key:c=c.substring(0,c.length-1),d.setAttribute("value","".concat(c))}));var o=document.createElement("div");$(o).addClass("list-header"),o.appendChild(d),n.appendChild(o);var i=document.createElement("BUTTON");$(i).addClass("icon-plus-outline"),i.innerHTML="Add another item",$(i).addClass("plus-task");var l=document.createElement("BUTTON");l.id="saveBtn",l.innerHTML="Save list";var s=document.createElement("BUTTON");s.id="deleteBtn",s.innerHTML="Delete list";var u=document.createElement("div");$(u).addClass("list-items");var p=document.getElementById("addList");t.insertBefore(n,p);for(var m=function(t){var n=document.createElement("br"),d=document.createElement("div");d.id="list".concat(r,"todo-item").concat(t),$(d).addClass("item");var c=document.createElement("INPUT");c.id="checkbox".concat(t),c.setAttribute("type","checkbox"),!0===a[e].items[t].done?($(c).attr("checked","checked"),$(c).trigger("change")):($(c).removeAttr("checked"),$(c).trigger("change"));var o=document.createElement("INPUT");o.setAttribute("type","text"),o.id="text".concat(t),o.for="check-1",o.htmlFor="checkbox".concat(t),o.setAttribute("value","".concat(a[e].items[t].name));var i="";o.addEventListener("keydown",(function(e){"Backspace"!==e.key?i+=e.key:i=i.substring(0,i.length-1),o.setAttribute("value","".concat(i))}));var l=document.createElement("BUTTON");$(l).addClass("icon-trash-empty"),$(l).addClass("minus-task"),d.appendChild(n),d.appendChild(c),d.appendChild(o),d.appendChild(l),u.appendChild(d)},h=0;h<a[e].items.length;h++)m(h);n.appendChild(u),n.appendChild(i),n.appendChild(l),n.appendChild(s),r++},n=0;n<a.length;n++){if("break"===t(n))break}}}};window.onload=function(){d()};document.getElementById("plus-list").addEventListener("click",(function(e){if(event.currentTarget.parentNode.parentNode.children.length<8){var t=document.createElement("div");$(t).addClass("list"),$(t).addClass("list".concat(r));var n=document.createElement("INPUT"),a="";n.addEventListener("keydown",(function(e){"Backspace"!==e.key?a+=e.key:a=a.substring(0,a.length-1),n.setAttribute("value","".concat(a))}));var d=document.createElement("div");$(d).addClass("list-header"),d.appendChild(n),t.appendChild(d);var c=document.createElement("div");$(c).addClass("list-items");var o=document.createElement("BUTTON");$(o).addClass("icon-plus-outline"),o.innerHTML="Add another item",$(o).addClass("plus-task");var i=document.createElement("BUTTON");i.id="saveBtn",i.innerHTML="Save list";var l=document.createElement("BUTTON");l.id="deleteBtn",l.innerHTML="Delete list",t.appendChild(c),t.appendChild(o),t.appendChild(i),t.appendChild(l),event.currentTarget.parentNode.parentNode.insertBefore(t,event.currentTarget.parentNode),r++}else alert("Too many lists created. You can have up to six lists active!")}));$(document).on("click",".plus-task",(function(e){var t=document.createElement("br"),n=event.target.previousSibling.children.length;console.log(n);var a=document.createElement("div");a.id="".concat(n),$(a).addClass("item");var r=document.createElement("INPUT");r.id="checkbox".concat(n),r.setAttribute("type","checkbox");var d=document.createElement("INPUT");d.setAttribute("type","text"),d.id="text".concat(n),d.for="check-1",d.htmlFor="checkbox".concat(n);var c="";d.addEventListener("keydown",(function(e){"Backspace"!==e.key?c+=e.key:c=c.substring(0,c.length-1),d.setAttribute("value","".concat(c))}));var o=document.createElement("BUTTON");$(o).addClass("icon-trash-empty"),$(o).addClass("minus-task"),a.appendChild(t),a.appendChild(r),a.appendChild(d),a.appendChild(o),$(event.target).parents(".list").first().children(".list-items").first().append(a)})),$(document).on("click","#deleteBtn",(function(e){var t=e.currentTarget.parentNode;t.remove();var n=new XMLHttpRequest;n.open("DELETE","http://localhost:3000/api/lists/".concat(t.getAttribute("data-id"))),n.setRequestHeader("x-auth-token",window.localStorage.getItem("token")),n.setRequestHeader("Content-type","application/json; charset=utf-8"),n.send()})),$(document).on("click","#saveBtn",(function(e){for(var t=document.getElementsByClassName(e.currentTarget.parentNode.className.split(" ")[1])[0],n=t.children[0].children[0].attributes[0]?t.children[0].children[0].attributes[0].value:"",a=t.children[1].children.length,r=[],c=0;c<a;c++)r.push({name:t.children[1].children[c].children[2].attributes[2]?t.children[1].children[c].children[2].attributes[2].value:"",done:$(t.children[1].children[c].children[1]).is(":checked")});var o={};o.name=n,o.items=r;var i=new XMLHttpRequest;i.onload=function(){d()},t.getAttribute("data-id")?i.open("PUT","http://localhost:3000/api/lists/".concat(t.getAttribute("data-id"))):i.open("POST","http://localhost:3000/api/lists/"),i.setRequestHeader("x-auth-token",window.localStorage.getItem("token")),i.setRequestHeader("Content-type","application/json; charset=utf-8"),i.send(JSON.stringify(o))})),$(document).on("click",".minus-task",(function(e){alert("In order for changes to get saved please press button 'Save list'"),e.currentTarget.parentNode.remove()}))},function(e,t){document.getElementById("logout").addEventListener("click",(function(e){alert("You will be logged out!"),window.location.replace("./index.html");window.localStorage.removeItem("token")}))},function(e,t,n){}]);