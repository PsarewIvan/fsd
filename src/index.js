import $ from 'jquery';
import Post from './post.js';
import './styles/styles.css';
import json from './assets/json.json';
import image from './assets/picture.jpg';

const post = new Post('New Post', image);
console.log('Post: ', post.toString());

console.log('Hello, world');

console.log('JSON:', json);

$('pre').html(post.toString());
