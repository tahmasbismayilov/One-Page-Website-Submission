// Current slide index
let currentSlide = 0;
const modal = document.getElementById('photoModal');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Open the modal and display the selected image
function openModal(index) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    jumpToSlide(index);
}

// Close the modal
function closeModal() {
    modal.classList.remove('show');
    
    // Use setTimeout to allow the opacity transition to complete
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    }, 300);
}

// Navigate to previous or next slide
function changeSlide(direction) {
    jumpToSlide(currentSlide + direction);
}

// Jump to a specific slide
function jumpToSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Handle index bounds
    currentSlide = index;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Show the current slide and activate its dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Initialize the slider
document.addEventListener('DOMContentLoaded', function() {
    // Set up modal display transitions
    modal.style.display = 'none';
    
    // Set the first slide as active when the page loads
    slides[0].classList.add('active');
    dots[0].classList.add('active');
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
    
    // Close modal when clicking outside of the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add swipe functionality for touch devices
    let startX;
    let endX;
    
    const slider = document.querySelector('.slider');
    
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        const swipeDistance = endX - startX;
        
        if (Math.abs(swipeDistance) >= threshold) {
            if (swipeDistance > 0) {
                // Swipe right - show previous
                changeSlide(-1);
            } else {
                // Swipe left - show next
                changeSlide(1);
            }
        }
    }
}); 