<?php
$data = file_get_contents('../persistencia/JefeCocinaNotif.json');
$notifications = json_decode($data, true);
$indexToRemove = isset($_POST['index']) ? intval($_POST['index']) : -1;

if ($indexToRemove >= 0 && $indexToRemove < count($notifications)) {
    array_splice($notifications, $indexToRemove, 1);
}
$jsonData = json_encode($notifications, JSON_PRETTY_PRINT);
file_put_contents('../persistencia/JefeCocinaNotif.json', $jsonData);
?>