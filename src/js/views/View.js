import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    this._data = data;
    // console.log('Rendering data:', this._data);  // Check if ingredients are part of _data
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup)
    const newElement = Array.from(newDom.querySelectorAll("*"))
    const currentElement = Array.from(this._parentElement.querySelectorAll("*"))
    newElement.forEach((newEL, i) => {
      const curEL = currentElement[i];
      // console.log(curEL, newEL.isEqualNode(curEL));

      // upadet text
      if (!newEL.isEqualNode(curEL) && newEL.firstChild.nodeValue.trim() !== '') {
        // console.log("🛑", newEL.firstChild.nodeValue.trim());

        curEL.textContent = newEL.textContent;
      }

      //update attributs
      if (!newEL.isEqualNode(curEL))
        Array.from(newEL.attributes).forEach(attr => curEL.setAttribute(attr.name, attr.value))

    })

  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _message(){
    "Rcipe Was successfully Uploaded";
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
     <div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>
                  ${message}
                  </p>
                </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

  }

  // renderError(message = this._errormeassge) {
  //   const markup = `
  //        <!-- <div class="error">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-alert-triangle"></use>
  //             </svg>
  //           </div>
  //           <p>No${message}</p>
  //         </div> -->
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
}
