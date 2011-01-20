<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config = array();

// ================================= 
// ! Get name of file   
// ================================= 
$temp_page = explode('/', $_SERVER['PHP_SELF']);
$temp_count = count($temp_page) - 1;
define('PAGE', $temp_page[$temp_count]);

// ================== 
// ! Check for AJAX   
// ================== 
if ( !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' ){
	define('AJAX', true);
}else{
	define('AJAX', false);
}

// ========================== 
// ! If site is live or not   
// ========================== 
$httpHost = $_SERVER['HTTP_HOST'];
$pos = strpos($httpHost, 'localhost');

if($pos === false){ // site is live
	define('ROOT', $_SERVER['DOCUMENT_ROOT']);
	define('CUSTOMROOT', '/system/expressionengine/custom/');
	define('LIVE', true);
}else{ //localhost
	ini_set('display_errors',1);
	error_reporting(E_ALL|E_STRICT);
	define('CUSTOMROOT', 'system/expressionengine/custom/');
	define('ROOT', $_SERVER['DOCUMENT_ROOT'] . '/FG/');
	define('LIVE', false);
}