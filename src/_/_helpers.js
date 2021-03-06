export const link = (slug) => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

    let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

    return slug + postfix;
}

export const getSiteId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('sid') ? urlParams.get('sid') : "";

    return id;
}

export const getPatientId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') ? urlParams.get('id') : "";
    return id;
}

export const getMedicationId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') ? urlParams.get('id') : "";
    return id;
}

export const getProductIdFromLink = () => {
    
    let url = new URL(window.location.href);
    let id = url.pathname.trim().split('/').slice(-2)[0];
    return id;
}

export const getPageNumber = () => {

    let url = window.location.href.split('/');
    let page = url[url.length-1];
    let pageN = 1;
    if(page.indexOf('page')==0){
      pageN = page.replace('page', '').replace('#', '');
    }
    // console.log(pageN);
    return parseInt(pageN);
}

export const getPagination = (meta, cb) => {

    if(typeof(meta) === 'undefined'){ document.querySelector("#listing_info").innerHTML = 'no records to display'; return; }

    let offset = meta.limit+meta.offset;
    if(offset>meta.total_records) offset = meta.total_records;

    document.querySelector("#listing_info").innerHTML = "Showing "+(1+meta.offset)+" to "+(offset)+" of "+meta.total_records+" entries";

    let pbc = Math.ceil(meta.total_records / meta.limit);
    // console.log(pbc);
    document.querySelector("#listing_paginate").style.display = (pbc < 2) ? "none" : "block";

    // page 1 

    // page 3
    // 1 2

    // page 5
    // 2 3 4 .. 

    let page = getPageNumber(); 
    let html = '<ul class="pagination d-flex justify-content-end pagination-flat">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    let i = 0;
    while(i<pbc){

        i++; 
        if(((i >= page-3) && (i <= page)) || ((i <= page+3) && (i >=page))){

            html += '<li class="paginate_button page-item '+((page==i)?'active':'')+'"><a href="#" aria-controls="order-listing" data-type="page" data-page="'+i+'" tabindex="0" class="page-link">'+(page==i?'..':i)+'</a></li>';      
        }
    }  
    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>'

    document.querySelector("#listing_paginate").innerHTML = html;

    let page_link = document.querySelectorAll(".page-link");
    for (const l of page_link) {
        l.addEventListener('click', function(e) {

            let p = parseInt(getPageNumber());
            let ps = p;
            switch(l.dataset.type){ 
                case 'prev': p-=1; if(p<1) p = 1; break;
                case 'page': p=l.dataset.page; break;
                case 'next': p+=1; if(p>pbc) p = pbc; break;
            }
            
            // update url
            if (window.history.replaceState) {

                let url = window.location.href.split('/page');
                let urlF = (url[0]+'/page'+p).replace('//page', '/page');

                // prevents browser from storing history with each change:
                window.history.replaceState("kenzap-cloud", document.title, urlF);
            }

            // only refresh if page differs
            if(ps!=p) cb();
            
            e.preventDefault();
            return false;
        });
    }
}

export const formatStatus = (st) => {

    st = parseInt(st); 
    switch(st){ 
      case 0: return '<div class="badge bg-warning text-dark fw-light">Archive</div>';
      case 1: return '<div class="badge bg-primary fw-light">Active</div>';
      case 3: return '<div class="badge bg-secondary fw-light">Experimental</div>';
      default: return '<div class="badge bg-secondary fw-light">Drafts</div>';
    }
}

export const formatApplication = (application) => {

    let html = '';
    if(Array.isArray(application)) application.forEach(val => {

        html += '<div class="badge bg-light text-dark fw-light me-1">'+val+'</div>'
    });

    return html;
}

export const formatPrice = (price) => {

    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", });
    if(typeof(price) === 'undefined' || price == '') price = 0;
    price = parseFloat(price);
    price = formatter.format(price);
    return price;
}

