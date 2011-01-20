
(function( $ )
{
    $.fn.removeSelection = function()
	{
		var element = this[0];
	
		if ( element.contentWindow.document.selection )
			element.contentWindow.document.selection.empty();
		else
			element.contentWindow.getSelection().removeAllRanges();
	};
	
	$.fn.selectionObject = function()
	{
		var element = this[0];
	
		 if ( element.contentWindow.document.selection )
            return element.contentWindow.document.selection.createRange();
        else
            return element.contentWindow.getSelection();
	};
	
	$.fn.resetSelection = function()
	{
		var element = this[0];
		
		if ( element.contentWindow.document.selection )
		{
			var selection = element.contentWindow.document.selection;
			var range = selection.createRange();
		}
		else
		{
			var selection = element.contentWindow.window.getSelection();
			
			if (selection)
			{
				var range = selection.getRangeAt(0);
			}
			else
			{
				var range = element.contentWindow.window.createRange();
			}
		}
		
		// Reference: http://www.quirksmode.org/dom/range_intro.html
		
		// Safari has a problem where if the selection spreads among two different nodes, for example
		// when one double clicks at the end of a table cell, it screws up the HTML by replacing <td> tags
		// with <span class="Apple-style-span"> tags.  No idea why.  To get around this, we check
		// to see if we are at the end of our offset node.  If so, we go back until we find no white
		// space and then select that.
		
		// NOTE:  Oddly, range.collapse(true); does not seem to work as a solution, annoyingly.
		// It collapses the range correctly, thus not replacing the HTML tags with the <span>. However, Safari
		// still puts in a <span class="Apple-style-span"> element incorrectly for our inserted HTML. 
		// However, this ONLY happens when the HTML element we are entering has a valid CSS class 
		// assigned to it.  Doesn't matter what kind of element is inserted: <span>, <b>, et cetera.
        
        if (selection.anchorNode.length == selection.anchorOffset)
        {
        	for (i = 0; i < 100; ++i)
        	{
        		range.setStart(selection.anchorNode, selection.anchorOffset - (i+1));
				range.setEnd(selection.anchorNode, selection.anchorOffset - i);
			
        		if (range.toString().search(/\s/) == -1)
        		{
        			selection.removeAllRanges();
					selection.addRange(range);
        			break;
        		}
        	}
        }
	};
	
})(jQuery);