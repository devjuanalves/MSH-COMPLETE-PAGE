// Função para mover o slider para "Antes"
function moveToAntes(button) {
    const imageWrapper = button.closest('.image-wrapper');
    const afterImage = imageWrapper.querySelector('.image-after');
    const slider = imageWrapper.querySelector('.slider');

    // Move o slider para a posição inicial (Antes)
    afterImage.style.clipPath = 'inset(0 0 0 100%)'; // Esconde completamente o "Depois"
    slider.style.left = '0'; // Posiciona o slider no início
}

// Função para mover o slider para "Depois"
function moveToDepois(button) {
    const imageWrapper = button.closest('.image-wrapper');
    const afterImage = imageWrapper.querySelector('.image-after');
    const slider = imageWrapper.querySelector('.slider');

    // Move o slider para a posição final (Depois)
    afterImage.style.clipPath = 'inset(0 0 0 0)'; // Mostra completamente o "Depois"
    slider.style.left = '100%'; // Posiciona o slider no final
}

// Função para o movimento arrastável do slider
const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
    let isDragging = false;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.cursor = 'ew-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const imageWrapper = slider.closest('.image-wrapper');
            const rect = imageWrapper.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;

            let percent = (offsetX / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent)); // Limita entre 0 e 100

            // Atualiza o clipPath e a posição do slider
            const afterImage = imageWrapper.querySelector('.image-after');
            afterImage.style.clipPath = `inset(0 0 0 ${100 - percent}%)`;
            slider.style.left = `${percent}%`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
});
