const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
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
    console.log('Target article not found:', targetArticle);
  }

  /* [DONE above] add class 'active' to the correct article */
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list-horizontal';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optAuthorClassCount = 4;
const optCloudClassPrefix = 'tag-size-';
const optAuthorClassPrefix = 'author-size-'
const optAuthorsListSelector = '.authors';


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
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log('linki:', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
 
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass(count, params) {
const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min ;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.round(percentage * (optCloudClassCount - 1) + 1 );
return optCloudClassPrefix + classNumber;
}



function generateTags() {
/* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    const articleTags = article.getAttribute('data-tags');
    const tagsArray = articleTags.split(' ');

    let html = '';
    for (let tag of tagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html += linkHTML;
      
      // [NEW] check if this link is NOT already in allTags
      if(!allTags[tag]) {
        // [NEW] add generated code to allTags array
        allTags[tag] = 1;
      } else {
    allTags[tag]++;
    }
    }

    if (tagsWrapper) {
      tagsWrapper.innerHTML = '<ul class="list list-horizontal">' + html + '</ul>';
    }
  }

  // [NEW] find list of tags in the right column
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams)
let allTagsHTML = '';

/* [NEW] START LOOP: for each tag in allTags: */


  /* [NEW] generate code of a link and add it to allTagsHTML */
for (let tag in allTags) {
  const tagCount = allTags[tag] || 0;
  const tagLinkHTML = `<li><a class="${calculateTagClass(tagCount, tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
  console.log('tagLinkHTML:', tagLinkHTML);
  allTagsHTML += tagLinkHTML;
} 
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = '<ul class="list list-inline">' + allTagsHTML + '</ul';
 
}

generateTags();



function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make a new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="tag-"]');
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
  /* execute function "generateTitleLinks" with article selector as an argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(tag);
}

function addClickListenersToTags() {
  /* find all links to tags */
  const articleTagLinks = document.querySelectorAll('.post-tags a');
  for (let articleTagLink of articleTagLinks) {
    /* add tagClickHandler as the event listener for that link */
    articleTagLink.addEventListener('click', tagClickHandler);
  }

  const sidebarTagLinks = document.querySelectorAll('.list.tags a');

  /* START LOOP: for each link */
  for (let sidebarTagLink of sidebarTagLinks) {
    /* add tagClickHandler as the event listener for that link */
    sidebarTagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
 
  const params = {
    max: 0,
    min: 999999,
  };

  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
    console.log(author + ' is used ' + authors[author] + ' times');
  }

  return params;
}

function calculateAuthorClass(count, params) {
 const normalizedCount = count - params.min;
const normalizedMax = params.max - params.min ;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.ceil(percentage * (optAuthorClassCount - 1)) + 1;
return optAuthorClassPrefix + classNumber;
}


function generateAuthors() {
/* [NEW] create a new variable with an empty object */
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  /* Initialize the html variables for both main frame and sidebar */
  let mainFrameHTML = '';
  let sidebarHTML = '';

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* get author from data-author attribute */
    const authorName = article.getAttribute('data-author');

    /* generate HTML of the link for main frame */
    const linkHTML = `<a href="#authorName-${authorName}">${authorName}</a>`;

    /* insert author name into the author wrapper in main frame */
    if (authorWrapper) {
      authorWrapper.innerHTML = linkHTML;
    }

   
    if (!allAuthors[authorName]) {
      allAuthors[authorName] = 1;
    } else {
    allAuthors[authorName]++;
    }
    console.log('allAuthors:',allAuthors);
}
const authorsParams = calculateAuthorsParams(allAuthors);
console.log('authorsParams:', authorsParams);
     
    for (let authorName in allAuthors) {
    const authorCount = allAuthors[authorName];
    const authorClass = calculateAuthorClass(authorCount, authorsParams);
    const sidebarLinkHTML = `<li><a class="${authorClass}" href="#authorName-${authorName}">${authorName}</a> (${authorCount})</li>`;
    sidebarHTML += sidebarLinkHTML;
    console.log('sidebarLinkHTML:', sidebarLinkHTML);
  }
    
  

  /* insert HTML of all the links into the author list in the sidebar */
  const authorsList = document.querySelector(optAuthorsListSelector);
  if (authorsList) {
    authorsList.innerHTML = '<ul class="list list-vertical">' + sidebarHTML + '</ul>';
  }
 
  console.log('authorsParams:', authorsParams);

  addClickListenersToAuthors();

 

}


/* FUNCTION DECLARATION NOT WORKED WITH EVENT NEEDED CHANGE FOR AUTHOR IN ()*/
function authorClickHandler(author) {
  /* [DONE] Copy algorithm from tagClickHandler */
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`.post-author a[href="#authorName-${author}"]`);
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with the author selector as an argument */
  generateTitleLinks(`[data-author="${author}"]`);
  console.log(author);
}

function addClickListenersToAuthors() {
  // Find all links to authors under the article titles
  const articleAuthorLinks = document.querySelectorAll('.post-author a');
  for (let articleAuthorLink of articleAuthorLinks) {
    const authorName = articleAuthorLink.textContent;
    articleAuthorLink.addEventListener('click', function (event) {
      event.preventDefault();
      authorClickHandler(authorName);
    });
  }

  
  const sidebarAuthorLinks = document.querySelectorAll('.list-vertical a');
  for (let sidebarAuthorLink of sidebarAuthorLinks) {
    const authorName = sidebarAuthorLink.textContent;
    sidebarAuthorLink.addEventListener('click', function (event) {
      event.preventDefault();
      authorClickHandler(authorName);
    });
  }
}

addClickListenersToAuthors();
generateTitleLinks('');
generateAuthors();


