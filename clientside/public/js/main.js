document.addEventListener('DOMContentLoaded', () => {
  fetch('/fundraisers')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const fundraiserList = document.getElementById('fundraiser-list');
      fundraiserList.innerHTML = ''; // 清空之前的内容
      data.forEach(fundraiser => {
        const div = document.createElement('div');
        div.className = 'fundraiser';
        div.innerHTML = `
          <h3>${fundraiser.CAPTION}</h3>
          <p>Organizer: ${fundraiser.ORGANIZER}</p>
          <p>Target Funding: ${fundraiser.TARGET_FUNDING}</p>
          <p>Current Funding: ${fundraiser.CURRENT_FUNDING}</p>
          <p>City: ${fundraiser.CITY}</p>
          <p>Category: ${fundraiser.CATEGORY_NAME}</p>
          <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
        `;
        fundraiserList.appendChild(div);
      });
    })
    .catch(error => console.error('Error fetching fundraisers:', error));
});


document.addEventListener('DOMContentLoaded', () => {
  // Fetch categories for search form
  fetch('/categories')
    .then(response => response.json())
    .then(data => {
      const categorySelect = document.getElementById('category');
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.NAME;
        option.textContent = category.NAME;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching categories:', error));

  // Handle search form submission
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    const category = document.getElementById('category').value;
    if (!organizer && !city && !category) {
      alert('Please select at least one criteria.');
      return;
    }
    const query = `organizer=${organizer}&city=${city}&category=${category}`;
    fetch(`/search?${query}`)
      .then(response => response.json())
      .then(data => {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        if (data.length === 0) {
          searchResults.innerHTML = '<p class="error">No fundraisers found.</p>';
        } else {
          data.forEach(fundraiser => {
            const div = document.createElement('div');
            div.className = 'fundraiser';
            div.innerHTML = `
              <h3>${fundraiser.CAPTION}</h3>
              <p>Organizer: ${fundraiser.ORGANIZER}</p>
              <p>Target Funding: ${fundraiser.TARGET_FUNDING}</p>
              <p>Current Funding: ${fundraiser.CURRENT_FUNDING}</p>
              <p>City: ${fundraiser.CITY}</p>
              <p>Category: ${fundraiser.CATEGORY_NAME}</p>
              <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
            `;
            searchResults.appendChild(div);
          });
        }
      })
      .catch(error => console.error('Error fetching search results:', error));
  });
});

// Clear checkboxes function
function clearCheckboxes() {
  document.getElementById('organizer').value = '';
  document.getElementById('city').value = '';
  document.getElementById('category').selectedIndex = 0;
}



document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fundraiserId = urlParams.get('id');
  if (fundraiserId) {
    fetch(`/fundraiser/${fundraiserId}`)
      .then(response => response.json())
      .then(fundraiser => {
        const fundraiserDetails = document.getElementById('fundraiser-details');
        fundraiserDetails.innerHTML = `
          <h2>${fundraiser.CAPTION}</h2>
          <p>Organizer: ${fundraiser.ORGANIZER}</p>
          <p>Target Funding: ${fundraiser.TARGET_FUNDING}</p>
          <p>Current Funding: ${fundraiser.CURRENT_FUNDING}</p>
          <p>City: ${fundraiser.CITY}</p>
          <p>Category: ${fundraiser.CATEGORY_NAME}</p>
          <button onclick="alert('This feature is under construction')">Donate</button>
        `;
      })
      .catch(error => console.error('Error fetching fundraiser details:', error));
  }
});
