//popover
window.openPopover = function(e) {
    var t = event.target.getBoundingClientRect(),
        o = e,
        e = document.getElementById(e),
        n = document.createElement("div");
    n.className = "backdrop backdrop-popover", e.parentNode.appendChild(n), n.addEventListener("click", function(e) { window.closePopover(o) }), e.addEventListener("click", function(e) { window.closePopover(o) });
    var i = document.body.offsetWidth - t.left,
        r = document.body.offsetWidth - i;
    if (i -= t.width, e.style += r > 250 ? ";top: 110%;right: " + i + "px;transform-origin: right top 0px;transform: scale(1);" : ";top: 110%;left: " + r + "px;transform-origin: right top 0px;transform: scale(1);", e.classList.add("show"), 2 === SO.code) {
        e.style.top = t.top + t.height + "px";
        var s = document.createElement("div");
        s.classList.add("popover-arrow"), e.parentNode.appendChild(s), s.setAttribute("style", "top:" + (t.top + t.height - 5) + "px;left:" + (t.left + t.width / 2 - 7) + "px")
    } else {
        var a = e.clientHeight,
            d = e.clientWidth;
        e.style.height = 0, e.style.width = 0, e.style.top = t.top + "px", setTimeout(function() {
            var t = e.getAttribute("style");
            t += " ;-webkit-transition: all 200ms ease;transition: all 200ms ease;", e.setAttribute("style", t), e.style.height = a + "px", e.style.width = d + "px"
        })
    }
}, window.closePopover = function(e) {
    var e = document.getElementById(e),
        t = 0;
    2 !== SO.code && (e.style.opacity = 0, t = 200), setTimeout(function() {
        var t = document.getElementsByClassName("popover-arrow");
        t.length && t[0].parentNode.removeChild(t[0]), e.classList.remove("show");
        var o = e.parentNode.getElementsByClassName("backdrop-popover");
        o && o.length && (o = o[0]) && o.parentNode && o.parentNode.removeChild(o)
    }, t)
};
//end popover

// tabs

window.openTab = function(t) {
    var button = event.target;
    var tabContent = document.getElementById(t).parentNode.getElementsByClassName('tab-content');
    var buttonActived = button.parentNode.getElementsByClassName('active');
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].setAttribute('class', tabContent[i].getAttribute('class').replace('active', ''));
    }
    for (var i = 0; i < buttonActived.length; i++) {
        buttonActived[i].setAttribute('class', buttonActived[i].getAttribute('class').replace('active', ''));
    }
    button.setAttribute('class', button.getAttribute('class') + ' active');
    document.getElementById(t).setAttribute('class', document.getElementById(t).getAttribute('class') + ' active');
}

//tabs end

//button
document.addEventListener('click', function(e) {
    if (SO.code !== 1) return false;
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
}, false);

//button

//input
(function bindInputEvent() {
    setTimeout(function() {
        var inputs = document.getElementsByTagName('input');
        for (i in inputs) {
            var parent = inputs[i].parentNode;
            if (parent && (parent.className.indexOf('left') >= 0 || parent.className.indexOf('right') >= 0) && parent.parentNode.className.indexOf('item') >= 0) {
                parent = parent.parentNode;
            }
            if (parent && parent.className.indexOf('item') >= 0 && parent.className.indexOf('bind-input-event-click') < 0) {
                parent.className += ' bind-input-event-click';
                parent.addEventListener('click', function() {
                    if (this.getElementsByTagName('input').length) {
                        this.getElementsByTagName('input')[0].focus();
                        if (this.getElementsByTagName('input')[0].type === 'radio' && !this.getElementsByTagName('input')[0].disabled) {
                            this.getElementsByTagName('input')[0].checked = true;
                        }
                    }
                }, false);
            }
        }
        var labelsFloat = document.getElementsByClassName('label-float');
        for (i in labelsFloat) {
            if (labelsFloat[i].className && labelsFloat[i].className.indexOf('bind-input-event-focus') < 0 && labelsFloat[i].querySelectorAll('input,textarea').length) {
                labelsFloat[i].className += ' bind-input-event-focus';
                labelsFloat[i].querySelectorAll('input,textarea')[0].addEventListener('focus', function() {
                    if (this.parentNode.getElementsByTagName('label').length && this.parentNode.getElementsByTagName('label')[0].className.indexOf('focus') < 0) {
                        this.parentNode.getElementsByTagName('label')[0].className += ' focus'
                    }
                }, false);
                labelsFloat[i].querySelectorAll('input,textarea')[0].addEventListener('blur', function() {
                    if (this.parentNode.getElementsByTagName('label').length && this.parentNode.getElementsByTagName('label')[0].className && !this.value.length) {
                        this.parentNode.getElementsByTagName('label')[0].className = this.parentNode.getElementsByTagName('label')[0].className.replace('focus', '');
                    }
                }, false);
                if (labelsFloat[i].querySelectorAll('input,textarea')[0].value && labelsFloat[i].querySelectorAll('input,textarea')[0].value.length) {
                    labelsFloat[i].querySelectorAll('input,textarea')[0].parentNode.getElementsByTagName('label')[0].className += ' focus'
                }
            }
        }

        bindInputEvent();
    }, 500);
})();


