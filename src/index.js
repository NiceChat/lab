import './style/index.css';
import './style/scss/font-awesome.scss';
import Icon from './images/logo.jpeg';

console.log('okay');
var element = document.createElement('div');
var myIcon = new Image();
myIcon.src = Icon;
element.appendChild(myIcon);
document.body.appendChild(element);