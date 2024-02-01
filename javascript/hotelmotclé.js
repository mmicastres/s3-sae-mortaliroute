/*document.getElementById('hotel').addEventListener("keyup", hotel);


 function hotel(event) {
    if (document.getElementById("hotel")) {
        let value = event.target.value;
        const url = `https://webmmi.iut-tlse3.fr/~bsm4499a/apihotels/hotels//hotelmotcle.php?nom=${value}` 
        let fetchOptions = { method: 'GET' }
   
        fetch(url, fetchOptions)
            .then((response) => { return response.json() })
            .then((dataJSON) => { 
                console.log(dataJSON)
                let results = dataJSON;
                let txt = ''
                for (let hotel of results) {
                    txt += `<option value="${hotel.nom}"></option>`
                }
                document.getElementById('lst_hotel').innerHTML = txt;
            })

            .catch((error) => {
                console.log(error)
            })
    }
}
*/


// Écoute l'événement "keyup" sur l'élément avec l'ID "hotel"
document.getElementById('ville').addEventListener("keyup", rechercheville);

// Fonction pour rechercher des hôtels
function rechercheville(event) {
    // Récupère la valeur de l'élément avec l'ID "hotel"
    let valeur = event.target.value;

    // Vérifie si la valeur n'est pas vide
    if (valeur.trim() !== "") {
        // Construit l'URL pour la requête API en utilisant la valeur
        const url = `https://geo.api.gouv.fr/communes?nom=${valeur}&fields=nom,code,codesPostaux,departement`;

        //if (codePostal !== "") {
        //    url += `&codePostal=${codePostal}`;
        //}

        //url += "&fields=nom,code,codesPostaux,departement";

        // Options pour la requête HTTP GET
        let options = {method: 'GET'};

        // Effectue une requête fetch vers l'URL
        fetch(url, options)
            .then((response) => {return response.json();}) // Convertit la réponse en JSON
            .then((data) => {
                // Affiche les données dans la console (à des fins de débogage)
                console.log(data);

                // Crée une chaîne de texte pour afficher les résultats
                let listeOptions = '';
                for (let hotel of data) {
                    listeOptions += `<option value="${hotel.codesPostaux}">${hotel.nom}</option>`;
                }

                // Met à jour l'élément avec l'ID "lst_hotel" avec la liste d'options
                document.getElementById('lst_hotel').innerHTML = listeOptions;
            })
            .catch((erreur) => {
                // En cas d'erreur, affiche l'erreur dans la console
                console.log(erreur);
            });
    }
}