<?php

require("vendor/autoload.php");

$file = $_FILES['file']['tmp_name'];

if(file_exists($file)){
  $xml = file_get_contents($file);  
}else{
  throw new Exception("File $file does not exist.");
}

try{
  $bill = new \USLM\Legislation\HouseBill();

  $bill->loadXML($xml);

  $title = $bill->getOfficialTitle();
  $sponsor = $bill->getSponsor();
  $cosponsors = $bill->getCosponsors();
  $committees = $bill->getCommittees();
  $dms_id = $bill->getDMSId();
  $bill_stage = $bill->getBillStage();
  $congress = $bill->getCongress();
  $session = $bill->getSession();
  $legis_num = $bill->getLegisNum();
  $chamber = $bill->getCurrentChamber();
  $type = $bill->getLegisType();
  $actions = $bill->getActions();
  $body = $bill->getBodyAsMarkdown();

  $json = compact('title', 'sponsor', 'cosponsors', 'committees', 'dms_id', 'bill_stage', 'congress', 'session', 'legis_num', 'chamber', 'type', 'actions', 'body');
} catch (Exception $e){
  $json = array(
    'messages' => array(
      array('text' => $e->getMessage(), 'severity' => 'error')
  ));

  http_response_code(500);
}


echo json_encode($json);