// Local Package Registry Dataset
const targetToursList = [
    {
        id: 1,
        title: "Alpine Wonderland Expedition",
        location: "Swiss Alps, Switzerland",
        duration: "6 Days",
        category: "Adventure",
        price: 1299,
        image: "https://unsplash.com"
    },
    {
        id: 2,
        title: "Kyoto Heritage & Temples Tour",
        location: "Kyoto, Japan",
        duration: "5 Days",
        category: "Cultural",
        price: 950,
        image: "https://unsplash.com"
    },
    {
        id: 3,
        title: "Santorini Sunset Coastal Escape",
        location: "Santorini, Greece",
        duration: "7 Days",
        category: "Relaxation",
        price: 1450,
        image: "https://unsplash.com"
    },
    {
        id: 4,
        title: "Inca Trail Hidden Machu Picchu",
        location: "Cusco, Peru",
        duration: "8 Days",
        category: "Adventure",
        price: 1100,
        image: "https://unsplash.com"
    },
    {
        id: 5,
        title: "Moroccan Desert Kasbah Safari",
        location: "Marrakech, Morocco",
        duration: "6 Days",
        category: "Cultural",
        price: 820,
        image: "https://unsplash.com"
    }
];

// Active State Configuration Tracking parameters
let selectedBaseTourPrice = 0;

// Grab DOM Reference pointers
const destinationContainer = document.getElementById('destination-container');
const searchButton = document.getElementById('search-btn');
const inputDestination = document.getElementById('search-destination');
const inputDuration = document.getElementById('search-duration');
const filterTabs = document.querySelectorAll('.tab-pill');

const bookingModal = document.getElementById('booking-modal');
const closeModalBtn = document.getElementById('close-modal');
const bookingForm = document.getElementById('booking-form');
const modalTourTitle = document.getElementById('modal-tour-title');
const modalTourPriceRate = document.getElementById('modal-tour-price-rate');
const guestCountInput = document.getElementById('traveler-count');
const liveTotalPriceText = document.getElementById('live-total-price');

// Function rendering records array matching current query context properties
function displayTours(toursArray) {
    destinationContainer.innerHTML = '';
    
    if (toursArray.length === 0) {
        destinationContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 50px; color: #64748b;">
                <h3>No adventures found matching your criteria.</h3>
                <p>Try altering your keyword constraint definitions.</p>
            </div>
        `;
        return;
    }

    toursArray.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.classList.add('tour-card');
        
        tourCard.innerHTML = `
            <div class="tour-img-container">
                <img src="${tour.image}" alt="${tour.title}">
                <span class="tour-tag">${tour.category}</span>
            </div>
            <div class="tour-body">
                <div class="tour-meta">📍 ${tour.location} • ⏱️ ${tour.duration}</div>
                <div class="tour-title">${tour.title}</div>
                <p class="tour-description">Experience comprehensive sightseeing alongside premium local guide support frameworks.</p>
                <div class="tour-footer">
                    <div class="tour-price">$${tour.price} <span>/ person</span></div>
                    <button class="btn btn-primary booking-trigger-btn" data-id="${tour.id}">Book Now</button>
                </div>
            </div>
        `;
        
        destinationContainer.appendChild(tourCard);
    });

    attachModalTriggers();
}

// Global Core Query Evaluation Logic Handler
function filterToursEngine(categoryOverride = null) {
    const destQuery = inputDestination.value.toLowerCase().trim();
    const durQuery = inputDuration.value.toLowerCase().trim();
    
    // Evaluate active selected tab layout indicators
    const activeTab = categoryOverride || document.querySelector('.tab-pill.active').getAttribute('data-filter');

    const filtered = targetToursList.filter(tour => {
        const matchesDest = tour.title.toLowerCase().includes(destQuery) || 
                            tour.location.toLowerCase().includes(destQuery);
        const matchesDur = tour.duration.toLowerCase().includes(durQuery);
        const matchesCategory = (activeTab === 'all') || (tour.category === activeTab);
        
        return matchesDest && matchesDur && matchesCategory;
    });

    displayTours(filtered);
}

/* Interactive Component Booking Wizard Logic */
function attachModalTriggers() {
    document.querySelectorAll('.booking-trigger-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const tourId = parseInt(e.target.getAttribute('data-id'));
            const selectedTour = targetToursList.find(t => t.id === tourId);
            
            if (selectedTour) {
                selectedBaseTourPrice = selectedTour.price;
                modalTourTitle.innerText = `Book ${selectedTour.title}`;
                modalTourPriceRate.innerText = `Starting from $${selectedTour.price}.00 / person`;
                calculateLivePrice();
                bookingModal.style.display = 'flex';
            }
        });
    });
}

function calculateLivePrice() {
    const guests = parseInt(guestCountInput.value) || 1;
    const computedTotal = selectedBaseTourPrice * guests;
    liveTotalPriceText.innerText = `$${computedTotal.toLocaleString()}.00`;
}

// Attach calculations to active counter entry increments
guestCountInput.addEventListener('input', calculateLivePrice);

// Close triggers handlers
closeModalBtn.addEventListener('click', () => {
    bookingModal.style.display = 'none';
    bookingForm.reset();
});

window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
        bookingForm.reset();
    }
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientName = document.getElementById('traveler-name').value;
    alert(`Adventure Confirmed! Thank you ${clientName}, your provisional booking itinerary quote estimate has been calculated successfully!`);
    bookingModal.style.display = 'none';
    bookingForm.reset();
});

// Category Switcher Pill Listeners Hooks Configuration
filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelector('.tab-pill.active').classList.remove('active');
        e.target.classList.add('active');
        filterToursEngine(e.target.getAttribute('data-filter'));
    });
});

searchButton.addEventListener('click', () => filterToursEngine());

// Load and spin baseline parameters on DOM completion metrics
document.addEventListener('DOMContentLoaded', () => {
    displayTours(targetToursList);
});
