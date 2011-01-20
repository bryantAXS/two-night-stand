<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP 4.3.2 or newer
 *
 * @package		CodeIgniter
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2008 - 2009, EllisLab, Inc.
 * @license		http://codeigniter.com/user_guide/license.html
 * @link		http://codeigniter.com
 * @since		Version 1.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * CodeIgniter Config Class - Subclass
 *
 * This class contains functions that enable config files to be managed
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @category	Libraries
 * @author		Solspace Dev Team
 * @filesource	/system/bridge/codeigniter/system/application/libraries/MY_Upload.php
 */
 
class MY_Upload extends CI_Upload {

	/**
	* Constructor
	*
	* gets proper linkage to URI items for 1.6.x
	*
	* @access	public
	*/
	function __construct()
	{
		parent::CI_Upload();
	
		log_message('debug', "Upload Class Initialized");

	}
	
	// --------------------------------------------------------------------
	
	/**
	 * Verify that the filetype is allowed
	 *
	 * @access	public
	 * @return	bool
	 */	
	function is_allowed_filetype()
	{
		if ($this->allowed_types = '*')
		{
			return TRUE;
		}
		else
		{
			return parent::is_allowed_filetype();
		}
	}
	// END is_allowed_filetype()
	
	// --------------------------------------------------------------------
	
	/**
	 * Set Allowed File Types
	 *
	 * @access	public
	 * @param	string extensions of filetypes allowed
	 * @return	void
	 */	
	function set_allowed_types($types)
	{
		if ( $types == '*' )
		{
			$this->allowed_types = '*';
		}
		else
		{
			parent::set_allowed_types($types);
		}
	}
	// END 	set_allowed_types()
	
}

/* END MY_Upload class */

/* End of file MY_Upload.php */
/* Location: ./system/bridge/codeigniter/system/application/libraries/MY_Upload.php */
