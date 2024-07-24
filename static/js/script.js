// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13)
    
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Variable to store the current marker
var marker

// Add event listeners to each item
document.querySelectorAll('.api-received').forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault() // Prevent default anchor behavior

    // Get longitude and latitude from data attributes
    var longitude = parseFloat(this.getAttribute('data-longitude'))
    var latitude = parseFloat(this.getAttribute('data-latitude'))

    // Remove previous marker if it exists
    if (marker) {
      marker.remove()
    }

    // Update the map view and add a marker
    map.setView([latitude, longitude], 13)
    marker = L.marker([latitude, longitude]).addTo(map)
  })
})

// Handle form submission via fetch
const csrftoken = '{{ csrf_token }}'

document.getElementById('sendGPS').addEventListener('submit', function (event) {
  event.preventDefault() // Prevent the default form submission

  const formData = new FormData(this)
  const data = Object.fromEntries(formData.entries())

  fetch('{% url "receive_gps_data" %}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken // Include CSRF token in headers
    },
    body: JSON.stringify(data) // Convert the object to a JSON string
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log('Success:', data)
      window.location.reload() // Refresh the page to display updated data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})