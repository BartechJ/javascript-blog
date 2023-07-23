const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.posts .post.active');

for (let activeArticle of activeArticles) {
  activeArticle.classList.remove('active');
}


  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);
  const targetArticle = document.querySelector(articleSelector);
  if (targetArticle) {
  console.log('targetArticle:', targetArticle);
  targetArticle.classList.add('active');
  } else {
  console.log('Target article not found:', targetArticleHref);
  }
  
  /* [DONE above] add class 'active' to the correct article */


};



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list-horizontal';

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
/* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  
/* for each article */

  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);

    /* [DONE] find the title element */
   const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE above] get the title from the title element */
  

    /* [DONE] create HTML of the link */
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into titleList */
 html = html + linkHTML;
    console.log(html);
  }

titleList.innerHTML = html;
const links = document.querySelectorAll('.titles a');
console.log('linki:', links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

}



function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const tagsArray = articleTags.split(' ');
    console.log(tagsArray);

   /* Initialize the html variable */
    let html = '';
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
       const linkHTML = `<li><a href="#${tag}">${tag}</a></li>`;
      /* add generated code to html variable */
        html += linkHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    if (tagsWrapper) {
      tagsWrapper.innerHTML = '<ul class="list list-horizontal">' + html + '</ul>';
      console.log(tagsWrapper);
    }
    /* END LOOP: for every article */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
const tag = href.replace('#tag-', '');
console.log(tag);
  /* find all tag links with class active */
const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
for (let activeTagLink of activeTagLinks) {
 
  console.log(activeTagLink.textContent);
    /* remove class active */
activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
}
  /* find all tag links with "href" attribute equal to the "href" constant */
const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
for (let tagLink of tagLinks) {
    /* add class active */
tagLink.classList.add('active');
}
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data-tags~="' + tag + '"]');
console.log(tag);
  
}
function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list.tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as the event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }}
  /* END LOOP: for each link */
addClickListenersToTags();
