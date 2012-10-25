<?
header('Content-Type: text/html; charset=utf-8'); 
include_once("simple_html_dom.php");

$html = str_get_html(`curl --silent "http://finance.daum.net/exchange/exchangeMain.daum" -H 'Content-Type: text/html; charset: utf-8'`);

foreach( $html->find("ul[id=exInfoList]") as $e ) {
	$first_title = preg_replace("[&#40;|&#41;]", "", $e->find("dt",0)->find("a",0)->plaintext);
	$first_value = $e->find("dt",0)->nextSibling()->plaintext;
	
	$second_title = preg_replace("[&#40;|&#41;]", "", $e->find("dt",1)->find("a",0)->plaintext);
	$second_value = $e->find("dt",1)->nextSibling()->plaintext;

	echo $first_title." ".$first_value."원, ";
	echo $second_title." ".$second_value."원";
}
?>