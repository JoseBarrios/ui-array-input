const uiArrayInputDocument = document._currentScript || document.currentScript;
const uiArrayInputTemplate = uiArrayInputDocument.ownerDocument.querySelector('#ui-array-input-view');

class UIArrayInput extends HTMLElement{

	static get observedAttributes(){
		return ['name', 'placeholder', 'label', 'data'];
	}

  constructor(model){
    super();
		this.model = model || {};
		const view = document.importNode(uiArrayInputTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
	}

  connectedCallback() {
		this.$label = this.shadowRoot.querySelector('label');
		this.$ol = this.shadowRoot.querySelector('ol');
		this._updateRendering();
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
		console.log('ATTRIBUTE', attrName, oldVal, newVal)
		switch(attrName){
			case 'data':
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

		//IF THIS.MODEL.DATA WE SHOULD CREATE ONE INPUT
		if(this.$ol && this.model.data){
			this.$ol.innerHTML = '';
			this.model.data.forEach((inputText, index) => {
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
				deleteButton.classList.add('delete')
				deleteButton.innerHTML = '&#10005;';

				container.appendChild(input);
				container.appendChild(deleteButton);
				this.$ol.appendChild(container);
			})

			let addButton = document.createElement('button');
			addButton.addEventListener('click', e => { this.addInput(e) })
			addButton.classList.add('col-lg-12')
			addButton.classList.add('col-md-12')
			addButton.classList.add('col-sm-12')
			addButton.classList.add('add')
			addButton.innerHTML = 'ADD';
			this.$ol.appendChild(addButton);
		}
	}

	addInput(e){
		e.preventDefault();
		console.log('add')
		this.model.data.push('');
		this.setAttribute('data', JSON.stringify(this.model.data))
		this._updateRendering();
	}

	editInput(e, index, done){
		e.stopPropagation()
		e.preventDefault();
		console.log('edit')
		this.model.data[index] = e.target.value;
		if(done){ this.setAttribute('data', JSON.stringify(this.model.data)) }
	}

	deleteInput(e){
		this.model.data.forEach((item, index) => {
			if(item === e.target.previousSibling.value){
				this.model.data.splice(index,1);
				this.setAttribute('data', JSON.stringify(this.model.data))
				this._updateRendering();
			}
		})
	}












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
