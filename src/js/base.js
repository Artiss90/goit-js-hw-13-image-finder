import {URL_PIXABAY} from './url';
import {KEY_API} from './key';
import * as refs from './refs';
import templateCard from '../templates/photo-card.hbs';
import funcRenderCard from './render-card';

console.log(refs.listCardRef);

// fetch(`${URL_PIXABAY}/?image_type=photo&orientation=horizontal&q=flower&page=1&per_page=12&key=${KEY_API}`).then(response => response.json()).then(data => funcRenderCard(refs.listCardRef,templateCard,data));

refs.formSearchRef.addEventListener('submit', searchImg);
let countPage = 0;
let nowQuery = '';


function searchImg(evt) {
    evt.preventDefault();
    console.log(countPage);
if (nowQuery === evt.target.elements.query.value){
    nowQuery = evt.target.elements.query.value;
    countPage += 1;
    fetchPixabay(nowQuery, countPage);
    return 
}   
countPage = 1;
nowQuery = evt.target.elements.query.value;
fetchPixabay(nowQuery, countPage);
}

async function fetchPixabay(q,page) {
    const response = await fetch(`${URL_PIXABAY}/?image_type=photo&orientation=horizontal&q=${q}&page=${page}&per_page=12&key=${KEY_API}`);
    const responseJson = await response.json();
    const render = await funcRenderCard(refs.listCardRef,templateCard,responseJson);
};



