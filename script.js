document.addEventListener('DOMContentLoaded', () => {
    const recommendationForm = document.getElementById('recommendationForm');
    const recommendationsList = document.getElementById('recommendationsList');
    const categorySelect = document.getElementById('categorySelect');
    const characteristicsInput = document.getElementById('characteristicsInput');
    const watchedInput = document.getElementById('watchedInput');

    recommendationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Clear previous recommendations and show loading/processing message
        recommendationsList.innerHTML = '<p class="placeholder-text">Fetching recommendations...</p>';

        const category = categorySelect.value;
        const characteristics = characteristicsInput.value;
        const watched = watchedInput.value;

        console.log('User Inputs:', { category, characteristics, watched });

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Call the mock AI recommendation function
        const mockRecommendations = getMockAIRecommendations(category, characteristics, watched);

        displayRecommendations(mockRecommendations);
    });

    function getMockAIRecommendations(category, characteristics, watched) {
        // This is a mock function. In a real scenario, this would involve
        // sending data to an AI service and receiving recommendations.
        console.log('Calling Mock AI with:', { category, characteristics, watched });

        let recommendations = [];
        const charLower = characteristics.toLowerCase();
        const watchedLower = watched.toLowerCase();

        // Example mock data
        const allMovies = [
            { title: 'Galaxy Explorers', synopsis: 'A thrilling space adventure across unknown galaxies.', genres: ['Sci-Fi', 'Adventure'], poster_placeholder: 'galaxy_explorers.jpg' },
            { title: 'The Last Detective', synopsis: 'A gritty detective story set in a rain-soaked city.', genres: ['Thriller', 'Drama', 'Crime'], poster_placeholder: 'last_detective.jpg' },
            { title: 'Comedy Knights', synopsis: 'A hilarious tale of mistaken identities and medieval chaos.', genres: ['Comedy', 'Family'], poster_placeholder: 'comedy_knights.jpg' },
            { title: 'Mountain Echoes', synopsis: 'A philosophical journey of a hermit in the Himalayas.', genres: ['Drama', 'Philosophical'], poster_placeholder: 'mountain_echoes.jpg' },
            { title: 'Cybernetic Uprising', synopsis: 'In a dystopian future, AI rebels against humanity.', genres: ['Sci-Fi', 'Action', 'Thriller'], poster_placeholder: 'cybernetic_uprising.jpg' },
            { title: 'Whispers of the Ancient Forest', synopsis: 'A fantasy epic about a hidden magical world.', genres: ['Fantasy', 'Adventure'], poster_placeholder: 'ancient_forest.jpg' },
            { title: 'Ocean Blues: A Coral Story', synopsis: 'A stunning look at the life within coral reefs.', genres: ['Documentary', 'Nature'], poster_placeholder: 'ocean_blues.jpg' },
            { title: 'The Animated Dream', synopsis: 'A heartwarming animated feature for all ages.', genres: ['Animation', 'Family', 'Musical'], poster_placeholder: 'animated_dream.jpg' },
            { title: 'Midnight Manor', synopsis: 'A classic horror tale with a modern twist.', genres: ['Horror', 'Mystery'], poster_placeholder: 'midnight_manor.jpg' }
        ];

        // Simple filtering logic for mock
        if (category !== 'all') {
            recommendations = allMovies.filter(movie => movie.genres.map(g => g.toLowerCase()).includes(category.toLowerCase()));
        } else {
            recommendations = [...allMovies];
        }

        if (charLower.includes('fast-paced')) {
            recommendations = recommendations.filter(m => m.genres.includes('Action') || m.genres.includes('Thriller') || m.synopsis.toLowerCase().includes('thrilling'));
        }
        if (charLower.includes('mind-bending')) {
            recommendations = recommendations.filter(m => m.genres.includes('Sci-Fi') || m.synopsis.toLowerCase().includes('philosophical') || m.synopsis.toLowerCase().includes('mystery'));
        }
        if (charLower.includes('family-friendly')) {
            recommendations = recommendations.filter(m => m.genres.includes('Family') || m.genres.includes('Animation'));
        }
         if (charLower.includes('gritty detective')) {
            recommendations.push({ title: 'Shadow City Detective', synopsis: 'A hard-boiled detective uncovers a city-wide conspiracy.', genres: ['Crime', 'Thriller', 'Noir'], poster_placeholder: 'shadow_city.jpg' });
        }


        // Limit to a few recommendations
        recommendations = recommendations.slice(0, 3);

        if (recommendations.length === 0) {
             recommendations.push({ title: 'No specific match found', synopsis: 'Try broadening your search terms or exploring different categories!', genres: ['N/A'], poster_placeholder: 'no_match.jpg' });
        }

        return recommendations;
    }

    function displayRecommendations(recommendations) {
        recommendationsList.innerHTML = ''; // Clear previous content (like "Fetching...")

        if (!recommendations || recommendations.length === 0) {
            recommendationsList.innerHTML = '<p class="placeholder-text">No recommendations found based on your criteria. Try different keywords or categories!</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'recommendation-items'; // Class for styling the list

        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'recommendation-item'; // Class for styling each item
            li.innerHTML = `
                <div class="rec-poster">
                    <img src="https://via.placeholder.com/150x220.png?text=${encodeURIComponent(rec.title)}" alt="Poster for ${rec.title}">
                </div>
                <div class="rec-details">
                    <h3>${rec.title}</h3>
                    <p><strong>Genre(s):</strong> ${rec.genres.join(', ')}</p>
                    <p>${rec.synopsis}</p>
                </div>
            `;
            ul.appendChild(li);
        });
        recommendationsList.appendChild(ul);
    }
});

// Placeholder for when no recommendations are found or before search
const initialPlaceholder = document.querySelector('#recommendationsList .placeholder-text');
if (initialPlaceholder) {
    initialPlaceholder.textContent = 'Your movie and series recommendations will appear here once you submit your preferences.';
}