export const formatTime = (timestamp) => {
	
    let a = new Date(timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export const getCookie = (cname) => {

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// parse backend error to frontend
export const parseApiError = (data) => {

    // alert(data.reason);
    // return; 
    switch(data.code){

        // case 401: location.href="https://auth.kenzap.com/?redirectF.php?referral="+window.location.href; break;
        default: alert(data.reason); break;
    }
}

// init breadcrumbs navigation
export const initBreadcrumbs = (data) => {

    let html = '<ol class="breadcrumb mt-2 mb-0">';
    for(let bc of data){
        
        if(typeof(bc.link) === 'undefined'){

            html += `<li class="breadcrumb-item">${ bc.text }</li>`;
        }else{

            html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
        }
    }
    html += '</ol>';
    
    document.querySelector(".bc").innerHTML = html;
}

/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
 export const simulateClick = (elem) => {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};

// nums only validation
export const numsOnly = (e, max) => {

    // Only ASCII charactar in that range allowed 
    var ASCIICode = (e.which) ? e.which : e.keyCode 
    if (ASCIICode > 31 && ASCIICode != 46 && (ASCIICode < 48 || ASCIICode > 57)) 
    return false; 

    if(parseFloat(e.target.value)>max) 
    return false; 

    let dec = e.target.value.split('.');
    if(dec.length>1)
    if(dec[1].length>1)
        return false;
    
    return true; 
}

export const onClick = (sel, fn) => {

    // console.log('onClick');
    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('click', fn, true);
        e.addEventListener('click', fn, true);
    }
}

export const onKeyUp = (sel, fn) => {

    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('keyup', fn, true);
        e.addEventListener('keyup', fn, true);
    }
}

export const onChange = (sel, fn) => {

    // console.log('onChange');
    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('change', fn, true);
        e.addEventListener('change', fn, true);
    }
}

