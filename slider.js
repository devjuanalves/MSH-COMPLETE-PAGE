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
            afterImage.style.clipPath = `inset(0 0 0 ${100 - percent}%)`; // Correção aqui
            slider.style.left = `${percent}%`; // Correção aqui
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.addEventListener('mousedown', startSlide);
        slider.addEventListener('touchstart', startSlide);
    });

    function startSlide(e) {
        e.preventDefault();
        const slider = e.target;
        const retangulo = slider.parentElement;

        const moveSlider = (e) => {
            const rect = retangulo.getBoundingClientRect();
            const offsetX = e.clientX || e.touches[0].clientX; // Para suportar toque
            let percentage = ((offsetX - rect.left) / rect.width) * 100;

            // Garante que a porcentagem esteja entre 0 e 100
            percentage = Math.min(Math.max(percentage, 0), 100);

            // Atualiza a posição do slider
            slider.style.left = `${percentage}%`;

            // Ajusta a largura da imagem "Depois"
            const imageAfter = retangulo.querySelector('.image-after');
            imageAfter.style.clipPath = `inset(0 0 0 ${100 - percentage}%)`;
        };

        const stopSlide = () => {
            document.removeEventListener('mousemove', moveSlider);
            document.removeEventListener('touchmove', moveSlider);
            document.removeEventListener('mouseup', stopSlide);
            document.removeEventListener('touchend', stopSlide);
        };

        document.addEventListener('mousemove', moveSlider);
        document.addEventListener('touchmove', moveSlider);
        document.addEventListener('mouseup', stopSlide);
        document.addEventListener('touchend', stopSlide);
    }
});
