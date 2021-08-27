<!--Using New york times api to display popular newyork times articles displayed for a given month of an year -->
<?php
// no oauth required
const YOUTUBE_URL = "https://youtube.googleapis.com/youtube/v3/";
const NYT_URL= "https://api.nytimes.com/svc/archive/v1/2018/9.json?api-key=KgFYawPn0DIVLG0wev4iJCAcpJfsZcL9";
const SPOONACULAR_URL = "https://api.spoonacular.com/";

function nyt(){
    $ny_url = NYT_URL;
    // headers required to call newyork times api
    $headers = array(
        "Content-Type: application/json");
    $opts = array(
        'https'=>array(
            'header'=>$headers,
            'method'=>'GET',
        )
    );
    $context = stream_context_create($opts);
    // convert received data to json
    $results = json_decode(file_get_contents($ny_url,false,$context));
    $docs = $results->docs;
    $article = "";
    for ($i=0;$i<25;$i++){
        $doc = $docs[$i];
        $headline = $doc->headline->main;
        $article .= "<div class='col-sm-4'><a href='$doc->web_url' class='text-dark'>
                    <img src='$doc->multimedia->url'>
                    <h4>$headline</h4>
                    <p>$doc->snippet</p>
                    <p>$doc->source</p>
                    </a></div>";
    }
    return $article;
}
include_once 'header.php'
?>
<!-- Display new york times article of a given month in a year -->
<body id="read">
<main>
    <div id="article text-light">
        <h1 class="h2 text-center">Find Something interesting to read</h1>
        <div class="row">
            <?php echo nyt() ?>
        </div>
    </div>
</main>
</body>