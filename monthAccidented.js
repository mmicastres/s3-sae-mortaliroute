/*Classement des mois les plus accidentogènes en fonction de la ville*/

document.getElementById('ville').addEventListener("keyup",monthAccidented);



function monthAccidented(event) {
    let ville = event.target.value
    let url =`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/accidents-corporels-de-la-circulation-millesime/records?select=%20count(mois)%20&where=an%20%3D%20%222018%22%20and%20nom_com%3D%22${ville}%22&group_by=mois&order_by=%20%20count(mois)%20DESC&limit=53`
    url_encoded = encodeURI(url)
    console.log(url_encoded)
    return fetch(url_encoded)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.total_count)
            console.log(data)
            let list = data.results
            return list
        })
        .catch((err) => console.log(err))

      /*graphique à barre ChartJS
*X mois 
*Y nombre d'accident
*/
const a = document.getElementById("graph");
const b = {
    labels: ["chine","États-Unis","Inde","Russie","Japon","Allemagne","Iran","Arabie","saoudite","Corée du Sud","Canada"],
    datasets: [{label: "Exemple", data: [10065,5416,2654,1711,1162,767,729,653,650,555]}]
};


 new Chart(a,
    {
        type: "bar",
        data: b,
        options: {
             title:"emission mondial de co2 d'origine fossile",
             scales: {
        y: {
            title: {
                display: true,
                text: 'En millions de tonne', // Légende de l'axe des x
            }
        },
    }
}
});  


}