// time elapsed since creation 
export const timeConverterAgo = (now, time) => {

    now = parseInt(now);
    time = parseInt(time);
    
    // parse as elapsed time
    let past = now - time;
    if(past < 60) return 'moments ago';
    if(past < 3600) return parseInt(past / 60) + ' minutes ago';
    if(past < 86400) return parseInt(past / 60 / 24) + ' hours ago';

    // process as normal date
    var a = new Date(time * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

/**
 * @param string url
 * @return 
 */
export const loadScript = (url, cb) => {
    if (!Array.from(document.querySelectorAll('script')).some(elm => elm.src == url)) {
      let script = document.createElement('script')
      script.onload = cb
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)
    }
}

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
export const slugify = (s, opt) => {

	s = String(s);
	opt = Object(opt);
	
	var defaults = {
		'delimiter': '-',
		'limit': undefined,
		'lowercase': true,
		'replacements': {},
		'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
	};
	
	// Merge options
	for (var k in defaults) {
		if (!opt.hasOwnProperty(k)) {
			opt[k] = defaults[k];
		}
	}
	
	var char_map = {
		// Latin
		'??': 'A', '??': 'A', '??': 'A', '??': 'A', '??': 'A', '??': 'A', '??': 'AE', '??': 'C', 
		'??': 'E', '??': 'E', '??': 'E', '??': 'E', '??': 'I', '??': 'I', '??': 'I', '??': 'I', 
		'??': 'D', '??': 'N', '??': 'O', '??': 'O', '??': 'O', '??': 'O', '??': 'O', '????': 'O', 
		'??': 'O', '??': 'U', '??': 'U', '??': 'U', '??': 'U', '????': 'U', '??': 'Y', '??': 'TH', 
		'??': 'ss', 
		'??': 'a', '??': 'a', '??': 'a', '??': 'a', '??': 'a', '??': 'a', '??': 'ae', '??': 'c', 
		'??': 'e', '??': 'e', '??': 'e', '??': 'e', '??': 'i', '??': 'i', '??': 'i', '??': 'i', 
		'??': 'd', '??': 'n', '??': 'o', '??': 'o', '??': 'o', '??': 'o', '??': 'o', '????': 'o', 
		'??': 'o', '??': 'u', '??': 'u', '??': 'u', '??': 'u', '????': 'u', '??': 'y', '??': 'th', 
		'??': 'y',

		// Latin symbols
		'??': '(c)',

		// Greek
		'??': 'A', '??': 'B', '??': 'G', '??': 'D', '??': 'E', '??': 'Z', '??': 'H', '??': '8',
		'??': 'I', '??': 'K', '??': 'L', '??': 'M', '??': 'N', '??': '3', '??': 'O', '??': 'P',
		'??': 'R', '??': 'S', '??': 'T', '??': 'Y', '??': 'F', '??': 'X', '??': 'PS', '??': 'W',
		'????': 'A', '????': 'E', '????': 'I', '????': 'O', '????': 'Y', '????': 'H', '????': 'W', '????': 'I',
		'????': 'Y',
		'??': 'a', '??': 'b', '??': 'g', '??': 'd', '??': 'e', '??': 'z', '??': 'h', '??': '8',
		'??': 'i', '??': 'k', '??': 'l', '??': 'm', '??': 'n', '??': '3', '??': 'o', '??': 'p',
		'??': 'r', '??': 's', '??': 't', '??': 'y', '??': 'f', '??': 'x', '??': 'ps', '??': 'w',
		'????': 'a', '????': 'e', '????': 'i', '????': 'o', '????': 'y', '????': 'h', '????': 'w', '??': 's',
		'????': 'i', '????': 'y', '????': 'y', '????': 'i',

		// Turkish
		'????': 'S', '????': 'I', '??': 'C', '??': 'U', '??': 'O', '????': 'G',
		'????': 's', '????': 'i', '??': 'c', '??': 'u', '??': 'o', '????': 'g', 

		// Russian
		'????': 'A', '????': 'B', '????': 'V', '????': 'G', '????': 'D', '????': 'E', '????': 'Yo', '????': 'Zh',
		'????': 'Z', '????': 'I', '????': 'J', '????': 'K', '????': 'L', '????': 'M', '????': 'N', '????': 'O',
		'????': 'P', '?? ': 'R', '????': 'S', '????': 'T', '????': 'U', '????': 'F', '????': 'H', '????': 'C',
		'????': 'Ch', '????': 'Sh', '????': 'Sh', '????': '', '????': 'Y', '????': '', '????': 'E', '????': 'Yu',
		'????': 'Ya',
		'????': 'a', '????': 'b', '????': 'v', '????': 'g', '????': 'd', '????': 'e', '????': 'yo', '????': 'zh',
		'????': 'z', '????': 'i', '????': 'j', '????': 'k', '????': 'l', '????': 'm', '????': 'n', '????': 'o',
		'????': 'p', '????': 'r', '????': 's', '????': 't', '????': 'u', '????': 'f', '????': 'h', '????': 'c',
		'????': 'ch', '????': 'sh', '????': 'sh', '????': '', '????': 'y', '????': '', '????': 'e', '????': 'yu',
		'????': 'ya',

		// Ukrainian
		'????': 'Ye', '????': 'I', '????': 'Yi', '????': 'G',
		'????': 'ye', '????': 'i', '????': 'yi', '????': 'g',

		// Czech
		'????': 'C', '????': 'D', '????': 'E', '????': 'N', '????': 'R', '??': 'S', '????': 'T', '????': 'U', 
		'????': 'Z', 
		'????': 'c', '????': 'd', '????': 'e', '????': 'n', '????': 'r', '??': 's', '????': 't', '????': 'u',
		'????': 'z', 

		// Polish
		'????': 'A', '????': 'C', '????': 'e', '????': 'L', '????': 'N', '??': 'o', '????': 'S', '????': 'Z', 
		'????': 'Z', 
		'????': 'a', '????': 'c', '????': 'e', '????': 'l', '????': 'n', '??': 'o', '????': 's', '????': 'z',
		'????': 'z',

		// Latvian
		'????': 'A', '????': 'C', '????': 'E', '????': 'G', '????': 'i', '????': 'k', '????': 'L', '????': 'N', 
		'??': 'S', '????': 'u', '????': 'Z', 
		'????': 'a', '????': 'c', '????': 'e', '????': 'g', '????': 'i', '????': 'k', '????': 'l', '????': 'n',
		'??': 's', '????': 'u', '????': 'z'
	};
	
	// Make custom replacements
	for (var k in opt.replacements) {
		s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
	}
	
	// Transliterate characters to ASCII
	if (opt.transliterate) {
		for (var k in char_map) {
			s = s.replace(RegExp(k, 'g'), char_map[k]);
		}
	}
	
	// Replace non-alphanumeric characters with our delimiter
	var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
	s = s.replace(alnum, opt.delimiter);
	
	// Remove duplicate delimiters
	s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);
	
	// Truncate slug to max. characters
	s = s.substring(0, opt.limit);
	
	// Remove delimiter from ends
	s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');
	
	return opt.lowercase ? s.toLowerCase() : s;
}