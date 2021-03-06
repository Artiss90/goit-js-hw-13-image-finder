import {URL_PIXABAY} from './url';
import {KEY_API} from './key';
import * as refs from './refs';
import templateCard from '../templates/photo-card.hbs';
import funcRenderCard from './render-card';
import LoadMoreBtn from './load-more';

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });

  const language = 'ru';
  let countPage = 0;
  let nowQuery = '';
  
  refs.formSearchRef.addEventListener('submit', searchImg);
  refs.loadMoreBtnRef.addEventListener('click', showMore);

function showMore(evt) {
    evt.preventDefault();
   const q = nowQuery;
   const page = countPage;
   fetchPixabay(q, page)
  countPage += 1;
  /*закоментил автоскрол вниз из-за добавления бесконечного скрола*/
    // setTimeout(() => {
    // window.scrollTo({ top: document.body.scrollHeight, behaviour: "smooth" });    
    // console.log(document.body.scrollHeight);
    // }, 2000);
};

function searchImg(evt) {
    evt.preventDefault();
    console.log(countPage);
    clearArticlesContainer(refs.listCardRef);
    loadMoreBtn.show();

    countPage = 1;
    nowQuery = evt.target.elements.query.value;

    fetchPixabay(nowQuery, countPage);
    countPage += 1;
    return }

async function fetchPixabay(q,page, language='ru') {
    loadMoreBtn.disable();
    const response = await fetch(`${URL_PIXABAY}/?image_type=photo&orientation=horizontal&q=${q}&page=${page}&per_page=12&lang=${language}&key=${KEY_API}`);
    const responseJson = await response.json();
    funcRenderCard(refs.listCardRef,templateCard,responseJson);
    loadMoreBtn.enable();
};

function clearArticlesContainer(refs) {
    refs.innerHTML = '';
  }

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && nowQuery !== '') {
        console.log('Пора грузить еще статьи' + Date.now());
        console.log(countPage);
        fetchPixabay(nowQuery, countPage);
        countPage += 1;
    }
  });
};

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinelRef);