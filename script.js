96% of storage used … If you run out, you can't create, edit, and upload files. Get 30 GB for ₱10 for 2 months ₱49.
const apiUrl = 'https://api.sampleapis.com/beers/ale';
const container = document.getElementById('beer-container');

function getCountry(id) {
    const countries = ["Belgium", "USA", "Germany", "United Kingdom", "Netherlands", "Ireland", "Canada", "Australia"];
    return countries[id % countries.length];
}

async function getBeers() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        container.innerHTML = '';

        const limitedData = data.slice(0, 20);

        limitedData.forEach(beer => {
            const country = getCountry(beer.id);
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${beer.image}" class="card-img-top" alt="${beer.name}" 
                         onerror="this.src='https://via.placeholder.com/200x250?text=Beer+Image'">
                    <div class="card-body d-flex flex-column">
                        <div class="country-tag mb-1">
                            📍 ${country}
                        </div>
                        <h5 class="card-title h6 fw-bold mb-2">${beer.name}</h5>
                        <p class="price-tag mb-3">${beer.price || '$0.00'}</p>
                        
                        <div class="mt-auto pt-3 border-top">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="rating-badge">⭐ ${beer.rating.average ? beer.rating.average.toFixed(1) : '0.0'}</span>
                                <small class="text-muted" style="font-size: 0.7rem;">${beer.rating.reviews} reviews</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
    } catch (error) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    Gagal sa pagkuha ng data. Pakisuri ang iyong internet connection.
                </div>
            </div>`;
        console.error("Error:", error);
    }
}

getBeers();
