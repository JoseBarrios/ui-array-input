"use strict";

import view from "./view.js"

class UIArrayInput extends HTMLElement{

    static get observedAttributes(){
        return ['placeholder', 'value', 'button-text'];
    }

    constructor(model){
        super();
        this.model = model || {};
        const view = document.importNode(uiArrayInputTemplate.content, true);
        this.appendChild(view);
        //SHADOW ROOT
        this.shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(view.content.cloneNode(true));
    }

    connectedCallback() {
        //SHADOW ROOT
        //this.$container = this.shadowRoot.querySelector('#ui-array-input-container');
        //LIGHT DOM
        this.$container = this.querySelector('#ui-array-input-container');
        this.$addButton = this.querySelector('.ui-array-input-button-add');
        if(!this.model.value || !this.getAttribute('value')){
            this.model.value = '';
            this.setAttribute('value', '');
        }

        this._updateRendering();
    }

    disconnectedCallback() { console.log('disconnected'); }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch(attrName){
            case 'value':
                if(newVal && newVal !== ''){
                    let inputArray = newVal.split("\n");
                    this.model[attrName] = inputArray;
                } else {
                    this.model[attrName] = [''];
                }
                this._updateEvent();
                break;

            case 'button-text':
                this.model.buttonText = newVal;
                break;

            default:
                this.model[attrName] = newVal;
        }
        this._updateRendering();
    }

    get shadowRoot(){return this._shadowRoot;}
    set shadowRoot(value){ this._shadowRoot = value}

    get value(){ return this.model.value; }
    set value(value){
        this.model.value = value.split('\n');
        this.setAttribute('value', value)
        this._updateEvent();
    }

    get buttonText(){return this.model.buttonText}
    set buttonText(value){
        this.model.buttonText = value;
        this.setAttribute('button-text', value);
    }

    get placeholder(){return this.getAttribute('placeholder');}
    set placeholder(value){ this.setAttribute('placeholder', value)}

    blurInput(e){
        if(e.target.value === ''){ this.model.value.pop(); }
        this._updateEvent();
    }

    _updateEvent(){
        if(this.model.value !== [""]){
            let value = {};
            value.array = this.model.value;
            this.dispatchEvent(new CustomEvent('update', {detail: value, bubbles:false }));
        }
    }

    _updateRendering(e){
        //IF THIS.MODEL.value WE SHOULD CREATE ONE INPUT
        if(this.$addButton && this.model.buttonText){
            this.$addButton.innerText = this.model.buttonText;
        }

        if(this.$container && this.model.value){
            this.$container.innerHTML = '';
            this.model.value.forEach((inputText, index) => {
                let inputContainer = document.createElement('div');
                inputContainer.classList.add('col-lg-12')
                inputContainer.classList.add('col-md-12')
                inputContainer.classList.add('col-sm-12')

                let input = document.createElement('input');
                input.placeholder = this.model.placeholder || "Item";
                input.name = this.getAttribute('name');
                input.value = inputText;
                input.type = 'text';
                input.classList.add('ui-array-input-item')
                input.classList.add('col-lg-12')
                input.classList.add('col-md-12')
                input.classList.add('col-sm-12')
                input.addEventListener('input', e => { this.editInput(e, index, false); })
                input.addEventListener('blur', this.blurInput.bind(this));

                let deleteButton = document.createElement('button');
                deleteButton.addEventListener('click', e => { this.deleteInput(e); });
                deleteButton.setAttribute("tabIndex", "-1");
                deleteButton.classList.add('ui-array-input-item-delete')
                deleteButton.innerHTML = '&#10005;';

                inputContainer.appendChild(input);
                inputContainer.appendChild(deleteButton);
                this.$container.appendChild(inputContainer);
            })

            let addButton = document.createElement('button');
            addButton.addEventListener('click', e => { this.addInput(e) });
            addButton.classList.add('col-lg-12');
            addButton.classList.add('col-md-12');
            addButton.classList.add('col-sm-12');
            addButton.classList.add('ui-array-input-button-add');
            addButton.innerHTML = this.model.buttonText || 'ADD ITEM';
            this.$container.appendChild(addButton);
            ;	}
    }

    addInput(e){
        e.stopPropagation()
        e.preventDefault();
        this.model.value.push('\n');
        this._updateRendering();

        //If empty input, and it's not last one, remove
        this.$inputs = this.querySelectorAll('input');
        let lastIndex = this.$inputs.length-1;

        this.numInputs = this.$inputs.length-1;
        let recentlyAddedInput = this.$inputs[this.numInputs]
        recentlyAddedInput.focus();
    }

    editInput(e, index, done){
        e.preventDefault();
        e.stopPropagation()
        this.model.value[index] = e.target.value;
    }

    deleteInput(e){
        e.stopPropagation()
        e.preventDefault();

        let deleteButtons = this.querySelectorAll('.ui-array-input-item-delete');
        let $inputs = this.querySelectorAll('input');

        deleteButtons.forEach((deleteButton, index) => {
            if(e.target === deleteButton){
                this.model.value.splice(index,1);
                this._updateRendering();
                this._updateEvent();
            }
        })
    }
}

window.customElements.define('ui-array-input', UIArrayInput);
