<?php

require("vendor/autoload.php");

$file = $_FILES['file']['tmp_name'];

if(file_exists($file)){
  $xml = file_get_contents($file);  
}else{
  throw new Exception("File $file does not exist.");
}

$bill = new \USLM\Legislation\HouseBill();

$bill->loadXML($xml);

$dms_id = $bill->getDMSId();
$bill_stage = $bill->getBillStage();
$congress = $bill->getCongress();
$session = $bill->getSession();
$legis_num = $bill->getLegisNum();
$chamber = $bill->getCurrentChamber();
$type = $bill->getLegisType();
$title = $bill->getOfficialTitle();
$actions = $bill->getActions();

$json = compact('dms_id', 'bill_stage', 'congress', 'session', 'legis_num', 'chamber', 'type', 'title', 'actions');

echo json_encode($json);