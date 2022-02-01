// initiate header and related scripts
export const initHeader = (response) => {

    if(response.header) localStorage.setItem('header', response.header);

    let child = document.createElement('div');
    child.innerHTML = localStorage.getItem('header');
    child = child.firstChild;
    document.body.appendChild(child);

    // run header scripts
    eval(document.querySelector("#k-script").innerHTML);
}

// show loader
export const showLoader = () => {

    let el = document.querySelector(".loader");
    if (el) el.style.display = 'block';
}

// hide loader
export const hideLoader = () => {

    let el = document.querySelector(".loader");
    if (el) el.style.display = 'none';
}

// hide loader
export const initFooter = (left, right) => {

    document.querySelector("footer .row").innerHTML = `
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${left}</span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${right}</span>
    </div>`;
}

// categories input tags
export const simpleTags = (element) => {

    if (!element) {
        throw new Error("DOM Element is undifined! Please choose HTML target element.")
    }

    let DOMParent = element
    let DOMList
    let DOMInput
    let dataAttribute
    let arrayOfList

    function DOMCreate() {
        let ul = document.createElement("ul")
        let input = document.createElement("input")

        input.setAttribute('placeholder', 'new entry');

        DOMParent.appendChild(ul)
        DOMParent.appendChild(input)

        // first child is <ul>
        DOMList = DOMParent.firstElementChild
        // last child is <input>
        DOMInput = DOMParent.lastElementChild
    }

    function DOMRender() {
        // clear the entire <li> inside <ul>
        DOMList.innerHTML = ""

        // render each <li> to <ul>
        arrayOfList.forEach((currentValue, index) => {

            if (currentValue) {

                let li = document.createElement("li")
                li.innerHTML = `${currentValue} <a>&times;</a>`
                li.querySelector("a").addEventListener("click", function () {
                    onDelete(index)
                })

                DOMList.appendChild(li)
            }
        })

        setAttribute()
    }

    function onKeyUp() {
        DOMInput.addEventListener("keyup", function (event) {
            let text = this.value.trim()

            // check if ',' or 'enter' key was press
            if (text.includes(",") || event.keyCode === 13) {
                // check if empty text when ',' is remove
                if (text.replace(",", "") !== "") {
                    // push to array and remove ','
                    arrayOfList.push(text.replace(",", ""))
                }
                // clear input
                this.value = ""
            }

            DOMRender()
        })
    }

    function onDelete(id) {
        arrayOfList = arrayOfList.filter(function (currentValue, index) {
            if (index === id) {
                return false
            }
            return currentValue
        })

        DOMRender()
    }

    function getAttribute() {
        dataAttribute = DOMParent.getAttribute("data-simple-tags")
        dataAttribute = dataAttribute.split(",")

        // store array of data attribute in arrayOfList
        arrayOfList = dataAttribute.map((currentValue) => {
            return currentValue.trim()
        })
    }

    function setAttribute() {
        DOMParent.setAttribute("data-simple-tags", arrayOfList.toString())
    }

    getAttribute()
    DOMCreate()
    DOMRender()
    onKeyUp()
}
