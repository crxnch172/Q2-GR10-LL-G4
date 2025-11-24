document.addEventListener('DOMContentLoaded', () => {
    console.log('Creative Studio loaded successfully.');

    const playBtn = document.querySelector('.play-btn');
    const videoCard = document.querySelector('.video-card');

    const videoModal = document.getElementById('video-modal');
    const fullVideo = document.getElementById('full-video');
    const videoPreview = document.querySelector('.card-video-preview');

    function openVideo() {
        if (videoModal && fullVideo) {
            videoModal.classList.add('active');
            fullVideo.currentTime = 0;
            fullVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }

    function closeVideo() {
        if (videoModal && fullVideo) {
            videoModal.classList.remove('active');
            fullVideo.pause();
        }
    }

    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playBtn.style.transform = 'scale(1)';
                openVideo();
            }, 150);
        });
    }

    if (videoPreview) {
        videoPreview.addEventListener('click', (e) => {
            e.stopPropagation();
            openVideo();
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal || e.target.classList.contains('modal-content')) {
                closeVideo();
            }
        });
    }

    const imageModal = document.getElementById('image-modal');
    const fullImage = document.getElementById('full-image');
    const cardImg = document.querySelector('.card-img');

    if (cardImg && imageModal && fullImage) {
        cardImg.addEventListener('click', (e) => {
            e.stopPropagation();
            fullImage.src = cardImg.src;
            imageModal.classList.add('active');
        });
    }

    if (imageModal) {
        imageModal.addEventListener('click', () => {
            imageModal.classList.remove('active');
        });
    }

    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height * 10);
            const yRotation = ((x - rect.width / 2) / rect.width * 10);
            
            card.style.transform = `perspective(1000px) rotateX(${-xRotation}deg) rotateY(${yRotation}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('poster-card')) {
                card.style.transform = 'translateY(20px)';
            } else {
                card.style.transform = 'translateY(0)';
            }
        });
    });
});