/*LOADING */
window.loading = function(message) {
    var configLoading = {};
    if (typeof message === "object") {
        configLoading = message;
    } else {
        configLoading.message = message;
    }
    if (!configLoading.id) {
        configLoading.id = 'LOADING' + new Date().getTime();
    }
    var body = document.getElementsByTagName('body')[0];
    if (event && event.target && event.target.parentNode && event.target.parentNode.className.indexOf('body') >= 0) {
        body = event.target.parentNode;
    }

    var e = document.createElement('div');
    e.className = 'backdrop show backdrop-alert';
    e.id = configLoading.id + '_BACKDROP';
    body.appendChild(e);

    var alertMobileUI = document.createElement('div');
    alertMobileUI.className = 'alert-mobileui alert-loading';
    alertMobileUI.id = configLoading.id;
    e.parentNode.appendChild(alertMobileUI);

    var alertContent = document.createElement('div');
    configLoading.class = 'white';
    alertContent.className = 'alert ' + configLoading.class;
    if (!window.SO || SO.code !== 2) {
        alertContent.innerHTML = '<svg class="loading-circle" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg>';
    } else {
        alertContent.innerHTML = '<div class="loading-circle"><svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 27 27"><path d="M18.696,10.5c-0.275-0.479-0.113-1.09,0.365-1.367l4.759-2.751c0.482-0.273,1.095-0.11,1.37,0.368 c0.276,0.479,0.115,1.092-0.364,1.364l-4.764,2.751C19.583,11.141,18.973,10.977,18.696,10.5z"/><path d="M16.133,6.938l2.75-4.765c0.276-0.478,0.889-0.643,1.367-0.366c0.479,0.276,0.641,0.886,0.365,1.366l-2.748,4.762 C17.591,8.415,16.979,8.58,16.5,8.303C16.021,8.027,15.856,7.414,16.133,6.938z"/><path d="M13.499,7.5c-0.552,0-1-0.448-1-1.001V1c0-0.554,0.448-1,1-1c0.554,0,1.003,0.447,1.003,1v5.499 C14.5,7.053,14.053,7.5,13.499,7.5z"/><path d="M8.303,10.5c-0.277,0.477-0.888,0.641-1.365,0.365L2.175,8.114C1.697,7.842,1.532,7.229,1.808,6.75 c0.277-0.479,0.89-0.642,1.367-0.368l4.762,2.751C8.416,9.41,8.58,10.021,8.303,10.5z"/><path d="M9.133,7.937l-2.75-4.763c-0.276-0.48-0.111-1.09,0.365-1.366c0.479-0.277,1.09-0.114,1.367,0.366l2.75,4.765 c0.274,0.476,0.112,1.088-0.367,1.364C10.021,8.581,9.409,8.415,9.133,7.937z"/><path d="M6.499,14.5H1c-0.554,0-1-0.448-1-1c0-0.554,0.447-1.001,1-1.001h5.499c0.552,0,1.001,0.448,1.001,1.001 C7.5,14.052,7.052,14.5,6.499,14.5z"/><path d="M8.303,16.502c0.277,0.478,0.113,1.088-0.365,1.366l-4.762,2.749c-0.478,0.273-1.091,0.112-1.368-0.366 c-0.276-0.479-0.111-1.089,0.367-1.368l4.762-2.748C7.415,15.856,8.026,16.021,8.303,16.502z"/><path d="M10.866,20.062l-2.75,4.767c-0.277,0.475-0.89,0.639-1.367,0.362c-0.477-0.277-0.642-0.886-0.365-1.365l2.75-4.764 c0.277-0.477,0.888-0.638,1.366-0.365C10.978,18.974,11.141,19.585,10.866,20.062z"/><path d="M13.499,19.502c0.554,0,1.003,0.448,1.003,1.002v5.498c0,0.55-0.448,0.999-1.003,0.999c-0.552,0-1-0.447-1-0.999v-5.498 C12.499,19.95,12.946,19.502,13.499,19.502z"/><path d="M17.867,19.062l2.748,4.764c0.275,0.479,0.113,1.088-0.365,1.365c-0.479,0.276-1.091,0.112-1.367-0.362l-2.75-4.767 c-0.276-0.477-0.111-1.088,0.367-1.365C16.979,18.424,17.591,18.585,17.867,19.062z"/><path d="M18.696,16.502c0.276-0.48,0.887-0.646,1.365-0.367l4.765,2.748c0.479,0.279,0.64,0.889,0.364,1.368 c-0.275,0.479-0.888,0.64-1.37,0.366l-4.759-2.749C18.583,17.59,18.421,16.979,18.696,16.502z"/><path d="M25.998,12.499h-5.501c-0.552,0-1.001,0.448-1.001,1.001c0,0.552,0.447,1,1.001,1h5.501c0.554,0,1.002-0.448,1.002-1 C27,12.946,26.552,12.499,25.998,12.499z"/></svg></div>';
    }
    if (configLoading.message) {
        alertContent.innerHTML += '<p>' + configLoading.message + '</p>';
    }
    alertMobileUI.appendChild(alertContent);
}

