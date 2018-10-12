/**
 * module `accordion.js`
 *
 * Functions to initialise and update the jQuery object `$accordion` with the structure:
 *
 * <div class="accordion">
 * 	<div class="accordion__item">...</div>
 * 	<div class="accordion__item">...</div>
 * 	...
 * </div>
 */

/**
 * function accordionInit($accordion)
 *
 * Initialise the accordion
 */
function accordionInit($accordion) {
	var $accordionItems = $accordion.find(".accordion__item");
	$accordionItems.addClass("closed");
	$accordionItems.first().removeClass("closed");
	accordionUpdate($accordion);
}

/**
 * function accordionUpdate($accordion)
 *
 * Update the accordion, binding the click event handlers
 */
function accordionUpdate($accordion) {
	var $accordionItems = $accordion.find(".accordion__item");
	$accordionItems.on("click", function () {
		var $accordionItem = $(this);
		$accordionItems.addClass("closed");
		$accordionItem.removeClass("closed");
	});
}

export {
	accordionInit,
	accordionUpdate
};
