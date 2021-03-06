<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2010, EllisLab, Inc.
 * @license		http://expressionengine.com/docs/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * This class doesn't do much work.  Most of the heavy lifting is done via
 * libraries/Core.php, which runs automatically behind the scenes.  
 */
class EE extends Controller {

	function EE()
	{
		parent::Controller();	
	}

	function index()
	{
		// If the REQ constant isn't defined it means the EE has not
		// been initialized.  This can happen if the config/autoload.php
		// file is not set-up to automatically run the libraries/Core.php class.
		// We'll set REQ to FALSE so that it shows an error message below
		if ( ! defined('REQ'))
		{
			define('REQ', FALSE);
		}

		// intialize the Core library
		$this->core->_initialize_core();
				
		if (REQ == 'ACTION')
		{
			$this->core->_generate_action();
		}
		elseif (REQ == 'PAGE')
		{
			$this->core->_generate_page();
		}
		else
		{
			show_error('Unable to initialize ExpressionEngine.  The EE core does not appear to be defined in your autoload file.  For more information please contact technical support.');
		}
	}
	
	// --------------------------------------------------------------------

	/**
	 * Add the template debugger to the output if required and then
	 * run the garbage collection routine.
	 *
	 * @access	public
	 * @return	void
	 */
	function _output($output)
	{
		// Add the template debugger to the output
		
		if (isset($this->TMPL) && is_object($this->TMPL) && isset($this->TMPL->debugging) && $this->TMPL->debugging === TRUE && $this->TMPL->template_type != 'js')
		{
			if ($this->session->userdata['group_id'] == 1)
			{		
				$output .= '<div style="color: #333; background-color: #ededed; margin:10px; padding-bottom:10px;">';
				$output .= "<div style=\"text-align: left; font-family: Sans-serif; font-size: 11px; margin: 12px; padding: 6px\"><hr size='1'><b>TEMPLATE DEBUGGING</b><hr size='1'></div>";
				
				foreach ($this->TMPL->log as $val)
				{
					$val = str_replace(array("\t", '&amp;nbsp;'), array(' ', '&nbsp;'), htmlentities($val, ENT_QUOTES));
					
					$x = explode(':', $val, 2);
					
					if (count($x) > 1)
					{
						$val = '<strong>'.$x['0'].':</strong>'.$x['1'];
					}
					else
					{
						$val = '<strong>'.$val.'</strong>';
					}
									
					$output .= "<div style=\"text-align: left; font-family: Sans-serif; font-size: 11px; margin: 12px 12px 6px 22px;\">".$val."</div>";
				}
				
				if (function_exists('memory_get_usage') AND ($usage = memory_get_usage()) != '')
				{
					$output .= "<div style='text-align: left; font-family: Sans-serif; font-size: 11px; margin: 12px 12px 6px 22px;'><strong>Memory Usage: ".number_format($usage)." bytes</strong></div>";
				}
								
				$output .= '</div>';
			}
		}
				
		echo $output;
		
		
		// Garbage Collection
		
		if (REQ == 'PAGE')
		{
			if ($this->config->item('log_referrers') == 'y')
			{
				$this->load->library('referrer');
				$this->referrer->log_referrer();
			}
	
			$this->core->_garbage_collection();
		}
	}	
}

/* End of file ee.php */
/* Location: ./system/expressionengine/controllers/ee.php */