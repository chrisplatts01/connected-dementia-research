/**
 * module `select-slider-field.js`
 *
 * Functions to initialise and update the jQuery object `$select-slider'
 *
 */

/**
 * function selectSliderInit($selectSlider)
 *
 * Initialise the slider
 */
function selectSliderInit($slider) {
	var $mercury = $slider.find('.slider__mercury')
	var $input = $slider.find('input[type="text"]')
	var $value = $slider.find('.slider__value')
	var values = $slider.closest('.select-slider-field').attr('data-options').split(',')
	var steps = values.length
	var value = $input.val()
	var step = values.indexOf(value)
	var width = (step * 100) / (steps - 1)

	if (step < 0) {
		value = values[0]
		step = 0
		width = 0
	}

	$input.val(value)
	$value.text(value)
	$mercury.css('width', width + '%')

	$slider.slider({
		min: 0,
		max: steps - 1,
		value: step
	})
}

/**
 * function selectSliderUpdate($slider)
 *
 * Update the accordion, binding the click event handlers
 */
function selectSliderUpdate($slider) {
	var $mercury = $slider.find('.slider__mercury')
	var $input = $slider.find('input[type="text"]')
	var $value = $slider.find('.slider__value')
	var values = $slider.closest('.select-slider-field').attr('data-options').split(',')
	var steps = values.length
	var step = $slider.slider('value')
	var value = values[step]
	var width = (step * 100) / (steps - 1)

	$input.val(value)
	$value.text(value)
	$mercury.css('width', width + '%')
}

export {
	selectSliderInit,
	selectSliderUpdate
};
