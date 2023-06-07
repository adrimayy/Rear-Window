window.onload = function() {
    let curtains = document.querySelectorAll('.curtain');
    curtains.forEach((curtain, index) => {
        curtain.addEventListener('click', function() {
            curtain.classList.add('curtain-open');
            if (index === curtains.length - 1) {
                setTimeout(function() {
                    curtain.parentElement.style.display = 'none';
                }, 1000); // This should match the transition duration in your CSS
            }
        });
    });
    const target = document.querySelector('#target');
    const lensContainer = document.querySelector('.lens-container');
    const lens = document.querySelector('#lens');
    const overlay = document.querySelector('#overlay');

    const updateLensSize = () => {
        const lensSize = target.clientHeight / 2;
        lens.style.width = `${lensSize}px`;
        lens.style.height = `${lensSize}px`;
    };

    updateLensSize();
    window.addEventListener('resize', updateLensSize);

    const setLensPosition = (x, y) => {
        const lensSize = parseFloat(lens.style.width);
        const lensX = Math.min(Math.max(0, x - lensSize / 2), lensContainer.offsetWidth - lensSize);
        const lensY = Math.min(Math.max(0, y - lensSize / 2), lensContainer.offsetHeight - lensSize);
        lens.style.left = `${lensX}px`;
        lens.style.top = `${lensY}px`;
        lens.style.backgroundPosition = `-${lensX}px -${lensY}px`;
    };
    
    setLensPosition(lensContainer.offsetWidth / 2, lensContainer.offsetHeight / 2);

    lensContainer.addEventListener('mousemove', e => {
        let rect = lensContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        setLensPosition(x, y);
    });

    lensContainer.addEventListener('mouseleave', e => {
        setLensPosition(lensContainer.offsetWidth / 2, lensContainer.offsetHeight / 2);
    });
}
