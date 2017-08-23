const uiArrayInputDocument = document._currentScript || document.currentScript;
const uiArrayInputTemplate = uiArrayInputDocument.ownerDocument.querySelector('#ui-array-input-view');

class UIArrayInput extends HTMLElement{

	static get observedAttributes(){
		return ['placeholder', 'value'];
	}

  constructor(model){
    super();
		this.model = model || {};
		const view = document.importNode(uiArrayInputTemplate.content, true);
		this.shadowRoot = this.attachShadow({mode: 'open'});
		this.shadowRoot.appendChild(view);
		this.defaultEventName = 'update';
	}

  connectedCallback() {
		this.$container = this.shadowRoot.querySelector('#container');
		this.$label = this.shadowRoot.querySelector('label');

		if(!this.model.value || !this.getAttribute('value')){
			this.model.value = '';
			this.setAttribute('value', '');
		}

		this._updateRendering();
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
		switch(attrName){
			case 'value':
				if(newVal && newVal !== ''){
					try{
						this.model[attrName] = JSON.parse(newVal);
						if(!this.model[attrName].length){
							this.model[attrName].push('');
						}
					}
					catch(error){
						console.warn('Warning: ui-array-input invalid value, replaced with empty array:', error)
						this.model[attrName] = [];
						this.model[attrName].push('');
					}
				} else if(newVal === ''){
					this.model[attrName] = [];
					this.model[attrName].push('');
				}
				this._updateEvent();
				break;

			default:
				this.model[attrName] = newVal;
		}
		this._updateRendering();
  }

	get shadowRoot(){return this._shadowRoot;}
	set shadowRoot(value){ this._shadowRoot = value}

	get value(){return JSON.parse(this.getAttribute('value'));}
	set value(value){ this.setAttribute('value', value)}

	get name(){return this.getAttribute('name');}
	set name(value){ this.setAttribute('name', value)}

	get label(){return this.getAttribute('label');}
	set label(value){ this.setAttribute('label', value)}

	get placeholder(){return this.getAttribute('placeholder');}
	set placeholder(value){ this.setAttribute('placeholder', value)}

	_updateEvent(){
		if(this.model.value !== [""]){
				this.dispatchEvent(new CustomEvent('update', {detail: this.model.value, bubbles:false }));
		}
	}

	_updateRendering(){
		if(this.$label && this.model.label){ this.$label.innerHTML = this.model.label; }
		else if(this.$label){ this.$label.hidden = 'true'; }

		//IF THIS.MODEL.value WE SHOULD CREATE ONE INPUT
		if(this.$container && this.model.value){
			this.$container.innerHTML = '';
			this.model.value.forEach((inputText, index) => {
				let inputContainer = document.createElement('div');
				inputContainer.classList.add('col-lg-12')
				inputContainer.classList.add('col-md-12')
				inputContainer.classList.add('col-sm-12')

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

				inputContainer.appendChild(input);
				inputContainer.appendChild(deleteButton);
				this.$container.appendChild(inputContainer);
			})

			let addButton = document.createElement('button');
			addButton.addEventListener('click', e => { this.addInput(e) })
			addButton.classList.add('col-lg-12')
			addButton.classList.add('col-md-12')
			addButton.classList.add('col-sm-12')
			addButton.classList.add('add')
			//addButton.innerHTML = this.placeholder;
			addButton.innerHTML = 'ADD ITEM';
			this.$container.appendChild(addButton);
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
}

window.customElements.define('ui-array-input', UIArrayInput);
