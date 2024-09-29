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
