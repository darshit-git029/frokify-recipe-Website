import View from './View.js';
import icons from 'url:../../img/icons.svg';
import priviewView from './priviewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(result => priviewView.render(result,false)).join('');
  }
}
export default new ResultView();
