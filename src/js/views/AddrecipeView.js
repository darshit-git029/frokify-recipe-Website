import View from './View.js';
import icons from 'url:../../img/icons.svg';


class AddrecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _meassge =  'Recip Add Successfully'
    _window = document.querySelector(".add-recipe-window")
    _overlay = document.querySelector(".overlay")
    _btnOpen = document.querySelector(".nav__btn--add-recipe")
    _btnClose = document.querySelector(".btn--close-modal")
    
    
    constructor(){
        super();
        this._addhandelrShowWindow();
        this._addhandelrremoveWindow()
    }
    
    togglewindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }
    
    _addhandelrShowWindow(){
        this._btnOpen.addEventListener("click", this.togglewindow.bind(this))
   
    }

    _addhandelrremoveWindow(){
        this._btnClose.addEventListener("click", this.togglewindow.bind(this))
        this._overlay.addEventListener("click", this.togglewindow.bind(this))
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener("submit",function(e){
            e.preventDefault()
            const dataArray  = [...new FormData(this)]
            const data = Object.fromEntries(dataArray)
            handler(data);
            
        })
    }
   
    _generateMarkup() {}
}

export default new AddrecipeView();