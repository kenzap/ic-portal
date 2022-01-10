
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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
  var getPatientId = function getPatientId() {
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
  /**
   * Create a web friendly URL slug from a string.
   *
   * Requires XRegExp (http://xregexp.com) with unicode add-ons for UTF-8 support.
   *
   * Although supported, transliteration is discouraged because
   *     1) most web browsers support UTF-8 characters in URLs
   *     2) transliteration causes a loss of information
   *
   * @author Sean Murphy <sean@iamseanmurphy.com>
   * @copyright Copyright 2012 Sean Murphy. All rights reserved.
   * @license http://creativecommons.org/publicdomain/zero/1.0/
   *
   * @param string s
   * @param object opt
   * @return string
   */

  var slugify = function slugify(s, opt) {
    var _char_map;

    s = String(s);
    opt = Object(opt);
    var defaults = {
      'delimiter': '-',
      'limit': undefined,
      'lowercase': true,
      'replacements': {},
      'transliterate': typeof XRegExp === 'undefined' ? true : false
    };

    for (var k in defaults) {
      if (!opt.hasOwnProperty(k)) {
        opt[k] = defaults[k];
      }
    }

    var char_map = (_char_map = {
      'À': 'A',
      'Á': 'A',
      'Â': 'A',
      'Ã': 'A',
      'Ä': 'A',
      'Å': 'A',
      'Æ': 'AE',
      'Ç': 'C',
      'È': 'E',
      'É': 'E',
      'Ê': 'E',
      'Ë': 'E',
      'Ì': 'I',
      'Í': 'I',
      'Î': 'I',
      'Ï': 'I',
      'Ð': 'D',
      'Ñ': 'N',
      'Ò': 'O',
      'Ó': 'O',
      'Ô': 'O',
      'Õ': 'O',
      'Ö': 'O',
      'Å': 'O',
      'Ø': 'O',
      'Ù': 'U',
      'Ú': 'U',
      'Û': 'U',
      'Ü': 'U',
      'Å°': 'U',
      'Ý': 'Y',
      'Þ': 'TH',
      'ß': 'ss',
      'à': 'a',
      'á': 'a',
      'â': 'a',
      'ã': 'a',
      'ä': 'a',
      'å': 'a',
      'æ': 'ae',
      'ç': 'c',
      'è': 'e',
      'é': 'e',
      'ê': 'e',
      'ë': 'e',
      'ì': 'i',
      'í': 'i',
      'î': 'i',
      'ï': 'i',
      'ð': 'd',
      'ñ': 'n',
      'ò': 'o',
      'ó': 'o',
      'ô': 'o',
      'õ': 'o',
      'ö': 'o',
      'Å': 'o',
      'ø': 'o',
      'ù': 'u',
      'ú': 'u',
      'û': 'u',
      'ü': 'u',
      'Å±': 'u',
      'ý': 'y',
      'þ': 'th',
      'ÿ': 'y',
      '©': '(c)',
      'Α': 'A',
      'Β': 'B',
      'Γ': 'G',
      'Δ': 'D',
      'Ε': 'E',
      'Ζ': 'Z',
      'Η': 'H',
      'Θ': '8',
      'Ι': 'I',
      'Κ': 'K',
      'Λ': 'L',
      'Μ': 'M',
      'Ν': 'N',
      'Ξ': '3',
      'Ο': 'O',
      'Π': 'P',
      'Ρ': 'R',
      'Σ': 'S',
      'Τ': 'T',
      'Υ': 'Y',
      'Φ': 'F',
      'Χ': 'X',
      'Ψ': 'PS',
      'Ω': 'W',
      'Î': 'A',
      'Î': 'E',
      'Î': 'I',
      'Î': 'O',
      'Î': 'Y',
      'Î': 'H',
      'Î': 'W',
      'Îª': 'I',
      'Î«': 'Y',
      'α': 'a',
      'β': 'b',
      'γ': 'g',
      'δ': 'd',
      'ε': 'e',
      'ζ': 'z',
      'η': 'h',
      'θ': '8',
      'ι': 'i',
      'κ': 'k',
      'λ': 'l',
      'μ': 'm',
      'ν': 'n',
      'ξ': '3',
      'ο': 'o',
      'π': 'p',
      'ρ': 'r',
      'σ': 's',
      'τ': 't',
      'υ': 'y',
      'φ': 'f',
      'χ': 'x',
      'ψ': 'ps',
      'ω': 'w',
      'Î¬': 'a',
      'Î­': 'e',
      'Î¯': 'i',
      'Ï': 'o',
      'Ï': 'y',
      'Î®': 'h',
      'Ï': 'w',
      'ς': 's',
      'Ï': 'i',
      'Î°': 'y',
      'Ï': 'y',
      'Î': 'i',
      'Å': 'S',
      'Ä°': 'I'
    }, _defineProperty(_char_map, "\xC7", 'C'), _defineProperty(_char_map, "\xDC", 'U'), _defineProperty(_char_map, "\xD6", 'O'), _defineProperty(_char_map, 'Ä', 'G'), _defineProperty(_char_map, 'Å', 's'), _defineProperty(_char_map, 'Ä±', 'i'), _defineProperty(_char_map, "\xE7", 'c'), _defineProperty(_char_map, "\xFC", 'u'), _defineProperty(_char_map, "\xF6", 'o'), _defineProperty(_char_map, 'Ä', 'g'), _defineProperty(_char_map, 'Ð', 'A'), _defineProperty(_char_map, 'Ð', 'B'), _defineProperty(_char_map, 'Ð', 'V'), _defineProperty(_char_map, 'Ð', 'G'), _defineProperty(_char_map, 'Ð', 'D'), _defineProperty(_char_map, 'Ð', 'E'), _defineProperty(_char_map, 'Ð', 'Yo'), _defineProperty(_char_map, 'Ð', 'Zh'), _defineProperty(_char_map, 'Ð', 'Z'), _defineProperty(_char_map, 'Ð', 'I'), _defineProperty(_char_map, 'Ð', 'J'), _defineProperty(_char_map, 'Ð', 'K'), _defineProperty(_char_map, 'Ð', 'L'), _defineProperty(_char_map, 'Ð', 'M'), _defineProperty(_char_map, 'Ð', 'N'), _defineProperty(_char_map, 'Ð', 'O'), _defineProperty(_char_map, 'Ð', 'P'), _defineProperty(_char_map, 'Ð ', 'R'), _defineProperty(_char_map, 'Ð¡', 'S'), _defineProperty(_char_map, 'Ð¢', 'T'), _defineProperty(_char_map, 'Ð£', 'U'), _defineProperty(_char_map, 'Ð¤', 'F'), _defineProperty(_char_map, 'Ð¥', 'H'), _defineProperty(_char_map, 'Ð¦', 'C'), _defineProperty(_char_map, 'Ð§', 'Ch'), _defineProperty(_char_map, 'Ð¨', 'Sh'), _defineProperty(_char_map, 'Ð©', 'Sh'), _defineProperty(_char_map, 'Ðª', ''), _defineProperty(_char_map, 'Ð«', 'Y'), _defineProperty(_char_map, 'Ð¬', ''), _defineProperty(_char_map, 'Ð­', 'E'), _defineProperty(_char_map, 'Ð®', 'Yu'), _defineProperty(_char_map, 'Ð¯', 'Ya'), _defineProperty(_char_map, 'Ð°', 'a'), _defineProperty(_char_map, 'Ð±', 'b'), _defineProperty(_char_map, 'Ð²', 'v'), _defineProperty(_char_map, 'Ð³', 'g'), _defineProperty(_char_map, 'Ð´', 'd'), _defineProperty(_char_map, 'Ðµ', 'e'), _defineProperty(_char_map, 'Ñ', 'yo'), _defineProperty(_char_map, 'Ð¶', 'zh'), _defineProperty(_char_map, 'Ð·', 'z'), _defineProperty(_char_map, 'Ð¸', 'i'), _defineProperty(_char_map, 'Ð¹', 'j'), _defineProperty(_char_map, 'Ðº', 'k'), _defineProperty(_char_map, 'Ð»', 'l'), _defineProperty(_char_map, 'Ð¼', 'm'), _defineProperty(_char_map, 'Ð½', 'n'), _defineProperty(_char_map, 'Ð¾', 'o'), _defineProperty(_char_map, 'Ð¿', 'p'), _defineProperty(_char_map, 'Ñ', 'r'), _defineProperty(_char_map, 'Ñ', 's'), _defineProperty(_char_map, 'Ñ', 't'), _defineProperty(_char_map, 'Ñ', 'u'), _defineProperty(_char_map, 'Ñ', 'f'), _defineProperty(_char_map, 'Ñ', 'h'), _defineProperty(_char_map, 'Ñ', 'c'), _defineProperty(_char_map, 'Ñ', 'ch'), _defineProperty(_char_map, 'Ñ', 'sh'), _defineProperty(_char_map, 'Ñ', 'sh'), _defineProperty(_char_map, 'Ñ', ''), _defineProperty(_char_map, 'Ñ', 'y'), _defineProperty(_char_map, 'Ñ', ''), _defineProperty(_char_map, 'Ñ', 'e'), _defineProperty(_char_map, 'Ñ', 'yu'), _defineProperty(_char_map, 'Ñ', 'ya'), _defineProperty(_char_map, 'Ð', 'Ye'), _defineProperty(_char_map, 'Ð', 'I'), _defineProperty(_char_map, 'Ð', 'Yi'), _defineProperty(_char_map, 'Ò', 'G'), _defineProperty(_char_map, 'Ñ', 'ye'), _defineProperty(_char_map, 'Ñ', 'i'), _defineProperty(_char_map, 'Ñ', 'yi'), _defineProperty(_char_map, 'Ò', 'g'), _defineProperty(_char_map, 'Ä', 'C'), _defineProperty(_char_map, 'Ä', 'D'), _defineProperty(_char_map, 'Ä', 'E'), _defineProperty(_char_map, 'Å', 'N'), _defineProperty(_char_map, 'Å', 'R'), _defineProperty(_char_map, 'Š', 'S'), _defineProperty(_char_map, 'Å¤', 'T'), _defineProperty(_char_map, 'Å®', 'U'), _defineProperty(_char_map, 'Å½', 'Z'), _defineProperty(_char_map, 'Ä', 'c'), _defineProperty(_char_map, 'Ä', 'd'), _defineProperty(_char_map, 'Ä', 'e'), _defineProperty(_char_map, 'Å', 'n'), _defineProperty(_char_map, 'Å', 'r'), _defineProperty(_char_map, 'š', 's'), _defineProperty(_char_map, 'Å¥', 't'), _defineProperty(_char_map, 'Å¯', 'u'), _defineProperty(_char_map, 'Å¾', 'z'), _defineProperty(_char_map, 'Ä', 'A'), _defineProperty(_char_map, 'Ä', 'C'), _defineProperty(_char_map, 'Ä', 'e'), _defineProperty(_char_map, 'Å', 'L'), _defineProperty(_char_map, 'Å', 'N'), _defineProperty(_char_map, "\xD3", 'o'), _defineProperty(_char_map, 'Å', 'S'), _defineProperty(_char_map, 'Å¹', 'Z'), _defineProperty(_char_map, 'Å»', 'Z'), _defineProperty(_char_map, 'Ä', 'a'), _defineProperty(_char_map, 'Ä', 'c'), _defineProperty(_char_map, 'Ä', 'e'), _defineProperty(_char_map, 'Å', 'l'), _defineProperty(_char_map, 'Å', 'n'), _defineProperty(_char_map, "\xF3", 'o'), _defineProperty(_char_map, 'Å', 's'), _defineProperty(_char_map, 'Åº', 'z'), _defineProperty(_char_map, 'Å¼', 'z'), _defineProperty(_char_map, 'Ä', 'A'), _defineProperty(_char_map, "\xC4\x8C", 'C'), _defineProperty(_char_map, 'Ä', 'E'), _defineProperty(_char_map, 'Ä¢', 'G'), _defineProperty(_char_map, 'Äª', 'i'), _defineProperty(_char_map, 'Ä¶', 'k'), _defineProperty(_char_map, 'Ä»', 'L'), _defineProperty(_char_map, 'Å', 'N'), _defineProperty(_char_map, "\u0160", 'S'), _defineProperty(_char_map, 'Åª', 'u'), _defineProperty(_char_map, "\xC5\xBD", 'Z'), _defineProperty(_char_map, 'Ä', 'a'), _defineProperty(_char_map, "\xC4\x8D", 'c'), _defineProperty(_char_map, 'Ä', 'e'), _defineProperty(_char_map, 'Ä£', 'g'), _defineProperty(_char_map, 'Ä«', 'i'), _defineProperty(_char_map, 'Ä·', 'k'), _defineProperty(_char_map, 'Ä¼', 'l'), _defineProperty(_char_map, 'Å', 'n'), _defineProperty(_char_map, "\u0161", 's'), _defineProperty(_char_map, 'Å«', 'u'), _defineProperty(_char_map, "\xC5\xBE", 'z'), _char_map);

    for (var k in opt.replacements) {
      s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
    }

    if (opt.transliterate) {
      for (var k in char_map) {
        s = s.replace(RegExp(k, 'g'), char_map[k]);
      }
    }

    var alnum = typeof XRegExp === 'undefined' ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
    s = s.replace(alnum, opt.delimiter);
    s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);
    s = s.substring(0, opt.limit);
    s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');
    return opt.lowercase ? s.toLowerCase() : s;
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
      input.setAttribute('placeholder', 'new category');
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
    return "\n  <div class=\"container p-edit\">\n    <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n        <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n        <button class=\"btn btn-primary btn-add\" type=\"button\">".concat(__('Add record'), "</button>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n            <div class=\"sections\" id=\"sections\" role=\"tablist\" style=\"width:100%;\">\n\n                <div class=\"row\">\n                    <div class=\"col-12 grid-margin stretch-card\">\n                        <div class=\"alert alert-danger d-flex align-items-center\" role=\"alert\">\n                            <svg class=\"bi flex-shrink-0 me-2\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-exclamation-triangle-fill\" viewBox=\"0 0 16 16\">\n                                <path d=\"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z\"></path>\n                            </svg>\n                            <div id=\"latest-alert\">\n                                An example danger alert with an icon\n                            </div>\n                        </div>\n                        \n                        <div class=\"card border-white shadow-sm p-sm-3\">\n\n                            <div class=\"card-body\" style=\"max-width: 540px;\">\n                                <div class=\"row g-0\">\n                                    <div class=\"col-md-3\">\n                                        <img src=\"https://account.kenzap.com/images/default_avatar.jpg\" style=\"max-height:100px;\" class=\"img-fluid rounded-circle\" alt=\"Patient avatar\">\n                                    </div>\n                                    <div class=\"col-md-9\">\n                                        <div class=\"\">\n                                            <h3 id=\"p-name\" class=\"card-title mt-3\"></h3>\n                                            <p id=\"p-bio\" class=\"card-text text-muted\"</p>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <nav class=\"card-body nav tab-content mt-1 mb-1\" role=\"tablist\">\n                                <div class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\"> \n                                    <a class=\"nav-link active\" id=\"nav-tab-3-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-tab-3\" type=\"button\" role=\"tab\" aria-controls=\"nav-tab-3\" aria-selected=\"true\"  href=\"#\">").concat(__('Recent records'), "</a>\n                                    <a class=\"nav-link\" id=\"nav-tab-1-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-tab-1\" type=\"button\" role=\"tab\" aria-controls=\"nav-tab-1\" aria-selected=\"true\" href=\"#\">").concat(__('General info'), "</a>\n                                    <a class=\"nav-link\" id=\"nav-tab-2-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-tab-2\" type=\"button\" role=\"tab\" aria-controls=\"nav-tab-2\" aria-selected=\"true\" href=\"#\">").concat(__('Abnormalities'), "</a>\n                                    <a class=\"nav-link\" id=\"nav-tab-4-link\" data-bs-toggle=\"tab\" data-bs-target=\"#nav-tab-4\" type=\"button\" role=\"tab\" aria-controls=\"nav-tab-4\" aria-selected=\"true\"  href=\"#\">").concat(__('Prescriptions'), "</a>\n                                </div>\n                            </nav>\n                            \n                            <div class=\"card-body tab-content\" id=\"nav-tabContent\">\n                                <div class=\"tab-pane fade show active\" id=\"nav-tab-3\" role=\"tabpanel\" aria-labelledby=\"nav-tab-3-link\">\n\n                                    <div class=\"card-body\">\n                                        <div class=\"mb-4\">\n                                            <h4>").concat(__('Recent records'), "</h4>\n                                            <ul class=\"timeline\">\n                                                <li class=\"clearfix\">\n                                                    <a target=\"_blank\" href=\"https://www.totoprayogo.com/#\">New Web Design</a>\n                                                    <p class=\"mb-1\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula....</p>\n                                                    <span class=\"float-end form-text text-muted\">21 March, 2014</span>\n                                                </li>\n                                                <li class=\"clearfix\">\n                                                    <a href=\"#\">21 000 Job Seekers</a>\n                                                    <p class=\"mb-1\">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>\n                                                    <span class=\"float-end form-text text-muted\">4 March, 2014</span>\n                                                </li>\n                                                <li class=\"clearfix\">\n                                                    <a href=\"#\">Awesome Employers</a>\n                                                    <p class=\"mb-1\">Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>\n                                                    <span class=\"float-end form-text text-muted\">1 April, 2014</span>\n                                                </li>\n                                            </ul>\n                                        </div>\n                                    </div>\n\n                                </div>\n                                <div class=\"tab-pane fade\" id=\"nav-tab-1\" role=\"tabpanel\" aria-labelledby=\"nav-tab-1-link\">\n                                    <div id=\"card-view\" class=\"card-body\">\n                                        <div id=\"placeholders\" class=\"d-none\">\n                                            <h4 id=\"elan\" class=\"card-title mb-4\">").concat(__('Description'), "</h4>\n                                            <div class=\"mb-3\">\n                                                <label class=\"banner-name-l form-label\" for=\"p-title\">").concat(__('Full Name'), "</label>\n                                                <input type=\"text\" class=\"form-control inp\" id=\"p-title\"\n                                                    placeholder=\"").concat(__('Sushi set..'), "\">\n                                                <p class=\"form-text\"> </p>\n                                            </div>\n\n                                            <div class=\"mb-3\">\n                                                <label class=\"banner-descshort-l form-label\" for=\"p-sdesc\">").concat(__('Short Description'), "</label>\n                                                <textarea class=\"form-control inp\" id=\"p-sdesc\" placeholder=\"  \" maxlength=\"120\" rows=\"2\"></textarea>\n                                            </div>\n\n                                            <div class=\"mb-3\">\n                                                <label class=\"banner-descshort-l form-label\" for=\"desc\">").concat(__('Images'), "</label>\n                                                <div class=\"clearfix\"></div>\n                                                <div class=\"ic\"></div>\n                                                <div class=\"clearfix\"></div>\n                                            </div>\n\n                                            <div class=\"mb-3\">\n                                                <div class=\"clearfix\"></div>\n                                                <div style=\"clear:both;margin-top:16px;\"></div>\n                                                <label class=\"banner-descshort-l form-label\" for=\"p-desc\">").concat(__('Description'), "</label>\n                                                <textarea class=\"form-control inp\" id=\"p-ldesc\" placeholder=\" \" maxlength=\"2000\" rows=\"10\"></textarea>\n                                            </div>\n\n                                        </div>\n\n                                    </div>\n                                </div>\n                                <div class=\"tab-pane fade\" id=\"nav-tab-2\" role=\"tabpanel\" aria-labelledby=\"nav-tab-2-link\">\n        ...\n                                </div>\n                                <div class=\"tab-pane fade\" id=\"nav-tab-3\" role=\"tabpanel\" aria-labelledby=\"nav-tab-3-link\">\n        ...\n                                </div>\n                                <div class=\"tab-pane fade\" id=\"nav-tab-4\" role=\"tabpanel\" aria-labelledby=\"nav-tab-4-link\">\n        ...\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n        <div class=\"col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0\">\n\n            <div class=\"row\">\n                <div class=\"col-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm p-sm-3\">\n                        <div class=\"card-body\">\n\n                            <h4 class=\"card-title\" style=\"display:none;\">").concat(__('General'), "</h4>\n                            <div class=\"landing_status\"></div>\n                            <input type=\"hidden\" class=\"form-control\" id=\"landing-slug\" value=\"\">\n\n                            <h4 id=\"elan\" class=\"card-title mb-4\">Status</h4>\n                            <div id=\"status-cont\" class=\"mb-3\">\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-publish form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\"\n                                                id=\"p-status1\" value=\"1\">\n                                                ").concat(__('Published'), "\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-draft form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\"  id=\"p-status0\" value=\"0\">\n                                            ").concat(__('Draft'), "\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <h4 id=\"elan\" class=\"card-title mb-4\">Categories</h4>\n                            <div id=\"p-cats\" class=\"simple-tags mb-4\" data-simple-tags=\"\"></div>\n                            <div class=\"clearfix\"> </div>\n\n                            <div class=\"d-grid gap-2\">\n                                <button class=\"btn btn-primary btn-save\" type=\"button\">").concat(__('Save'), "</button>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n  </div>\n\n  <div class=\"modal p-modal\" tabindex=\"-1\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\"></h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n    <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n        aria-atomic=\"true\" data-bs-delay=\"3000\">\n        <div class=\"d-flex\">\n            <div class=\"toast-body\"></div>\n            <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n        </div>\n    </div>\n  </div>\n  ");
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
      firstLoad: true,
      ajaxQueue: 0
    },
    getData: function getData() {
      showLoader();
      var id = getPatientId();
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
            patient: {
              type: 'find',
              key: 'ic-patient',
              id: id,
              fields: '*'
            },
            settings: {
              type: 'get',
              key: 'ic-settings',
              fields: '*'
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

          if (response.patient.length == 0) {
            _this.initListeners('all');

            return;
          }

          _this.renderPage(response);

          _this.initHeader(response);

          _this.loadImages(response.patient);

          _this.initListeners('all');

          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    renderPage: function renderPage(response) {
      var d = document;
      var patient = response.patient,
          settings = response.settings;
      var sectionOpen = false;
      initBreadcrumbs([{
        link: link('https://dashboard/kenzap.cloud'),
        text: __('Dashboard')
      }, {
        link: link('/'),
        text: __('IC Patients')
      }, {
        link: link('/patient-list/'),
        text: __('Patient List')
      }, {
        text: __('Patient Card')
      }]);
      var html = '';
      console.log('renderPage');

      var _iterator = _createForOfIteratorHelper(settings.section_fields.split(/\r?\n/)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var cf = _step.value;
          if (!cf) continue;
          var field = cf.split('|');
          var id = slugify(field[0].trim(), {
            limit: 32
          });

          switch (field[1].trim()) {
            case 'section':
              if (sectionOpen) html += "</div>";
              html += "\n                    <div>\n                        <div class=\"".concat(sectionOpen ? 'mt-5' : '', " mb-4 d-flex justify-content-between\">\n                            <h4 class=\"card-title\">").concat(__(field[0].trim()), "</h4>\n                            <a href=\"#\" data-ecf=\"\" class=\"btn-section-edit\">\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\">\n                                <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n                                <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z\"/>\n                                </svg>\n                            </a>\n                        </div>\n                    ");
              sectionOpen = true;
              break;

            case 'text':
              html += "\n                    <div class=\"mb-3 d-flex justify-content-between\">\n                        <div class=\"col-auto\">\n                            <span class=\"form-text text-gray\">".concat(__(field[0].trim()), "</label>\n                        </div>\n                        <div class=\"col-auto\">\n                            <span class=\"form-text text-dark inp\" data-id=\"").concat(id, "\" data-title=\"").concat(__(field[0].trim()), "\" data-type=\"").concat(field[1].trim(), "\">").concat(patient[id] ? patient[id] : __('n/a'), "</span>\n                        </div>\n                    </div>\n                    ");
              break;

            case 'list':
              var list = 'n/a';

              if (patient[id]) {
                list = '';
                patient[id].split(/\r?\n/).forEach(function (val) {
                  list += '<div class="mb-1">' + val + '</div>';
                });
              }

              html += "\n\n                    <div class=\"mb-3 d-flex justify-content-between\">\n                        <div class=\"col-auto\">\n                            <span class=\"form-text text-gray\">".concat(__(field[0].trim()), "</label>\n                        </div>\n                        <div class=\"col-auto\">\n                            <span class=\"form-text text-dark inp text-end\" data-id=\"").concat(id, "\" data-title=\"").concat(__(field[0].trim()), "\" data-type=\"").concat(field[1].trim(), "\">").concat(list, "</span>\n                        </div>\n                    </div>\n                    ");
              break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (sectionOpen) html += "</div>";
      d.querySelector("#card-view").insertAdjacentHTML('beforeEnd', html);
      d.querySelector("#p-name").innerHTML = patient.name;
      d.querySelector("#p-bio").innerHTML = patient.bio;
      d.querySelector("#p-ldesc").value = patient.ldesc;
      document.querySelector('#p-status' + patient.status).checked = true;
      var pcats = document.querySelector('#p-cats');
      if (patient.cats) pcats.setAttribute('data-simple-tags', patient.cats);
      new simpleTags(pcats);
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
      console.log('initListeners ');
      onClick('.btn-section-edit', _this.listeners.editSection);
      onClick('.btn-modal', _this.listeners.modalSuccessBtn);
      if (!_this.state.firstLoad) return;
    },
    listeners: {
      editSection: function editSection(e) {
        e.preventDefault();
        var modal = document.querySelector(".modal");
        var modalCont = new bootstrap.Modal(modal);
        var sectionRow = e.currentTarget.parentNode.parentNode;
        modal.querySelector(".modal-title").innerHTML = __(sectionRow.querySelector(".card-title").innerHTML);
        modal.querySelector(".btn-primary").innerHTML = __('Save');
        modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
        var modalHTml = "\n            <div class=\"form-cont\">";

        var _iterator2 = _createForOfIteratorHelper(sectionRow.querySelectorAll(".inp")),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var field = _step2.value;
            var value = field.innerHTML.trim() == 'n/a' ? '' : field.innerHTML;

            switch (field.dataset.type) {
              case 'text':
                modalHTml += "\n                        <div class=\"form-group mb-3\">\n                            <label for=\"".concat(field.dataset.id, "\" class=\"form-label\">").concat(__(field.dataset.title), "</label>\n                            <input type=\"text\" class=\"form-control inp-m\" data-id=\"").concat(field.dataset.id, "\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(value, "\">\n                        </div>");
                break;

              case 'list':
                var valueList = value.replace('</div><div class="mb-1">', '\n');
                valueList = valueList.replace('<div class="mb-1">', '').replace('</div>', '');
                modalHTml += "\n                        <div class=\"form-group mb-3\">\n                            <label for=\"".concat(field.dataset.id, "\" class=\"form-label\">").concat(__(field.dataset.title), "</label>\n                            <textarea class=\"form-control inp-m\" data-id=\"").concat(field.dataset.id, "\" autocomplete=\"off\" placeholder=\"\" rows=\"7\" >").concat(valueList, "</textarea>\n                            <p class=\"form-text\">").concat(__('Provide one record per line.'), "</p>                        </div>");
                break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        modalHTml += "</div>";
        modal.querySelector(".modal-body").innerHTML = modalHTml;

        _this.listeners.modalSuccessBtnFunc = function (e) {
          e.preventDefault();
          var data = {};

          var _iterator3 = _createForOfIteratorHelper(modal.querySelectorAll(".inp-m")),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var field = _step3.value;
              data[field.dataset.id] = field.value;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          var id = getPatientId();
          var sid = getSiteId();
          fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'text/plain',
              'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
              'Kenzap-Token': getCookie('kenzap_token'),
              'Kenzap-Sid': sid
            },
            body: JSON.stringify({
              query: {
                patient: {
                  type: 'update',
                  key: 'ic-patient',
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
              console.log("updated");
              modalCont.hide();

              _this.getData();

              var toast = new bootstrap.Toast(document.querySelector('.toast'));
              document.querySelector('.toast .toast-body').innerHTML = __('Patient data updated');
              toast.show();
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
          if (modal.querySelector("input")) {
            modal.querySelector("input").focus();
          } else {
            if (modal.querySelector("textarea")) {
              modal.querySelector("textarea").focus();
            }
          }
        }, 100);
      },
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
      savePatient: function savePatient(e) {
        e.preventDefault();
        var data = {};

        var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll('.inp')),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var inp = _step4.value;
            data[inp.id.replace("p-", "")] = inp.value;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        data["cats"] = [];

        var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll('#p-cats ul li')),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var cat = _step5.value;
            data["cats"].push(cat.innerHTML.replace('<a>×</a>', '').trim());
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
        var id = getPatientId();
        var sid = getSiteId();
        showLoader();
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
            'Authorization': 'Bearer ' + getCookie('kenzap_api_key')
          },
          body: JSON.stringify({
            query: {
              patient: {
                type: 'update',
                key: 'ic-patient',
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
        console.log('savePatient');
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
            <p class="card-description"><a class="add-mix" href="#">+ add option</a> to differentiate price and patient options.</p>\
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
    loadImages: function loadImages(patient) {
      var d = document;
      var id = getPatientId();
      var sid = getSiteId();
      var t = '';

      for (var i = 0; i < 5; i++) {
        var img = patient.img !== undefined && patient.img[i] == 'true' ? 'https://preview.kenzap.cloud/S' + getSiteId() + '/_site/images/patient-' + patient.id + '-' + (i + 1) + '-100x100.jpeg?' + patient.updated : 'https://account.kenzap.com/images/placeholder.jpg';
        t += "          <div class=\"p-img-cont float-start\">            <p data-index=\"".concat(i, "\">              <img class=\"p-img images-").concat(i, "\" data-index=\"").concat(i, "\" width=\"100\" height=\"100\" src=\"").concat(img, "\" />              <span class=\"remove hd\" title=\"").concat(__('Remove'), "\">\xD7</span>            </p>            <input type=\"file\" name=\"img[]\" data-type=\"search\" data-index=\"").concat(i, "\" class=\"file aif-").concat(i, " d-none\">          </div>");
      }

      d.querySelector(".ic").innerHTML = t;
      onClick('.p-img-cont img', _this.listeners.openImage);
      onClick('.p-img-cont .remove', _this.listeners.removeImage);
      onChange('.p-img-cont .file', _this.listeners.previewImage);

      for (var fi = 0; fi < 5; fi++) {
        var image_url = CDN + '/S' + sid + '/patient-' + id + '-' + (parseInt(fi) + 1) + '-250.jpeg?' + patient.updated;
        setTimeout(function (img, sel, _fi) {
          var allow = true;

          if (typeof patient.img !== "undefined") {
            if (!patient.img[_fi]) allow = false;
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
          var id = getPatientId();
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
          fd.append('slug', 'patient-' + id + '-' + fi);
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

              document.querySelector('.toast .toast-body').innerHTML = __('Order updated');

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
        document.querySelector('.toast .toast-body').innerHTML = __('Order updated');
        toast.show();
        hideLoader();
      }
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
