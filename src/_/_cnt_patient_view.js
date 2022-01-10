// html product list loader
export const HTMLContent = (__) => {

return `
  <div class="container p-edit">
    <div class="d-flex justify-content-between bd-highlight mb-3">
        <nav class="bc" aria-label="breadcrumb"></nav>
        <button class="btn btn-primary btn-add" type="button">${ __('Add record') }</button>
    </div>
    <div class="row">
        <div class="col-lg-9 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
            <div class="sections" id="sections" role="tablist" style="width:100%;">

                <div class="row">
                    <div class="col-12 grid-margin stretch-card">
                        <div class="alert alert-danger d-flex align-items-center" role="alert">
                            <svg class="bi flex-shrink-0 me-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                            </svg>
                            <div id="latest-alert">
                                An example danger alert with an icon
                            </div>
                        </div>
                        
                        <div class="card border-white shadow-sm p-sm-3">

                            <div class="card-body" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-3">
                                        <img src="https://account.kenzap.com/images/default_avatar.jpg" style="max-height:100px;" class="img-fluid rounded-circle" alt="Patient avatar">
                                    </div>
                                    <div class="col-md-9">
                                        <div class="">
                                            <h3 id="p-name" class="card-title mt-3"></h3>
                                            <p id="p-bio" class="card-text text-muted"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <nav class="card-body nav tab-content mt-1 mb-1" role="tablist">
                                <div class="nav nav-tabs" id="nav-tab" role="tablist"> 
                                    <a class="nav-link active" id="nav-tab-3-link" data-bs-toggle="tab" data-bs-target="#nav-tab-3" type="button" role="tab" aria-controls="nav-tab-3" aria-selected="true"  href="#">${ __('Recent records') }</a>
                                    <a class="nav-link" id="nav-tab-1-link" data-bs-toggle="tab" data-bs-target="#nav-tab-1" type="button" role="tab" aria-controls="nav-tab-1" aria-selected="true" href="#">${ __('General info') }</a>
                                    <a class="nav-link" id="nav-tab-2-link" data-bs-toggle="tab" data-bs-target="#nav-tab-2" type="button" role="tab" aria-controls="nav-tab-2" aria-selected="true" href="#">${ __('Abnormalities') }</a>
                                    <a class="nav-link" id="nav-tab-4-link" data-bs-toggle="tab" data-bs-target="#nav-tab-4" type="button" role="tab" aria-controls="nav-tab-4" aria-selected="true"  href="#">${ __('Prescriptions') }</a>
                                </div>
                            </nav>
                            
                            <div class="card-body tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-tab-3" role="tabpanel" aria-labelledby="nav-tab-3-link">

                                    <div class="card-body">
                                        <div class="mb-4">
                                            <h4>${ __('Recent records') }</h4>
                                            <ul class="timeline">
                                                <li class="clearfix">
                                                    <a target="_blank" href="https://www.totoprayogo.com/#">New Web Design</a>
                                                    <p class="mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula....</p>
                                                    <span class="float-end form-text text-muted">21 March, 2014</span>
                                                </li>
                                                <li class="clearfix">
                                                    <a href="#">21 000 Job Seekers</a>
                                                    <p class="mb-1">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                                    <span class="float-end form-text text-muted">4 March, 2014</span>
                                                </li>
                                                <li class="clearfix">
                                                    <a href="#">Awesome Employers</a>
                                                    <p class="mb-1">Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>
                                                    <span class="float-end form-text text-muted">1 April, 2014</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="tab-pane fade" id="nav-tab-1" role="tabpanel" aria-labelledby="nav-tab-1-link">
                                    <div id="card-view" class="card-body">
                                        <div id="placeholders" class="d-none">
                                            <h4 id="elan" class="card-title mb-4">${ __('Description') }</h4>
                                            <div class="mb-3">
                                                <label class="banner-name-l form-label" for="p-title">${ __('Full Name') }</label>
                                                <input type="text" class="form-control inp" id="p-title"
                                                    placeholder="${ __('Sushi set..') }">
                                                <p class="form-text"> </p>
                                            </div>

                                            <div class="mb-3">
                                                <label class="banner-descshort-l form-label" for="p-sdesc">${ __('Short Description') }</label>
                                                <textarea class="form-control inp" id="p-sdesc" placeholder="  " maxlength="120" rows="2"></textarea>
                                            </div>

                                            <div class="mb-3">
                                                <label class="banner-descshort-l form-label" for="desc">${ __('Images') }</label>
                                                <div class="clearfix"></div>
                                                <div class="ic"></div>
                                                <div class="clearfix"></div>
                                            </div>

                                            <div class="mb-3">
                                                <div class="clearfix"></div>
                                                <div style="clear:both;margin-top:16px;"></div>
                                                <label class="banner-descshort-l form-label" for="p-desc">${ __('Description') }</label>
                                                <textarea class="form-control inp" id="p-ldesc" placeholder=" " maxlength="2000" rows="10"></textarea>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div class="tab-pane fade" id="nav-tab-2" role="tabpanel" aria-labelledby="nav-tab-2-link">
        ...
                                </div>
                                <div class="tab-pane fade" id="nav-tab-3" role="tabpanel" aria-labelledby="nav-tab-3-link">
        ...
                                </div>
                                <div class="tab-pane fade" id="nav-tab-4" role="tabpanel" aria-labelledby="nav-tab-4-link">
        ...
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div class="col-lg-3 grid-margin grid-margin-lg-0 grid-margin-md-0">

            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                    <div class="card border-white shadow-sm p-sm-3">
                        <div class="card-body">

                            <h4 class="card-title" style="display:none;">${ __('General') }</h4>
                            <div class="landing_status"></div>
                            <input type="hidden" class="form-control" id="landing-slug" value="">

                            <h4 id="elan" class="card-title mb-4">Status</h4>
                            <div id="status-cont" class="mb-3">

                                <div class="col-sm-12">
                                    <div class="form-check">
                                        <label class="form-check-label status-publish form-label">
                                            <input type="radio" class="form-check-input" name="p-status"
                                                id="p-status1" value="1">
                                                ${ __('Published') }
                                        </label>
                                    </div>
                                </div>

                                <div class="col-sm-12">
                                    <div class="form-check">
                                        <label class="form-check-label status-draft form-label">
                                            <input type="radio" class="form-check-input" name="p-status"  id="p-status0" value="0">
                                            ${ __('Draft') }
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <h4 id="elan" class="card-title mb-4">Categories</h4>
                            <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>
                            <div class="clearfix"> </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-primary btn-save" type="button">${ __('Save') }</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>

  <div class="modal p-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-modal"></button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
            </div>
        </div>
    </div>
  </div>

  <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
    <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"
        aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">
            <div class="toast-body"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
  </div>
  `;
}