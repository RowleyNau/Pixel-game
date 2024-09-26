<?php
// setcookie("now",1);
// setcookie("open", 3);
if (!isset($_COOKIE['now']) or !isset($_COOKIE['open']))   
{   
    setcookie("now",1, time() + 3*3600);
    setcookie("open",1, time() + 3*3600);
}   
?> 