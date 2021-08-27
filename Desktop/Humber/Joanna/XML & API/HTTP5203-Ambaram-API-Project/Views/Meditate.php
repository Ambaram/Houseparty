<?php
// using youtube api to display videos of a channel
// no oauth required
const YOUTUBE_URL = "https://youtube.googleapis.com/youtube/v3/";
function youtube(){
    $url= YOUTUBE_URL . "playlists?part=snippet%2CcontentDetails&channelId=UCoG2o8WtvYh8sCS40pUFtCg&maxResults=24&key=AIzaSyDQ-b-qAXdKNIjDEbOycE-r4ngzpD3XI_0";
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
        $vid .= "<div class='col-sm-4 bg-secondary my-4 mx-auto rounded py-4 text-light'><iframe class='mx-auto' src='https://www.youtube.com/embed?v=$v_id&list=$id'></iframe>
                   <div class='d-flex'><p class='m-4'><strong>Title</strong> : $title</p><p class='m-4'><strong>Channel Name</strong>  $channel</p></div></div>";
    }
    return $vid;
}
// include header
include_once 'header.php';
?>
<body class="container-fluid mx-auto my-4" id="meditate">
<main class="container">
    <div id="youtube">
        <h1 class="h2 text-center">Learn to Meditate</h1>
        <div class="row">
                <?php echo youtube();?>
        </div>
    </div>
</main>
</body>
<!-- include footer -->
<?php include_once 'footer.php'?>
