<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP 4.3.2 or newer
 *
 * @package		CodeIgniter
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2006, EllisLab, Inc.
 * @license		http://codeigniter.com/user_guide/license.html
 * @link		http://codeigniter.com
 * @since		Version 1.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine URL Helper
 *
 * @package		ExpressionEngine
 * @subpackage	Helpers
 * @category	Helpers
 * @author		ExpressionEngine Dev Team
 * @link		http://expressionengine.com
 */

// ------------------------------------------------------------------------

/**
 * Create URL Title
 *
 * Takes a "title" string as input and creates a
 * human-friendly URL string with either a dash
 * or an underscore as the word separator.
 *
 * @review maybe roll into CI proper
 * 
 * @access	public
 * @param	string	the string
 * @param	string	the separator: dash, or underscore
 * @return	string
 */
if ( ! function_exists('url_title'))
{
	function url_title($str, $separator = 'dash', $lowercase = FALSE)
	{
		if (UTF8_ENABLED)
		{
			$CI =& get_instance();
			$CI->load->helper('text');

			$str = utf8_decode($str);
			$str = preg_replace_callback('/(.)/', 'convert_accented_characters', $str);			
		}
		
		$separator = ($separator == 'dash') ? '-' : '_';

		$trans = array(
						'&\#\d+?;'					=> '',
						'&\S+?;'					=> '',
						'\s+|/+'					=> $separator,
						'[^a-z0-9\-\._]'			=> '',
						$separator.'+'				=> $separator,
						'^[-_]+|[-_]+$'				=> '',
						'\.+$'						=> ''
					  );

		$str = strip_tags($str);

		foreach ($trans as $key => $val)
		{
			$str = preg_replace("#".$key."#i", $val, $str);
		}

		if ($lowercase === TRUE)
		{
			$str = strtolower($str);
		}
		
		return trim(stripslashes($str));
	}
}

// --------------------------------------------------------------------

/* End of file EE_url_helper.php */
/* Location: ./system/expressionengine/helpers/EE_url_helper.php */