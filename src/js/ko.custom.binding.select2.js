/*global jQuery, ko*/
(function ($, ko, window, document) {
    'use strict';

	ko.bindingHandlers.select2 = {
		after: ["options"],

		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

			var $element		= $(element),
				defaultOptions	= ko.bindingHandlers.select2.defaultOptions,
				localOptions	= valueAccessor(),
				options			= $.extend(true, {}, defaultOptions, localOptions);
			$element.select2(options);
		},

		defaultOptions: {
			closeOnSelect   : false,
			theme           : 'default'
		}
	};
}(jQuery, ko, window, document));
