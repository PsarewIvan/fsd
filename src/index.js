import 'normalize.css';
import '../node_modules/focus-visible/dist/focus-visible.js';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.scss$/));
