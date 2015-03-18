/*global jQuery, ko, console*/
/*
The HTML OPTION element has more than just a couple important attributes.  

Label: This attribute can bd used as a "shorter version" for what is displayed in the dropdown.  ALSO KNOWN IN DOM REFERENT AS THE TEXT ATTRIBUTE
Title: A title can be given to the option and is used for accessibility standards as well as acting like an ALT property on an IMG tag. 
Value: Unique value within the parent SELECT - primarilly used for identifying selections made by user to be subitted to database.  identified on the element VALUE reference and is also responsible for setting the SELECT value DOM attribute. Usually referenced in communication as primary_key, pk, or ID
TextContent: This is the text inside the OPTION tag.  It is what is displayed in the dropdown menu when there is no label attribute present.
Selected: True or False setting
Disabled: True of False setting
*/

(function ($, ko, window, document) {
    'use strict';
	
	localStorage.setItem('rootURL', window.location.origin + '/');
		
	var rootURL	= localStorage.getItem('rootURL'),
		OptionsModel = function (id, text, title, label) {
			this.id		= id;		// value
			this.text	= text;		// default display
			this.title	= title;	// alt
			this.label	= label;	// mask
		},
		ViewModel = function () {
			this.singleOptions		= ko.observableArray();
			this.singleSelected		= ko.observableArray();
			this.multipleOptions	= ko.observableArray();
			this.multipleSelected	= ko.observableArray();
			this.s2singleOptions	= ko.observableArray();
			this.s2singleSelected	= ko.observableArray();
			this.s2multipleOptions	= ko.observableArray();
			this.s2multipleSelected	= ko.observableArray();
			
			this.singleTags			= ko.observableArray();
			this.multipleTags		= ko.observableArray();
			this.s2singleTags		= ko.observableArray();
			this.s2multipleTags		= ko.observableArray();

			this.afterRender		= this.afterRender.bind(this);
			this.addOptions			= this.addOptions.bind(this);
			this.loadJSON();
		};
	ko.utils.extend(ViewModel.prototype, {
		
		afterRender	: function (option, item) {
			if (item === undefined) {
				option.selected			= true;
				option.hidden			= true;
				option.setAttribute('hidden', true);
			} else {
				option.value = item.id;
				option.title = item.title;
				option.label = item.label;
			}
			if (option.parentElement.hasAttribute('multiple')) {
				if (option.parentElement.classList.contains('select2')) {
					this.s2multipleTags.push(option.outerHTML);
				} else {
					this.multipleTags.push(option.outerHTML);
				}
			} else {
				if (option.parentElement.classList.contains('select2')) {
					this.s2singleTags.push(option.outerHTML);
				} else {
					this.singleTags.push(option.outerHTML);
				}
			}
		},
		addOptions	: function (data) {
			ko.utils.arrayForEach(data, function (item) {
				this.singleOptions.push(new OptionsModel(item.id, item.text, item.text, item.text));
				this.multipleOptions.push(new OptionsModel(item.id, item.text, item.text, item.text));
				this.s2singleOptions.push(new OptionsModel(item.id, item.text, item.text, item.text));
				this.s2multipleOptions.push(new OptionsModel(item.id, item.text, item.text, item.text));
			}.bind(this));
		},
		loadJSON	: function () {
			$.getJSON('json/sportscars.country.json', function (data) {
				this.addOptions(data);
			}.bind(this));
		}
	});
	ko.applyBindings(new ViewModel());
}(jQuery, ko, window, document));