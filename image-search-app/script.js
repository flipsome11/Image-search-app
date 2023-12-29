// Constants and variables to store API key, DOM elements, input data, and page number
const accessKey = "K4K_REplonL0jEo4T0MAtVSK9VVajeglHNBvU3pKFKA";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
let inputData = "";
let page = 1;

// Function to perform image search using the Unsplash API
async function searchImages() {
    // Get the search query from the input field
    inputData = inputEl.value;
    
    // Construct the URL for fetching images from Unsplash based on query and page number
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // Fetch data from the Unsplash API
    const response = await fetch(url);
    const data = await response.json();

    // Extract the image results
    const results = data.results;

    // Clear the search results if it's the first page of results
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    // Iterate through each image result and create HTML elements to display them
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        // Append the image and its link to the search results container
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    // Increment the page number for subsequent searches
    page++;

    // Display the "Show More" button if more than one page of results is available
    if (page > 1) {
        showMore.style.display = "block";
    }
}

// Event listener for form submission to initiate a search
formEl.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Reset the page number to 1 and perform a new search
    page = 1;
    searchImages();
});

// Event listener for the "Show More" button to load additional search results
showMore.addEventListener("click", () => {
    // Perform another search when the button is clicked
    searchImages();
});
