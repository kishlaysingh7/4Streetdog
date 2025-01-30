// Theme Toggle Functions
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-toggle i');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.querySelector('.theme-toggle i');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
}

// Counter Animation
function animateCounter(element, finalValue, duration = 2000) {
  let start = 0;
  const increment = finalValue / (duration / 10);
  const counter = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    if (start >= finalValue) {
      element.textContent = finalValue;
      clearInterval(counter);
    }
  }, 10);
}

function initCounters() {
  animateCounter(document.getElementById('rescued-counter'), 1524);
  animateCounter(document.getElementById('adopted-counter'), 987);
  animateCounter(document.getElementById('ngo-counter'), 45);
}

// Dog Filtering System
const dogs = [
  { name: "Buddy", age: 2, breed: "Labrador", size: "large", image: "assets/dog1.jpg" },
  { name: "Max", age: 1, breed: "German Shepherd", size: "large", image: "assets/dog2.jpg" },
  { name: "Daisy", age: 3, breed: "Beagle", size: "small", image: "assets/dog3.jpg" },
];

function displayDogs(filteredDogs = dogs) {
  const dogList = document.getElementById('dog-list');
  dogList.innerHTML = filteredDogs.map(dog => `
    <div class="dog-card">
      <img src="${dog.image}" alt="${dog.name}">
      <h3>${dog.name}</h3>
      <p>Age: ${dog.age} years</p>
      <p>Breed: ${dog.breed}</p>
      <p>Size: ${dog.size}</p>
    </div>
  `).join('');
}

function filterDogs() {
  const searchTerm = document.getElementById('search-dogs').value.toLowerCase();
  const ageFilter = document.getElementById('filter-age').value;
  const sizeFilter = document.getElementById('filter-size').value;

  return dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm) || 
                         dog.breed.toLowerCase().includes(searchTerm);
    const matchesAge = !ageFilter || 
                      (ageFilter === 'puppy' && dog.age < 1) ||
                      (ageFilter === 'young' && dog.age >= 1 && dog.age < 3) ||
                      (ageFilter === 'adult' && dog.age >= 3);
    const matchesSize = !sizeFilter || dog.size === sizeFilter;
    
    return matchesSearch && matchesAge && matchesSize;
  });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
testimonials.forEach(testimonial => testimonial.classList.remove('active'));
dots.forEach(dot => dot.classList.remove('active'));

testimonials[index].classList.add('active');
if (dots[index]) {
  dots[index].classList.add('active');
}
}

// Auto-slide every 7 seconds
setInterval(() => {
currentTestimonial = (currentTestimonial + 1) % testimonials.length;
showTestimonial(currentTestimonial);
}, 7000);

// Mobile Menu Toggle (Add a button for this functionality if needed)
function toggleMobileMenu() {
const nav = document.querySelector('nav');
nav.classList.toggle('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
// Initialize all components
applySavedTheme();
initCounters();
displayDogs();

// Testimonial auto-slide is already handled with setInterval

// Filter event listeners
document.getElementById('search-dogs').addEventListener('input', () => {
  displayDogs(filterDogs());
});

document.getElementById('filter-age').addEventListener('change', () => {
  displayDogs(filterDogs());
});

document.getElementById('filter-size').addEventListener('change', () => {
  displayDogs(filterDogs());
});

// If there's a mobile menu button, make sure to handle its toggle
// For now, it's just a placeholder for the mobile menu button functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  const nav = document.querySelector('nav');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  
  if (!nav.contains(event.target) && (!mobileBtn || !mobileBtn.contains(event.target))) {
    nav.classList.remove('active');
  }
});
});
