// Initialisation du script une fois que le DOM est complètement chargé
$(document).ready(() => {
  const amenitiesChecked = {};

  // Détecte les changement de chaque case coché ou non
  $('div.amenities input[type="checkbox"]').on('change', function() {
    //Récumère l'ID et le nom
    const amenityID = $(this).data('id');
    const amenityName = $(this).data('name');

    // Ajoute au dictionnaire, sinon, suprime-la
    if ($(this).prop('checked')) {
      amenitiesChecked[amenityID] = amenityName;
    } else {
      delete amenitiesChecked[amenityID];
    }

    // Mise à jour de l'affichage actuellement cochées
    const amenitiesList = Object.values(amenitiesChecked);
    $('div.amenities h4').text(amenitiesList.join(', ') || '&nbsp;');
  });
  $.get("http://0.0.0.0:5001/api/v1/status/", data => {
    if (data.status == "OK") {
      $('DIV#api_status').addClass("available");
    } else {
      $('DIV#api_status').removeClass("available");
    }
  });
});
