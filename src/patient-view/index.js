// js dependencies
import { getSiteId, getPatientId, simulateClick, getCookie, parseApiError, onClick, onChange, formatPrice, initBreadcrumbs, link, slugify } from "../_/_helpers.js"
import { showLoader, hideLoader, simpleTags } from "../_/_ui.js"
import { HTMLContent } from "../_/_cnt_patient_view.js"
import { i18n } from "../_/_i18n.js"
 
// references
const __ = i18n.__;

const CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';

// where everything happens
const _this = {

    init: () => {
        
        _this.getData(); 
    },
    state: {
        firstLoad: true,
        ajaxQueue: 0
    },
    getData: () => {

        // block ui during load
        showLoader();

        let id = getPatientId();
        let sid = getSiteId();

        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
                'Kenzap-Token': getCookie('kenzap_token'),
                'Kenzap-Sid': getSiteId(),
            },
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    patient: {
                        type:       'find',
                        key:        'ic-patient',
                        id:         id,   
                        fields:     '*'
                    },
                    settings: {
                        type:       'get',
                        key:        'ic-settings',
                        fields:     '*',
                    },
                    locale: {
                        type:       'locale',
                        id:         'en'
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if (response.success){

                // init locale
                i18n.init(response.locale);
  
                // get core html content 
                document.querySelector('#contents').innerHTML = HTMLContent(__);

                // check patient response
                if (response.patient.length == 0) {
             
                    // $(".list").html(/*html*/`<tr><td colspan="3">No patients to display. Please create one by clicking on the button above.</td></tr>`);
                    // $( "#loader" ).fadeOut( "fast" );
                    _this.initListeners('all');
                    return;
                }

                // let st = parseInt(data.list[i].status);
                let img = 'https://cdn.kenzap.com/loading.png';

                // if(typeof(response.patient[i].img) !== 'undefined' && response.patient[i].img[0] == 'true') img = 'https://preview.kenzap.cloud/S1000452/_site/images/patient-'+response.patient[i].id+'-1-100x100.jpeg?1630925420';
                
                // bind frontend data
                _this.renderPage(response);

                // init header
                _this.initHeader(response);

                // load images if any
                _this.loadImages(response.patient);

                // init page listeners
                _this.initListeners('all');
            
                // first load
                _this.state.firstLoad = false;
            }else{

                parseApiError(response);
            }
            
            // console.log('Success:', response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    renderPage: (response) => {

        let d = document;
        let patient = response.patient, settings = response.settings;
        let sectionOpen = false;

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard/kenzap.cloud'), text: __('Dashboard') },
                { link: link('/'), text: __('IC Patients') },
                { link: link('/patient-list/'), text: __('Patient List') },
                { text: __('Patient Card') }
            ]
        );

        let html = '';

        console.log('renderPage');

        // render custom fields
        for (let cf of settings.section_fields.split(/\r?\n/)){

            // skip empty rows
            if(!cf) continue;

            let field = cf.split('|');
            let id = slugify(field[0].trim(), {limit: 32});
            
            // console.log(field);
            switch(field[1].trim()){
                case 'section':

                    if(sectionOpen) html += `</div>`;

                    html += `
                    <div>
                        <div class="${ sectionOpen ? 'mt-5':'' } mb-4 d-flex justify-content-between">
                            <h4 class="card-title">${ __(field[0].trim()) }</h4>
                            <a href="#" data-ecf="" class="btn-section-edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </a>
                        </div>
                    `;

                    sectionOpen = true

                break;
                case 'text':

                    html += `
                    <div class="mb-3 d-flex justify-content-between">
                        <div class="col-auto">
                            <span class="form-text text-gray">${ __(field[0].trim()) }</label>
                        </div>
                        <div class="col-auto">
                            <span class="form-text text-dark inp" data-id="${ id }" data-title="${ __(field[0].trim()) }" data-type="${ field[1].trim() }">${ patient[id] ? patient[id] : __('n/a') }</span>
                        </div>
                    </div>
                    `;

                break;
                case 'list':

                    let list = 'n/a';
                    if(patient[id]){

                        // list = '<ul>';
                        list = '';
                        patient[id].split(/\r?\n/).forEach( val => { list += '<div class="mb-1">' + val + '</div>'; });
                        // list += '<ul>';
                    }

                    html += `

                    <div class="mb-3 d-flex justify-content-between">
                        <div class="col-auto">
                            <span class="form-text text-gray">${ __(field[0].trim()) }</label>
                        </div>
                        <div class="col-auto">
                            <span class="form-text text-dark inp text-end" data-id="${ id }" data-title="${ __(field[0].trim()) }" data-type="${ field[1].trim() }">${ list }</span>
                        </div>
                    </div>
                    `;

                break;
            }
            // 
            // console.log(cf.trim());
        }
    
        if(sectionOpen) html += `</div>`;

        d.querySelector("#card-view").insertAdjacentHTML('beforeEnd', html); 

        // general section
        d.querySelector("#p-name").innerHTML = patient.name;
        d.querySelector("#p-bio").innerHTML = patient.bio;
        d.querySelector("#p-ldesc").value = patient.ldesc;

        // init status box
        document.querySelector('#p-status'+patient.status).checked = true;

        // init categories
        let pcats = document.querySelector('#p-cats');
        if (patient.cats) pcats.setAttribute('data-simple-tags', patient.cats);
        const tags = new simpleTags(pcats);
    },
    initHeader: (response) => {

        onClick('.nav-back', (e) => {

            e.preventDefault();
            console.log('.nav-back');
            let link = document.querySelector('.bc ol li:nth-last-child(2)').querySelector('a');
            simulateClick(link);
        });
    },
    initListeners: (type = 'partial') => {

        console.log('initListeners ');

        // add patient modal
        onClick('.btn-section-edit', _this.listeners.editSection);

        // add patient confirm
        onClick('.btn-modal', _this.listeners.modalSuccessBtn);
        
        // break here if initListeners is called more than once
        if(!_this.state.firstLoad) return;
        
        // // add variation block
        // onClick('.add-mix-block', _this.listeners.addMixBlock);
        
        // // edit variation block
        // onClick('.edit-block', _this.listeners.editBlock);

        // // remove variation block
        // onClick('.remove-block', _this.listeners.removeBlock);

        // // add variation option
        // onClick('.add-mix', _this.listeners.addMixOption);

        // // remove variation option
        // onClick('.remove-option', _this.listeners.removeOption);

    },
    listeners: {

        editSection: (e) => {

            e.preventDefault();

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            
            let sectionRow = e.currentTarget.parentNode.parentNode;

            modal.querySelector(".modal-title").innerHTML = __(sectionRow.querySelector(".card-title").innerHTML);
            modal.querySelector(".btn-primary").innerHTML = __('Save');
            modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
            
            let modalHTml = `
            <div class="form-cont">`;

            // structure custom edit fields
            for(let field of sectionRow.querySelectorAll(".inp")){

                let value = field.innerHTML.trim() == 'n/a' ? '' : field.innerHTML;
                switch(field.dataset.type){

                    case 'text' :

                        modalHTml += `
                        <div class="form-group mb-3">
                            <label for="${ field.dataset.id }" class="form-label">${ __(field.dataset.title) }</label>
                            <input type="text" class="form-control inp-m" data-id="${ field.dataset.id }" autocomplete="off" placeholder="" value="${ value }">
                        </div>`;
                        break;

                    case 'list' :

                        let valueList = value.replace('</div><div class="mb-1">','\n');
                        valueList = valueList.replace('<div class="mb-1">','').replace('</div>','');
                        modalHTml += `
                        <div class="form-group mb-3">
                            <label for="${ field.dataset.id }" class="form-label">${ __(field.dataset.title) }</label>
                            <textarea class="form-control inp-m" data-id="${ field.dataset.id }" autocomplete="off" placeholder="" rows="7" >${ valueList }</textarea>
                            <p class="form-text">${ __('Provide one record per line.') }</p>\
                        </div>`;
                        break;

                }
            }

            modalHTml += `</div>`;

            modal.querySelector(".modal-body").innerHTML = modalHTml;
    
            _this.listeners.modalSuccessBtnFunc = (e) => {
    
                e.preventDefault();
    
                let data = {};
                for(let field of modal.querySelectorAll(".inp-m")){

                    data[field.dataset.id] = field.value;
                }
                
                // data.name = modal.querySelector("#p-name").value;
                // data.bio = modal.querySelector("#p-bio").value;
                // data.note = modal.querySelector("#p-note").value;
                // data.status = "0";
                // data.img = [];
                // data.cats = [];
    
                // if(data.name.length<2){ alert(__('Please provide patient\'s full name')); return; }
    
                let id = getPatientId();
                let sid = getSiteId();

                // send data
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'text/plain',
                        'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
                        'Kenzap-Token': getCookie('kenzap_token'),
                        'Kenzap-Sid': sid,
                    },
                    body: JSON.stringify({
                        query: {
                            patient: {
                                type:       'update',
                                key:        'ic-patient',
                                id:         id,         
                                sid:        sid,
                                data:       data
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {
    
                    if (response.success){
    
                        console.log("updated");

                        modalCont.hide();

                        _this.getData();
                        // open patient editing page
                        // window.location.href = `/patient-view/?id=${ response.patient.id}`
    
                        let toast = new bootstrap.Toast(document.querySelector('.toast'));
                        document.querySelector('.toast .toast-body').innerHTML = __('Patient data updated');  
                        toast.show();

                    }else{
    
                        parseApiError(response);
                    }
                    
                    console.log('Success:', response);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    
                console.log('savepatient');
    
            }
    
            modalCont.show();
    
            setTimeout( () => { if(modal.querySelector("input")){ modal.querySelector("input").focus(); }else{ if(modal.querySelector("textarea")){ modal.querySelector("textarea").focus(); } } }, 100);
        },

        editBlock: (e) => {

            e.preventDefault();

            let amb = document.querySelector('.add-mix-block');
            amb.dataset.action = 'edit';
            amb.dataset.index = e.currentTarget.dataset.index;
            setTimeout(() => simulateClick(amb), 10);

            console.log('editBlock');
        },

        removeBlock: (e) => {

            e.preventDefault();

            let c = confirm(__('Remove entire block?'));
            if(c){ 
                e.currentTarget.parentNode.parentNode.remove();
                // e.currentTarget.parentElement.parentElement.remove();
             }

            console.log('removeBlock');
        },

        addMixBlock: (e) => {

            e.preventDefault();

            let action = e.currentTarget.dataset.action; // $(this).attr('data-action');
            let index = e.currentTarget.dataset.index; // $(this).attr('data-index');
            e.currentTarget.dataset.action = 'add'; // $(this).attr('data-action', 'add');

            console.log('index: ' + index);

            // init defaults
            let modal_title = __('Add Variation Block');
            let title = "";
            let type = "";
            let required = 0;
            let modal_btn = __('Add'), modal_cancel_btn = __('Cancel');

            // override defaults in editing mode
            if(action == 'edit'){

                modal_title = __('Edit Variation Block');

                title = document.querySelector(".var-block[data-index='"+index+"']").dataset.title;
                type  = document.querySelector(".var-block[data-index='"+index+"']").dataset.type;
                required = parseInt(document.querySelector(".var-block[data-index='"+index+"']").dataset.required);

                modal_btn = __('Save');
            }

            let pmodal = document.querySelector(".p-modal");
            let pmodalCont = new bootstrap.Modal(pmodal);
            
            pmodal.querySelector(".modal-title").innerHTML = modal_title;
            pmodal.querySelector(".btn-primary").innerHTML = modal_btn;
            pmodal.querySelector(".btn-secondary").innerHTML = modal_cancel_btn;

            pmodalCont.show();

            let modalHTml = `\
            <div class="form-cont">\
                <div class="form-group mb-3">\
                    <label for="mtitle" class="form-label">${ __('Save') }</label>\
                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="Rice type" value="${ title }">\
                </div>\
                <div class="form-group mb-3">\
                    <label for="mtype" class="form-label">${ __('Input type') }</label>\
                    <select id="mtype" class="form-control " >\
                        <option ${ type=='radio'?'selected="selected"':'' } value="radio">${ __('Radio buttons') }</option>\
                        <option ${ type=='checkbox'?'selected="selected"':'' } value="checkbox">${ __('Checkboxes') }</option>\
                    </select>\
                    <p class="card-description">${ __('Define how this renders on frontend.') }</p>\
                </div>\
                <div class="form-group mb-3">\
                    <div class="form-check">\
                        <label for="id="mtype"" class="form-check-label form-label">\
                            <input id="mrequired" type="checkbox" class="form-check-input" ${ required==1?'checked="checked"':'' } value="1">\
                            ${ __('Required') }\
                        </label>\
                    </div>\
                    <p class="card-description">${ __('Make this variation mandatory for users.') }</p>\
                </div>\
                <div class="form-group mb-3 dn">\
                    <label for="mtype" class="form-label">${ __('Minimum required') }</label>\
                    <select id="mtype" class="form-control " >\
                        <option value="1">1</option>\
                        <option value="2">2</option>\
                    </select>\
                </div>\
            </div>`;

            pmodal.querySelector(".modal-body").innerHTML = modalHTml;

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let mtitle = pmodal.querySelector(".p-modal #mtitle").value;
                let mtype = pmodal.querySelector(".p-modal #mtype").value;
                let mrequired = pmodal.querySelector(".p-modal #mrequired:checked");
                mrequired = mrequired == null ? 0 : mrequired.value == "1" ? 1 : 0;
            
                if(mtitle.length<2){ alert(__('Please provide longer title')); return; }

                // add mix and match
                let data = []; data['title'] = mtitle; data['type'] = mtype; data['required'] = mrequired; data['index'] = document.querySelectorAll(".var-block").length;
                if(action == 'edit'){

                    document.querySelector(".var-block[data-index='"+index+"']").dataset.title = mtitle;
                    document.querySelector(".var-block[data-index='"+index+"']").dataset.type = mtype;
                    document.querySelector(".var-block[data-index='"+index+"']").dataset.required = mrequired;
                    document.querySelector(".var-block[data-index='"+index+"'] .title").innerHTML = mtitle;
                }

                if(action == 'add'){

                    if(document.querySelector(".variation-blocks .var-block") == null){
                        document.querySelector(".variation-blocks").innerHTML = _this.structMixBlock(data);
                    }else{
                        document.querySelector(".variation-blocks .var-block:last-of-type").insertAdjacentHTML('afterend', _this.structMixBlock(data));
                    }
                }

                pmodalCont.hide();

                setTimeout(() => _this.initListeners('partial'), 10);
            }

            console.log('addMixBlock');
        },

        addMixOption: (e) => {

            let block_el = e.currentTarget;
            e.preventDefault();

            let pmodal = document.querySelector(".p-modal");
            let pmodalCont = new bootstrap.Modal(pmodal);
            
            pmodalCont.show();

            pmodal.querySelector(".modal-title").innerHTML = __('Add Variation');
            pmodal.querySelector(".btn-primary").innerHTML = __('Add');
            pmodal.querySelector(".btn-secondary").innerHTML = __('Cancel');

            let modalHTML = `\
            <div class="form-cont">\
                <div class="form-group">\
                    <label for="mtitle" class="form-label">${ __('Title') }</label>\
                    <input type="text" class="form-control" id="mtitle" autocomplete="off" placeholder="${ __('Brown rice') }">\
                </div>\
                <div class="form-group">\
                    <label for="mprice" class="form-label">${ __('Price') }</label>\
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input id="mprice" type="text" class="form-control" placeholder="0.00" value="" >\
                        <p class="card-description">${ __('You can change default currency under Dashboard &gt; Settings.') }</p>\
                    </div>\
                </div>\
            </div>`;

            pmodal.querySelector(".modal-body").innerHTML = modalHTML;

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                // validate
                let mtitle = pmodal.querySelector(".p-modal #mtitle").value;
                let mprice = pmodal.querySelector(".p-modal #mprice").value;
                if(mtitle.length<2){ alert("Please provide longer title"); return; }

                let data = []; data['title'] = mtitle; data['price'] = mprice; data['type'] = block_el.parentElement.parentElement.dataset.type;
                let sel = ".var-block[data-index='"+block_el.parentElement.parentElement.dataset.index+"']";
                console.log(sel);
                
                if(document.querySelector(sel + " .offer-pricef li") == null){
                    document.querySelector(sel + " .offer-pricef").innerHTML = _this.structMixRow(data);
                }else{
                    document.querySelector(sel + " .offer-pricef li:last-of-type").insertAdjacentHTML('afterend', _this.structMixRow(data));
                }

                pmodalCont.hide();

                setTimeout(() => _this.initListeners('partial'), 10);
            };
        },

        removeOption: (e) => {

            e.preventDefault();
            
            if( confirm('Remove option?') ) e.currentTarget.parentElement.remove();

            console.log('removeOption');
        },

        savePatient: (e) => {
            
            e.preventDefault();

            let data = {};

            // iterate through input fields
            for( let inp of document.querySelectorAll('.inp') ){

                data[inp.id.replace("p-","")] = inp.value;
            }

            // map categories
            data["cats"] = [];
            for( let cat of document.querySelectorAll('#p-cats ul li') ){

                data["cats"].push(cat.innerHTML.replace('<a>×</a>','').trim());
            }
             
            // link uploaded images
            data["img"] = [];
            for( let img of document.querySelectorAll('.p-img') ){

                let tf = !img.getAttribute('src').includes("placeholder") ? true : false;
                data["img"].push(tf);
            }
            
            // status
            data["status"] = document.querySelector('input[name="p-status"]:checked').value;
   
            // map mix and match
            data["variations"] = [];
            let block_index = 0;
            for( let block of document.querySelectorAll('.variation-blocks .var-block') ){

                let option_index = 0;
                for( let option of block.querySelectorAll('.offer-pricef li') ){

                    if(typeof(data["variations"][block_index]) === 'undefined')
                    data["variations"][block_index] = 
                    { 
                        'title': block.getAttribute('data-title'),
                        'type': block.getAttribute('data-type'),
                        'required': block.getAttribute('data-required'),
                        'data': []
                    };
                    
                    data["variations"][block_index]['data'][option_index] = 
                    {
                        'title': option.getAttribute('data-title'),
                        'price': option.getAttribute('data-price'),
                        'cond': option.getAttribute('data-cond')
                    };
                    option_index++;
                }
                block_index++;
            }

            console.log(data);
        
            let id = getPatientId();
            let sid = getSiteId();

            showLoader();

            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain',
                    'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
                },
                body: JSON.stringify({
                    query: {
                        patient: {
                            type:       'update',
                            key:        'ic-patient',
                            id:         id,         
                            sid:        sid,
                            data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // upload desc images
                    _this.uploadImages();
            
                    // successfully changed
                    // if(ajaxQueue==0){
            
                    // iqwerty.toast.toast('changes applied', toast);
                    // // $( "#loader" ).fadeOut( "fast" );
                    // }
                    
                }else{

                    parseApiError(response);
                }
                
                console.log('Success:', response);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            console.log('savePatient');
        },

        openImage: (e) => {

            e.preventDefault();
            simulateClick(document.querySelector(".aif-"+e.currentTarget.dataset.index));
        },

        previewImage: (e) => {

            e.preventDefault();

            let input = e.currentTarget;
            let toast = new bootstrap.Toast(document.querySelector('.p-toast'));

            if (input.files && input.files[0]) {

                // check image type
                if(input.files[0].type != 'image/jpeg' && input.files[0].type != 'image/jpg' && input.files[0].type != 'image/png'){

                    document.querySelector('.p-toast .toast-body').innerHTML = __('Please provide image in JPEG format');  
                    toast.show();
                    return;
                }
          
                // check image size
                if(input.files[0].size > 5000000){

                    document.querySelector('.p-toast .toast-body').innerHTML = __('Please provide image less than 5 MB in size!');  
                    toast.show();
                    return;
                }

                let index = input.dataset.index;
                let reader = new FileReader();
                reader.onload = function(e) {
                  
                    console.log('target '+e.currentTarget.result);
                    document.querySelector('.images-'+index).setAttribute('src', e.currentTarget.result);
                }
                reader.readAsDataURL(input.files[0]);

                e.currentTarget.parentElement.querySelector('.remove').classList.remove("hd");
            }
        },

        removeImage: (e) => {

            let index = e.currentTarget.parentElement.dataset.index;
            document.querySelector('.aif-' + index).value = '';
            document.querySelector('.images-'+index).setAttribute('src', 'https://account.kenzap.com/images/placeholder.jpg');
            e.currentTarget.classList.add("hd");

            // $(this).addClass("hd");
            // $(".aif-"+$(this).parent().data("index")).val('');
            // $(".images-"+$(this).parent().data("index")).attr('src','https://account.kenzap.com/images/placeholder.jpg');
            // $(this).addClass("hd");
        },

        modalSuccessBtn: (e) => {
            
            console.log('calling modalSuccessBtnFunc');
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },

    structMixBlock: (data) => {

        let html = '\
        <div class="mb-4 var-block mw" data-title="'+data.title+'" data-type="'+data.type+'" data-required="'+data.required+'" data-index="'+data.index+'" >\
            <label for="offer-pricef" class="form-label pb-2"><span class="title">' + data.title + '</span>\
                &nbsp;&nbsp;\
                <svg class="bi bi-pencil-fill edit-block ms-4" title="edit block" data-index="'+data.index+'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">\
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>\
                </svg>\
                <svg class="bi bi-trash remove-block ms-4" title="edit block" data-index="'+data.index+'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" viewBox="0 0 16 16">\
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
    structMixRow: (data) => {

        return '\
        <li data-title="'+data.title+'" data-price="'+data.price+'" data-cond="" class="pt-2 pb-2"><div class="form-check"><label class="form-check-label form-label"><input class="'+data.type+' form-check-input" type="'+data.type+'" checked="" data-ft="'+data.title+'">'+data.title+' &nbsp;&nbsp;&nbsp; '+formatPrice(data.price)+'</label></div>\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ff0079" class="remove-option bi bi-x-circle" viewBox="0 0 16 16">\
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\
            </svg>\
        </li>';
    },
    loadImages: (patient) => {

        let d = document;
        let lang = 'en';
        let offer_id = '0';
        let id = getPatientId();
        let sid = getSiteId();
        let t = '';
        for(let i=0;i<5;i++){
     
          let img = (patient.img !== undefined && patient.img[i] == 'true') ? 'https://preview.kenzap.cloud/S'+getSiteId()+'/_site/images/patient-'+patient.id+'-'+(i+1)+'-100x100.jpeg?'+patient.updated:'https://account.kenzap.com/images/placeholder.jpg';
          t+=`\
          <div class="p-img-cont float-start">\
            <p data-index="${i}">\
              <img class="p-img images-${i}" data-index="${i}" width="100" height="100" src="${img}" />\
              <span class="remove hd" title="${ __('Remove') }">×</span>\
            </p>\
            <input type="file" name="img[]" data-type="search" data-index="${i}" class="file aif-${i} d-none">\
          </div>`;
        }
        
        d.querySelector(".ic").innerHTML = t;
    
        // new image listener
        onClick('.p-img-cont img', _this.listeners.openImage);

        // new remove listener
        onClick('.p-img-cont .remove', _this.listeners.removeImage);

        // image preview listener
        onChange('.p-img-cont .file', _this.listeners.previewImage);
    
        // iterate all images
        for(let fi=0; fi<5; fi++){
    
            // async load image to verify if it exists on CDN 
            let image_url = CDN+'/S'+sid+'/patient-'+id+'-'+(parseInt(fi)+1)+'-250.jpeg?'+patient.updated;
            setTimeout(function(img, sel, _fi){
        
                let allow = true;
                if(typeof(patient.img)!=="undefined"){ if(!patient.img[_fi]) allow = false; }
                if(allow){

                    let i = new Image();
                    i.onload = function(){
                        d.querySelector(sel+_fi).setAttribute('src', img);
                        d.querySelector(sel+_fi).parentElement.querySelector('.remove').classList.remove('hd');
                    };
                    i.src=img;
                }
            }, 300, image_url, ".images-", fi );
        }
    },
    // general method for image upload
    uploadImages: () => {

        if( document.querySelector(".imgupnote") ) document.querySelector(".imgupnote").remove();

        let fi = 0;
        for( let fileEl of document.querySelectorAll(".file") ){

            fi += 1;

            let id = getPatientId();
            let sid = getSiteId();

            // console.log(file);
            let file = fileEl.files[0];
            if(typeof(file) === "undefined") continue;

            // TODO add global sizes setting 
            let fd = new FormData();
            // let sizes = document.querySelector("body").dataset.sizes;
            let sizes = '1000|500|250|100x100';

            fd.append('id', id);
            fd.append('sid', sid);
            fd.append('pid', id);
            fd.append('key', 'image');
            fd.append('sizes', sizes);
            // fd.append('field', file);
            fd.append('file', file);
            fd.append('slug', 'patient-'+id+'-'+fi);
            fd.append('token', getCookie('kenzap_token'));

            // clear input file so that its not updated again
            file.value = '';

            _this.state.ajaxQueue+=1;

            fetch("https://api-v1.kenzap.cloud/upload/",{
                body: fd,
                method: "post"
            })
            .then(response => response.json())
            .then(response => {

                _this.state.ajaxQueue -= 1;
                if(response.success && _this.state.ajaxQueue == 0){

                    let toast = new bootstrap.Toast(document.querySelector('.toast'));
                    document.querySelector('.toast .toast-body').innerHTML = __('Order updated');  
                    toast.show();

                    // hide UI loader
                    hideLoader();
                }
            });
        }
        
        // image upload notice
        if(_this.state.ajaxQueue == 0){

            let toast = new bootstrap.Toast(document.querySelector('.toast'));
            document.querySelector('.toast .toast-body').innerHTML = __('Order updated');  
            toast.show();

            hideLoader();
        }
    }
}

_this.init();