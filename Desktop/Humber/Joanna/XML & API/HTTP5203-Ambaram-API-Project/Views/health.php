<!-- recipe data displayed by using spoonacular api -->
<?php
// no oauth required
const SPOONACULAR_URL = "https://api.spoonacular.com/";
function spoonacular(){
    $url= SPOONACULAR_URL."recipes/findByNutrients?apiKey=6538f7bb18aa4cdea47d6fc98d6a2bbe&maxCarbs=50&number=25";
    $headers = array(
        "Content-Type: application/json",
        "limitLicense:false",
    );
    $opts = array(
        'http'=>array(
            'header'=>$headers,
            'method'=>'GET',
        )
    );
    $context = stream_context_create($opts);
    $results = json_decode(file_get_contents($url,false,$context));
    $recipes = "";
    foreach ($results as $result){
        $id = $result->id;
        $image = $result->image;
        $url2 = SPOONACULAR_URL."recipes/$id/summary?apiKey=6538f7bb18aa4cdea47d6fc98d6a2bbe";
        $headers = array(
            "Content-Type:application/json",
        );
        $opts = array(
            "http"=>array(
                "header"=>$headers,
                "method"=>'GET',
            )
        );
        $context = stream_context_create($opts);
        $info = json_decode(file_get_contents($url2,false,$context));
        $recipes .= "<div class='col-sm-4'><img alt='$info->title' src='$image'><h3>$info->title</h3><p>$info->summary</p> </div>";
    }
    return ($recipes);
}
include_once 'header.php'
?>
<body class="container-fluid m-0 mx-auto" id="health">
<main class="container-fluid">
    <div id="health text-light">
        <h1 class="h2 text-center">Healthy Recepies</h1>
        <div class="row">
            <?php echo spoonacular();?>
        </div>
    </div>
</main>
</body>
<?php include_once 'footer.php';
