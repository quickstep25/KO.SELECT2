/*global jQuery, ko*/
(function ($, ko, window, document) {
    'use strict';

	ko.bindingHandlers.select2 = {
//		after: ["s2singleOptions"],

		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			

			var $element		= $(element),
				defaultOptions	= ko.bindingHandlers.select2.defaultOptions,
				localOptions	= valueAccessor(),
				options			= $.extend(true, {}, defaultOptions, localOptions);
			
			$element.select2(options);

		},

//		update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
//
//			$(element).trigger('change');
//		},

		defaultOptions: {
			closeOnSelect   : false,
			theme           : 'default'
		}
	};
}(jQuery, ko, window, document));
