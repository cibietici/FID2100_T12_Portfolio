import handleHamburger from './menu.js';
import { readUrl } from './utils.js';
import { sanityUrl } from './env.js';
import { handleParagraphs } from './utils.js';

handleHamburger(); // invoke the hamburger menu handling

// we assign to a variable the url string reading
const urlString = readUrl();
console.log(urlString)

// querystring for sanity
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
  *[slug.current == "${urlString}"]{
    title,
    "cover": cover.asset->url,
    process,
    tools[]->
  }
`;
//if you have tools with icons use
//tools[]->{software, "icon": icon.asset->url}
// end of queries to sanity

// get single project page
async function getProject() {
  const response = await fetch(`${sanityUrl}${encodeURI(querySingleProject)}`);
  const { result } = await response.json();
  renderSingleProject(result);
}

function renderSingleProject(result) {
  const titleEl = document.querySelector('.single-project__title');
  titleEl.textContent = result[0].title;
  const coverProjectEl = document.querySelector('.project__cover');
  coverProjectEl.setAttribute('src', result[0].cover);
  
  handleParagraphs(result[0].process, 'processContent');
}

if(urlString !== undefined) {
  getProject();
}
// end of single project page function

// get all projects list for frontpage
async function getAllProjects() {
  const response = await fetch(`${sanityUrl}${encodeURI(queryAllProjects)}`);
  const { result } = await response.json();

  renderProjectsList(result); // invoke function in line 61 sending in data from sanity
}

function renderProjectsList(result) {
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
    projectsEl.append(cardEl);
  })
}

// conditional invoke of all project for frontpage
if(urlString === undefined) {
  getAllProjects();
}
// end of projects in frontpage
