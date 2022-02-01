
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35731/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
  var getPageNumber = function getPageNumber() {
    var url = window.location.href.split('/');
    var page = url[url.length - 1];
    var pageN = 1;

    if (page.indexOf('page') == 0) {
      pageN = page.replace('page', '').replace('#', '');
    }

    return parseInt(pageN);
  };
  var getPagination = function getPagination(meta, cb) {
    if (typeof meta === 'undefined') {
      document.querySelector("#listing_info").innerHTML = 'no records to display';
      return;
    }

    var offset = meta.limit + meta.offset;
    if (offset > meta.total_records) offset = meta.total_records;
    document.querySelector("#listing_info").innerHTML = "Showing " + (1 + meta.offset) + " to " + offset + " of " + meta.total_records + " entries";
    var pbc = Math.ceil(meta.total_records / meta.limit);
    document.querySelector("#listing_paginate").style.display = pbc < 2 ? "none" : "block";
    var page = getPageNumber();
    var html = '<ul class="pagination d-flex justify-content-end pagination-flat">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    var i = 0;

    while (i < pbc) {
      i++;

      if (i >= page - 3 && i <= page || i <= page + 3 && i >= page) {
        html += '<li class="paginate_button page-item ' + (page == i ? 'active' : '') + '"><a href="#" aria-controls="order-listing" data-type="page" data-page="' + i + '" tabindex="0" class="page-link">' + (page == i ? '..' : i) + '</a></li>';
      }
    }

    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>';
    document.querySelector("#listing_paginate").innerHTML = html;
    var page_link = document.querySelectorAll(".page-link");

    var _iterator = _createForOfIteratorHelper(page_link),
        _step;

    try {
      var _loop = function _loop() {
        var l = _step.value;
        l.addEventListener('click', function (e) {
          var p = parseInt(getPageNumber());
          var ps = p;

          switch (l.dataset.type) {
            case 'prev':
              p -= 1;
              if (p < 1) p = 1;
              break;

            case 'page':
              p = l.dataset.page;
              break;

            case 'next':
              p += 1;
              if (p > pbc) p = pbc;
              break;
          }

          if (window.history.replaceState) {
            var url = window.location.href.split('/page');
            var urlF = (url[0] + '/page' + p).replace('//page', '/page');
            window.history.replaceState("kenzap-cloud", document.title, urlF);
          }

          if (ps != p) cb();
          e.preventDefault();
          return false;
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var formatTime = function formatTime(timestamp) {
    var a = new Date(timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    a.getHours();
    a.getMinutes();
    a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
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
  var onClick = function onClick(sel, fn) {
    if (document.querySelector(sel)) {
      var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll(sel)),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var e = _step3.value;
          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  var onKeyUp = function onKeyUp(sel, fn) {
    if (document.querySelector(sel)) {
      var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll(sel)),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var e = _step4.value;
          e.removeEventListener('keyup', fn, true);
          e.addEventListener('keyup', fn, true);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
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

  var patientListContent = function patientListContent(__) {
    return "\n    <div class=\"container\">\n\n        <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary btn-add\" type=\"button\">".concat(__('Add patient'), "</button>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n                <div class=\"card border-white shadow-sm\">\n                    <div class=\"card-body\">\n                        <div class=\"no-footer\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <div class=\"table-responsive\">\n                                        <table\n                                            class=\"table table-hover table-borderless align-middle table-striped table-p-list\"\n                                            style=\"min-width: 800px;\">\n                                            <thead>\n\n                                            </thead>\n                                            <tbody>\n\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"row\">\n                                <div class=\"col-sm-12 col-md-5\">\n                                    <div class=\"dataTables_info mt-3 text-secondary fw-lighter\" id=\"listing_info\"\n                                        role=\"status\" aria-live=\"polite\">&nbsp;</div>\n                                </div>\n                                <div class=\"col-sm-12 col-md-7\">\n                                    <div class=\"dataTables_paginate paging_simple_numbers mt-3\" id=\"listing_paginate\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"modal\" tabindex=\"-1\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\"></h5>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                </div>\n                <div class=\"modal-body\">\n\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                    <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n        <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n            aria-atomic=\"true\" data-bs-delay=\"3000\">\n            <div class=\"d-flex\">\n                <div class=\"toast-body\"></div>\n                <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"\n                    aria-label=\"Close\"></button>\n            </div>\n        </div>\n    </div>\n    \n    ");
  };

  var i18n = {
    state: {
      locale: null
    },
    init: function init(locale) {
      i18n.state.locale = locale;
    },
    __: function __(text) {
      if (i18n.state.locale.values[text] === undefined) return text;
      return i18n.state.locale.values[text];
    }
  };

  var __ = i18n.__;
  var CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';
  var _this = {
    state: {
      firstLoad: true,
      limit: 10
    },
    init: function init() {
      _this.getData();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
      var s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';
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
            user: {
              type: 'authenticate',
              fields: ['avatar'],
              token: getCookie('kenzap_token')
            },
            locale: {
              type: 'locale',
              id: getCookie('lang')
            },
            patients: {
              type: 'find',
              key: 'ic-patient',
              fields: ['_id', 'id', 'img', 'status', 'price', 'name', 'updated'],
              limit: _this.state.limit,
              offset: s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,
              search: {
                field: 'name',
                s: s
              },
              sortby: {
                field: 'created',
                order: 'DESC'
              }
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          i18n.init(response.locale);
          initHeader(response);

          _this.loadPageStructure();

          _this.renderPage(response);

          _this.initListeners();

          _this.initPagination(response);

          _this.initFooter();

          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    authUser: function authUser(response) {
      if (response.user) {
        if (response.user.success == true) ;
      }
    },
    loadPageStructure: function loadPageStructure() {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = patientListContent(__);
    },
    renderPage: function renderPage(response) {
      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __('Dashboard')
        }, {
          link: link('/'),
          text: __('IC Patients')
        }, {
          text: __('Patient list')
        }]);
        document.querySelector(".table thead").innerHTML = "\n                <tr>\n                    <th>\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"#212529\" class=\"bi justify-content-end bi-search mb-1\" viewBox=\"0 0 16 16\" >\n                            <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"></path>\n                        </svg>\n                    </th>\n                    <th>\n                        <div class=\"search-cont input-group input-group-sm mb-0 justify-content-start\">     \n                            <input type=\"text\" placeholder=\"".concat(__('Search patients'), "\" class=\"form-control border-top-0 border-start-0 border-end-0 rounded-0\" aria-label=\"").concat(__('Search patients'), "\" aria-describedby=\"inputGroup-sizing-sm\" style=\"max-width: 200px;\">\n                        </div>\n                        <span>").concat(__("Name"), "</span>\n                    </th>\n                    <th>").concat(__("Latest anomalies"), "</th>\n                    <th>").concat(__("Last update"), "</th>\n                    <th></th>\n                </tr>");
      }

      if (response.patients.length == 0) {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"6\">".concat(__("No patients to display."), "</td></tr>");
        return;
      }

      var sid = getSiteId();
      var list = '';

      for (var i in response.patients) {
        var img = 'https://account.kenzap.com/images/default_avatar.jpg';
        if (typeof response.patients[i].img === 'undefined') response.patients[i].img = [];
        if (response.patients[i].img[0]) img = CDN + '/S' + sid + '/patient-' + response.patients[i]._id + '-1-100x100.jpeg?' + response.patients[i].updated;
        list += "\n                <tr>\n                    <td>\n                        <div class=\"timgc\">\n                            <a href=\"".concat(link('/patient-view/?id=' + response.patients[i]._id), "\"><img src=\"").concat(img, "\" data-srcset=\"").concat(img, "\" class=\"img-fluid rounded-circle\" alt=\"").concat(__("Patient placeholder"), "\" srcset=\"").concat(img, "\" ></a>\n                        </div>\n                    </td>\n                    <td class=\"destt\" style=\"max-width:250px;min-width:250px;\">\n                        <div class=\"mb-3 mt-3\"> \n                            <a class=\"text-body\" href=\"").concat(link('/patient-view/?id=' + response.patients[i]._id), "\" >").concat(response.patients[i].name, "<i style=\"color:#9b9b9b;font-size:15px;margin-left:8px;\" title=\"").concat(__("View patient"), "\" class=\"mdi mdi-pencil menu-icon edit-page\"></i></a>\n                        </div>\n                    </td>\n                    <td>\n                        <span>").concat(_this.formatAnomalies(response.patients[i]), "</span>\n                    </td>\n\n                    <td>\n                        <span>").concat(formatTime(response.patients[i].updated), "</span>\n                    </td>\n                    <td> \n                        <a href=\"#\" data-id=\"").concat(response.patients[i]._id, "\" class=\"remove-patient text-danger \">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\">\n                                <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n                                <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n                            </svg>\n                        </a>\n                        <i title=\"").concat(__("Remove this patient"), "\" data-key=\"").concat(response.patients[i].id, "\" class=\"mdi mdi-trash-can-outline list-icon remove-patient\"></i>\n                    </td>\n                </tr>");
      }

      document.querySelector(".table tbody").innerHTML = list;
    },
    initListeners: function initListeners() {
      onClick('.remove-patient', _this.listeners.removePatient);
      onClick('.table-p-list .bi-search', _this.listeners.searchPatientsActivate);
      if (!_this.state.firstLoad) return;
      onClick('.btn-add', _this.addPatient);
      onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    },
    listeners: {
      removePatient: function removePatient(e) {
        e.preventDefault();
        var c = confirm(__('Completely remove this patient?'));
        if (!c) return;
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
            'Kenzap-Token': getCookie('kenzap_token'),
            'Kenzap-Sid': getSiteId()
          },
          body: JSON.stringify({
            query: {
              patient: {
                type: 'delete',
                key: 'ic-patient',
                id: e.currentTarget.dataset.id
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.getData();
          } else {
            parseApiError(response);
          }

          console.log('Success:', response);
        })["catch"](function (error) {
          console.error('Error:', error);
        });
      },
      searchPatientsActivate: function searchPatientsActivate(e) {
        e.preventDefault();
        document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();
        onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchPatients);
      },
      searchPatients: function searchPatients(e) {
        e.preventDefault();

        _this.getData();
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        console.log('calling modalSuccessBtnFunc');

        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    formatAnomalies: function formatAnomalies(list) {
      if (list._id == '3d7dc7a902a87a9968d545f74044e1b9c26bcbc5') {
        return '<a target="_blank" href="#"><div class="badge bg-danger text-light fw-light me-1">hypertension</div><div class="badge bg-danger text-light fw-light me-1">hypertension-stage-2</div></a>';
      } else {
        return '-';
      }
    },
    addPatient: function addPatient(e) {
      var modal = document.querySelector(".modal");
      var modalCont = new bootstrap.Modal(modal);
      modal.querySelector(".modal-title").innerHTML = __('Add Patient');
      modal.querySelector(".btn-primary").innerHTML = __('Add');
      modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
      var name = '',
          bio = '',
          note = '';
      var modalHTml = "        <div class=\"form-cont\">            <div class=\"form-group mb-3\">                <label for=\"p-name\" class=\"form-label\">".concat(__('Full Name'), "</label>                <input type=\"text\" class=\"form-control\" id=\"p-name\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(name, "\">            </div>            <div class=\"form-group mb-3\">                <label for=\"p-bio\" class=\"form-label\">").concat(__('Short Bio'), "</label>                <input type=\"text\" class=\"form-control\" id=\"p-bio\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(bio, "\">            </div>            <div class=\"form-group mb-3\">                <label for=\"p-note\" class=\"form-label\">").concat(__('Note'), "</label>                <input type=\"text\" class=\"form-control\" id=\"p-note\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(note, "\">            </div>        </div>");
      modal.querySelector(".modal-body").innerHTML = modalHTml;

      _this.listeners.modalSuccessBtnFunc = function (e) {
        e.preventDefault();
        var data = {};
        data.name = modal.querySelector("#p-name").value;
        data.bio = modal.querySelector("#p-bio").value;
        data.note = modal.querySelector("#p-note").value;
        data.status = "0";
        data.img = [];
        data.cats = [];

        if (data.name.length < 2) {
          alert(__('Please provide patient\'s full name'));
          return;
        }

        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
            'Kenzap-Token': getCookie('kenzap_token'),
            'Kenzap-Sid': getSiteId()
          },
          body: JSON.stringify({
            query: {
              patient: {
                type: 'create',
                key: 'ic-patient',
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            window.location.href = link("/patient-view/?id=".concat(response.patient.id));
          } else {
            parseApiError(response);
          }

          console.log('Success:', response);
        })["catch"](function (error) {
          console.error('Error:', error);
        });
        console.log('savepatient');
      };

      modalCont.show();
      setTimeout(function () {
        return modal.querySelector("#p-name").focus();
      }, 100);
    },
    initPagination: function initPagination(response) {
      getPagination(response.meta, _this.getData);
    },
    initFooter: function initFooter$1() {
      initFooter(__('Copyright © ' + new Date().getFullYear() + ' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('Kenzap Cloud Services - Dashboard'));
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
