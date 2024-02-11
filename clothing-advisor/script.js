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
    const season = document.getElementById('season').value;
    const occasion = document.getElementById('occasion').value;

    // Generate recommendations based on the inputs
    const recommendations = generateRecommendations(gender, age, build, skinType, fit, style, fabric, season, occasion);
    
    // Display the recommendations
    displayRecommendations(recommendations);
});


function generateRecommendations(gender, age, build, skinType, fit, style, fabric, season, occasion) {
    // Simulated database of outfits
    const outfits = [
        { id: 1, gender: 'male', season: 'winter', occasion: 'casual', style: 'classic', fit: 'regular', fabric: 'wool', colors: ['navy', 'grey'], suitableFor: ['light', 'medium'] },
        { id: 2, gender: 'female', season: 'summer', occasion: 'casual', style: 'casual', fit: 'slim', fabric: 'cotton', colors: ['white', 'light blue'], suitableFor: ['medium', 'dark'] },
        { id: 3, gender: 'female', season: 'spring', occasion: 'formal', style: 'trendy', fit: 'regular', fabric: 'silk', colors: ['lavender', 'mint'], suitableFor: ['light', 'dark'] },
        { id: 4, gender: 'male', season: 'summer', occasion: 'business', style: 'classic', fit: 'slim', fabric: 'linen', colors: ['beige', 'white'], suitableFor: ['dark', 'medium'] },
        { id: 5, gender: 'female', season: 'fall', occasion: 'evening', style: 'elegant', fit: 'relaxed', fabric: 'velvet', colors: ['burgundy', 'black'], suitableFor: ['light', 'dark'] },
        { id: 6, gender: 'male', season: 'fall', occasion: 'casual', style: 'urban', fit: 'relaxed', fabric: 'denim', colors: ['dark blue', 'black'], suitableFor: ['medium', 'dark'] },
        { id: 7, gender: 'female', season: 'winter', occasion: 'outdoor', style: 'sporty', fit: 'regular', fabric: 'fleece', colors: ['red', 'navy'], suitableFor: ['light', 'medium'] },
        { id: 8, gender: 'male', season: 'spring', occasion: 'formal', style: 'sophisticated', fit: 'slim', fabric: 'silk', colors: ['charcoal', 'light grey'], suitableFor: ['medium', 'dark'] },
        { id: 9, gender: 'female', season: 'summer', occasion: 'beach', style: 'boho', fit: 'relaxed', fabric: 'chiffon', colors: ['turquoise', 'peach'], suitableFor: ['light', 'dark'] },
        { id: 10, gender: 'male', season: 'winter', occasion: 'sport', style: 'athletic', fit: 'regular', fabric: 'polyester', colors: ['black', 'silver'], suitableFor: ['all'] },
        // Additional outfits can be added here with varying attributes
    ];

    // Filter outfits based on user inputs
    let filteredOutfits = outfits.filter(outfit => 
        outfit.gender === gender &&
        outfit.season === season &&
        outfit.occasion.includes(occasion) &&
        outfit.style === style &&
        outfit.fit === fit &&
        (fabric === "" || outfit.fabric === fabric) &&
        outfit.suitableFor.includes(skinType)
    );

    // Enhance recommendations with color theory
    const recommendedColors = recommendColorsBasedOnSkinTone(skinType);
    filteredOutfits = filteredOutfits.map(outfit => {
        // Add recommended colors to the outfit description if they match
        const matchingColors = outfit.colors.filter(color => recommendedColors.includes(color));
        outfit.description = `A ${outfit.style} ${outfit.fit} fit ${outfit.fabric} outfit in ${matchingColors.join(" or ")}`;
        return outfit;
    });

    // Convert filtered outfits to readable recommendations
    let recommendations = filteredOutfits.map(outfit => outfit.description);

    // Provide a default recommendation if no outfits match
    if (recommendations.length === 0) {
        recommendations.push("We couldn't find an exact match, but we suggest exploring our latest collection for the current season.");
    }

    return recommendations;
}

function recommendColorsBasedOnSkinTone(skinType) {
    // Basic implementation of color theory for skin tones
    const colorsForSkinTone = {
        light: ['navy', 'grey', 'soft pastels'],
        medium: ['earth tones', 'green', 'orange'],
        dark: ['bold reds', 'crisp white', 'vibrant blues']
    };

    return colorsForSkinTone[skinType] || [];
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
