
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35735/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var link = function link(slug) {
    var urlParams = new URLSearchParams(window.location.search);
    var sid = urlParams.get('sid') ? urlParams.get('sid') : "";
    var postfix = slug.indexOf('?') == -1 ? '?sid=' + sid : '&sid=' + sid;
    return slug + postfix;
  };
  var getSiteId = function getSiteId() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('sid') ? urlParams.get('sid') : "";
    return id;
  };
  var getCookie = function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  };
  var parseApiError = function parseApiError(data) {
    switch (data.code) {
      default:
        alert(data.reason);
        break;
    }
  };
  var initBreadcrumbs = function initBreadcrumbs(data) {
    var html = '<ol class="breadcrumb mt-2 mb-0">';

    var _iterator2 = _createForOfIteratorHelper(data),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var bc = _step2.value;

        if (typeof bc.link === 'undefined') {
          html += "<li class=\"breadcrumb-item\">".concat(bc.text, "</li>");
        } else {
          html += "<li class=\"breadcrumb-item\"><a href=\"".concat(bc.link, "\">").concat(bc.text, "</a></li>");
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    html += '</ol>';
    document.querySelector(".bc").innerHTML = html;
  };

  var initHeader = function initHeader(response) {
    if (response.header) localStorage.setItem('header', response.header);
    var child = document.createElement('div');
    child.innerHTML = localStorage.getItem('header');
    child = child.firstChild;
    document.body.appendChild(child);
    eval(document.querySelector("#k-script").innerHTML);
  };
  var showLoader = function showLoader() {
    var el = document.querySelector(".loader");
    if (el) el.style.display = 'block';
  };
  var hideLoader = function hideLoader() {
    var el = document.querySelector(".loader");
    if (el) el.style.display = 'none';
  };
  var initFooter = function initFooter(left, right) {
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };

  var HTMLContent = function HTMLContent(__) {
    return "\n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n                    <div class=\"card border-white shadow-sm p-sm-3\">\n                        <nav class=\"nav flex-column\">\n                            <a class=\"nav-link active fs-4\" aria-current=\"page\" href=\"".concat(link('/patient-list/'), "\">\n\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"  fill=\"currentColor\" class=\"bi bi-file-earmark-person mb-1 me-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M8.5 4.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L7 6l-.549.317a.5.5 0 1 0 .5.866l.549-.317V7.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L9 6l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V4.5zM5.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z\"/>\n                            <path d=\"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z\"/>\n                            </svg>\n                            \n                            Patient list</a>\n\n                            <hr>\n                                               \n                            <a class=\"nav-link fs-4\" href=\"").concat(link('/medication-list/'), "\">\n\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" fill=\"currentColor\" class=\"bi bi-bullseye mb-1 me-3\" viewBox=\"0 0 1000 1000\" ><path d=\"M313.469388 931.004082c-56.42449 0-113.371429-21.420408-156.212245-64.783674-41.795918-41.795918-64.261224-97.17551-64.261225-156.212245 0-59.036735 22.987755-114.416327 64.261225-156.212245l396.016326-396.016326c86.204082-86.204082 226.220408-86.204082 312.42449 0s86.204082 226.220408 0 312.42449l-396.016326 396.016326c-43.363265 43.363265-99.787755 64.783673-156.212245 64.783674zM708.963265 135.836735c-45.97551 0-91.95102 17.240816-126.432653 52.244898l-396.016326 396.016326c-33.436735 33.436735-52.244898 78.889796-52.244898 126.432653 0 48.065306 18.285714 92.995918 52.244898 126.432653 70.008163 70.008163 183.379592 70.008163 253.387755 0L835.918367 441.469388c70.008163-70.008163 70.008163-183.379592 0-253.387755-35.004082-35.004082-80.979592-52.244898-126.955102-52.244898zM171.885714 568.946939z\"></path><path d=\"M652.538776 683.363265L340.114286 370.938776l212.636734-212.636735c86.204082-86.204082 226.220408-86.204082 312.42449 0s86.204082 226.220408 0 312.42449l-212.636734 212.636734zM399.15102 370.938776l253.387756 253.387755 182.857142-182.857143c70.008163-70.008163 70.008163-183.379592 0-253.387755-70.008163-70.008163-183.379592-70.008163-253.387755 0l-182.857143 182.857143z\"></path><path d=\"M626.416327 299.885714c-5.22449 0-10.44898-2.089796-14.628572-6.269387l-79.934694-79.934694c-8.359184-8.359184-8.359184-21.420408 0-29.779592 8.359184-8.359184 21.420408-8.359184 29.779592 0l79.934694 79.934694c8.359184 8.359184 8.359184 21.420408 0 29.779592-4.702041 4.179592-9.926531 6.269388-15.15102 6.269387zM545.959184 380.342857c-5.22449 0-10.44898-2.089796-14.628572-6.269388L451.395918 294.138776c-8.359184-8.359184-8.359184-21.420408 0-29.779592 8.359184-8.359184 21.420408-8.359184 29.779592 0l79.934694 79.934694c8.359184 8.359184 8.359184 21.420408 0 29.779591-4.179592 4.179592-9.926531 6.269388-15.15102 6.269388z\"></path></svg>\n\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"d-none bi bi-bullseye mb-1 me-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n                            <path d=\"M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z\"/>\n                            <path d=\"M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z\"/>\n                            <path d=\"M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n                            </svg>\n                            \n                            Medications</a>\n\n                            <hr>\n                                                \n                            <a class=\"nav-link fs-4\" href=\"").concat(link('/settings/'), "\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-gear mb-1 me-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z\"></path>\n                            <path d=\"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z\"></path>\n                            </svg>Settings</a>\n\n                            <hr>\n                                                \n                            <a class=\"nav-link fs-4 disabled\" href=\"").concat(link('/analytics/'), "\" tabindex=\"-1\" aria-disabled=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-graph-up me-3\" viewBox=\"0 0 16 16\">\n                            <path fill-rule=\"evenodd\" d=\"M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z\"></path>\n                            </svg>Analytics</a>\n                        </nav>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
  };

  var _this = {
    state: {
      firstLoad: true,
      ajaxQueue: 0
    },
    init: function init() {
      _this.getData();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
          'Kenzap-Header': false,
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': getSiteId()
        },
        body: JSON.stringify({
          query: {
            locale: {
              type: 'locale',
              id: getCookie('lang')
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          initHeader(response);

          _this.loadHomeStructure();

          _this.renderPage(response);

          _this.initFooter();

          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    renderPage: function renderPage(product) {
      initBreadcrumbs([{
        link: link('//dashboard.kenzap.cloud'),
        text: __('Dashboard')
      }, {
        text: __('IC Portal')
      }]);
    },
    listeners: {
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    loadHomeStructure: function loadHomeStructure() {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    initFooter: function initFooter$1() {
      initFooter(__('Copyright © ' + new Date().getFullYear() + ' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('Kenzap Cloud Services - Dashboard'));
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
