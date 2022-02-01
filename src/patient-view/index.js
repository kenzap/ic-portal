// js dependencies
import { getSiteId, getPatientId, simulateClick, getCookie, parseApiError, onClick, onChange, loadScript, formatTime, initBreadcrumbs, link, slugify } from "../_/_helpers.js"
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
        response: {},
        modalCont: null,
        ajaxQueue: 0,
        record_limit: 20,
        symptoms: { warning: ['diarrhoea'], danger: ['hypertension', 'hypertension-stage-1', 'hypertension-stage-2'] },
        prescriptions: [],
        tabAnalytics: false
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
                    records:{
                        type:       'find',
                        key:        'ic-record',
                        fields:     '*',
                        limit:      _this.state.record_limit,
                        search:     {                                                           // if s is empty search query is ignored
                            field: 'patient_id',
                            s:  id
                        },
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

                _this.state.response = response;

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

        // render timeline
        let timeline = "";
        if(response.records) response.records.forEach( el => {

            let tags_html = "";
            el.tags.forEach(tag => {

                let status = 'secondary';
                
                if(_this.state.symptoms.danger.includes(tag)){
                    status = 'danger';
                }else if(_this.state.symptoms.warning.includes(tag)){
                    status = 'warning';
                }

                tags_html += `<div class="badge bg-${status} text-light fw-light me-1">${tag}</div>`;
            });

            timeline += `
            <li class="clearfix">
                <a target="_blank" href="#">${tags_html}</a>
                <p class="mb-1">${el.note}</p>
                <span class="float-end form-text text-muted">${new Date(el.time).toLocaleString()}</span>
            </li>
            `;
        });
        if(timeline == ''){ d.querySelector(".timeline").outerHTML = __('Currently, this patient has no active records.') }else{ d.querySelector(".timeline").innerHTML = timeline; }
        
        // render prescriptions
        let prescriptions = '';
        if(response.patient.prescriptions) { 
            
            prescriptions += '<table class="table table-hover table-borderless align-middle table-striped table-p-list">';
            _this.state.prescriptions = response.patient.prescriptions; response.patient.prescriptions.forEach( drug => {

                let img = 'https://cdn.kenzap.com/loading.png';

                // if(typeof(drug.img) === 'undefined') drug.img = [];
                // if(drug.img[0]) img = CDN + '/S'+getSiteId()+'/medication-'+drug.id+'-1-100x100.jpeg?'+drug.time;
            
                if(drug.img) img = CDN + '/S'+getSiteId()+'/medication-'+drug.id+'-1-100x100.jpeg?'+drug.time;

                prescriptions += `
                    <tr>
                        <td>
                            <div class="timgc">
                                <a href="${ link('/medication-edit/?id='+drug.id) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __("Drug placeholder") }" srcset="${ img }" ></a>
                            </div>
                        </td>
                        <td class="destt" style="max-width:250px;min-width:150px;">
                            <div class="mb-3 mt-3"> 
                                <a class="text-body" href="${ link('/medication-edit/?id='+drug.id) }" >${ drug.title }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __("Edit product") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                            </div>
                        </td>
                        <td class="since ">
                            <div class="float-end form-text text-muted">
                                ${ new Date(drug.since).toLocaleString() }
                            </div>
                        </td>
                        <td class="d-none">
                            <a href="#" data-id="${ drug.id }" class="remove-product text-danger ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </td>
                    </tr>`;
                console.log(drug);
            }); 
            prescriptions += '</table>';
        }
        if(prescriptions == ''){ prescriptions = __('Currently, this patient has no active prescriptions.') }
        d.querySelector(".prescriptions").innerHTML = prescriptions;

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
        
        // add record
        onClick('.btn-add', _this.listeners.addRecord);
        
        // add prescription
        onClick('.add-prescription', _this.listeners.addPrescription);

        // tab click listener
        onClick('#nav-tab-2-link', _this.listeners.tabAnalytics);
        
        // // remove variation block
        // onClick('.remove-block', _this.listeners.removeBlock);

        // // add variation option
        // onClick('.add-mix', _this.listeners.addMixOption);

        // // remove variation option
        // onClick('.remove-option', _this.listeners.removeOption);

    },
    listeners: {
        
        addRecord: (e) => {

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            
            modal.querySelector(".modal-title").innerHTML = __('Add Record');
            modal.querySelector(".btn-primary").innerHTML = __('Add');
            modal.querySelector(".btn-primary").style.display = "none";
            modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
            let d = ""; 
            let name = '', bio = '', note = '';
            let modalHTml = `\
            <div class="row">
                <div class="col col-click text-center">
                    <img src="/img/_img_cold.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Cold, runny nose</p>
                </div>
                <div class="col col-click text-center">
                    <img src="/img/_img_fever.png" style="width:100px;height:100px;" >
                    <p class="text-muted">High fever</p>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col col-click text-center">
                    <img src="/img/_img_stethoscope.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Blood pressure, heart</p>
                </div>
                <div class="col col-click text-center">
                    <img src="/img/_img_vomiting.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Vomitting</p>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col col-click text-center">
                    <img src="/img/_img_diarrhea.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Diarrhea</p>
                </div>
                <div class="col col-click text-center">
                    <img src="/img/_img_skin_disease.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Allergy, rash</p>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col col-click text-center">
                    <img src="/img/_img_cough.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Cough</p>
                </div>
                <div class="col col-click text-center">
                    <img src="/img/_img_headache.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Headache</p>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col col-click text-center">
                    <img src="/img/_img_conjunctivitis.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Conjunctivitis</p>
                </div>
                <div class="col col-click text-center">
                    <img src="/img/_img_pain.png" style="width:100px;height:100px;" >
                    <p class="text-muted">Muscle pain</p>
                </div>
            </div>
            `;

            modal.querySelector(".modal-body").innerHTML = modalHTml;

            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let data = {};
                data.name = modal.querySelector("#p-name").value;
                data.bio = modal.querySelector("#p-bio").value;
                data.note = modal.querySelector("#p-note").value;
                data.status = "0";
                data.img = [];
                data.cats = [];

                if(data.name.length<2){ alert(__('Please provide patient\'s full name')); return; }

                // send data
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
                            patient: {
                                type:       'create',
                                key:        'ic-patient',   
                                data:       data
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        // open patient editing page
                        window.location.href = `/patient-view/?id=${ response.patient.id}`

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
        },
        addPrescription: (e) => {

            let modal = document.querySelector(".modal");
            _this.state.modalCont = new bootstrap.Modal(modal);
            
            modal.querySelector(".modal-title").innerHTML = __('Manage prescription');
            modal.querySelector(".btn-primary").innerHTML = __('Confirm');
            modal.querySelector(".btn-primary").style.display = "none";
            modal.querySelector(".btn-secondary").innerHTML = __('Close');
            let d = "", sm = ""; 

            // do API query
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
                        medications: {
                            type:       'find',
                            key:        'ic-medication',
                            fields:     ['_id', 'id', 'img', 'status', 'cats', 'title', 'updated'],
                            limit:      _this.state.limit,
                            // offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,    // automatically calculate the offset of table pagination
                            search:     {                                                           // if s is empty search query is ignored
                                            field: 'title',
                                            s: sm
                                        },
                            sortby:     {
                                            field: 'title',
                                            order: 'DESC'
                                        }
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                // hide UI loader
                hideLoader();

                if(response.success){

                    let modalHTML = `\
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <input type="text" placeholder="Search drugs" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="Search products" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                        </div>
                        <table class="table table-hover table-borderless align-middle table-striped table-p-list mt-2">
                            <thead>
                                <tr>
                                    <th>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                        </svg>
                                    </th>
                                    <th>
                                        <span>Title</span>
                                    </th>
                                    <th class="float-end">Prescription</th>
                                </tr>
                            </thead>
                            <tbody>`;

                            response.medications.forEach( el => {

                                let img = 'https://cdn.kenzap.com/loading.png';

                                if(typeof(el.img) === 'undefined') el.img = [];
                                if(el.img[0]) img = CDN + '/S'+getSiteId()+'/medication-'+el._id+'-1-100x100.jpeg?'+el.updated;

                                // check if already prescribed
                                let checked = _this.state.prescriptions.filter( elf => elf.id == el._id).length ? 'checked="true"' : '';
                                modalHTML += `
                                    <tr>
                                        <td>
                                            <div class="timgc">
                                                <a href="${ link('/medication-edit/?id='+el._id) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded" alt="${ __("Product placeholder") }" srcset="${ img }" ></a>
                                            </div>
                                        </td>
                                        <td class="destt" style="max-width:250px;min-width:150px;">
                                            <div class="mb-3 mt-3"> 
                                                <a class="text-body" href="${ link('/medication-edit/?id='+el._id) }" >${ el.title }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __("Edit product") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check form-switch float-end">
                                                <input class="form-check-input toggle-prescribe" type="checkbox" data-img="${ el.img[0] }" data-id="${ el._id }" data-title="${ el.title }" role="switch" id="doPrescription" ${ checked }>
                                            </div>
                                        </td>
                                    </tr>`;
                            });

                            modalHTML += `
                            </tbody>
                        </table>`;

                        modal.querySelector(".modal-body").innerHTML = modalHTML;

                        _this.state.modalCont.show();

                        // prescription change listener
                        onChange('.toggle-prescribe', _this.listeners.doPrescription);

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });


            return;
            // get list of prescriptions and save changes
            _this.listeners.modalSuccessBtnFunc = (e) => {

                e.preventDefault();

                let data = {};
                data.name = modal.querySelector("#p-name").value;
      

                // if(data.name.length<2){ alert(__('Please provide patient\'s full name')); return; }

                // send data
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
                            patient: {
                                type:       'update',
                                key:        'ic-patient',   
                                sid:        getSiteId(),
                                id:         id,
                                data:       data
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        // open patient editing page
                        window.location.href = `/patient-view/?id=${ response.patient.id}`

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
        },
        doPrescription: (e) => {

            let c, id = e.currentTarget.dataset.id;
            if(e.currentTarget.checked){
                c = confirm(__('Are you sure you want to enable prescription?'))
                if(!c){ e.currentTarget.checked = false; return; }
            }else{
                c = confirm(__('Are you sure you want to cancel prescription?'))
                if(!c){ e.currentTarget.checked = true; return; }
            }

            // let data = { prescriptions: _this.state.prescriptions };
            let data = {};

            // add drug prescription
            if(e.currentTarget.checked){
           
                _this.state.prescriptions.push({'id': id, 'title': e.currentTarget.dataset.title, 'img': e.currentTarget.dataset.img, 'since':(new Date()).toISOString(), 'dosage':{}, 'periods':[], 'note': "", 'by': ""});
                data.prescriptions = _this.state.prescriptions;
            }

            // remove drug prescription
            if(!e.currentTarget.checked) {

                data.prescriptions = _this.state.prescriptions.filter(function(value, index, arr){ 
                    return value.id != id;
                });

                console.log("removing");
            }

            // send data
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
                        patient: {
                            type:       'update',
                            key:        'ic-patient',   
                            sid:        getSiteId(),
                            id:         getPatientId(),
                            data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // _this.state.modalCont.hide();
                    // _this.getData();
                    // open patient editing page
                    // window.location.href = `/patient-view/?id=${ response.patient.id}`

                }else{

                    parseApiError(response);
                }
                
                console.log('Success:', response);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            
            // let c = confirm(__('Are you sure you want to cancel prescription'))
            // console.log(e.currentTarget.checked)
        },
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

        tabAnalytics: (e) => {

            // dependencies already loaded
            if(_this.state.renderAnalytics) setTimeout(function(){ _this.renderAnalytics(); },300);

            // script loading callback
            let cb = () => {

                _this.state.tabAnalytics = true;
                setTimeout(function(){ _this.renderAnalytics(); },300);
            }

            // console.log("tab analytics");
            loadScript("https://www.gstatic.com/charts/loader.js", cb);  
        },

        modalSuccessBtn: (e) => {
            
            console.log('calling modalSuccessBtnFunc');
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    renderAnalytics: () => {

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        let data3 = [
            [__('Time'), __('Upper'), __('Lower')]
        ];
        if(_this.state.response.records) _this.state.response.records.forEach( el => {

            // hypertension
            if(el.tags.includes('hypertension')) if(el.values && el.time) data3.push([(new Date(el.time)).toLocaleString(), parseInt(el.values.upper), parseInt(el.values.lower)]);
  
            // TODO heart rate and other graphs
        });

        let data2 = [
            ['Year', 'Sales', 'Expenses'],
            ['2004',  1000,      400],
            ['2005',  1170,      460],
            ['2006',  660,       1120],
            ['2007',  1030,      540]
        ];
        console.log(data3);
        console.log(data2);

        function drawChart() {

          let data = google.visualization.arrayToDataTable(data3);
          let options = {
            title: __('Blood Pressure'),
            curveType: 'function',
            legend: { position: 'bottom' }
          };
  
          let chart = new google.visualization.LineChart(document.getElementById('chart'));
          chart.draw(data, options);
        }
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