document.addEventListener('mousemove', function (e) {
    const boxes = document.querySelectorAll('.glass-box');
    const moveFactor = 20; // Define a intensidade do movimento
    
    boxes.forEach(box => {
        const { left, top, width, height } = box.getBoundingClientRect();
        const boxCenterX = left + width / 2;
        const boxCenterY = top + height / 2;
        
        const moveX = (e.clientX - boxCenterX) / moveFactor;
        const moveY = (e.clientY - boxCenterY) / moveFactor;
        
        box.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

document.querySelectorAll('.accordion').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});