window.loadingElement = function(e, message, position, color) {
    if (typeof(e) != "object") {
        e = document.getElementById(e);
    }
    var withMessage = message ? 'with-message' : '';
    if (!color) {
        color = 'white-loading';
    } else {
        color = '';
    }
    if (!position) {
        position = '';
    }
    var divLoading = document.createElement('div');
    var spinner = '';
    if (!window.SO || SO.code !== 2) {
        spinner = '<svg class="loading-circle loading-element ' + color + ' ' + withMessage + ' ' + position + '" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg>';
    } else {
        spinner = '<svg class="loading-circle loading-element ' + color + ' ' + withMessage + ' ' + position + '" xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 27 27"><path d="M18.696,10.5c-0.275-0.479-0.113-1.09,0.365-1.367l4.759-2.751c0.482-0.273,1.095-0.11,1.37,0.368 c0.276,0.479,0.115,1.092-0.364,1.364l-4.764,2.751C19.583,11.141,18.973,10.977,18.696,10.5z"/><path d="M16.133,6.938l2.75-4.765c0.276-0.478,0.889-0.643,1.367-0.366c0.479,0.276,0.641,0.886,0.365,1.366l-2.748,4.762 C17.591,8.415,16.979,8.58,16.5,8.303C16.021,8.027,15.856,7.414,16.133,6.938z"/><path d="M13.499,7.5c-0.552,0-1-0.448-1-1.001V1c0-0.554,0.448-1,1-1c0.554,0,1.003,0.447,1.003,1v5.499 C14.5,7.053,14.053,7.5,13.499,7.5z"/><path d="M8.303,10.5c-0.277,0.477-0.888,0.641-1.365,0.365L2.175,8.114C1.697,7.842,1.532,7.229,1.808,6.75 c0.277-0.479,0.89-0.642,1.367-0.368l4.762,2.751C8.416,9.41,8.58,10.021,8.303,10.5z"/><path d="M9.133,7.937l-2.75-4.763c-0.276-0.48-0.111-1.09,0.365-1.366c0.479-0.277,1.09-0.114,1.367,0.366l2.75,4.765 c0.274,0.476,0.112,1.088-0.367,1.364C10.021,8.581,9.409,8.415,9.133,7.937z"/><path d="M6.499,14.5H1c-0.554,0-1-0.448-1-1c0-0.554,0.447-1.001,1-1.001h5.499c0.552,0,1.001,0.448,1.001,1.001 C7.5,14.052,7.052,14.5,6.499,14.5z"/><path d="M8.303,16.502c0.277,0.478,0.113,1.088-0.365,1.366l-4.762,2.749c-0.478,0.273-1.091,0.112-1.368-0.366 c-0.276-0.479-0.111-1.089,0.367-1.368l4.762-2.748C7.415,15.856,8.026,16.021,8.303,16.502z"/><path d="M10.866,20.062l-2.75,4.767c-0.277,0.475-0.89,0.639-1.367,0.362c-0.477-0.277-0.642-0.886-0.365-1.365l2.75-4.764 c0.277-0.477,0.888-0.638,1.366-0.365C10.978,18.974,11.141,19.585,10.866,20.062z"/><path d="M13.499,19.502c0.554,0,1.003,0.448,1.003,1.002v5.498c0,0.55-0.448,0.999-1.003,0.999c-0.552,0-1-0.447-1-0.999v-5.498 C12.499,19.95,12.946,19.502,13.499,19.502z"/><path d="M17.867,19.062l2.748,4.764c0.275,0.479,0.113,1.088-0.365,1.365c-0.479,0.276-1.091,0.112-1.367-0.362l-2.75-4.767 c-0.276-0.477-0.111-1.088,0.367-1.365C16.979,18.424,17.591,18.585,17.867,19.062z"/><path d="M18.696,16.502c0.276-0.48,0.887-0.646,1.365-0.367l4.765,2.748c0.479,0.279,0.64,0.889,0.364,1.368 c-0.275,0.479-0.888,0.64-1.37,0.366l-4.759-2.749C18.583,17.59,18.421,16.979,18.696,16.502z"/><path d="M25.998,12.499h-5.501c-0.552,0-1.001,0.448-1.001,1.001c0,0.552,0.447,1,1.001,1h5.501c0.554,0,1.002-0.448,1.002-1 C27,12.946,26.552,12.499,25.998,12.499z"/></svg>';
    }
    e.oldValue = e.innerHTML;
    e.innerHTML = spinner;
    e.disabled = true;
    if (message) {
        e.innerHTML += message;
    }
}

