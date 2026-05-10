class CrawlingTools 
{
    static alertModal(message)
    {
        const modal = document.createElement('div');
        modal.id = 'alert-modal';
        modal.classList.add('alert-modal');
        modal.innerHTML = `
            <div class="alert-modal-content">
                <p></p>
                <div class="mt-3">
                    <button id="alert-ok-btn">OK</button>
                    <div class="text-muted mt-2" style="font-size: 0.8rem;">or press <b>Backspace / Del</b></div>
                </div>
            </div>
        `;

        // Inject message
        modal.querySelector('.alert-modal-content p').innerHTML = message;
        
        const closeAlert = () => {
            modal.style.top = window.innerHeight + modal.offsetHeight + 'px';
            
            document.removeEventListener("keydown", handleAlertKeys);
            
            setTimeout(() => {
                if (document.body.contains(modal)) document.body.removeChild(modal);
                if (document.body.contains(alertBackground)) document.body.removeChild(alertBackground);
            }, parseFloat(getComputedStyle(modal).transitionDuration) * 1000);
        };

        modal.querySelector('#alert-ok-btn').addEventListener('click', closeAlert);

        const handleAlertKeys = (e) => {
            if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault(); // Stop it from deleting text in the background
                closeAlert();
            }
        };
        document.addEventListener("keydown", handleAlertKeys);

        const alertBackground = document.createElement('div');
        alertBackground.classList.add('alert-modal-background');
        
        document.body.appendChild(alertBackground);
        document.body.appendChild(modal);
    }

    static openImage(target, stopNewTab = false) 
    {
        // 1. Normalize the input into an array of elements
        let images = [];
        if (typeof target === 'string') {
            images = Array.from(document.querySelectorAll(target));
        } else if (target instanceof NodeList || Array.isArray(target)) {
            images = Array.from(target);
        } else if (target instanceof HTMLElement) {
            images = [target];
        }

        // 2. Apply to every image found
        images.forEach(imgElement => {
            // Prevent right-click on the original image if requested
            if (stopNewTab) {
                imgElement.addEventListener('contextmenu', (e) => e.preventDefault());
            }

            imgElement.classList.add('crawling-zoomable');

            imgElement.addEventListener('click', () => {
                if(document.querySelector('.crawling-image-overlay')) return; //! Prevent multiple overlays
                const overlay = document.createElement('div');
                overlay.classList.add('crawling-image-overlay');

                const enlargedImg = document.createElement('img');
                enlargedImg.src = imgElement.src;
                enlargedImg.classList.add('crawling-enlarged-img');

                // Prevent right-click on the enlarged image if requested
                if (stopNewTab) {
                    enlargedImg.addEventListener('contextmenu', (e) => e.preventDefault());
                }

                overlay.appendChild(enlargedImg);
                document.body.appendChild(overlay);

                requestAnimationFrame(() => {
                    void overlay.offsetWidth;
                    overlay.classList.add('active');
                });

                overlay.addEventListener('click', () => {
                    overlay.classList.remove('active');
                    
                    setTimeout(() => {
                        if (document.body.contains(overlay)) {
                            document.body.removeChild(overlay);
                        }
                    }, 300);
                });
            });
        });
    }
}

export { CrawlingTools };