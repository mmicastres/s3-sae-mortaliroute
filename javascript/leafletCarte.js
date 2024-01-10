//const data = document.getElementById("data");

function plusaccidentee() {
    //
}
let endpoint = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/accidents-corporels-de-la-circulation-millesime/records"


let year = "2018"

let recherche = "mirande"
let req = `?where=com_name like "${recherche}" or com_code like "${recherche}"`


let url = endpoint + req + `and an = ${year}`
url_encoded = encodeURI(url)
console.log(url_encoded)

const max = 350;

function getAccidents(ville,annee, page){
    let req = `?where=com_name like "${ville}" or com_code like "${ville}" and an = ${annee}`
    let url = endpoint + req
    url_encoded = encodeURI(url)
    console.log(url_encoded)
    return fetch(url_encoded)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.total_count)
        const list = data.results
        return list
    })
    .catch((err) => console.log(err))
}
getAccidents("mirande",2018)

var map = L.map('map').setView([51.505, -0.09], 13);