window.closeLoading = function(e) {
        if (e) {
            if (typeof(e) != "object") {
                e = document.getElementById(e);
            }
            e.innerHTML = e.oldValue;
            e.disabled = false;
        } else {
            var alert = document.getElementsByClassName('alert-mobileui')[0];
            var alertId = alert.id;
            var alert = document.getElementById(alertId);
            alert.parentNode.removeChild(alert);
            var backdrop = document.getElementById(alertId + '_BACKDROP');
            backdrop.parentNode.removeChild(backdrop);
        }
    }
    /* ALERT  */
window.alert = function(e, t) {
    var n = {};
    "object" == typeof e ? n = e : (n.message = e, n.title = t), n.id || (n.id = "ALERT" + (new Date).getTime()), n.buttons && n.buttons.length || (n.buttons = [{ label: "OK", onclick: function() { closeAlert() } }]);
    var a = document.getElementsByTagName("body")[0];
    event && event.target && event.target.parentNode && event.target.parentNode.className.indexOf("body") >= 0 && (a = event.target.parentNode);
    var d = document.createElement("div");
    d.className = "backdrop show backdrop-alert", d.id = n.id + "_BACKDROP", a.appendChild(d);
    var o = document.createElement("div");
    o.className = "alert-mobileui", o.id = n.id, d.parentNode.appendChild(o);
    var l = document.createElement("div");
    if (n.class || (n.class = "white"), l.className = "alert " + n.class, n.width && (l.style.maxWidth = n.width), o.appendChild(l), n.title) {
        var r = "<h1>" + n.title + "</h1>";
        l.insertAdjacentHTML("beforeend", r)
    }
    if (n.message) {
        var s = "<p>" + n.message + "</p>";
        l.insertAdjacentHTML("beforeend", s)
    }
    n.template && l.insertAdjacentHTML("beforeend", document.getElementById(n.template).innerHTML);
    var c = document.createElement("div");
    c.className = "buttons", l.appendChild(c);
    for (var i in n.buttons) {
        var m = document.createElement("button");
        n.buttons[i].class || (n.buttons[i].class = "text-teal"), m.className = n.buttons[i].class;
        var p = document.createTextNode(n.buttons[i].label);
        m.appendChild(p), n.buttons[i].onclick || (n.buttons[i].onclick = closeAlert), m.addEventListener("click", n.buttons[i].onclick), c.appendChild(m)
    }
}, window.closeAlert = function() {
    var e = event.target.parentNode.parentNode.parentNode.id,
        t = document.getElementById(e);
    t.parentNode.removeChild(t);
    var n = document.getElementById(e + "_BACKDROP");
    n.parentNode.removeChild(n)
};
//end alert
//======================menu
window.openMenu = function(m) {
    var name = m;
    var m = document.getElementById(m);
    if (m.className.indexOf('menu') >= 0 && m.className.indexOf('open') < 0) {
        var e = document.createElement('div');
        e.className = 'backdrop backdrop-menu';
        m.parentNode.appendChild(e);
        setTimeout(function() {
            e.className += ' show';
        });
        e.addEventListener('click', function(evt) {
            window.closeMenu(name);
        }, false);
        if (SO.code === 2) {
            m.style.height = window.innerHeight + 'px';
            var classSideMenu = ' side-menu';
            if (m.className.indexOf('menu-right') >= 0) {
                classSideMenu = ' side-menu-right';
                var headers = document.getElementsByClassName('header');
                if (headers.length) {
                    for (i in headers) {
                        if (headers[i].className && headers[i].className.indexOf('side-menu-right') < 0) {
                            headers[i].className += ' side-menu-right';
                        }
                    }
                }
            }
            if (m.parentNode.className.indexOf('body') >= 0) {
                m.parentNode.className += classSideMenu;
            } else {
                document.getElementsByTagName('body')[0].className += classSideMenu;
            }
        }
        m.className += ' open';
        var customEvent = new CustomEvent("openMenu", { "detail": { menu: name } });
        document.dispatchEvent(customEvent);
        document.addEventListener('firedCloseMenu', function(e) {
            window.closeMenu(name);
        }, false);
    }
}
window.closeMenu = function(m) {
        var name = m;
        m = document.getElementById(m);
        if (m.className.indexOf('open') < 0) {
            return false;
        }
        var customEvent = new CustomEvent("closeMenu", { "detail": { menu: name } });
        document.dispatchEvent(customEvent);
        m.className = m.className.replace('open', '');
        var headers = document.getElementsByClassName('header');
        if (headers.length) {
            for (i in headers) {
                if (headers[i].className && headers[i].className.indexOf('side-menu-right') >= 0) {
                    headers[i].className = headers[i].className.replace(' side-menu-right', '');
                }
            }
        }
        var e = m.parentNode.getElementsByClassName('backdrop-menu')
        if (e && e.length) {
            e = e[0];
            e.className = e.className.replace('show', '');
            setTimeout(function() {
                if (e && e.parentNode) {
                    e.parentNode.removeChild(e);
                }
            }, 500)
        }
        if (SO.code !== 1) {
            if (m.parentNode.className.indexOf('body') >= 0) {
                m.parentNode.className = m.parentNode.className.replace('side-menu', '');
            } else {
                document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace('side-menu', '');
            }
        }
    }
    //end menu