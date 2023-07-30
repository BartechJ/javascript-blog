/* Title click event handler */
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* Remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* Add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* Remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* Get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);
  const targetArticle = document.querySelector(articleSelector);
  if (targetArticle) {
    console.log('targetArticle:', targetArticle);
    targetArticle.classList.add('active');
  } else {
    console.log('Target article not found:', targetArticle);
  }

  /* Add class 'active' to the correct article */
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
  /* Remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* Find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  /* For each article */
  for (let article of articles) {
    /* Get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);

    /* Find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* Create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    /* Insert link into titleList */
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
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.round(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* Create a new variable allTags with an empty object */
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

      // Check if this link is NOT already in allTags
      if (!allTags[tag]) {
        // Add generated code to allTags array
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    if (tagsWrapper) {
      tagsWrapper.innerHTML = '<ul class="list list-horizontal">' + html + '</ul>';
    }
  }

  /* Find list of tags in the right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* Create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';

  /* START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    const tagCount = allTags[tag] || 0;
    const tagLinkHTML = `<li><a class="${calculateTagClass(tagCount, tagsParams)}" href="#tag-${tag}">${tag}</a></li>`;
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  /* END LOOP: for each tag in allTags: */

  /* Add HTML from allTagsHTML to tagList */
  tagList.innerHTML = '<ul class="list list-inline">' + allTagsHTML + '</ul';
}

generateTags();

function tagClickHandler(event) {
  /* Prevent default action for this event */
  event.preventDefault();
  /* Make a new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* Make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* Make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* Find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    console.log(activeTagLink.textContent);
    /* Remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* Find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* Add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  /* Execute function "generateTitleLinks" with article selector as an argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(tag);
}

function addClickListenersToTags() {
  /* Find all links to tags under the article titles and add tagClickHandler as the event listener for each link */
  const articleTagLinks = document.querySelectorAll('.post-tags a');
  for (let articleTagLink of articleTagLinks) {
    articleTagLink.addEventListener('click', tagClickHandler);
  }

  /* Find all links to tags in the sidebar and add tagClickHandler as the event listener for each link */
  const sidebarTagLinks = document.querySelectorAll('.list.tags a');

  /* START LOOP: for each link */
  for (let sidebarTagLink of sidebarTagLinks) {
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
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.ceil(percentage * (optAuthorClassCount - 1) + 1);
  return optAuthorClassPrefix + classNumber;
}

function generateAuthors() {
  /* Create a new variable with an empty object */
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  /* Initialize the HTML variables for both main frame and sidebar */
  let mainFrameHTML = '';
  let sidebarHTML = '';

  /* START LOOP: for every article */
  for (let article of articles) {
    /* Find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* Get author from data-author attribute */
    const authorName = article.getAttribute('data-author');

    /* Generate HTML of the link for main frame */
    const linkHTML = `<a href="#authorName-${authorName}">${authorName}</a>`;

    /* Insert author name into the author wrapper in main frame */
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

  /* Insert HTML of all the links into the author list in the sidebar */
  const authorsList = document.querySelector(optAuthorsListSelector);
  if (authorsList) {
    authorsList.innerHTML = '<ul class="list list-vertical">' + sidebarHTML + '</ul>';
  }

  console.log('authorsParams:', authorsParams);
}

/* Function declaration not worked with event, needed change for author in () */
function authorClickHandler(author) {
  /* Copy algorithm from tagClickHandler */
  /* Find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('.post-author a.active');
  for (let activeAuthorLink of activeAuthorLinks) {
    /* Remove class active */
    activeAuthorLink.classList.remove('active');
  }

  /* Find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`.post-author a[href="#authorName-${author}"]`);
  for (let authorLink of authorLinks) {
    /* Add class active */
    authorLink.classList.add('active');
  }

  /* Execute function "generateTitleLinks" with the author selector as an argument */
  generateTitleLinks(`[data-author="${author}"]`);
  console.log(author);
}

function addClickListenersToAuthors() {
  /* Find all links to authors under the article titles */
  const articleAuthorLinks = document.querySelectorAll('.post-author a');
  for (let articleAuthorLink of articleAuthorLinks) {
    /* Add authorClickHandler as the event listener for that link */
    articleAuthorLink.addEventListener('click', function (event) {
      event.preventDefault();
      authorClickHandler(articleAuthorLink.textContent);
    });
  }

  const sidebarAuthorLinks = document.querySelectorAll('.list-vertical a');
  for (let sidebarAuthorLink of sidebarAuthorLinks) {
    /* Add authorClickHandler as the event listener for that link */
    sidebarAuthorLink.addEventListener('click', function (event) {
      event.preventDefault();
      authorClickHandler(sidebarAuthorLink.textContent);
    });
  }
}

addClickListenersToAuthors();
generateTitleLinks('');
generateAuthors();