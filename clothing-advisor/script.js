document.getElementById('preferencesForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Validate age
    const age = document.getElementById('age').value;
    if (age < 1 || age > 100) {
        alert('Age must be between 1 and 100.');
        return; // Stop the function if validation fails
    }

    // Collect other form inputs
    const gender = document.getElementById('gender').value; // Note: The id should be 'gender', not 'build'.
    const build = document.getElementById('build').value;
    const skinType = document.getElementById('skinType').value;
    const fit = document.getElementById('fit').value;
    const style = document.getElementById('style').value;
    const fabric = document.getElementById('fabric').value;

    // Generate recommendations based on the inputs
    const recommendations = generateRecommendations(gender, build, skinType, fit, style, fabric);
    
    // Display the recommendations
    displayRecommendations(recommendations);
});

function generateRecommendations(gender, build, skinType, fit, style, fabric) {
    // Placeholder for where you'd filter through your outfits data
    // This example just returns a single recommendation for demonstration purposes
    let recommendation = `For a ${gender} with a ${build} build and ${skinType} skin, `;
    recommendation += `preferring a ${fit} fit in a ${style} style`;

    if (fabric) {
        recommendation += ` and made of ${fabric}, `;
    }

    recommendation += " we recommend a custom outfit tailored to your preferences.";

    return [recommendation]; // Return an array of recommendations
}

function displayRecommendations(recommendations) {
    const recommendationSection = document.getElementById('recommendationSection');
    const recommendationList = document.getElementById('outfitRecommendation');
    recommendationList.innerHTML = ''; // Clear previous recommendations

    recommendations.forEach(rec => {
        recommendationList.textContent = rec; // Update this line to append multiple recommendations if necessary
    });

    recommendationSection.classList.remove('hidden'); // Show the recommendations
}
