/*Classement des mois les plus accidentogènes en fonction de la ville*/
//window.addEventListener('scrollend', monthAccidented);



let text = document.getElementById('ville');
let select = document.getElementById('annee')
let emplacement = document.getElementById('emplacement');
let graphique;


let a = document.getElementById('graph');   


async function afficheGraph(annee,ville) {
    nonTue = await monthAccidented(annee, ville,0);
    Tue = await monthAccidented(annee, ville,1);

    mois = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septemebre", "octobre", "novembre", "decembre"]

    const d = {
        labels: mois,
        datasets: [
            {
                label: 'Accidents non mortels',
                data: nonTue,
                backgroundColor: 'rgb(255,168,1)'
            },
            {
                label: 'Accidents mortels',
                data: Tue,
                backgroundColor: '#FF0000'
            }
        ]
    };

    console.log(d);


    if (graphique) {
        graphique.destroy();
    }
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;
    Chart.defaults.font.family = 'Arial';
    Chart.defaults.font.weight = 'bold';
    // borders
    Chart.defaults.borderColor = 'rgba(255,255,255,.5)';
    Chart.defaults.borderWidth = 2;


    graphique = new Chart(a, {
        type: 'bar',
        data: d,
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Nombre d\'accidents par mois'
            },
            scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true
                }
              }
        }
    });

}

async function monthAccidented(annee, ville,mort=0) {


    // création de l'emplacement du graphique ChartJS



    mois = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septemebre", "octobre", "novembre", "decembre"]

    results = []
    //results.push({"mois": "janvier", "nb_accident": 0})


    for (let i = 1; i <= 12; i++) {
        mois = i
        if (mois < 10) {
            mois="0" + mois
        }
        console.log(mois);
        var req = `?where=(com_name like "${ville}" or code_postal like "${ville}") and (an="${annee}" and mois="${mois}") and ${mort?'':'not'} ("Tué" in grav)  &limit=1`
        var url = endpoint + req
        url_encoded = encodeURI(url)
        
        console.log(url_encoded);
        const response = await fetch(url_encoded)
        data = await response.json()
        console.log(data);
        results.push(data.total_count)
        console.log(results);
    }
    return results
    
    
         
                


}



async function getTotalTue(ville,annee){
    console.log(annee);
    var req = `?where=(com_name like "${ville}" or code_postal like "${ville}") and an="${annee}" and "Tué" in grav &limit=1`
    var url = endpoint + req
    url_encoded = encodeURI(url)
    console.log(url_encoded);
    const response = await fetch(url_encoded)
    data = await response.json()
    console.log(data);
    return data.total_count
}









