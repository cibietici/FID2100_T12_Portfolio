const projectID = 'd0ks1b6r';

const query = `
*[_type == "project"]{
    title,
    _id,
    slug,
    "bilde": cover.asset->url,
    gallery[]
  }
`;

const url = `https://${projectID}.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

async function getData() {
   const response = await fetch(url);
   const { result } = await response.json();
   console.log(result);

   const projectList = document.getElementById('projects-list');
   console.log(projectList)
   const ulList = document.createElement('ul');
   console.log(ulList)

   result.forEach(project => {
        const liEl = document.createElement('li');
        liEl.textContent = project.title;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', project.bilde);
        imgEl.setAttribute('width', '200')
        liEl.append(imgEl);
        ulList.append(liEl);
   });

   projectList.append(ulList);
}

getData();
