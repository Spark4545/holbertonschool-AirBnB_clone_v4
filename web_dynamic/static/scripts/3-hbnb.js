// Initialisation du script une fois que le DOM est complètement chargé
$(document).ready(() => {
    const amenitiesChecked = {};
  
    // Détecte les changements de chaque case cochée ou non
    $('div.amenities input[type="checkbox"]').on('change', function() {
      // Récupère l'ID et le nom
      const amenityID = $(this).data('id');
      const amenityName = $(this).data('name');
  
      // Ajoute au dictionnaire, sinon, supprime-la
      if ($(this).prop('checked')) {
        amenitiesChecked[amenityID] = amenityName;
      } else {
        delete amenitiesChecked[amenityID];
      }
  
      // Mise à jour de l'affichage des commodités actuellement cochées
      const amenitiesList = Object.values(amenitiesChecked);
      $('div.amenities h4').text(amenitiesList.join(', ') || '&nbsp;');
    });
  
    // Fonction pour charger les lieux depuis l'API
    function loadPlaces() {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({}), // Envoyez un objet JSON vide
        success: function(data) {
          // Traitement de la réponse ici
          if (data && data.length > 0) {
            // Boucle à travers les résultats et crée des balises "article"
            data.forEach(place => {
              const article = document.createElement('article');
              article.innerHTML = `<h2>${place.name}</h2>`;
              article.innerHTML += `<div class="price_by_night">${place.price_by_night}</div>`;
              article.innerHTML += `<div class="information"><div class="max_guest">${place.max_guest} Guests</div>`;
              article.innerHTML += `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`;
              article.innerHTML += `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div></div>`;
              $('section.places').append(article);
            });
          }
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
    }
  
    // Appeler la fonction pour charger les lieux
    loadPlaces();

    $.get("http://0.0.0.0:5001/api/v1/status/", data => {
      if (data.status == "OK") {
        $('DIV#api_status').addClass("available");
      } else {
        $('DIV#api_status').removeClass("available");
      }
    });
  });
  
  