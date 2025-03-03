import TypeWords from 'https://cdn.jsdelivr.net/npm/crawling-typer@1.1.0/typer.js';

const delayStartDir = 750;
const delayOutput = delayStartDir + 925;
const date = new Date(); 

const CliDisplay = {
    template: `
        <div class="cmd-container">
            <p class="cmd-title" v-html="pageTitle"></p>
            <p class="cmd-path">
                {{ cmdPathText }}
                <span v-if="index === 0" class="cmd-input" ref="cmdInput"></span>
            </p>
            <p v-for="(output, i) in outputs" v-html="output" :key="i"></p>
        </div>
    `,
    data() {
        return {
            pageTitle: 'Nadav Moscovici [Version 10.0.22631.4037]<br>(c) Moscovici Corporation. All rights reserved.<br><br>',
            cmdPathText: 'C:\\Users\\Nadav Moscovici>',
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
                    const typeText = TypeWords([{ text: "dir", color: "#FFFFFF" }], cmdInput, 300, 75, 1000, 1, "pause", { name: "forwards", index: 0 });
                    typeText.cursor(true, 0, "|");

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
            //?Could be a nice touch to have the dates be diffrent as well for the first two lines
            let today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            let time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

            let random1 = Math.floor((Math.random() * 51) + 10);
            let minutes1 = date.getMinutes() - random1;
            let hours1 = date.getHours(); 
            //console.log("1 -> " + minutes1 + " -> " + random1);
            if(minutes1<0)
            {
                minutes1 += 60; 
                hours1 -= 1;
            }
            let time1 = `${hours1.toString().padStart(2, '0')}:${minutes1.toString().padStart(2, '0')}`

            let random2 = Math.floor((Math.random() * (59 - random1)) + random1);
            let minutes2 = date.getMinutes() - random2;
            let hours2 = date.getHours(); 
            //console.log("2 -> " + minutes2 + " -> " + random2);
            if(minutes2<0)
            {
                minutes2 += 60; 
                hours2 -= 1;
            }
            let time2 = `${hours2.toString().padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}`

            const options = [
                `<span>${today}  ${time1}   &lt;DIR&gt;          .</span><br>`,
                `<span>${today}  ${time2}   &lt;DIR&gt;         ..</span><br>`,
                `<span>${today}  ${time}            <span class="cmd-span"><a href="aboutme.html" class="btn cmd-btns">About Me</a><div class="btn-underline"></div></span></span><br>`,
                `<span>${today}  ${time}            <span class="cmd-span"><a href="projects.html" class="btn cmd-btns">Projects</a><div class="btn-underline"></div></span></span>`,
                `<span>${today}  ${time}            <span class="cmd-span"><a href="https://docs.google.com/document/d/1a2XT9Ca_dD2sZKPfn74P_9xEabA0tqQmBNa8uBs6q8Y/edit?usp=sharing" target="_blank" id="CV" class="btn cmd-btns" v-on="myFilter">Curriculum Vitae</a><div class="btn-underline"></div></span></span>`
            ];
            
            let index = 0;
            const genSpeed = 100;
            
            const interval = setInterval(() => {
                this.outputs.push(options[index]);
                index++;
            
                if (index === options.length) {
                    clearInterval(interval);
            
                    //! Ensure the DOM updates before selecting elements
                    setTimeout(() => {
                        document.querySelectorAll('.cmd-btns').forEach(btn => {
                            const underline = btn.closest('.cmd-span')?.querySelector('.btn-underline');
                            if (underline) {
                                btn.addEventListener('mouseover', function () {
                                    underline.style.width = '100%'; //? Set width to match text
                                });
                                btn.addEventListener('mouseleave', function () {
                                    underline.style.width = '0%'; //? Reset width on mouse leave
                                });
                            }
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