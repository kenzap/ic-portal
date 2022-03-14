<<<<<<< Updated upstream

(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35734/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
  var getMedicationId = function getMedicationId() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id') ? urlParams.get('id') : "";
    return id;
  };
  var formatPrice = function formatPrice(price) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "USD"
    });
    if (typeof price === 'undefined' || price == '') price = 0;
    price = parseFloat(price);
    price = formatter.format(price);
    return price;
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
  var simulateClick = function simulateClick(elem) {
    var evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    !elem.dispatchEvent(evt);
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
  var onChange = function onChange(sel, fn) {
    if (document.querySelector(sel)) {
      var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll(sel)),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var e = _step5.value;
          e.removeEventListener('change', fn, true);
          e.addEventListener('change', fn, true);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  };

  var showLoader = function showLoader() {
    var el = document.querySelector(".loader");
    if (el) el.style.display = 'block';
  };
  var hideLoader = function hideLoader() {
    var el = document.querySelector(".loader");
    if (el) el.style.display = 'none';
  };
  var simpleTags = function simpleTags(element) {
    if (!element) {
      throw new Error("DOM Element is undifined! Please choose HTML target element.");
    }

    var DOMParent = element;
    var DOMList;
    var DOMInput;
    var dataAttribute;
    var arrayOfList;

    function DOMCreate() {
      var ul = document.createElement("ul");
      var input = document.createElement("input");
      input.setAttribute('placeholder', 'new entry');
      DOMParent.appendChild(ul);
      DOMParent.appendChild(input);
      DOMList = DOMParent.firstElementChild;
      DOMInput = DOMParent.lastElementChild;
    }

    function DOMRender() {
      DOMList.innerHTML = "";
      arrayOfList.forEach(function (currentValue, index) {
        if (currentValue) {
          var li = document.createElement("li");
          li.innerHTML = "".concat(currentValue, " <a>&times;</a>");
          li.querySelector("a").addEventListener("click", function () {
            onDelete(index);
          });
          DOMList.appendChild(li);
        }
      });
      setAttribute();
    }

    function onKeyUp() {
      DOMInput.addEventListener("keyup", function (event) {
        var text = this.value.trim();

        if (text.includes(",") || event.keyCode === 13) {
          if (text.replace(",", "") !== "") {
            arrayOfList.push(text.replace(",", ""));
          }

          this.value = "";
        }

        DOMRender();
      });
    }

    function onDelete(id) {
      arrayOfList = arrayOfList.filter(function (currentValue, index) {
        if (index === id) {
          return false;
        }

        return currentValue;
      });
      DOMRender();
    }

    function getAttribute() {
      dataAttribute = DOMParent.getAttribute("data-simple-tags");
      dataAttribute = dataAttribute.split(",");
      arrayOfList = dataAttribute.map(function (currentValue) {
        return currentValue.trim();
      });
    }

    function setAttribute() {
      DOMParent.setAttribute("data-simple-tags", arrayOfList.toString());
    }

    getAttribute();
    DOMCreate();
    DOMRender();
    onKeyUp();
  };

  var HTMLContent = function HTMLContent(__) {
    return "\n  <div class=\"container p-edit\">\n    <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n        <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n        \n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n            <div class=\"sections\" id=\"sections\" role=\"tablist\" style=\"width:100%;\">\n\n                <div class=\"row\">\n                    <div class=\"col-12 grid-margin stretch-card\">\n                        <div class=\"card border-white shadow-sm p-sm-3\">\n                            <div class=\"card-body\">\n\n                                <div class=\"landing_status\"></div>\n                                <input type=\"hidden\" class=\"form-control\" id=\"landing-slug\" value=\"\">\n\n                                <h4 id=\"elan\" class=\"card-title mb-4\">".concat(__('Description'), "</h4>\n\n                                <div id=\"placeholders\">\n\n                                    <div class=\"mb-3\">\n                                        <label class=\"banner-title-l form-label\" for=\"p-title\">").concat(__('Title'), "</label>\n                                        <input type=\"text\" class=\"form-control inp\" id=\"p-title\" placeholder=\"").concat(__(''), "\">\n                                        <p class=\"form-text\"> </p>\n                                    </div>\n\n                                    <div class=\"mb-3\">\n                                        <label class=\"banner-descshort-l form-label\" for=\"desc\">").concat(__('Images'), "</label>\n                                        <div class=\"clearfix\"></div>\n                                        <div class=\"ic\"></div>\n                                        <div class=\"clearfix\"></div>\n                                    </div>\n\n                                    <div class=\"mb-3\">\n                                        <label class=\"banner-descshort-l form-label\" for=\"p-sdesc\">").concat(__('Description'), "</label>\n                                        <textarea class=\"form-control inp\" id=\"p-sdesc\" placeholder=\"  \" maxlength=\"5000\" rows=\"12\"></textarea>\n                                    </div>\n\n\n                                    <div class=\"mb-3\">\n                                        <div class=\"clearfix\"></div>\n                                        <div style=\"clear:both;margin-top:16px;\"></div>\n                                        <label class=\"banner-descshort-l form-label\" for=\"p-desc\">").concat(__('Usage'), "</label>\n                                        <textarea class=\"form-control inp\" id=\"p-ldesc\" placeholder=\" \" maxlength=\"2000\" rows=\"12\"></textarea>\n                                    </div>\n\n                                    <div class=\"mb-3\">\n                                        <label class=\"banner-descshort-l form-label\" for=\"p-inventory\">").concat(__('Inventory'), "</label>\n                                        <input type=\"text\" class=\"form-control inp\" id=\"p-inventory\" placeholder=\"").concat(__(''), "\">\n                                        <p class=\"form-text\">").concat(__('Product stock unit identification number'), "</p>\n                                    </div>\n\n                                    <div class=\"mb-3 mw\">\n                                        <div class=\"list-wrapper\">\n                                            <ul class=\"d-flex flex-column-reverse features\"> </ul>\n                                        </div>\n                                        <p class=\"form-text\"> </p>\n                                    </div>\n\n                                    <h4 id=\"elan\" class=\"card-title mb-4\">Side effects</h4>\n                                    <div class=\"mb-3 mw common-effects\">\n                                        <label class=\"banner-descshort-l form-label\" for=\"p-common-effect\">").concat(__('Common'), "</label>\n                                        <div id=\"p-common-effect\" class=\"simple-tags mb-4\" data-simple-tags=\"\"></div>\n                                        <div class=\"clearfix\"> </div>\n                                    </div>\n\n                                    <div class=\"mb-3 mw occasional-effects\">\n                                        <label class=\"banner-descshort-l form-label\" for=\"p-occasional-effect\">").concat(__('Occasional'), "</label>\n                                        <div id=\"p-occasional-effect\" class=\"simple-tags mb-4\" data-simple-tags=\"\"></div>\n                                        <div class=\"clearfix\"> </div>\n                                    </div>\n\n                                    <div class=\"mb-3 mw rare-effects\">\n                                        <label class=\"banner-descshort-l form-label\" for=\"p-rare-effect\">").concat(__('Rare'), "</label>\n                                        <div id=\"p-rare-effect\" class=\"simple-tags mb-4\" data-simple-tags=\"\"></div>\n                                        <div class=\"clearfix\"> </div>\n                                    </div>\n\n                                    <div class=\"bg-light price_group mt-3 mb-3 p-4 d-none\">\n                                        <h4 class=\"card-title mb-3\">").concat(__('Price'), "</h4>\n                                        <div class=\"price_group_base\">\n                                            <div class=\"mb-3 mw\">\n                                                <div class=\"input-group\">\n\n                                                    <div id=\"p-price-c\">\n                                                        <label for=\"p-price\" class=\"form-label\">").concat(__('Price normal'), " <span class=\"lang\"></span></label>\n                                                        <div class=\"input-group\">\n                                                            <span class=\"input-group-text\">$</span>\n                                                            <input id=\"p-price\" type=\"text\" class=\"form-control inp\" placeholder=\"55.00\" autocomplete=\"off\">\n                                                        </div>\n                                                    </div>\n                                                    <div id=\"p-priced-c\">\n                                                        <label for=\"p-priced\" class=\"form-label\">").concat(__('Discounted'), " <span class=\"lang\"></span></label>\n                                                        <input id=\"p-priced\" type=\"text\" class=\"form-control inp\" placeholder=\"45.00\" autocomplete=\"off\">\n                                                    </div>\n\n                                                </div>\n                                                <div class=\"add-mix-ctn\"><a class=\"add-mix-block\" href=\"#\" data-action=\"add\">").concat(__('+ add variation'), "</a></div>\n                                            </div>\n\n                                            <div class=\"variation-blocks\">\n\n                                            </div>\n\n                                            <div style='margin:24px 0 48px;border-bottom:0px solid #ccc;'></div>\n\n                                            <div class=\"mb-3 mw\">\n                                                <h4 id=\"elan\" class=\"card-title\">").concat(__('Inventory'), "</h4>\n                                                <label for=\"p-sku\" class=\"form-label\"> <span class=\"lang\"></span></label>\n                                                <div class=\"input-group\">\n                                                    <input id=\"p-sku\" type=\"text\" style=\"width:100%;\" class=\"form-control inp\" placeholder=\"\" maxlength=\"200\">\n                                                    <p class=\"form-text\"> Product stock unit identification number</p>\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class=\"desc-repeater-cont\">\n\n                                </div>\n\n                                <p class=\"form-text\"> &nbsp;</p>\n\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n        <div class=\"col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0\">\n\n            <div class=\"row\">\n                <div class=\"col-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm p-sm-3\">\n                        <div class=\"card-body\">\n\n                            <h4 class=\"card-title\" style=\"display:none;\">").concat(__('General'), "</h4>\n                            <div class=\"landing_status\"></div>\n                            <input type=\"hidden\" class=\"form-control\" id=\"landing-slug\" value=\"\">\n\n                            <h4 id=\"elan\" class=\"card-title mb-4\">").concat(__('Usage'), "</h4>\n                            <div id=\"status-cont\" class=\"mb-3\">\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-publish form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\" id=\"p-status1\" value=\"1\">\n                                            ").concat(__('Active'), "\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-draft form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\"  id=\"p-status3\" value=\"3\">\n                                            ").concat(__('Experimental'), "\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-draft form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\"  id=\"p-status0\" value=\"0\">\n                                            ").concat(__('Archive'), "\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <h4 id=\"elan\" class=\"card-title mb-4\">Application</h4>\n                            <div id=\"p-cats\" class=\"simple-tags mb-4\" data-simple-tags=\"\"></div>\n                            <div class=\"clearfix\"> </div>\n\n                            <div class=\"d-grid gap-2\">\n                                <button class=\"btn btn-primary btn-save\" type=\"button\">").concat(__('Save'), "</button>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n  </div>\n\n  <div class=\"modal p-modal\" tabindex=\"-1\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\"></h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n    <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n        aria-atomic=\"true\" data-bs-delay=\"3000\">\n        <div class=\"d-flex\">\n            <div class=\"toast-body\"></div>\n            <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n        </div>\n    </div>\n  </div>\n  ");
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
    init: function init() {
      _this.getData();
    },
    state: {
      ajaxQueue: 0
    },
    getData: function getData() {
      showLoader();
      var id = getMedicationId();
      getSiteId();
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
            user: {
              type: 'authenticate',
              fields: ['avatar'],
              token: getCookie('kenzap_token')
            },
            product: {
              type: 'find',
              key: 'ic-medication',
              id: id,
              fields: ['_id', 'id', 'img', 'status', 'price', 'variations', 'priced', 'title', 'sdesc', 'ldesc', 'sku', 'cats', 'pcommoneffect', 'poccasionaleffect', 'prareeffect', 'updated']
            },
            locale: {
              type: 'locale',
              id: 'en'
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();

        if (response.success) {
          i18n.init(response.locale);
          document.querySelector('#contents').innerHTML = HTMLContent(__);

          if (response.product.length == 0) {
            _this.initListeners('all');

            return;
          }

          _this.renderPage(response.product);

          _this.initHeader(response);

          _this.loadImages(response.product);

          _this.initListeners('all');
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    renderPage: function renderPage(product) {
      var d = document;
      initBreadcrumbs([{
        link: link('https://dashboard/kenzap.cloud'),
        text: __('Dashboard')
      }, {
        link: link('/'),
        text: __('IC Portal')
      }, {
        link: link('/medication-list/'),
        text: __('Medication List')
      }, {
        text: __('Edit')
      }]);
      d.querySelector("#p-title").value = product.title;
      d.querySelector("#p-sdesc").value = product.sdesc;
      d.querySelector("#p-ldesc").value = product.ldesc;
      d.querySelector("#p-price").value = product.price;
      d.querySelector("#p-priced").value = product.priced;
      console.log(product.variations);

      for (var m in product.variations) {
        var vr = product.variations[m];
        var data = [];
        data['title'] = vr['title'];
        data['type'] = vr['type'];
        data['required'] = vr['required'];
        data['index'] = m;
        d.querySelector(".variation-blocks").innerHTML += _this.structMixBlock(data);

        for (var n in vr['data']) {
          var vrd = vr['data'][n];
          var _data = [];
          _data['title'] = vrd['title'];
          _data['price'] = vrd['price'];
          _data['type'] = vr['type'];
          d.querySelector(".var-block[data-index='" + m + "'] .offer-pricef").innerHTML += _this.structMixRow(_data);
        }
      }

      if (product.status) document.querySelector('#p-status' + product.status).checked = true;
      var pcats = document.querySelector('#p-cats');
      if (product.cats) pcats.setAttribute('data-simple-tags', product.cats);
      var pcommoneffect = document.querySelector('#p-common-effect');
      if (product.pcommoneffect) pcommoneffect.setAttribute('data-simple-tags', product.pcommoneffect);
      var poccasionaleffect = document.querySelector('#p-occasional-effect');
      if (product.poccasionaleffect) poccasionaleffect.setAttribute('data-simple-tags', product.poccasionaleffect);
      var prareeffect = document.querySelector('#p-rare-effect');
      if (product.prareeffect) prareeffect.setAttribute('data-simple-tags', product.prareeffect);
      new simpleTags(pcats);
      new simpleTags(pcommoneffect);
      new simpleTags(poccasionaleffect);
      new simpleTags(prareeffect);
    },
    initHeader: function initHeader(response) {
      onClick('.nav-back', function (e) {
        e.preventDefault();
        console.log('.nav-back');
        var link = document.querySelector('.bc ol li:nth-last-child(2)').querySelector('a');
        simulateClick(link);
      });
    },
    initListeners: function initListeners() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'partial';
      console.log('initListeners ');

      if (type == 'all') {
        onClick('.btn-save', _this.listeners.saveProduct);
        onClick('.p-modal .btn-primary', _this.listeners.modalSuccessBtn);
      }

      onClick('.add-mix-block', _this.listeners.addMixBlock);
      onClick('.edit-block', _this.listeners.editBlock);
      onClick('.remove-block', _this.listeners.removeBlock);
      onClick('.add-mix', _this.listeners.addMixOption);
      onClick('.remove-option', _this.listeners.removeOption);
    },
    listeners: {
      editBlock: function editBlock(e) {
        e.preventDefault();
        var amb = document.querySelector('.add-mix-block');
        amb.dataset.action = 'edit';
        amb.dataset.index = e.currentTarget.dataset.index;
        setTimeout(function () {
          return simulateClick(amb);
        }, 10);
        console.log('editBlock');
      },
      removeBlock: function removeBlock(e) {
        e.preventDefault();
        var c = confirm(__('Remove entire block?'));

        if (c) {
          e.currentTarget.parentNode.parentNode.remove();
        }

        console.log('removeBlock');
      },
      addMixBlock: function addMixBlock(e) {
        e.preventDefault();
        var action = e.currentTarget.dataset.action;
        var index = e.currentTarget.dataset.index;
        e.currentTarget.dataset.action = 'add';
        console.log('index: ' + index);

        var modal_title = __('Add Variation Block');

        var title = "";
        var type = "";
        var required = 0;

        var modal_btn = __('Add'),
            modal_cancel_btn = __('Cancel');

        if (action == 'edit') {
          modal_title = __('Edit Variation Block');
          title = document.querySelector(".var-block[data-index='" + index + "']").dataset.title;
          type = document.querySelector(".var-block[data-index='" + index + "']").dataset.type;
          required = parseInt(document.querySelector(".var-block[data-index='" + index + "']").dataset.required);
          modal_btn = __('Save');
        }

        var pmodal = document.querySelector(".p-modal");
        var pmodalCont = new bootstrap.Modal(pmodal);
        pmodal.querySelector(".modal-title").innerHTML = modal_title;
        pmodal.querySelector(".btn-primary").innerHTML = modal_btn;
        pmodal.querySelector(".btn-secondary").innerHTML = modal_cancel_btn;
        pmodalCont.show();
        var modalHTml = "            <div class=\"form-cont\">                <div class=\"form-group mb-3\">                    <label for=\"mtitle\" class=\"form-label\">".concat(__('Save'), "</label>                    <input type=\"text\" class=\"form-control\" id=\"mtitle\" autocomplete=\"off\" placeholder=\"Rice type\" value=\"").concat(title, "\">                </div>                <div class=\"form-group mb-3\">                    <label for=\"mtype\" class=\"form-label\">").concat(__('Input type'), "</label>                    <select id=\"mtype\" class=\"form-control \" >                        <option ").concat(type == 'radio' ? 'selected="selected"' : '', " value=\"radio\">").concat(__('Radio buttons'), "</option>                        <option ").concat(type == 'checkbox' ? 'selected="selected"' : '', " value=\"checkbox\">").concat(__('Checkboxes'), "</option>                    </select>                    <p class=\"card-description\">").concat(__('Define how this renders on frontend.'), "</p>                </div>                <div class=\"form-group mb-3\">                    <div class=\"form-check\">                        <label for=\"id=\"mtype\"\" class=\"form-check-label form-label\">                            <input id=\"mrequired\" type=\"checkbox\" class=\"form-check-input\" ").concat(required == 1 ? 'checked="checked"' : '', " value=\"1\">                            ").concat(__('Required'), "                        </label>                    </div>                    <p class=\"card-description\">").concat(__('Make this variation mandatory for users.'), "</p>                </div>                <div class=\"form-group mb-3 dn\">                    <label for=\"mtype\" class=\"form-label\">").concat(__('Minimum required'), "</label>                    <select id=\"mtype\" class=\"form-control \" >                        <option value=\"1\">1</option>                        <option value=\"2\">2</option>                    </select>                </div>            </div>");
        pmodal.querySelector(".modal-body").innerHTML = modalHTml;

        _this.listeners.modalSuccessBtnFunc = function (e) {
          e.preventDefault();
          var mtitle = pmodal.querySelector(".p-modal #mtitle").value;
          var mtype = pmodal.querySelector(".p-modal #mtype").value;
          var mrequired = pmodal.querySelector(".p-modal #mrequired:checked");
          mrequired = mrequired == null ? 0 : mrequired.value == "1" ? 1 : 0;

          if (mtitle.length < 2) {
            alert(__('Please provide longer title'));
            return;
          }

          var data = [];
          data['title'] = mtitle;
          data['type'] = mtype;
          data['required'] = mrequired;
          data['index'] = document.querySelectorAll(".var-block").length;

          if (action == 'edit') {
            document.querySelector(".var-block[data-index='" + index + "']").dataset.title = mtitle;
            document.querySelector(".var-block[data-index='" + index + "']").dataset.type = mtype;
            document.querySelector(".var-block[data-index='" + index + "']").dataset.required = mrequired;
            document.querySelector(".var-block[data-index='" + index + "'] .title").innerHTML = mtitle;
          }

          if (action == 'add') {
            if (document.querySelector(".variation-blocks .var-block") == null) {
              document.querySelector(".variation-blocks").innerHTML = _this.structMixBlock(data);
            } else {
              document.querySelector(".variation-blocks .var-block:last-of-type").insertAdjacentHTML('afterend', _this.structMixBlock(data));
            }
          }

          pmodalCont.hide();
          setTimeout(function () {
            return _this.initListeners('partial');
          }, 10);
        };

        console.log('addMixBlock');
      },
      addMixOption: function addMixOption(e) {
        var block_el = e.currentTarget;
        e.preventDefault();
        var pmodal = document.querySelector(".p-modal");
        var pmodalCont = new bootstrap.Modal(pmodal);
        pmodalCont.show();
        pmodal.querySelector(".modal-title").innerHTML = __('Add Variation');
        pmodal.querySelector(".btn-primary").innerHTML = __('Add');
        pmodal.querySelector(".btn-secondary").innerHTML = __('Cancel');
        var modalHTML = "            <div class=\"form-cont\">                <div class=\"form-group\">                    <label for=\"mtitle\" class=\"form-label\">".concat(__('Title'), "</label>                    <input type=\"text\" class=\"form-control\" id=\"mtitle\" autocomplete=\"off\" placeholder=\"").concat(__('Brown rice'), "\">                </div>                <div class=\"form-group\">                    <label for=\"mprice\" class=\"form-label\">").concat(__('Price'), "</label>                    <div class=\"input-group mb-3\">\n                        <span class=\"input-group-text\">$</span>\n                        <input id=\"mprice\" type=\"text\" class=\"form-control\" placeholder=\"0.00\" value=\"\" >                        <p class=\"card-description\">").concat(__('You can change default currency under Dashboard &gt; Settings.'), "</p>                    </div>                </div>            </div>");
        pmodal.querySelector(".modal-body").innerHTML = modalHTML;

        _this.listeners.modalSuccessBtnFunc = function (e) {
          e.preventDefault();
          var mtitle = pmodal.querySelector(".p-modal #mtitle").value;
          var mprice = pmodal.querySelector(".p-modal #mprice").value;

          if (mtitle.length < 2) {
            alert("Please provide longer title");
            return;
          }

          var data = [];
          data['title'] = mtitle;
          data['price'] = mprice;
          data['type'] = block_el.parentElement.parentElement.dataset.type;
          var sel = ".var-block[data-index='" + block_el.parentElement.parentElement.dataset.index + "']";
          console.log(sel);

          if (document.querySelector(sel + " .offer-pricef li") == null) {
            document.querySelector(sel + " .offer-pricef").innerHTML = _this.structMixRow(data);
          } else {
            document.querySelector(sel + " .offer-pricef li:last-of-type").insertAdjacentHTML('afterend', _this.structMixRow(data));
          }

          pmodalCont.hide();
          setTimeout(function () {
            return _this.initListeners('partial');
          }, 10);
        };
      },
      removeOption: function removeOption(e) {
        e.preventDefault();
        if (confirm('Remove option?')) e.currentTarget.parentElement.remove();
        console.log('removeOption');
      },
      saveProduct: function saveProduct(e) {
        e.preventDefault();
        var data = {};

        var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.inp')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var inp = _step.value;
            data[inp.id.replace("p-", "")] = inp.value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        data["cats"] = [];

        var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('#p-cats ul li')),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var cat = _step2.value;
            data["cats"].push(cat.innerHTML.replace('<a>×</a>', '').trim());
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        data["pcommoneffect"] = [];

        var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll('#p-common-effect ul li')),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _cat = _step3.value;
            data["pcommoneffect"].push(_cat.innerHTML.replace('<a>×</a>', '').trim());
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        data["poccasionaleffect"] = [];

        var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll('#p-occasional-effect ul li')),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _cat2 = _step4.value;
            data["poccasionaleffect"].push(_cat2.innerHTML.replace('<a>×</a>', '').trim());
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        data["prareeffect"] = [];

        var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll('#p-rare-effect ul li')),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _cat3 = _step5.value;
            data["prareeffect"].push(_cat3.innerHTML.replace('<a>×</a>', '').trim());
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        data["img"] = [];

        var _iterator6 = _createForOfIteratorHelper(document.querySelectorAll('.p-img')),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var img = _step6.value;
            var tf = !img.getAttribute('src').includes("placeholder") ? true : false;
            data["img"].push(tf);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        data["status"] = document.querySelector('input[name="p-status"]:checked').value;
        data["variations"] = [];
        var block_index = 0;

        var _iterator7 = _createForOfIteratorHelper(document.querySelectorAll('.variation-blocks .var-block')),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var block = _step7.value;
            var option_index = 0;

            var _iterator8 = _createForOfIteratorHelper(block.querySelectorAll('.offer-pricef li')),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var option = _step8.value;
                if (typeof data["variations"][block_index] === 'undefined') data["variations"][block_index] = {
                  'title': block.getAttribute('data-title'),
                  'type': block.getAttribute('data-type'),
                  'required': block.getAttribute('data-required'),
                  'data': []
                };
                data["variations"][block_index]['data'][option_index] = {
                  'title': option.getAttribute('data-title'),
                  'price': option.getAttribute('data-price'),
                  'cond': option.getAttribute('data-cond')
                };
                option_index++;
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            block_index++;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        console.log(data);
        var id = getMedicationId();
        var sid = getSiteId();
        showLoader();
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
              product: {
                type: 'update',
                key: 'ic-medication',
                id: id,
                sid: sid,
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.uploadImages();
          } else {
            parseApiError(response);
          }

          console.log('Success:', response);
        })["catch"](function (error) {
          console.error('Error:', error);
        });
        console.log('saveProduct');
      },
      openImage: function openImage(e) {
        e.preventDefault();
        simulateClick(document.querySelector(".aif-" + e.currentTarget.dataset.index));
      },
      previewImage: function previewImage(e) {
        e.preventDefault();
        var input = e.currentTarget;
        var toast = new bootstrap.Toast(document.querySelector('.p-toast'));

        if (input.files && input.files[0]) {
          if (input.files[0].type != 'image/jpeg' && input.files[0].type != 'image/jpg' && input.files[0].type != 'image/png') {
            document.querySelector('.p-toast .toast-body').innerHTML = __('Please provide image in JPEG format');
            toast.show();
            return;
          }

          if (input.files[0].size > 5000000) {
            document.querySelector('.p-toast .toast-body').innerHTML = __('Please provide image less than 5 MB in size!');
            toast.show();
            return;
          }

          var index = input.dataset.index;
          var reader = new FileReader();

          reader.onload = function (e) {
            console.log('target ' + e.currentTarget.result);
            document.querySelector('.images-' + index).setAttribute('src', e.currentTarget.result);
          };

          reader.readAsDataURL(input.files[0]);
          e.currentTarget.parentElement.querySelector('.remove').classList.remove("hd");
        }
      },
      removeImage: function removeImage(e) {
        var index = e.currentTarget.parentElement.dataset.index;
        document.querySelector('.aif-' + index).value = '';
        document.querySelector('.images-' + index).setAttribute('src', 'https://account.kenzap.com/images/placeholder.jpg');
        e.currentTarget.classList.add("hd");
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        console.log('calling modalSuccessBtnFunc');

        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    structMixBlock: function structMixBlock(data) {
      var html = '\
        <div class="mb-4 var-block mw" data-title="' + data.title + '" data-type="' + data.type + '" data-required="' + data.required + '" data-index="' + data.index + '" >\
            <label for="offer-pricef" class="form-label pb-2"><span class="title">' + data.title + '</span>\
                &nbsp;&nbsp;\
                <svg class="bi bi-pencil-fill edit-block ms-4" title="edit block" data-index="' + data.index + '" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">\
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>\
                </svg>\
                <svg class="bi bi-trash remove-block ms-4" title="edit block" data-index="' + data.index + '"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" viewBox="0 0 16 16">\
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>\
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>\
                </svg>\
            </label>\
            <div class="list-wrapper">\
                <ul class="d-flex flex-column-reverse offer-pricef" >\
                \
                </ul>\
            </div>\
            <p class="card-description"><a class="add-mix" href="#">+ add option</a> to differentiate price and product options.</p>\
            <div class="add-mix-ctn d-none"><a class="add-mix" href="#">+ add option</a></div>\
        </div>\
        ';
      return html;
    },
    structMixRow: function structMixRow(data) {
      return '\
        <li data-title="' + data.title + '" data-price="' + data.price + '" data-cond="" class="pt-2 pb-2"><div class="form-check"><label class="form-check-label form-label"><input class="' + data.type + ' form-check-input" type="' + data.type + '" checked="" data-ft="' + data.title + '">' + data.title + ' &nbsp;&nbsp;&nbsp; ' + formatPrice(data.price) + '</label></div>\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-option bi bi-x-circle" viewBox="0 0 16 16">\
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\
            </svg>\
        </li>';
    },
    loadImages: function loadImages(product) {
      var d = document;
      var id = getMedicationId();
      var sid = getSiteId();
      var t = '';

      for (var i = 0; i < 3; i++) {
        var img = product.img !== undefined && product.img[i] == 'true' ? 'https://preview.kenzap.cloud/S' + getSiteId() + '/_site/images/product-' + product.id + '-' + (i + 1) + '-100x100.jpeg?' + product.updated : 'https://account.kenzap.com/images/placeholder.jpg';
        t += "          <div class=\"p-img-cont float-start\">            <p data-index=\"".concat(i, "\">              <img class=\"p-img images-").concat(i, "\" data-index=\"").concat(i, "\" width=\"100\" height=\"100\" src=\"").concat(img, "\" />              <span class=\"remove hd\" title=\"").concat(__('Remove'), "\">\xD7</span>            </p>            <input type=\"file\" name=\"img[]\" data-type=\"search\" data-index=\"").concat(i, "\" class=\"file aif-").concat(i, " d-none\">          </div>");
      }

      d.querySelector(".ic").innerHTML = t;
      onClick('.p-img-cont img', _this.listeners.openImage);
      onClick('.p-img-cont .remove', _this.listeners.removeImage);
      onChange('.p-img-cont .file', _this.listeners.previewImage);

      for (var fi = 0; fi < 3; fi++) {
        var image_url = CDN + '/S' + sid + '/medication-' + id + '-' + (parseInt(fi) + 1) + '-250.jpeg?' + product.updated;
        setTimeout(function (img, sel, _fi) {
          var allow = true;

          if (typeof product.img !== "undefined") {
            if (!product.img[_fi]) allow = false;
          }

          if (allow) {
            var _i = new Image();

            _i.onload = function () {
              d.querySelector(sel + _fi).setAttribute('src', img);
              d.querySelector(sel + _fi).parentElement.querySelector('.remove').classList.remove('hd');
            };

            _i.src = img;
          }
        }, 300, image_url, ".images-", fi);
      }
    },
    uploadImages: function uploadImages() {
      if (document.querySelector(".imgupnote")) document.querySelector(".imgupnote").remove();
      var fi = 0;

      var _iterator9 = _createForOfIteratorHelper(document.querySelectorAll(".file")),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var fileEl = _step9.value;
          fi += 1;
          var id = getMedicationId();
          var sid = getSiteId();
          var file = fileEl.files[0];
          if (typeof file === "undefined") continue;
          var fd = new FormData();
          var sizes = '1000|500|250|100x100';
          fd.append('id', id);
          fd.append('sid', sid);
          fd.append('pid', id);
          fd.append('key', 'image');
          fd.append('sizes', sizes);
          fd.append('file', file);
          fd.append('slug', 'medication-' + id + '-' + fi);
          fd.append('token', getCookie('kenzap_token'));
          file.value = '';
          _this.state.ajaxQueue += 1;
          fetch("https://api-v1.kenzap.cloud/upload/", {
            body: fd,
            method: "post"
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            _this.state.ajaxQueue -= 1;

            if (response.success && _this.state.ajaxQueue == 0) {
              var _toast = new bootstrap.Toast(document.querySelector('.toast'));

              document.querySelector('.toast .toast-body').innerHTML = __('Drug updated');

              _toast.show();

              hideLoader();
            }
          });
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      if (_this.state.ajaxQueue == 0) {
        var toast = new bootstrap.Toast(document.querySelector('.toast'));
        document.querySelector('.toast .toast-body').innerHTML = __('Drug updated');
        toast.show();
        hideLoader();
      }
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
=======
!function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function t(t,a){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,a){if(t){if("string"==typeof t)return e(t,a);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,a):void 0}}(t))||a&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,o=!1;return{s:function(){n=n.call(t)},n:function(){var e=n.next();return c=e.done,e},e:function(e){o=!0,l=e},f:function(){try{c||null==n.return||n.return()}finally{if(o)throw l}}}}var a=function(e){var t=new URLSearchParams(window.location.search),a=t.get("sid")?t.get("sid"):"",n=-1==e.indexOf("?")?"?sid="+a:"&sid="+a;return e+n},n=function(){var e=new URLSearchParams(window.location.search);return e.get("sid")?e.get("sid"):""},r=function(){var e=new URLSearchParams(window.location.search);return e.get("id")?e.get("id"):""},i=function(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var r=a[n];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""},l=function(e){e.code,alert(e.reason)},c=function(e){var t=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});e.dispatchEvent(t)},o=function(e,a){if(document.querySelector(e)){var n,r=t(document.querySelectorAll(e));try{for(r.s();!(n=r.n()).done;){var i=n.value;i.removeEventListener("click",a,!0),i.addEventListener("click",a,!0)}}catch(e){r.e(e)}finally{r.f()}}},s=function(){var e=document.querySelector(".loader");e&&(e.style.display="block")},d=function(){var e=document.querySelector(".loader");e&&(e.style.display="none")},u=function(e){if(!e)throw new Error("DOM Element is undifined! Please choose HTML target element.");var t,a,n,r,i,l,c=e;function o(){t.innerHTML="",r.forEach((function(e,a){if(e){var n=document.createElement("li");n.innerHTML="".concat(e," <a>&times;</a>"),n.querySelector("a").addEventListener("click",(function(){var e;e=a,r=r.filter((function(t,a){return a!==e&&t})),o()})),t.appendChild(n)}})),c.setAttribute("data-simple-tags",r.toString())}n=(n=c.getAttribute("data-simple-tags")).split(","),r=n.map((function(e){return e.trim()})),i=document.createElement("ul"),(l=document.createElement("input")).setAttribute("placeholder","new entry"),c.appendChild(i),c.appendChild(l),t=c.firstElementChild,a=c.lastElementChild,o(),a.addEventListener("keyup",(function(e){var t=this.value.trim();(t.includes(",")||13===e.keyCode)&&(""!==t.replace(",","")&&r.push(t.replace(",","")),this.value=""),o()}))},p={state:{locale:null},init:function(e){p.state.locale=e},__:function(e){return void 0===p.state.locale.values[e]?e:p.state.locale.values[e]}},m=p.__,v={init:function(){v.getData()},state:{ajaxQueue:0},getData:function(){s();var e=r();n(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-Type":"text/plain",Authorization:"Bearer "+i("kenzap_api_key"),"Kenzap-Token":i("kenzap_token"),"Kenzap-Sid":n()},body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar"],token:i("kenzap_token")},product:{type:"find",key:"ic-medication",id:e,fields:["_id","id","img","status","price","variations","priced","title","sdesc","ldesc","sku","cats","pcommoneffect","poccasionaleffect","prareeffect","updated"]},locale:{type:"locale",id:"en"}}})}).then((function(e){return e.json()})).then((function(e){if(d(),e.success){if(p.init(e.locale),document.querySelector("#contents").innerHTML=function(e){return'\n  <div class="container p-edit">\n    <div class="d-flex justify-content-between bd-highlight mb-3">\n        <nav class="bc" aria-label="breadcrumb"></nav>\n        \n    </div>\n    <div class="row">\n        <div class="col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n            <div class="sections" id="sections" role="tablist" style="width:100%;">\n\n                <div class="row">\n                    <div class="col-12 grid-margin stretch-card">\n                        <div class="card border-white shadow-sm p-sm-3">\n                            <div class="card-body">\n\n                                <div class="landing_status"></div>\n                                <input type="hidden" class="form-control" id="landing-slug" value="">\n\n                                <h4 id="elan" class="card-title mb-4">'.concat(e("Description"),'</h4>\n\n                                <div id="placeholders">\n\n                                    <div class="mb-3">\n                                        <label class="banner-title-l form-label" for="p-title">').concat(e("Title"),'</label>\n                                        <input type="text" class="form-control inp" id="p-title" placeholder="').concat(e(""),'">\n                                        <p class="form-text"> </p>\n                                    </div>\n\n                                    <div class="mb-3">\n                                        <label class="banner-descshort-l form-label" for="desc">').concat(e("Images"),'</label>\n                                        <div class="clearfix"></div>\n                                        <div class="ic"></div>\n                                        <div class="clearfix"></div>\n                                    </div>\n\n                                    <div class="mb-3">\n                                        <label class="banner-descshort-l form-label" for="p-sdesc">').concat(e("Description"),'</label>\n                                        <textarea class="form-control inp" id="p-sdesc" placeholder="  " maxlength="5000" rows="12"></textarea>\n                                    </div>\n\n\n                                    <div class="mb-3">\n                                        <div class="clearfix"></div>\n                                        <div style="clear:both;margin-top:16px;"></div>\n                                        <label class="banner-descshort-l form-label" for="p-desc">').concat(e("Usage"),'</label>\n                                        <textarea class="form-control inp" id="p-ldesc" placeholder=" " maxlength="2000" rows="12"></textarea>\n                                    </div>\n\n                                    <div class="mb-3">\n                                        <label class="banner-descshort-l form-label" for="p-inventory">').concat(e("Inventory"),'</label>\n                                        <input type="text" class="form-control inp" id="p-inventory" placeholder="').concat(e(""),'">\n                                        <p class="form-text">').concat(e("Product stock unit identification number"),'</p>\n                                    </div>\n\n                                    <div class="mb-3 mw">\n                                        <div class="list-wrapper">\n                                            <ul class="d-flex flex-column-reverse features"> </ul>\n                                        </div>\n                                        <p class="form-text"> </p>\n                                    </div>\n\n                                    <h4 id="elan" class="card-title mb-4">Side effects</h4>\n                                    <div class="mb-3 mw common-effects">\n                                        <label class="banner-descshort-l form-label" for="p-common-effect">').concat(e("Common"),'</label>\n                                        <div id="p-common-effect" class="simple-tags mb-4" data-simple-tags=""></div>\n                                        <div class="clearfix"> </div>\n                                    </div>\n\n                                    <div class="mb-3 mw occasional-effects">\n                                        <label class="banner-descshort-l form-label" for="p-occasional-effect">').concat(e("Occasional"),'</label>\n                                        <div id="p-occasional-effect" class="simple-tags mb-4" data-simple-tags=""></div>\n                                        <div class="clearfix"> </div>\n                                    </div>\n\n                                    <div class="mb-3 mw rare-effects">\n                                        <label class="banner-descshort-l form-label" for="p-rare-effect">').concat(e("Rare"),'</label>\n                                        <div id="p-rare-effect" class="simple-tags mb-4" data-simple-tags=""></div>\n                                        <div class="clearfix"> </div>\n                                    </div>\n\n                                    <div class="bg-light price_group mt-3 mb-3 p-4 d-none">\n                                        <h4 class="card-title mb-3">').concat(e("Price"),'</h4>\n                                        <div class="price_group_base">\n                                            <div class="mb-3 mw">\n                                                <div class="input-group">\n\n                                                    <div id="p-price-c">\n                                                        <label for="p-price" class="form-label">').concat(e("Price normal"),' <span class="lang"></span></label>\n                                                        <div class="input-group">\n                                                            <span class="input-group-text">$</span>\n                                                            <input id="p-price" type="text" class="form-control inp" placeholder="55.00" autocomplete="off">\n                                                        </div>\n                                                    </div>\n                                                    <div id="p-priced-c">\n                                                        <label for="p-priced" class="form-label">').concat(e("Discounted"),' <span class="lang"></span></label>\n                                                        <input id="p-priced" type="text" class="form-control inp" placeholder="45.00" autocomplete="off">\n                                                    </div>\n\n                                                </div>\n                                                <div class="add-mix-ctn"><a class="add-mix-block" href="#" data-action="add">').concat(e("+ add variation"),'</a></div>\n                                            </div>\n\n                                            <div class="variation-blocks">\n\n                                            </div>\n\n                                            <div style=\'margin:24px 0 48px;border-bottom:0px solid #ccc;\'></div>\n\n                                            <div class="mb-3 mw">\n                                                <h4 id="elan" class="card-title">').concat(e("Inventory"),'</h4>\n                                                <label for="p-sku" class="form-label"> <span class="lang"></span></label>\n                                                <div class="input-group">\n                                                    <input id="p-sku" type="text" style="width:100%;" class="form-control inp" placeholder="" maxlength="200">\n                                                    <p class="form-text"> Product stock unit identification number</p>\n                                                </div>\n                                            </div>\n\n                                        </div>\n                                    </div>\n                                </div>\n\n                                <div class="desc-repeater-cont">\n\n                                </div>\n\n                                <p class="form-text"> &nbsp;</p>\n\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n        <div class="col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0">\n\n            <div class="row">\n                <div class="col-12 grid-margin stretch-card">\n                    <div class="card border-white shadow-sm p-sm-3">\n                        <div class="card-body">\n\n                            <h4 class="card-title" style="display:none;">').concat(e("General"),'</h4>\n                            <div class="landing_status"></div>\n                            <input type="hidden" class="form-control" id="landing-slug" value="">\n\n                            <h4 id="elan" class="card-title mb-4">').concat(e("Usage"),'</h4>\n                            <div id="status-cont" class="mb-3">\n\n                                <div class="col-sm-12">\n                                    <div class="form-check">\n                                        <label class="form-check-label status-publish form-label">\n                                            <input type="radio" class="form-check-input" name="p-status" id="p-status1" value="1">\n                                            ').concat(e("Active"),'\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class="col-sm-12">\n                                    <div class="form-check">\n                                        <label class="form-check-label status-draft form-label">\n                                            <input type="radio" class="form-check-input" name="p-status"  id="p-status3" value="3">\n                                            ').concat(e("Experimental"),'\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class="col-sm-12">\n                                    <div class="form-check">\n                                        <label class="form-check-label status-draft form-label">\n                                            <input type="radio" class="form-check-input" name="p-status"  id="p-status0" value="0">\n                                            ').concat(e("Archive"),'\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <h4 id="elan" class="card-title mb-4">Application</h4>\n                            <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>\n                            <div class="clearfix"> </div>\n\n                            <div class="d-grid gap-2">\n                                <button class="btn btn-primary btn-save" type="button">').concat(e("Save"),'</button>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n  </div>\n\n  <div class="modal p-modal" tabindex="-1">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <h5 class="modal-title"></h5>\n                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n            </div>\n            <div class="modal-body">\n\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-primary btn-modal"></button>\n                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">\n    <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"\n        aria-atomic="true" data-bs-delay="3000">\n        <div class="d-flex">\n            <div class="toast-body"></div>\n            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>\n        </div>\n    </div>\n  </div>\n  ')}(m),0==e.product.length)return void v.initListeners("all");v.renderPage(e.product),v.initHeader(e),v.loadImages(e.product),v.initListeners("all")}else l(e)})).catch((function(e){console.error("Error:",e)}))},renderPage:function(e){var n=document;for(var r in function(e){var a,n='<ol class="breadcrumb mt-2 mb-0">',r=t(e);try{for(r.s();!(a=r.n()).done;){var i=a.value;void 0===i.link?n+='<li class="breadcrumb-item">'.concat(i.text,"</li>"):n+='<li class="breadcrumb-item"><a href="'.concat(i.link,'">').concat(i.text,"</a></li>")}}catch(e){r.e(e)}finally{r.f()}n+="</ol>",document.querySelector(".bc").innerHTML=n}([{link:a("https://dashboard/kenzap.cloud"),text:m("Dashboard")},{link:a("/"),text:m("IC Portal")},{link:a("/medication-list/"),text:m("Medication List")},{text:m("Edit")}]),n.querySelector("#p-title").value=e.title,n.querySelector("#p-sdesc").value=e.sdesc,n.querySelector("#p-ldesc").value=e.ldesc,n.querySelector("#p-price").value=e.price,n.querySelector("#p-priced").value=e.priced,console.log(e.variations),e.variations){var i=e.variations[r],l=[];for(var c in l.title=i.title,l.type=i.type,l.required=i.required,l.index=r,n.querySelector(".variation-blocks").innerHTML+=v.structMixBlock(l),i.data){var o=i.data[c],s=[];s.title=o.title,s.price=o.price,s.type=i.type,n.querySelector(".var-block[data-index='"+r+"'] .offer-pricef").innerHTML+=v.structMixRow(s)}}e.status&&(document.querySelector("#p-status"+e.status).checked=!0);var d=document.querySelector("#p-cats");e.cats&&d.setAttribute("data-simple-tags",e.cats);var p=document.querySelector("#p-common-effect");e.pcommoneffect&&p.setAttribute("data-simple-tags",e.pcommoneffect);var f=document.querySelector("#p-occasional-effect");e.poccasionaleffect&&f.setAttribute("data-simple-tags",e.poccasionaleffect);var b=document.querySelector("#p-rare-effect");e.prareeffect&&b.setAttribute("data-simple-tags",e.prareeffect),new u(d),new u(p),new u(f),new u(b)},initHeader:function(e){o(".nav-back",(function(e){e.preventDefault(),console.log(".nav-back");var t=document.querySelector(".bc ol li:nth-last-child(2)").querySelector("a");c(t)}))},initListeners:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"partial";console.log("initListeners "),"all"==e&&(o(".btn-save",v.listeners.saveProduct),o(".p-modal .btn-primary",v.listeners.modalSuccessBtn)),o(".add-mix-block",v.listeners.addMixBlock),o(".edit-block",v.listeners.editBlock),o(".remove-block",v.listeners.removeBlock),o(".add-mix",v.listeners.addMixOption),o(".remove-option",v.listeners.removeOption)},listeners:{editBlock:function(e){e.preventDefault();var t=document.querySelector(".add-mix-block");t.dataset.action="edit",t.dataset.index=e.currentTarget.dataset.index,setTimeout((function(){return c(t)}),10),console.log("editBlock")},removeBlock:function(e){e.preventDefault(),confirm(m("Remove entire block?"))&&e.currentTarget.parentNode.parentNode.remove(),console.log("removeBlock")},addMixBlock:function(e){e.preventDefault();var t=e.currentTarget.dataset.action,a=e.currentTarget.dataset.index;e.currentTarget.dataset.action="add",console.log("index: "+a);var n=m("Add Variation Block"),r="",i="",l=0,c=m("Add"),o=m("Cancel");"edit"==t&&(n=m("Edit Variation Block"),r=document.querySelector(".var-block[data-index='"+a+"']").dataset.title,i=document.querySelector(".var-block[data-index='"+a+"']").dataset.type,l=parseInt(document.querySelector(".var-block[data-index='"+a+"']").dataset.required),c=m("Save"));var s=document.querySelector(".p-modal"),d=new bootstrap.Modal(s);s.querySelector(".modal-title").innerHTML=n,s.querySelector(".btn-primary").innerHTML=c,s.querySelector(".btn-secondary").innerHTML=o,d.show();var u='            <div class="form-cont">                <div class="form-group mb-3">                    <label for="mtitle" class="form-label">'.concat(m("Save"),'</label>                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="Rice type" value="').concat(r,'">                </div>                <div class="form-group mb-3">                    <label for="mtype" class="form-label">').concat(m("Input type"),'</label>                    <select id="mtype" class="form-control " >                        <option ').concat("radio"==i?'selected="selected"':"",' value="radio">').concat(m("Radio buttons"),"</option>                        <option ").concat("checkbox"==i?'selected="selected"':"",' value="checkbox">').concat(m("Checkboxes"),'</option>                    </select>                    <p class="card-description">').concat(m("Define how this renders on frontend."),'</p>                </div>                <div class="form-group mb-3">                    <div class="form-check">                        <label for="id="mtype"" class="form-check-label form-label">                            <input id="mrequired" type="checkbox" class="form-check-input" ').concat(1==l?'checked="checked"':"",' value="1">                            ').concat(m("Required"),'                        </label>                    </div>                    <p class="card-description">').concat(m("Make this variation mandatory for users."),'</p>                </div>                <div class="form-group mb-3 dn">                    <label for="mtype" class="form-label">').concat(m("Minimum required"),'</label>                    <select id="mtype" class="form-control " >                        <option value="1">1</option>                        <option value="2">2</option>                    </select>                </div>            </div>');s.querySelector(".modal-body").innerHTML=u,v.listeners.modalSuccessBtnFunc=function(e){e.preventDefault();var n=s.querySelector(".p-modal #mtitle").value,r=s.querySelector(".p-modal #mtype").value,i=s.querySelector(".p-modal #mrequired:checked");if(i=null==i?0:"1"==i.value?1:0,n.length<2)alert(m("Please provide longer title"));else{var l=[];l.title=n,l.type=r,l.required=i,l.index=document.querySelectorAll(".var-block").length,"edit"==t&&(document.querySelector(".var-block[data-index='"+a+"']").dataset.title=n,document.querySelector(".var-block[data-index='"+a+"']").dataset.type=r,document.querySelector(".var-block[data-index='"+a+"']").dataset.required=i,document.querySelector(".var-block[data-index='"+a+"'] .title").innerHTML=n),"add"==t&&(null==document.querySelector(".variation-blocks .var-block")?document.querySelector(".variation-blocks").innerHTML=v.structMixBlock(l):document.querySelector(".variation-blocks .var-block:last-of-type").insertAdjacentHTML("afterend",v.structMixBlock(l))),d.hide(),setTimeout((function(){return v.initListeners("partial")}),10)}},console.log("addMixBlock")},addMixOption:function(e){var t=e.currentTarget;e.preventDefault();var a=document.querySelector(".p-modal"),n=new bootstrap.Modal(a);n.show(),a.querySelector(".modal-title").innerHTML=m("Add Variation"),a.querySelector(".btn-primary").innerHTML=m("Add"),a.querySelector(".btn-secondary").innerHTML=m("Cancel");var r='            <div class="form-cont">                <div class="form-group">                    <label for="mtitle" class="form-label">'.concat(m("Title"),'</label>                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="').concat(m("Brown rice"),'">                </div>                <div class="form-group">                    <label for="mprice" class="form-label">').concat(m("Price"),'</label>                    <div class="input-group mb-3">\n                        <span class="input-group-text">$</span>\n                        <input id="mprice" type="text" class="form-control" placeholder="0.00" value="" >                        <p class="card-description">').concat(m("You can change default currency under Dashboard &gt; Settings."),"</p>                    </div>                </div>            </div>");a.querySelector(".modal-body").innerHTML=r,v.listeners.modalSuccessBtnFunc=function(e){e.preventDefault();var r=a.querySelector(".p-modal #mtitle").value,i=a.querySelector(".p-modal #mprice").value;if(r.length<2)alert("Please provide longer title");else{var l=[];l.title=r,l.price=i,l.type=t.parentElement.parentElement.dataset.type;var c=".var-block[data-index='"+t.parentElement.parentElement.dataset.index+"']";console.log(c),null==document.querySelector(c+" .offer-pricef li")?document.querySelector(c+" .offer-pricef").innerHTML=v.structMixRow(l):document.querySelector(c+" .offer-pricef li:last-of-type").insertAdjacentHTML("afterend",v.structMixRow(l)),n.hide(),setTimeout((function(){return v.initListeners("partial")}),10)}}},removeOption:function(e){e.preventDefault(),confirm("Remove option?")&&e.currentTarget.parentElement.remove(),console.log("removeOption")},saveProduct:function(e){e.preventDefault();var a,c={},o=t(document.querySelectorAll(".inp"));try{for(o.s();!(a=o.n()).done;){var d=a.value;c[d.id.replace("p-","")]=d.value}}catch(e){o.e(e)}finally{o.f()}c.cats=[];var u,p=t(document.querySelectorAll("#p-cats ul li"));try{for(p.s();!(u=p.n()).done;){var m=u.value;c.cats.push(m.innerHTML.replace("<a>×</a>","").trim())}}catch(e){p.e(e)}finally{p.f()}c.pcommoneffect=[];var f,b=t(document.querySelectorAll("#p-common-effect ul li"));try{for(b.s();!(f=b.n()).done;){var h=f.value;c.pcommoneffect.push(h.innerHTML.replace("<a>×</a>","").trim())}}catch(e){b.e(e)}finally{b.f()}c.poccasionaleffect=[];var y,g=t(document.querySelectorAll("#p-occasional-effect ul li"));try{for(g.s();!(y=g.n()).done;){var x=y.value;c.poccasionaleffect.push(x.innerHTML.replace("<a>×</a>","").trim())}}catch(e){g.e(e)}finally{g.f()}c.prareeffect=[];var k,S=t(document.querySelectorAll("#p-rare-effect ul li"));try{for(S.s();!(k=S.n()).done;){var q=k.value;c.prareeffect.push(q.innerHTML.replace("<a>×</a>","").trim())}}catch(e){S.e(e)}finally{S.f()}c.img=[];var w,M=t(document.querySelectorAll(".p-img"));try{for(M.s();!(w=M.n()).done;){var T=!w.value.getAttribute("src").includes("placeholder");c.img.push(T)}}catch(e){M.e(e)}finally{M.f()}c.status=document.querySelector('input[name="p-status"]:checked').value,c.variations=[];var L,A=0,z=t(document.querySelectorAll(".variation-blocks .var-block"));try{for(z.s();!(L=z.n()).done;){var H,E=L.value,B=0,D=t(E.querySelectorAll(".offer-pricef li"));try{for(D.s();!(H=D.n()).done;){var I=H.value;void 0===c.variations[A]&&(c.variations[A]={title:E.getAttribute("data-title"),type:E.getAttribute("data-type"),required:E.getAttribute("data-required"),data:[]}),c.variations[A].data[B]={title:I.getAttribute("data-title"),price:I.getAttribute("data-price"),cond:I.getAttribute("data-cond")},B++}}catch(e){D.e(e)}finally{D.f()}A++}}catch(e){z.e(e)}finally{z.f()}console.log(c);var j=r(),P=n();s(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-Type":"text/plain",Authorization:"Bearer "+i("kenzap_api_key"),"Kenzap-Token":i("kenzap_token"),"Kenzap-Sid":n()},body:JSON.stringify({query:{product:{type:"update",key:"ic-medication",id:j,sid:P,data:c}}})}).then((function(e){return e.json()})).then((function(e){e.success?v.uploadImages():l(e),console.log("Success:",e)})).catch((function(e){console.error("Error:",e)})),console.log("saveProduct")},openImage:function(e){e.preventDefault(),c(document.querySelector(".aif-"+e.currentTarget.dataset.index))},previewImage:function(e){e.preventDefault();var t=e.currentTarget,a=new bootstrap.Toast(document.querySelector(".p-toast"));if(t.files&&t.files[0]){if("image/jpeg"!=t.files[0].type&&"image/jpg"!=t.files[0].type&&"image/png"!=t.files[0].type)return document.querySelector(".p-toast .toast-body").innerHTML=m("Please provide image in JPEG format"),void a.show();if(t.files[0].size>5e6)return document.querySelector(".p-toast .toast-body").innerHTML=m("Please provide image less than 5 MB in size!"),void a.show();var n=t.dataset.index,r=new FileReader;r.onload=function(e){console.log("target "+e.currentTarget.result),document.querySelector(".images-"+n).setAttribute("src",e.currentTarget.result)},r.readAsDataURL(t.files[0]),e.currentTarget.parentElement.querySelector(".remove").classList.remove("hd")}},removeImage:function(e){var t=e.currentTarget.parentElement.dataset.index;document.querySelector(".aif-"+t).value="",document.querySelector(".images-"+t).setAttribute("src","https://account.kenzap.com/images/placeholder.jpg"),e.currentTarget.classList.add("hd")},modalSuccessBtn:function(e){console.log("calling modalSuccessBtnFunc"),v.listeners.modalSuccessBtnFunc(e)},modalSuccessBtnFunc:null},structMixBlock:function(e){return'        <div class="mb-4 var-block mw" data-title="'+e.title+'" data-type="'+e.type+'" data-required="'+e.required+'" data-index="'+e.index+'" >            <label for="offer-pricef" class="form-label pb-2"><span class="title">'+e.title+'</span>                &nbsp;&nbsp;                <svg class="bi bi-pencil-fill edit-block ms-4" title="edit block" data-index="'+e.index+'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>                </svg>                <svg class="bi bi-trash remove-block ms-4" title="edit block" data-index="'+e.index+'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" viewBox="0 0 16 16">                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>                </svg>            </label>            <div class="list-wrapper">                <ul class="d-flex flex-column-reverse offer-pricef" >                                </ul>            </div>            <p class="card-description"><a class="add-mix" href="#">+ add option</a> to differentiate price and product options.</p>            <div class="add-mix-ctn d-none"><a class="add-mix" href="#">+ add option</a></div>        </div>        '},structMixRow:function(e){return'        <li data-title="'+e.title+'" data-price="'+e.price+'" data-cond="" class="pt-2 pb-2"><div class="form-check"><label class="form-check-label form-label"><input class="'+e.type+' form-check-input" type="'+e.type+'" checked="" data-ft="'+e.title+'">'+e.title+" &nbsp;&nbsp;&nbsp; "+(t=e.price,a=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}),void 0!==t&&""!=t||(t=0),t=parseFloat(t),a.format(t)+'</label></div>            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-option bi bi-x-circle" viewBox="0 0 16 16">                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>            </svg>        </li>');var t,a},loadImages:function(e){for(var a=document,i=r(),l=n(),c="",s=0;s<3;s++){var d=void 0!==e.img&&"true"==e.img[s]?"https://preview.kenzap.cloud/S"+n()+"/_site/images/product-"+e.id+"-"+(s+1)+"-100x100.jpeg?"+e.updated:"https://account.kenzap.com/images/placeholder.jpg";c+='          <div class="p-img-cont float-start">            <p data-index="'.concat(s,'">              <img class="p-img images-').concat(s,'" data-index="').concat(s,'" width="100" height="100" src="').concat(d,'" />              <span class="remove hd" title="').concat(m("Remove"),'">×</span>            </p>            <input type="file" name="img[]" data-type="search" data-index="').concat(s,'" class="file aif-').concat(s,' d-none">          </div>')}a.querySelector(".ic").innerHTML=c,o(".p-img-cont img",v.listeners.openImage),o(".p-img-cont .remove",v.listeners.removeImage),function(e,a){if(document.querySelector(e)){var n,r=t(document.querySelectorAll(e));try{for(r.s();!(n=r.n()).done;){var i=n.value;i.removeEventListener("change",a,!0),i.addEventListener("change",a,!0)}}catch(e){r.e(e)}finally{r.f()}}}(".p-img-cont .file",v.listeners.previewImage);for(var u=0;u<3;u++){var p="https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com/S"+l+"/medication-"+i+"-"+(parseInt(u)+1)+"-250.jpeg?"+e.updated;setTimeout((function(t,n,r){var i=!0;if(void 0!==e.img&&(e.img[r]||(i=!1)),i){var l=new Image;l.onload=function(){a.querySelector(n+r).setAttribute("src",t),a.querySelector(n+r).parentElement.querySelector(".remove").classList.remove("hd")},l.src=t}}),300,p,".images-",u)}},uploadImages:function(){document.querySelector(".imgupnote")&&document.querySelector(".imgupnote").remove();var e,a=0,l=t(document.querySelectorAll(".file"));try{for(l.s();!(e=l.n()).done;){var c=e.value;a+=1;var o=r(),s=n(),u=c.files[0];if(void 0!==u){var p=new FormData;p.append("id",o),p.append("sid",s),p.append("pid",o),p.append("key","image"),p.append("sizes","1000|500|250|100x100"),p.append("file",u),p.append("slug","medication-"+o+"-"+a),p.append("token",i("kenzap_token")),u.value="",v.state.ajaxQueue+=1,fetch("https://api-v1.kenzap.cloud/upload/",{body:p,method:"post"}).then((function(e){return e.json()})).then((function(e){if(v.state.ajaxQueue-=1,e.success&&0==v.state.ajaxQueue){var t=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=m("Drug updated"),t.show(),d()}}))}}}catch(e){l.e(e)}finally{l.f()}if(0==v.state.ajaxQueue){var f=new bootstrap.Toast(document.querySelector(".toast"));document.querySelector(".toast .toast-body").innerHTML=m("Drug updated"),f.show(),d()}}};v.init()}();
>>>>>>> Stashed changes
