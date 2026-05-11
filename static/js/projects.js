const projectContainer = document.querySelector("#project-list");
const backgroundImage = document.querySelector("#background-image");
const projectTitle = document.querySelector("#project-description-title");
const projectDescriptionText = document.querySelector("#project-description-text");
const projectDescriptionLink = document.querySelector("#project-description-link");

const defaultProjectName = "Awaiting Input..."; 
const defaultProjectDescription = "Select a file from the directory to initialize data stream."; 
const defaultProjectImage = "https://res.cloudinary.com/dciliogd4/image/upload/v1756931020/photo-1554086201-d442c066dcf9_bscrsg.webp"; 
var projectSelected = false; 

const Type = {
    PROJECT: "Project",
    CONTRIBUTION: "Contribution",
};

class Link {
    constructor(preview, address) {
        this.preview = preview;
        this.address = address;
    }
}

class Project {
    constructor(type, name, description, image, link) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.image = image;
        this.link = link;
    }
}

let projects = [];
let sortedProjects = [];

async function loadProjects() {
    try {
        const response = await fetch('/static/json/projects.json');
        if (!response.ok) throw new Error('Failed to load projects.json');
        const data = await response.json();
        
        projects = data.map(p => new Project(
            p.type, p.name, p.description, p.image,
            new Link(p.link.preview, p.link.address)
        ));
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    //? 1. Dynamic Year Injection
    const yearSpan = document.querySelector(".dynamic-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    //? 2. Return Button Logic with Glitch Exit
    const returnBtn = document.getElementById("return-btn");
    if (returnBtn) {
        returnBtn.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            // Remove entry glitch, trigger exit glitch
            document.body.classList.remove("lux-glitch-in");
            document.body.classList.add("lux-glitch-out");
            
            // Wait for animation before jumping
            setTimeout(() => {
                window.location.href = './home.html';
            }, 700);
        });
    }

    //! Failsafe: Clear the entry glitch class so modals/fixed elements work perfectly
    setTimeout(() => {
        document.body.classList.remove("lux-glitch-in");
    }, 550);

    loadProjects();
    
    const checkProjectsLoaded = setInterval(() => {
        if (projects.length > 0) {
            clearInterval(checkProjectsLoaded);
            projectSelected = false;
            defaultBHVR();

            sortedProjects = [...projects].sort((a, b) => {
                if (a.type === Type.PROJECT && b.type !== Type.PROJECT) return -1;
                if (a.type !== Type.PROJECT && b.type === Type.PROJECT) return 1;
                if (a.type === Type.CONTRIBUTION && b.type !== Type.CONTRIBUTION) return 1;
                if (a.type !== Type.CONTRIBUTION && b.type === Type.CONTRIBUTION) return -1;
                return 0;
            });
            
            let hasDivider = false;
            
            sortedProjects.forEach((project, index) => {
                if (!hasDivider && project.type === Type.CONTRIBUTION) {
                    projectContainer.innerHTML += `<div class="divider">CONTRIBUTIONS.log</div>`;
                    hasDivider = true;
                }
            
                projectContainer.innerHTML += `
                    <button class="project-button">${project.name.toUpperCase()}</button>
                `;
            });

            const buttonContainer = Array.from(projectContainer.children).filter(child => child.tagName === 'BUTTON'); 
            
            buttonContainer.forEach(projectButton => {
                projectButton.addEventListener("click", function(event) {
                    if(!projectButton.classList.contains("project-button-active")) {
                        projectSelected = true;
                        
                        buttonContainer.forEach(btn => btn.classList.remove("project-button-active"));
                        projectButton.classList.add("project-button-active");
                        
                        let projectIndex = buttonContainer.indexOf(event.target);
                        
                        backgroundImage.style.opacity = 0; 
                        projectDescriptionText.style.opacity = 0;
                        projectDescriptionLink.style.opacity = 0;
                        
                        setTimeout(() => {
                            projectDescriptionText.innerHTML = sortedProjects[projectIndex].description;
                            projectDescriptionText.style.opacity = 1;
                            
                            if(sortedProjects[projectIndex].link.address === "" || sortedProjects[projectIndex].link.preview === "") {
                                projectDescriptionLink.style.display = "none";
                            } else {
                                projectDescriptionLink.style.display = "block";
                                projectDescriptionLink.innerHTML = `<a target="_blank" class="external-link">${sortedProjects[projectIndex].link.preview}</a>`;
                                projectDescriptionLink.querySelector('a').href = sortedProjects[projectIndex].link.address;
                                projectDescriptionLink.style.opacity = 1;
                            }
                            
                            if(sortedProjects[projectIndex].image === "") {
                                backgroundImage.style.backgroundImage = `url(${defaultProjectImage})`;
                            } else {    
                                backgroundImage.style.backgroundImage = `url(${sortedProjects[projectIndex].image})`;
                            }
                            backgroundImage.style.opacity = 0.30;
                        }, 500);
                        
                        textEffect(sortedProjects[projectIndex].name.toUpperCase());
                    } else {
                        projectSelected = false;
                        projectButton.classList.remove("project-button-active");
                        defaultBHVR();
                    }
                });
            });
        }
    }, 100);
});

function defaultBHVR() {
    backgroundImage.style.opacity = 0; 
    projectDescriptionText.style.opacity = 0;
    projectDescriptionLink.style.opacity = 0;
    
    setTimeout(() => {
        projectDescriptionText.innerHTML = defaultProjectDescription;
        projectDescriptionText.style.opacity = 1;
        projectDescriptionLink.style.display = "none";
        backgroundImage.style.backgroundImage = `url(${defaultProjectImage})`;
        backgroundImage.style.opacity = 0.15;
    }, 500);
    
    textEffect(defaultProjectName.toUpperCase());
}

function textEffect(newText) {
    projectTitle.innerHTML = "";

    newText.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char; 
        span.style.display = "inline-block";
        span.style.transform = "rotateY(90deg)";
        span.style.transition = "transform 0.25s ease-out"; // Slightly snappier
        span.style.transitionDelay = `${index * 40}ms`; 

        projectTitle.appendChild(span);

        setTimeout(() => {
            span.style.transform = "rotateY(0deg)";
        }, 50);
    });
}