// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Close menu when clicking outside
    if (navToggle.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
});

function closeMenuOnClickOutside(e) {
    if (!e.target.closest('nav') && !e.target.closest('.nav-toggle')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});








 // SLIDE SCRIPT CODEx
document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0; // Start with 0 index for easier looping
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  
  // Initialize first slide and dot
  slides[0].classList.add('active');
  dots[0].classList.add('active');

  // Arrow click handlers
  document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
  document.querySelector('.next').addEventListener('click', () => plusSlides(1));

  // Dot click handlers
  Array.from(dots).forEach((dot, index) => {
      dot.addEventListener('click', () => currentSlide(index));
  });

  function plusSlides(n) {
      showSlides(slideIndex += n);
  }

  function currentSlide(n) {
      showSlides(slideIndex = n);
  }

  function showSlides(n) {
      // Handle loop boundaries
      if (n >= slides.length) slideIndex = 0;
      if (n < 0) slideIndex = slides.length - 1;
      
      // Remove active classes
      Array.from(slides).forEach(slide => slide.classList.remove('active'));
      Array.from(dots).forEach(dot => dot.classList.remove('active'));
      
      // Add active classes
      slides[slideIndex].classList.add('active');
      dots[slideIndex].classList.add('active');
  }

  // Auto-advance every 5 seconds
  setInterval(() => plusSlides(1), 5000);
});  



// Product visibility control
let visibleProducts = 8; // Start with 8 visible products
const products = document.querySelectorAll('.product-grid'); // Changed to .product-grid
const viewMoreBtn = document.querySelector('.view-more');
const totalProducts = products.length;

function initializeProducts() {
  products.forEach((product, index) => {
    product.style.display = index < visibleProducts ? 'grid' : 'none';
  });
  updateButtonText();
}

function showMoreProducts() {
  visibleProducts = totalProducts; // Show all products
  products.forEach(product => product.style.display = 'grid');
  updateButtonText();
}

function showLessProducts() {
  visibleProducts = 8; // Reset to 8 products
  products.forEach((product, index) => {
    product.style.display = index < visibleProducts ? 'grid' : 'none';
  });
  updateButtonText();
}

function updateButtonText() {
  viewMoreBtn.textContent = visibleProducts >= totalProducts 
    ? 'Show Less' 
    : 'View More';
}

function handleViewMore() {
  if (visibleProducts >= totalProducts) {
    showLessProducts();
  } else {
    showMoreProducts();
  }
}

// Initialize and add event listener
document.addEventListener('DOMContentLoaded', initializeProducts);
viewMoreBtn.addEventListener('click', handleViewMore);

//Lightbox Image
 // grab all thumbnails, and the single overlay + its <img>
  const thumbs    = document.querySelectorAll('.productImg');
  const overlay   = document.querySelector('.lightbox-overlay');
  const overlayImg = overlay.querySelector('img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // set the overlay <img> to match whichever thumbnail was clicked
      overlayImg.src =  thumb.src;
      overlayImg.alt = thumb.alt || 'Product image';
      // show it
      overlay.style.display = 'flex';
    });
  });

  // clicking outside the enlarged image closes the overlay
  overlay.addEventListener('click', e => {
    if (e.target !== overlayImg) {
      overlay.style.display = 'none';
      overlayImg.src = '';
    }
  });

  //VALUE PROPOSITION SCRIPT CODE
// Animate on scroll
document.addEventListener('DOMContentLoaded', function() {
  const valueCards = document.querySelectorAll('.value-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  valueCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });

  // Hover effect enhancement
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.value-icon').style.transform = 'rotate(10deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.value-icon').style.transform = 'none';
    });
  });
});

//FOOTER SCRIPT CODE
/*
function updateContactStatus() {
  // Update local time display (hours:minutes)
  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
  };

  // Check local business hours availability
  const checkAvailability = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday
    
    // Availability: Mon-Sat 9AM-8PM LOCAL TIME
    const isAvailable = currentDay !== 0 && // Not Sunday
                       currentHour >= 9 && 
                       currentHour < 20;

    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    statusDot.style.background = isAvailable ? '#2ecc71' : '#e74c3c';
    statusDot.style.boxShadow = isAvailable 
      ? '0 0 8px rgba(46, 204, 113, 0.3)' 
      : '0 0 8px rgba(231, 76, 60, 0.3)';
      
    statusText.textContent = isAvailable 
      ? 'Support Team Available' 
      : 'Support Team Offline';
  };

  updateTime();
  checkAvailability();
}

// Update every minute (60,000ms)
setInterval(updateContactStatus, 60000);
updateContactStatus(); // Initial call
*/

function updateContactStatus() {
  // Update local time display (e.g. "2:30PM")
  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('current-time').textContent = `${hours}:${minutes}${suffix}`;
  };

  // Check local business hours availability
  const checkAvailability = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday
    
    // Availability: Mon–Sat 9AM–8PM LOCAL TIME
    const isAvailable = currentDay !== 0 &&
                        currentHour >= 9 &&
                        currentHour < 20;

    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    statusDot.style.background = isAvailable ? '#2ecc71' : '#e74c3c';
    statusDot.style.boxShadow = isAvailable
      ? '0 0 8px rgba(46, 204, 113, 0.3)'
      : '0 0 8px rgba(231, 76, 60, 0.3)';
      
    statusText.textContent = isAvailable
      ? 'Support Team Available'
      : 'Support Team Offline';
  };

  updateTime();
  checkAvailability();
}

// Update every minute (60,000ms)
setInterval(updateContactStatus, 60000);
updateContactStatus(); // Initial call



