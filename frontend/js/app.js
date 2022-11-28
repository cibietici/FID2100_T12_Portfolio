import handleHamburger from './menu.js';
/* const urlString = window.location.search;
console.log(urlString)
const paramsUrl = new URLSearchParams(urlString);
console.log(paramsUrl);
const pageValue = paramsUrl.get('page');
console.log(pageValue); */
handleHamburger();

const urlString = window.location.search;
console.log(urlString.slice(1));

const projectID = 'd0ks1b6r';

const queryAllProjects = `
*[_type == "project"]{
    title,
    _id,
    slug,
    "bilde": cover.asset->url,
    gallery[]
  }
`;

const querySingleProject = `
  *[slug.current == "${urlString.slice(1)}"]
`;

const url = `https://${projectID}.api.sanity.io/v2021-10-21/data/query/production?query=`;

async function getProject() {
  if(urlString !== '') {
    const response = await fetch(`${url}${encodeURI(querySingleProject)}`);
    const { result } = await response.json();
    console.log(result);
  }
}

getProject();


async function getData() {
   const response = await fetch(`${url}${encodeURI(queryAllProjects)}`);
   const { result } = await response.json();
   console.log(result);

   const projectsEl = document.querySelector('.projects-wrapper');
   result.forEach(project => {
    const cardEl = document.createElement('a');
    cardEl.classList.add('card');
    cardEl.setAttribute('href', `/projects/?${project.slug.current}`);
    const coverEl = document.createElement('img');
    coverEl.setAttribute('src', project.bilde);
    const titleEl = document.createElement('h4');
    titleEl.textContent = project.title;
    cardEl.append(coverEl);
    cardEl.append(titleEl);
    projectsEl.append(cardEl)
   })
}

getData();
