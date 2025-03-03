const projectContainer = document.querySelector("#project-list");
const backgroundImage = document.querySelector("#background-image");
const projectTitle = document.querySelector("#project-description-title");
const projectDescriptionText = document.querySelector("#project-description-text");
const projectDescriptionLink = document.querySelector("#project-description-link");

//TODO: make it so the project description starts scrolling automatically when the text is too long after a certain amount of time

// // const quicklyPopolate = false; //! Set to true to quickly populate the project list with dummy data (for development purposes)
const defaultProjectName = "Choose One Project"; // Set the string that should be displayed when no project is selected
const defaultProjectDescription = "Click on the Projects to the side to learn about them"; // Set the string that should be displayed when no project is selected
const defaultProjectImage = "https://images.unsplash.com/photo-1554086201-d442c066dcf9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Set the image that should be displayed when no project is selected
var projectSelected = false; // Set to true when a project is selected


class Link
{
    constructor(preview, address)
    {
        this.preview = preview;
        this.address = address;
    }
}

class  Project
{
    constructor(name, description, image, link)
    {
        this.name = name;
        this.description = description;
        this.image = image;
        this.link = link;
    }
}

let projects = [];

//? Function to fetch JSON and populate the projects array
async function loadProjects() {
    try {
        const response = await fetch('/static/json/projects.json');
        if (!response.ok) throw new Error('Failed to load projects.json');
        
        const data = await response.json();
        
        projects = data.map(p => new Project(
            p.name,
            p.description,
            p.image,
            new Link(p.link.preview, p.link.address)
        ));

        console.log('Projects loaded:', projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadProjects();
    const checkProjectsLoaded = setInterval(() => {
        if (projects.length > 0) {
            clearInterval(checkProjectsLoaded);
            // console.log("Projects have been populated");
            // console.log("Projects DOM Loaded");
            projectSelected = false;
            defaultBHVR();
            projects.forEach(project => {
                projectContainer.innerHTML += `
                    <button class="project-button">${project.name.toUpperCase()}</button>
                `;
                // // if(quicklyPopolate)
                // // {
                // //     for(let i = 0; i < 5; i++)
                // //     {
                // //         projectContainer.innerHTML += `
                // //             <button class="project-button">${project.name.toUpperCase()}</button>
                // //         `;
                // //     }
                // // }
            });

            Array.from(projectContainer.children).forEach(projectButton => {
                projectButton.addEventListener("click", function(event) 
                {
                    if(!projectButton.classList.contains("project-button-active"))
                    {
                        projectSelected = true;
                        projectButton.classList.add("project-button-active");
                        for(let i = 0; i < projectContainer.children.length; i++)
                        {
                            if(projectContainer.children[i] != event.target)
                            {
                                projectContainer.children[i].classList.remove("project-button-active");
                            }
                        }
                        let projectIndex = Array.from(projectContainer.children).indexOf(event.target);
                        backgroundImage.style.opacity = 0; 
                        projectDescriptionText.style.opacity = 0;
                        projectDescriptionLink.style.opacity = 0;
                        setTimeout(() => {
                            projectDescriptionText.innerHTML = projects[projectIndex].description;
                            projectDescriptionText.style.opacity = 1;
                            if(projects[projectIndex].link.address == "") //? Check if the link is empty
                            {
                                projectDescriptionLink.style.display = "none";
                            }
                            else
                            {
                                projectDescriptionLink.style.display = "block";
                                projectDescriptionLink.innerText = projects[projectIndex].link.preview;
                                projectDescriptionLink.href = projects[projectIndex].link.address;
                                projectDescriptionLink.style.opacity = 1;
                            }
                            backgroundImage.style.backgroundImage = `url(${projects[projectIndex].image})`; //!this might need to be changed to a path later on
                            backgroundImage.style.opacity = 0.25;
                        }, 500);
                        textEffect(projects[projectIndex].name.toUpperCase());
                    }
                    else
                    {
                        projectSelected = false;
                        projectButton.classList.remove("project-button-active");
                    }
                });

                const observer = new MutationObserver(function(mutationsList, observer) {
                    for(let mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        console.log("Projects DOM Changed");
                        if(!projectSelected) {
                            defaultBHVR();
                        }
                        else
                        {
                            projectDescriptionLink.style.display = "block";
                        }
                    }
                    }
                });

                observer.observe(projectButton, { attributes: true });
            });
        }}, 100);
});

function defaultBHVR()
{
    backgroundImage.style.opacity = 0; 
    projectDescriptionText.style.opacity = 0;
    projectDescriptionLink.style.opacity = 0;
    setTimeout(() => {
        projectDescriptionText.innerHTML = defaultProjectDescription;
        projectDescriptionText.style.opacity = 1;
        projectDescriptionLink.style.display = "none";
        backgroundImage.style.backgroundImage = `url(${defaultProjectImage})`;
        backgroundImage.style.opacity = 0.25;
    }, 500);
    textEffect(defaultProjectName.toUpperCase());
}

function textEffect(newText)
{
    // console.log("Text Effect");
    // projectTitle.style.transform = "RotateY(90deg)";
    // setTimeout(() => {
    //     projectTitle.innerText = newText;
    //     projectTitle.style.transform = "RotateY(0deg)";
    // }, 350);

    //? The idea behind this effect is to split the text into individual characters
    //? save each character in a span element and then animate the span elements

    projectTitle.innerHTML = "";

    newText.split("").forEach((char, index) => {
        let span = document.createElement("span");
        span.innerHTML = char === " " ? "&nbsp;" : char; // Preserve spaces
        span.style.display = "inline-block";
        span.style.transform = "rotateY(90deg)";
        span.style.transition = "transform 0.35s ease-out";
        span.style.transitionDelay = `${index * 50}ms`; //?delay each letter by 50ms

        projectTitle.appendChild(span);

        setTimeout(() => {
            span.style.transform = "rotateY(0deg)";
        }, 50);
    });
}