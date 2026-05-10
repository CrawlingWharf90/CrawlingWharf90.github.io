import TypeWords from 'https://cdn.jsdelivr.net/npm/crawling-typer@1.1.1/typer.js';

const delayStartDir = 750;
const delayOutput = delayStartDir + 925;
const date = new Date(); 

document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.querySelector(".dynamic-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

const CliDisplay = {
    template: `
        <div class="cmd-container">
            <p class="cmd-title" v-html="pageTitle"></p>
            <p class="cmd-path">
                {{ cmdPathText }}
                <span v-if="index === 0" class="cmd-input" ref="cmdInput"></span>
            </p>
            <p class="m-0" v-for="(output, i) in outputs" v-html="output" :key="i"></p>
        </div>
    `,
    data() {
        return {
            pageTitle: 'NADAV_OS [Version 10.0.22631.4037]<br>(c) Moscovici Corporation. All rights reserved.<br>AUTHORIZATION: GRANTED',
            cmdPathText: 'C:\\SYS_ADMIN\\Nadav_Moscovici>',
            outputs: [],
            index: 0
        };
    },
    mounted() {
        this.initTypingEffect();
    },
    methods: {
        initTypingEffect() {
            setTimeout(() => {
                const cmdInput = this.$refs.cmdInput;

                if (this.index === 0 && cmdInput) {
                    const typeText = TypeWords([{ text: "dir", color: "#FFFFFF" }], cmdInput, 150, 75, 1000, 1, "pause", { name: "forwards", index: 0 });
                    typeText.cursor(true, 500, "_");

                    setTimeout(() => {
                        typeText.reset();
                    }, delayStartDir);
                }
            }, 0);

            setTimeout(() => {
                this.outputResults();
            }, delayOutput);
        },
        outputResults() {
            const baseDate = new Date();

            //? 1. Current Time (for your actual files/folders)
            let today = `${baseDate.getDate().toString().padStart(2, '0')}/${(baseDate.getMonth()+1).toString().padStart(2, '0')}/${baseDate.getFullYear()}`;
            let time = `${baseDate.getHours().toString().padStart(2, '0')}:${baseDate.getMinutes().toString().padStart(2, '0')}`;

            //? 2. Calculate time for '.' (10 to 60 minutes ago)
            let random1 = Math.floor((Math.random() * 51) + 10);
            // Subtract minutes in milliseconds (1 min = 60000 ms)
            let date1 = new Date(baseDate.getTime() - (random1 * 60000));
            let today1 = `${date1.getDate().toString().padStart(2, '0')}/${(date1.getMonth()+1).toString().padStart(2, '0')}/${date1.getFullYear()}`;
            let time1 = `${date1.getHours().toString().padStart(2, '0')}:${date1.getMinutes().toString().padStart(2, '0')}`;

            //? 3. Calculate time for '..' (Even older than '.')
            let random2 = Math.floor((Math.random() * (59 - random1)) + random1);
            let date2 = new Date(baseDate.getTime() - (random2 * 60000));
            let today2 = `${date2.getDate().toString().padStart(2, '0')}/${(date2.getMonth()+1).toString().padStart(2, '0')}/${date2.getFullYear()}`;
            let time2 = `${date2.getHours().toString().padStart(2, '0')}:${date2.getMinutes().toString().padStart(2, '0')}`;

            const options = [
                `<span class="data-dim">${today1}  ${time1}   &lt;DIR&gt;          .</span>`,
                `<span class="data-dim">${today2}  ${time2}   &lt;DIR&gt;         ..</span>`,
                `<span>${today}  ${time}   &lt;DIR&gt;         <a href="aboutme.html" class="lux-dir-link internal-link">About_Me</a></span>`,
                `<span>${today}  ${time}   &lt;DIR&gt;         <a href="projects.html" class="lux-dir-link internal-link">Projects</a></span>`,
                `<span>${today}  ${time}   &lt;FILE&gt;        <a href="https://docs.google.com/document/d/1a2XT9Ca_dD2sZKPfn74P_9xEabA0tqQmBNa8uBs6q8Y/edit?usp=sharing" target="_blank" id="CV" class="lux-dir-link external-link">Curriculum_Vitae.pdf</a></span>`
            ];
            
            let index = 0;
            const genSpeed = 80;
            
            const interval = setInterval(() => {
                this.outputs.push(options[index]);
                index++;
            
                if (index === options.length) {
                    clearInterval(interval);
            
                    //* Ensure DOM updates, then attach transition logic
                    setTimeout(() => {
                        //? 1. Intercept internal links for the Glitch Transition
                        document.querySelectorAll('.internal-link').forEach(link => {
                            link.addEventListener('click', (e) => {
                                e.preventDefault();
                                //! Remove the entry glitch class so they don't fight
                                document.body.classList.remove('lux-glitch-in');
                                //! Trigger the exit glitch
                                document.body.classList.add('lux-glitch-out');
                                
                                //! Wait 700ms for animation to complete before jumping
                                setTimeout(() => {
                                    window.location.href = link.href;
                                }, 700);
                            });
                        });
                    }, 50);
                }
            }, genSpeed);
        }
    }
};

const app = Vue.createApp({});
app.component('cli-display', CliDisplay);
app.mount('#app');