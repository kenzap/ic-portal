// js dependencies
import { getSiteId, getPageNumber, getPagination, simulateClick, getCookie, initBreadcrumbs, parseApiError, formatStatus, formatPrice, formatTime, onClick, onKeyUp, link } from "../_/_helpers.js"
import { showLoader, hideLoader, initFooter } from "../_/_ui.js"
import { patientListContent } from "../_/_cnt_patient_list.js"
import { i18n } from "../_/_i18n.js"

// init localization function
const __ = i18n.__;
 
// public file storage
const CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';

// where everything happens
const _this = {
  
    state:{
        firstLoad: true,
        limit: 10, // number of records to load per table
    },
    init: () => {
         
        _this.getData();
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        // search content
        let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

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
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        id:         getCookie('lang')
                    },
                    patients: {
                        type:       'find',
                        key:        'ic-patient',
                        fields:     ['_id', 'id', 'img', 'status', 'price', 'name', 'updated'],
                        limit:      _this.state.limit,
                        offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,    // automatically calculate the offset of table pagination
                        search:     {                                                           // if s is empty search query is ignored
                                        field: 'name',
                                        s: s
                                    },
                        sortby:     {
                                        field: 'created',
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

                // initiate locale
                i18n.init(response.locale);

                // get core html content 
                _this.loadPageStructure();  

                // render table
                _this.renderPage(response);

                // init header
                _this.initHeader(response);

                // bind content listeners
                _this.initListeners();
            
                // init pagination
                _this.initPagination(response);

                // initiate footer
                _this.initFooter();

                // first load
                _this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    initHeader: (response) => {

        onClick('.nav-back', (e) => {

            e.preventDefault();
            let link = document.querySelector('.bc ol li:nth-last-child(2)').querySelector('a');
            simulateClick(link);
        });
    },
    authUser: (response) => {

        if(response.user){
            
            if(response.user.success == true){

                
            }
        }
    },
    loadPageStructure: () => {
  
        if(!_this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = patientListContent(__);
    },
    renderPage: (response) => {

        if(_this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __('Dashboard') },
                    { link: link('/'), text: __('IC Patients') },
                    { text: __('Patient list') }
                ]
            );

            // init table header
            document.querySelector(".table thead").innerHTML = `
                <tr>
                    <th>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1" viewBox="0 0 16 16" >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                    </th>
                    <th>
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <input type="text" placeholder="${ __('Search patients') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __('Search patients') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                        </div>
                        <span>${ __("Name") }</span>
                    </th>
                    <th>${ __("Alerts") }</th>
                    <th>${ __("Last anomalies") }</th>
                    <th>${ __("Last update") }</th>
                    <th></th>
                </tr>`;

        }

        // no patients in the list
        if (response.patients.length == 0) {

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6">${ __("No patients to display.") }</td></tr>`;
            // $( "#loader" ).fadeOut( "fast" );
            // initListeners();
            return;
        }

        let sid = getSiteId();

        // generate website table
        let list = '';
        for (let i in response.patients) {

            let img = 'https://account.kenzap.com/images/default_avatar.jpg';

            if(typeof(response.patients[i].img) === 'undefined') response.patients[i].img = [];
            // if(typeof(response.patients[i].img) !== 'undefined' && response.patients[i].img[0] == 'true') img = 'https://preview.kenzap.cloud/S1000452/_site/images/patient-'+response.patients[i].id+'-1-100x100.jpeg?1630925420';
            if(response.patients[i].img[0]) img = CDN + '/S'+sid+'/patient-'+response.patients[i]._id+'-1-100x100.jpeg?'+response.patients[i].updated;
              
            list += `
                <tr>
                    <td>
                        <div class="timgc">
                            <a href="${ link('/patient-view/?id='+response.patients[i]._id) }"><img src="${ img }" data-srcset="${ img }" class="img-fluid rounded-circle" alt="${ __("Patient placeholder") }" srcset="${ img }" ></a>
                        </div>
                    </td>
                    <td class="destt" style="max-width:250px;min-width:250px;">
                        <div class="mb-3 mt-3"> 
                            <a class="text-body" href="${ link('/patient-view/?id='+response.patients[i]._id) }" >${ response.patients[i].name }<i style="color:#9b9b9b;font-size:15px;margin-left:8px;" title="${ __("View patient") }" class="mdi mdi-pencil menu-icon edit-page"></i></a>
                        </div>
                    </td>
                    <td>
                        <span>${ formatStatus(response.patients[i].status) }</span>
                    </td>
                    <td>
                        <span>${ (response.patients[i].price) }</span>
                    </td>
                    <td>
                        <span>${ formatTime(response.patients[i].updated) }</span>
                    </td>
                    <td> 
                        <a href="#" data-id="${ response.patients[i]._id }" class="remove-patient text-danger ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </a>
                        <i title="${ __("Remove this patient") }" data-key="${ response.patients[i].id }" class="mdi mdi-trash-can-outline list-icon remove-patient"></i>
                    </td>
                </tr>`; 
        }

        // provide result to the page
        document.querySelector(".table tbody").innerHTML = list;
    },
    initListeners: () => {

        // _this.state.firstLoad ? 'all' : 'partial'

        // if(type == 'all'){

        // }

        // remove patient
        onClick('.remove-patient', _this.listeners.removePatient);

        // search patients activation
        onClick('.table-p-list .bi-search', _this.listeners.searchPatientsActivate);

        // break here if initListeners is called more than once
        if(!_this.state.firstLoad) return;

        // add patient modal
        onClick('.btn-add', _this.addPatient);

        // add patient confirm
        onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    },
    listeners: {

        removePatient: (e) => {

            e.preventDefault();

            let c = confirm( __('Completely remove this patient?') );

            if(!c) return;
  
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
                            type:       'delete',
                            key:        'ic-patient',   
                            id:         e.currentTarget.dataset.id,
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // modalCont.hide();

                    _this.getData();

                }else{

                    parseApiError(response);
                }
                
                console.log('Success:', response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
 
        },
 
        searchPatientsActivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

            // search patients
            onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchPatients);
        },
 
        searchPatients: (e) => {

            e.preventDefault();

            _this.getData();

            // console.log('search patients ' +e.currentTarget.value);
        },

        modalSuccessBtn: (e) => {
            
            console.log('calling modalSuccessBtnFunc');
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    addPatient: (e) => {

        let modal = document.querySelector(".modal");
        let modalCont = new bootstrap.Modal(modal);
        
        modal.querySelector(".modal-title").innerHTML = __('Add Patient');
        modal.querySelector(".btn-primary").innerHTML = __('Add');
        modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
        let d = ""; 
        let name = '', bio = '', note = '';
        let modalHTml = `\
        <div class="form-cont">\
            <div class="form-group mb-3">\
                <label for="p-name" class="form-label">${ __('Full Name') }</label>\
                <input type="text" class="form-control" id="p-name" autocomplete="off" placeholder="" value="${ name }">\
            </div>\
            <div class="form-group mb-3">\
                <label for="p-bio" class="form-label">${ __('Short Bio') }</label>\
                <input type="text" class="form-control" id="p-bio" autocomplete="off" placeholder="" value="${ bio }">\
            </div>\
            <div class="form-group mb-3">\
                <label for="p-note" class="form-label">${ __('Note') }</label>\
                <input type="text" class="form-control" id="p-note" autocomplete="off" placeholder="" value="${ note }">\
            </div>\
        </div>`;

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

        setTimeout( () => modal.querySelector("#p-title").focus(),100 );

    },
    initPagination: (response) => {

        getPagination(response.meta, _this.getData);
    },
    initFooter: () => {
        
        initFooter(__('Copyright © '+new Date().getFullYear()+' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('Kenzap Cloud Services - Dashboard'));
    }
}

_this.init();