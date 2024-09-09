import View from './View.js';
import icons from 'url:../../img/icons.svg';
import priviewView from './priviewView.js';


class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _generateMarkup() {
    return this._data.map(bookmark => priviewView.render(bookmark,false)).join('');
  }

  addhandlerRander(handler){
    window.addEventListener("load",handler)
  }
}
export default new bookmarkView();
