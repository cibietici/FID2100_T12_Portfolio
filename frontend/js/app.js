import handleHamburger from './menu.js';
import readUrl from './utils.js';
import { sanityUrl } from './env.js';

handleHamburger();

const urlString = readUrl();

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
    process
  }
`;

// end of queries

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
  const projectTextEl = document.querySelector('.project-text');
  projectTextEl.textContent = result[0].process;
}

if(urlString !== undefined) {
  getProject();
}

async function getAllProjects() {
  const response = await fetch(`${sanityUrl}${encodeURI(queryAllProjects)}`);
  const { result } = await response.json();

  renderProjectsList(result);
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

if(urlString === undefined) {
  getAllProjects();
}

