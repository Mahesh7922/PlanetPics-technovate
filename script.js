// // async function getRecommendations() {
// //     const description = document.getElementById("searchInput").value;
// //     if (!description) {
// //         alert("Please enter a product description.");
// //         return;
// //     }

// //     try {
// //         const response = await fetch("http://127.0.0.1:5000/recommend", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ description })
// //         });

// //         const recommendations = await response.json();
// //         displayRecommendations(recommendations);
// //     } catch (error) {
// //         console.error("Error:", error);
// //     }
// // }

// // function displayRecommendations(recommendations) {
// //     const recommendationsDiv = document.getElementById("recommendations");
// //     recommendationsDiv.innerHTML = "";  // Clear previous results

// //     recommendations.forEach((rec, index) => {
// //         const productDiv = document.createElement("div");
// //         productDiv.classList.add("product");
// //         productDiv.innerHTML = `
// //             <h3>${index + 1}. ${rec.brand || 'Unknown Brand'}</h3>
// //             <p><strong>Category:</strong> ${rec.category || 'N/A'}</p>
// //             <p><strong>Price:</strong> ${rec.price || 'N/A'}</p>
// //             <p><strong>Features:</strong> ${rec.features ? rec.features.join(", ") : 'N/A'}</p>
// //             <p><strong>Description:</strong> ${rec.description || 'No description available'}</p>
// //             <p><strong>Match Score:</strong> ${rec.similarity_score ? rec.similarity_score + '%' : 'N/A'}</p>
// //         `;
// //         recommendationsDiv.appendChild(productDiv);
// //     });
// // }

// async function getRecommendations() {
//   const description = document.getElementById("searchInput").value;
//   if (!description) {
//     alert("Please enter a product description.");
//     return;
//   }

//   try {
//     const response = await fetch("http://127.0.0.1:5000/recommend", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ description }),
//     });

//     const recommendations = await response.json();
//     displayRecommendations(recommendations);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// function getProductImage(productName) {
//   const images = {
//     Soap: "./images/004-soap.png",
//     Shampoo: "./images/005-shampoo.png",
//     Toothpaste: "./images/007-toothpaste.png",
//     "Body Lotion": "./images/002-body-lotion.png",
//     Cosmetics: "./images/003-perfume.png",
//     Detergent: "./images/008-detergent.png",
//     "Hair Oil": "./images/006-serum.png",
//     Toothbrush: "./images/001-toothbrush.png",
//     "Face Wash": "./images/009-lotion.png",
//     Foundation: "./images/010-foundation.png",
//   };
//   return images[productName] || "path/to/default_image.jpg"; // Default image if product not found
// }

// function displayRecommendations(recommendations) {
//   const recommendationsDiv = document.getElementById("recommendations");
//   recommendationsDiv.innerHTML = ""; // Clear previous results
//   recommendations.forEach((rec, index) => {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     if (rec.similarity_score == 0) {
//       card.innerHTML = "<h2 style='color: black;'>Nothing to match</h2>";
//     } else {
//       card.innerHTML = `
//             <img src='${getProductImage(rec.category || "N/A")}' />
//             <h3 style='color: green;' >${index + 1}. ${
//         rec.brand || "Unknown Brand"
//       }</h3>
//             <p><strong style='color: green;' >Price:</strong> ${
//               rec.price || "N/A"
//             }</p>
//             <p><strong style='color: green;' >Features:</strong> ${
//               rec.features ? rec.features.join(", ") : "N/A"
//             }</p>`;
//     }
//     recommendationsDiv.appendChild(card);
//   });
// }































async function getRecommendations() {
    const description = document.getElementById("searchInput").value;
    if (!description) {
      alert("Please enter a product description.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const recommendations = await response.json();
      displayRecommendations(recommendations);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get recommendations. Please check if the server is running.");
    }
  }
  
  function getProductImage(productName) {
    const images = {
      Soap: "./images/004-soap.png",
      Shampoo: "./images/005-shampoo.png",
      Toothpaste: "./images/007-toothpaste.png",
      "Body Lotion": "./images/002-body-lotion.png",
      Cosmetics: "./images/003-perfume.png",
      Detergent: "./images/008-detergent.png",
      "Hair Oil": "./images/006-serum.png",
      Toothbrush: "./images/001-toothbrush.png",
      "Face Wash": "./images/009-lotion.png",
      Foundation: "./images/010-foundation.png",
    };
    return images[productName] || "path/to/default_image.jpg"; // Default image if product not found
  }
  
  function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = ""; // Clear previous results
    recommendations.forEach((rec, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      if (rec.similarity_score == 0) {
        card.innerHTML = "<h2 style='color: black;'>Nothing to match</h2>";
      } else {
        card.innerHTML = `
              <img src='${getProductImage(rec.category || "N/A")}' />
              <h3 style='color: green;' >${index + 1}. ${rec.brand || "Unknown Brand"}</h3>
              <p><strong style='color: green;' >Price:</strong> ${rec.price || "N/A"}</p>
              <p><strong style='color: green;' >Features:</strong> ${
                rec.features ? rec.features.join(", ") : "N/A"
              }</p>`;
      }
      recommendationsDiv.appendChild(card);
    });
  }
  