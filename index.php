<?php 
header("Access-Control-Allow-Origin: *"); 
include "connect.php";
if(isset($_GET["code"])){

$code=$_GET["code"];

$sql="SELECT code_postal, libelle_acheminement
FROM codepostal
WHERE code_postal LIKE ?";

$reqprep=$bdd->prepare($sql); //preparation de la requete
$exe=$reqprep->execute(array($code."%"));
$communes=$reqprep->fetchAll();

echo json_encode($communes);

}














?>