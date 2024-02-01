/*Classement des mois les plus accidentogènes en fonction de la ville*/
window.addEventListener('scrollend', monthAccidented);



let text = document.getElementById('ville');
let select = document.getElementById('annee')
let emplacement = document.getElementById('emplacement');



function monthAccidented() {


    let ville = text.value;
    let an= select.value
    // création de l'emplacement du graphique ChartJS

    emplacement.innerHTML = '<canvas id="graph"></canvas>';
    let a = document.getElementById('graph');

    janvier = [];
    fevrier = [];
    mars = [];
    avril = [];
    mai = [];
    juin = [];
    juillet = [];
    aout = [];
    septembre = [];
    octobre = [];
    novembre = [];
    decembre = [];


    let url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/accidents-corporels-de-la-circulation-millesime/records?select=mois%20%2C%20nom_com%20%2Can&where=nom_com%20like%20%22${ville.toLowerCase()}%22%20and%20an%3D%22${an}%22%20&order_by=mois%20&limit=100`;
    /**nombre de résultat limité*/
    console.log(url)

    return fetch(url).then((response) => response.json()).then(
        (data) => {

            console.log(data)

            data.results.forEach(element => {


                // Ajout de chaque accident en fonction de son mois dans un tableau nommé avec le nom du mois correspondant
                if (element.mois == "01") {
                    month = "janvier"
                    janvier.push(element.mois)



                }
                if (element.mois == "02") {
                    month = "fevrier"
                    fevrier.push(element.mois)


                }
                if (element.mois == "03") {
                    month = "mars"
                    mars.push(element.mois)


                }
                if (element.mois == "04") {
                    month = "avril"
                    avril.push(element.mois)


                }
                if (element.mois == "05") {
                    month = "mai"
                    mai.push(element.mois)


                }
                if (element.mois == "06") {
                    month = "juin"
                    juin.push(element.mois)


                }
                if (element.mois == "07") {
                    month = "juillet"
                    juillet.push(element.mois)


                }
                if (element.mois == "08") {
                    month = "aout"
                    aout.push(element.mois)


                }
                if (element.mois == "09") {
                    month = "septembre"
                    septembre.push(element.mois)


                }
                if (element.mois == "10") {
                    month = "octobre"
                    octobre.push(element.mois)


                }
                if (element.mois == "11") {
                    month = "novembre"
                    novembre.push(element.mois)


                }
                if (element.mois == "12") {
                    month = "decembre"
                    decembre.push(element.mois)



                }



            })

            console.log(janvier.length, fevrier.length, mars.length, avril.length, mai.length, juin.length, juillet.length, aout.length, septembre.length, octobre.length, novembre.length, decembre)
            /*Création du graphique à barre ChartJS
            *X mois 
            *Y nombre d'accident
            */
            const d = {
                labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
                datasets: [{ label: "Accidents", data: [janvier.length, fevrier.length, mars.length, avril.length, mai.length, juin.length, juillet.length, aout.length, septembre.length, octobre.length, novembre.length, decembre] }]
            };

            const c = new Chart(a,
                {
                    type: "bar",
                    data: d,
                    options: {
                        title: "emission mondial de co2 d'origine fossile",
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Nombre d\'accidents de la route', // Légende de l'axe des y
                                }
                            },
                        }
                    }
                });


        }

    )
        .catch((err) => console.log(err))





}









