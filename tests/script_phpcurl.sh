#!/usr/bin/php
<?php

    $login_email = "admin@admin.com";
    $login_pass = "123321";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://www.vargas.projetointegrador.org/projeto/ft-control.php');
    curl_setopt($ch, CURLOPT_POSTFIELDS,'loginAdminEmail='.urlencode($login_email).'&loginAdminPassword='.urlencode($login_pass).'&loginAdminSend=loginAdminSend&loginAdminRemeber=on');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_COOKIEJAR, "cookies.txt");
    curl_setopt($ch, CURLOPT_COOKIEFILE, "cookies.txt");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.3) Gecko/20070309 Firefox/2.0.0.3");
    curl_setopt($ch, CURLOPT_REFERER, "http://www.vargas.projetointegrador.org/projeto");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

    $page = curl_exec($ch);

     $url = 'http://www.vargas.projetointegrador.org/projeto/administrador/products.php';

    curl_setopt_array(
        $ch, array(
        CURLOPT_URL => $url ,
        CURLOPT_RETURNTRANSFER => true
    ));

    $output = curl_exec($ch);


    $dom = new DomDocument();
    $dom->loadHtml($output);

    $xpath = new DomXPath($dom);

    $data = array();
    foreach ($xpath->query('//tbody/tr') as $node) {
        $rowData = array();
        foreach ($xpath->query('td', $node) as $cell) {
            $rowData[] = $cell->nodeValue;
        }

        $data[] = $rowData;
    }

    foreach ($data as $key => $value) {
       echo $value[0] . ". " . $value[1] . "\n";
    }

    curl_close($ch);


?>
