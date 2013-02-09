<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <title>Archie</title>
    <style type="text/css">
        html, body {
            background-color: #333;
            color: #fff;
            font-family: helvetica, arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12pt;
        }

        #canvas {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    </style>
    <?php

    if($_GET && $_GET['build'] && $_GET['build'] == 'dev'){
        echo "\n";
        echo '<script type="text/javascript" src="lib/impact/impact.js"></script>' . "\n";
        echo '<script type="text/javascript" src="lib/game/main.js"></script>' . "\n";
    }
    else{
        $requestUri = $_SERVER['HTTP_HOST'];
        if(strrpos($requestUri, 'localhost') > -1){
            echo '<script type="text/javascript" src="../../../../dist/archie.min.js"></script>' . "\n";
        }
        else{
            echo '<script type="text/javascript" src="dist/archie.min.js"></script>' . "\n";
        }
    }

    ?>
</head>
<body>
<canvas id="canvas"></canvas>
</body>
</html>
