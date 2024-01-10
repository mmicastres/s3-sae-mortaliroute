//const data = document.getElementById("data");
const countTotal = document.getElementById("total");

// Définition de la carte : 

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);



let endpoint = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/accidents-corporels-de-la-circulation-millesime/records"


let year = "2018"

let recherche = "toulouse"
let req = `?where=com_name like "${recherche}" or com_code like "${recherche}"`


let url = endpoint + req + `and an = ${year}`
url_encoded = encodeURI(url)

const max = 350;

async function getAccidents(ville,annee, page){
    let req = `?where=com_name like "${ville}" or com_code like "${ville}" and an = ${annee} &limit=100`
    let url = endpoint + req
    url_encoded = encodeURI(url)
    const response = await fetch(url_encoded)
    data = await response.json()
    console.log(data)
    return [data.total_count,data.results]
}
let total,accidents 
window.onload = async function() {
    [total,accidents] = await getAccidents("toulouse",2018)
    console.log(total);
    countTotal.innerText = total
    updateMap(accidents)
}


var carFlippedMort = L.icon({
    iconUrl: 'carFlippedMort.svg',
    iconSize: [38, 95]
});

var carFlippedMin = L.icon({
    iconUrl: 'carFlippedMin.svg',
    iconSize: [38, 95]
});

var carFlippedGrave = L.icon({
    iconUrl: 'carFlippedGrave.svg',
    iconSize: [38, 95]
});

function gravite(accident){
    let max = 0
    for (const gravite of accident.grav) {
        let grav = 0
        console.log(gravite);
        if (gravite == "Indemne") grav = 0
        if (gravite == "Blessé") grav = 1
        if (gravite == "Tué") grav = 2
        if (grav > max) max = grav
    }
    return max

}

function updateMap(accidents){
    let center
    
    for (let i = 0; i < accidents.length; i++) {
        const accident = accidents[i];
        console.log(accident.coordonnees);
        if (accident.coordonnees){
            center = accident.coordonnees
            let lat = accident.coordonnees.lat
            let lng = accident.coordonnees.lon
            grav = gravite(accident)
            icon = carFlippedMin
            gravite_label = ""
            if (grav == 2) {icon = carFlippedMort; gravite_label = "Mort"}
            if (grav == 1) {icon = carFlippedGrave; gravite_label = "Grave"}
            if (grav == 0) {icon = carFlippedMin; gravite_label = "Léger"}
            console.log(icon, gravite_label, grav, grav==0);
            let marker = L.marker([lat,lng],{icon: icon}).addTo(map);
            marker.bindPopup(`<b>${accident.com_name}</b><br>${accident.adr}</br>${gravite_label}`)
        }
    }
    map.setView([center.lat,center.lon], 13);

}

