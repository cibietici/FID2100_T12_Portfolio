import { cdnUrl, sanityUrl, projectID } from "./env.js";
import { S_token } from "./token.js";

export function readUrl() {
    const allUrl = window.location.href;
    if(allUrl.includes('about')) {
        return 'about'
    }
    if(allUrl.includes('contact')) {
        return 'contact'
    }
    if(allUrl.includes('projects')) {
        const urlString = window.location.search;
        if(urlString) {
            return (urlString.slice(1)); // slice remove the "?" from the url
        }
    }
    return undefined;
};

export function handleParagraphs(blockContent, container) {
    const blockContainer = document.getElementById(container);

    blockContent.map(p => {
        if(p._type === 'block') {
            let pEL = document.createElement('p'); 
            if(p.style === 'h4') {
                pEL = document.createElement('h4');
            }
            if(p.style === 'h3') {
                pEL = document.createElement('h3');
            }
            if(p.style === 'h2') {
                pEL = document.createElement('h2');
            }
            if(p.style === 'h1') {
                pEL = document.createElement('h1');
            }
            pEL.textContent = p.children[0].text;
            blockContainer.append(pEL);
        };
        if(p._type === 'image') {
            const fileNameArray = p.asset._ref.split('-');
            const fileName = `${fileNameArray[1]}-${fileNameArray[2]}.${fileNameArray[3]}`;
            const imgEL = document.createElement('img');
            imgEL.setAttribute('src', `${cdnUrl}${fileName}`);
            imgEL.classList.add('project__blockImg');
            blockContainer.append(imgEL);
        };
    });
};

export async function postData(mutations) {
    const url = `https://${projectID}.api.sanity.io/v2021-06-07/data/mutate/production`;
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${S_token}`
            },
            body: JSON.stringify({mutations})
        }
    );
    const result = await response.json();
    console.log(result);
    return result;
} 
