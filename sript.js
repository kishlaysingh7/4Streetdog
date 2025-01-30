document.addEventListener("DOMContentLoaded", function () {
    const dogData = [
      {
        name: "Max",
        image: "assets/dog1.jpg", // Make sure to replace with actual image URLs
        description: "Max is a friendly and playful Golden Retriever. He loves long walks and playtime."
      },
      {
        name: "Rex",
        image: "assets/dog2.jpg",
        description: "Rex is an energetic and loving German Shepherd. He’s great with kids and other pets."
      },
      {
        name: "Bella",
        image: "assets/dog3.jpg",
        description: "Bella is a sweet and calm Labrador Retriever. She enjoys lounging and cuddles."
      },
      {
        name: "Luna",
        image: "assets/dog4.jpg",
        description: "Luna is a playful Beagle. She loves exploring the outdoors and running around!"
      }
    ];
  
    const dogList = document.getElementById("dog-list");
  
    // Function to render all dogs
    function renderDogs(dogs) {
      dogList.innerHTML = ''; // Clear the list before rendering
  
      dogs.forEach(dog => {
        const dogCard = document.createElement("div");
        dogCard.classList.add("dog-card");
  
        dogCard.innerHTML = `
          <img src="${dog.image}" alt="${dog.name}">
          <h3>${dog.name}</h3>
          <p>${dog.description}</p>
          <button class="adopt-btn" data-dog="${dog.name}">Adopt Me</button>
        `;
  
        dogList.appendChild(dogCard);
      });
  
      // Attach event listeners to the Adopt buttons
      document.querySelectorAll('.adopt-btn').forEach(button => {
        button.addEventListener('click', function () {
          const dogName = this.getAttribute('data-dog');
          alert(`Thank you for adopting ${dogName}! We will contact you soon.`);
        });
      });
    }
  
    // Render all dogs initially
    renderDogs(dogData);
  
    // Function to search dogs by name
    window.searchDogs = function () {
      const searchInput = document.getElementById("search-input").value.toLowerCase();
      const filteredDogs = dogData.filter(dog =>
        dog.name.toLowerCase().includes(searchInput)
      );
      renderDogs(filteredDogs); // Re-render with filtered dogs
    };
  });
  