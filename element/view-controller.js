let currentDocument = document.currentScript.ownerDocument;

class UIArrayInput extends HTMLElement{
  constructor(model){
    super();

    const templateID = '#ui-array-input-view';

    this.view = currentDocument.querySelector(templateID).content.cloneNode(true);
    this.appendChild(this.view);

    //WeakMap requires objects to be set, delete this, reference goes away
    this.ol = {ol: Symbol('ol')}
    this.li = {li: Symbol('li')}
    this.input = {li: Symbol('input')}
    this.label = {label: Symbol('label')}
    this.addButton = {addButton: Symbol('.add-button')}
    this.removeButton = {removeButton: Symbol('.remove-button')}

    //VIEWS
    this.views = new WeakMap();
    this.views.set(this.ol, this.querySelector('ol'))
    this.views.set(this.li, this.querySelectorAll('li'))
    this.views.set(this.label, this.querySelector('label'))
    this.views.set(this.addButton, this.querySelector('.add-button'))
    this.views.set(this.removeButton, this.querySelector('.remove-button'))

    //EVENTS
    this.views.get(this.addButton).addEventListener('click', e => { this.addInput(e) });
    this.views.get(this.removeButton).addEventListener('click', e => { this.removeInput(e) });

    this.attribute = {};
    this.attribute.name = this.getAttribute('name');
    this.attribute.data = this.getAttribute('data');
    this.attribute.label = this.getAttribute('label');
    this.attribute.data = JSON.parse(`${this.attribute.data}`)
    this.attribute.data.forEach(datum => { this.addInput(datum) })

    this.views.get(this.label).innerHTML = this.attribute.label;
  }

  addInput(datum){
    //If datum is mouse click
    if(datum.type == 'click'){
      datum.preventDefault();
      let newListItem = currentDocument.createElement('li');
      let newInput = currentDocument.createElement('input');
      newInput.setAttribute('name', this.attribute.name)
      newInput.setAttribute('placeholder', this.attribute.name)
      newListItem.appendChild(newInput);
      this.views.get(this.ol).appendChild(newListItem)
      //Button stuff
      if(this.views.get(this.ol).children.length){
        this.views.get(this.removeButton).disabled = false;
      }
    }
    else{
      let newListItem = currentDocument.createElement('li');
      let newInput = currentDocument.createElement('input');
      newInput.setAttribute('name', this.attribute.name)
      newInput.setAttribute('placeholder', this.attribute.name)
      newInput.setAttribute('value', datum)
      newListItem.appendChild(newInput);
      this.views.get(this.ol).appendChild(newListItem)
      //Button stuff
      if(this.views.get(this.ol).children.length){
        this.views.get(this.removeButton).disabled = false;
      }
    }
  }

  removeInput(e){
    e.preventDefault();
    let lastIndex = this.views.get(this.ol).children.length-1;
    let lastInput = this.views.get(this.ol).children[lastIndex];
    lastInput.parentNode.removeChild(lastInput);
    if(this.views.get(this.ol).children.length <= 0){
      this.views.get(this.removeButton).disabled =  true;
    }
  }

  ///STANDARD
  connectedCallback() {
    console.log('connected');
  }

  disconnectedCallback() {
    delete this.ol;
    delete this.li;
    delete this.input;
    delete this.label;
    delete this.addButton;
    delete this.removeButtons;
    console.log('disconnected');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('attributeChanged');
  }

  adoptedCallback(){
    console.log('adoptedCallback');
  }
}

window.customElements.define('ui-array-input', UIArrayInput);
