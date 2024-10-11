import View from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener("click",function(e){
            const btn = e.target.closest(".btn--inline")
            console.log(btn);
            const gotoPage = +btn.dataset.goto;
            // console.log(gotoPage);
            
            handler(gotoPage)
        })
    }

    _generateMarkup() {
        const currentPage = this._data.page
        const numpage = Math.ceil(this._data.results.length / this._data.resultPage);
        console.log(numpage);

        //page 1 and other pages

        if (currentPage === 1 && numpage > 1) {
            return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `
        }


        //last page
        if (currentPage === numpage && numpage > 1) {
            return `
             <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
            `
        }

        //other page
        if (currentPage < numpage) {
            return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `
        }

        //page 1 and not any other page
        return "only page 1"
    }
}

export default new paginationView();