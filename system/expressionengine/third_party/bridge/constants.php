<?php if ( ! defined('EXT')) exit('No direct script access allowed');
 
 /**
 * Bridge - Expansion
 *
 * @package		Bridge:Expansion
 * @author		Solspace DevTeam
 * @copyright	Copyright (c) 2008-2010, Solspace, Inc.
 * @link		http://solspace.com/docs/
 * @version		1.0.8
 * @filesource 	./system/bridge/
 * 
 */
 
 /**
 * Add-On Builder - Constants
 *
 * @package 	Bridge:Expansion
 * @category	Constants
 * @author		Paul Burdick <paul.burdick@solspace.com>
 * @link		http://solspace.com/docs/
 * @filesource 	./system/bridge/constants.php
 */
 
if (APP_VER < 2.0)
{
	define('PATH_BRIDGE', PATH.'bridge/');
}
else
{
	define('PATH_BRIDGE', BASEPATH.'expressionengine/third_party/bridge/');
}

// --------------------------------------------------------------------

/**
 *	Alias to get_instance()
 *
 *	May we be so lucky as to claim this space first, for all EE Developers, and not have to deal
 *	with some moron also declaring it and causing havoc.  And yes, I have an eye pointed at a certain
 *	few someones at this very moment. -Paul
 *
 *	@access		public
 *	@return		object
 */

if ( ! function_exists('ee') )
{
	function ee()
	{
		return get_instance();
	}
}
/* END ee() */
    
?>