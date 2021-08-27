<?php
/**
 * API Project for HTTP5203
 * Submitted by -Ambaram
 * APIs Used:youtube api, spoonacular api, new york times api
 * YOUTUBE_URL = youtube api url to get the videos of a channel
 * NYT_URL= New York Times URL to get the popular articles of a month
 * SPOONACULAR_URL = spoonacular api url to get the recipe data
 * no oauth required
 * Newyork times might take time to load hence a screenshot of postman request for the reference has been attached at images/nyc_postman.png
 */
const YOUTUBE_URL = "https://youtube.googleapis.com/youtube/v3/";
const NYT_URL= "https://api.nytimes.com/svc/archive/v1/2018/9.json?api-key=KgFYawPn0DIVLG0wev4iJCAcpJfsZcL9";
const SPOONACULAR_URL = "https://api.spoonacular.com/";

// function that returns new york times articls of a given month of a year.
 function nyt(){
     $ny_url = NYT_URL;
    $headers = array(
        "Content-Type: application/json");
    $opts = array(
        'https'=>array(
            'header'=>$headers,
            'method'=>'GET',
        )
    );
    $context = stream_context_create($opts);
    $results = json_decode(file_get_contents($ny_url,false,$context));
    $docs = $results->docs;
    $article = "";
    for ($i=0;$i<5;$i++){
        $doc = $docs[$i];
        $img = $doc->multimedia->url;
        $headline = $doc->headline->main;
        $article .= "<div class='col-sm-4'><a href='$doc->web_url' class='text-dark'>
                    <img src='$img' alt='$headline'>
                    <h4>$headline</h4>
                    <p>$doc->snippet</p>
                    <p>$doc->source</p>
                    </a></div>";
    }
    return $article;
}

// function to retrieve videos from a youtube channel
function youtube(){
    $url= YOUTUBE_URL . "playlists?part=snippet%2CcontentDetails&channelId=UCoG2o8WtvYh8sCS40pUFtCg&maxResults=5&key=AIzaSyDQ-b-qAXdKNIjDEbOycE-r4ngzpD3XI_0";
    $headers = array(
        "Content-Type: application/json");
    $opts = array(
        'https'=>array(
            'header'=>$headers,
            'method'=>'GET',
        )
    );
    $context = stream_context_create($opts);
    $results = json_decode(file_get_contents($url,false,$context));
    $vid = "";
    foreach ($results->items as $item) {
        $id = $item->id;
        $title = $item->snippet->title;
        $channel = $item->snippet->channelTitle;
        $v_id = substr($item->snippet->thumbnails->high->url,23,11);
        $vid .= "<div class='col-sm-4 bg-none my-4'><iframe src='https://www.youtube.com/embed?v=$v_id&list=$id'></iframe>
                   <div class='d-flex'><p class='m-4'>Title : $title</p><p class='m-4'>Channel Name : $channel</p></div></div>";
    }
    return $vid;
}

// function to get recipe data
function spoonacular(){
        $url= SPOONACULAR_URL."recipes/findByNutrients?apiKey=6538f7bb18aa4cdea47d6fc98d6a2bbe&maxCarbs=50&number=5";
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
            $recipes .= "<div class='col-sm-4 p-4 bg-secondary my-4 mx-auto text-light'><a class='text-light' href='health.php'><img alt='$info->title' src='$image'>
                            <h5 class='m-2 text-light'>$info->title</h5>
                            <div class='d-flex'>
                                <p>Calories: $info->calories</p>
                                <p>Protein: $info->protein</p>
                            </div>
                           <div class='d-flex'>
                                <p>Fat: $info->fat </p>
                                <p>Carbs: $info->carbs</p>
                            </div>
                            </a>
                         </div>";
        }
    return ($recipes);
}
// include header
include_once 'header.php';
?>
<main class="container">
    <!-- Youtube videos -->
    <div id="youtube">
        <h1 class="h2">Learn to Meditate</h1>
        <div class="row">
            <?php echo youtube();?>
        </div>
    </div>
    <!-- Recipes here -->
    <div id="health">
        <h1 class="h2">Healthy Recepies</h1>
        <div class="row">
            <?php echo spoonacular();?>
        </div>
    </div>
    <div id="article">
        <!-- sample articles here -->
        <h1 class="h2">Find Something interesting to read</h1>
        <div class="row">
            <?php echo nyt() ?>
        </div>
    </div>
</main>
<!-- include footer -->
<?php include_once 'footer.php';
