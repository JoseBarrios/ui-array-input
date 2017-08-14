const uiArrayInputDocument = document._currentScript || document.currentScript;
const uiArrayInputTemplate = uiArrayInputDocument.ownerDocument.querySelector('#ui-array-input-view');

class UIArrayInput extends HTMLElement{

	static get observedAttributes(){
		return ['name', 'placeholder', 'label', 'value'];
	}

  constructor(model){
    super();
		this.model = model || {};
		const view = document.importNode(uiArrayInputTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
		//this.appendChild(view);
		this.addEventListener('submit', e => { console.log('SUBNIT', e) })
	}

  connectedCallback() {
		this.$label = this.shadowRoot.querySelector('label');
		this.$form = this.shadowRoot.querySelector('form');
		//this.$ol = this.shadowRoot.querySelector('ol');

		//this.$label = this.querySelector('label');
		//this.$ol = this.querySelector('ol');
		this._updateRendering();
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('ATTRIBUTE', attrName, oldVal, newVal)
		switch(attrName){
			case 'value':
				this.model[attrName] = JSON.parse(newVal);
				if(!this.model[attrName].length){
					this.model[attrName].push('');
				}
				break;
			default:
				this.model[attrName] = newVal;
		}
		this._updateRendering();
  }

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}


	_updateRendering(){

		if(this.$label && this.model.label){ this.$label.innerText = this.model.label; }

		//IF THIS.MODEL.value WE SHOULD CREATE ONE INPUT
		if(this.$label && this.model.value){
			//this.$ol.innerHTML = '';
			this.model.value.forEach((inputText, index) => {
				let container = document.createElement('div');
				container.classList.add('col-lg-12')
				container.classList.add('col-md-12')
				container.classList.add('col-sm-12')

				let input = document.createElement('input');
				input.placeholder = this.model.placeholder;
				input.name = this.getAttribute('name');
				input.value = inputText;
				input.type = 'text';
				input.classList.add('col-lg-12')
				input.classList.add('col-md-12')
				input.classList.add('col-sm-12')
				input.addEventListener('input', e => { this.editInput(e, index, false); })
				input.addEventListener('blur', e => { this.editInput(e, index, true); })

				let deleteButton = document.createElement('button');
				deleteButton.addEventListener('click', e => { this.deleteInput(e); });
				deleteButton.setAttribute("tabIndex", "-1");
				deleteButton.classList.add('delete')
				deleteButton.innerHTML = '&#10005;';

				container.appendChild(input);
				container.appendChild(deleteButton);
				this.$label.appendChild(container);
			})

			let addButton = document.createElement('button');
			addButton.addEventListener('click', e => { this.addInput(e) })
			addButton.classList.add('col-lg-12')
			addButton.classList.add('col-md-12')
			addButton.classList.add('col-sm-12')
			addButton.classList.add('add')
			addButton.innerHTML = 'ADD';
			this.$label.appendChild(addButton);
		}
	}

	addInput(e){
		e.stopPropagation()
		e.preventDefault();
		this.model.value.push('');
		this.setAttribute('value', JSON.stringify(this.model.value))
		this._updateRendering();

		this.$inputs = this.shadowRoot.querySelectorAll('input');
		this.numInputs = this.$inputs.length-1;
		let recentlyAddedInput = this.$inputs[this.numInputs]
		recentlyAddedInput.focus();
	}

	editInput(e, index, done){
		this.model.value[index] = e.target.value;
		if(done){ this.setAttribute('value', JSON.stringify(this.model.value)) }
	}

	deleteInput(e){
		e.stopPropagation()
		e.preventDefault();
		this.model.value.forEach((item, index) => {
			if(item === e.target.previousSibling.value){
				this.model.value.splice(index,1);
				this.setAttribute('value', JSON.stringify(this.model.value))
				this._updateRendering();
			}
		})
	}

	submit(){ this.$form.submit(); }











  //addInput(datum){
  //}

  //removeInput(e){
    //e.preventDefault();
    //let lastIndex = this.views.get(this.ol).children.length-1;
    //let lastInput = this.views.get(this.ol).children[lastIndex];
    //lastInput.parentNode.removeChild(lastInput);
    //if(this.views.get(this.ol).children.length <= 0){
      //this.views.get(this.removeButton).disabled =  true;
    //}
  //}
}

window.customElements.define('ui-array-input', UIArrayInput);
