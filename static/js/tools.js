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
                <button>OK</button>
            </div>
        `;

        modal.querySelector('.alert-modal-content').querySelector('p').innerHTML = message;
        modal.querySelector('.alert-modal-content').querySelector('button').addEventListener('click', () => {
            modal.style.top = window.innerHeight + modal.offsetHeight + 'px';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.removeChild(alertBackground);
            }, parseFloat(getComputedStyle(modal).transitionDuration) * 1000);
        });

        const alertBackground = document.createElement('div');
        alertBackground.classList.add('alert-modal-background');
        alertBackground.style.width = '100vw';
        alertBackground.style.height = '100vh';

        document.body.appendChild(alertBackground);
        document.body.appendChild(modal);

        // // console.log("time -> " + parseFloat(getComputedStyle(modal).transitionDuration) * 1000);
    }
}

export { CrawlingTools };