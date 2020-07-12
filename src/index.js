import $ from 'jquery';
import 'normalize.css';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));
