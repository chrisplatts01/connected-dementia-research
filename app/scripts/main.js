// Declare these two varibles to fix an issue importing modules
var a = ''
var b = ''

// Import library exports
import $ from 'jquery'
import jqueryValidation from 'jquery-validation'
import additionalMethods from 'jquery-validation/dist/additional-methods'
// import jqueryui from 'webpack-jquery-ui' // Load all jquery-ui modules
import slider from 'webpack-jquery-ui/slider.js' // Load jquery-ui Slider module
import jqueryMaskPlugin from 'jquery-mask-plugin'
import datejs from '../scripts/vendor/datejs/build/date-en-GB.js'
import i18n from '../scripts/vendor/datejs/i18n/en-GB.js'
import datePicker from '@chenfengyuan/datepicker/dist/datepicker.common.js'

// Import component exports
import { accordionInit, accordionUpdate } from '../templates/components/accordion/accordion.js';

// Require Uppy file upload core and plugins (run `yarn add -D @uppy/[PLUGIN_NAME]` at the CLI to install dependencies)
// TODO: See if 'import' works with these
const Uppy = require('@uppy/core') // Core Uppy code
const Dashboard = require('@uppy/dashboard') // Full-featured sleek UI with file previews, metadata editing, upload/pause/resume/cancel buttons and more. Includes StatusBar and Informer plugins by default
// const DragDrop = require('@uppy/drag-drop') // Plain and simple drag-and-drop area
// const FileInput = require('@uppy/file-input') // Even more plain and simple, just a button
// const Webcam = require('@uppy/webcam') // Upload selfies or audio / video recordings
// const Dropbox = require('@uppy/dropbox') // Import files from Dropbox
// const GoogleDrive = require('@uppy/google-drive') // Import files from Google Drive
// const Instagram = require('@uppy/instagram') // Import files from Instagram
// const Url = require('@uppy/url') // Import files from any public URL
const Tus = require('@uppy/tus') // Uploads using the tus resumable upload protocol
const XHRUpload = require('@uppy/xhr-upload') // Classic multipart form uploads or binary uploads using XMLHTTPRequest
// const AwsS3 = require('@uppy/aws-s3') // Uploader for AWS S3
// const AwsS3Multipart = require('@uppy/aws-s3 - multipart') // Uploader for AWS S3 using its resumable Multipart protocol
// const ProgressBar = require('@uppy/progress-bar') // Add a small YouTube-style progress bar at the top of the page
// const StatusBar = require('@uppy/status-bar') // Advanced upload progress status bar
// const Informer = require('@uppy/informer') // Show notifications
// const Transloadit = require('@uppy/transloadit') // Manipulate and transcode uploaded files using the transloadit.com service
// const Form = require('@uppy/form') // Collect metadata from <form> right before the Uppy upload, then optionally append results back to the form
// const ThumbnailGenerator = require('@uppy/thumbnail-generator') // Generate preview thumbnails for images to be uploaded [documentation not yet available]
// const GoldenRetriever = require('@uppy/golden-retriever') // Restore files and continue uploading after a page refresh or a browser crash

/**
 * FILE UPLOAD: Handle file upload components (user initiated upload using XHR)
 */
var fileUpload = (function () {
	var $fileUpload = $('#file-upload')

	$fileUpload.each(function () {
		var autoProceed = ($fileUpload.attr('data-auto-upload') === "true")
		var protocol = $fileUpload.attr('data-protocol')
		var endpoint = $fileUpload.attr('data-endpoint')

		console.log('RAW VALUES = ', autoProceed, protocol, endpoint)

		protocol = protocol || 'xhr'
		if (protocol === 'tus') {
			endpoint = endpoint || 'https://master.tus.io/files/' // This endpoint is provided by Transloadit for testing
		} else {
			endpoint = endpoint || 'https://example.com/upload' // This endpoint will fail
		}

		console.log('VALUES = ', autoProceed, protocol, endpoint)

		var uppy = Uppy({
			debug: true,
			autoProceed: autoProceed,
			restrictions: {
				maxFileSize: 1000000,
				maxNumberOfFiles: 3,
				minNumberOfFiles: 1,
				allowedFileTypes: ['image/*']
			}
		})

		uppy.use(Dashboard, {
			trigger: '.UppyModalOpenerBtn',
			inline: true,
			target: '.DashboardContainer',
			replaceTargetContent: true,
			showProgressDetails: false,
			note: 'Images only, 1–3 files, up to 1 MB',
			height: 180,
			width: 360,
			metaFields: [{
					id: 'name',
					name: 'Name',
					placeholder: 'file name'
				},
				{
					id: 'caption',
					name: 'Caption',
					placeholder: 'Describe what the image is about'
				}
			],
			locale: {
				strings: {
					dropPaste: 'Drag file(s) here or %{browse}',
					complete: 'Upload successful',
					pleasePressRetry: ''
				}
			},
			browserBackButtonClose: true
		})

		if (protocol === 'tus') {
			uppy.use(Tus, {
				endpoint: endpoint
			})
		} else {
			uppy.use(XHRUpload, {
				endpoint: endpoint
			})
		}

		uppy.on('complete', result => {
			console.log('successful files:', result.successful)
			console.log('failed files:', result.failed)
		})
	})
})()

/**
 * FORM VALIDATION: Handle form validation using the jquery-validation plugin
 */
var formValidation = (function () {
	$.validator.addMethod(
		'dateUK',
		function (value, element) {
			return Date.parseExact(value, 'd/M/yyyy')
		},
		'Please enter a valid date'
	)

	$.validator.addMethod('dateGroup', function (value, element) {
		var $dateFieldGroup = $(element).closest('.date-field-group')
		var day = $dateFieldGroup.find('input[name="date-field-day"]').val()
		var month = $dateFieldGroup.find('input[name="date-field-month"]').val()
		var year = $dateFieldGroup.find('input[name="date-field-year"]').val()
		var date = day + '/' + month + '/' + year
		var parsedDate = Date.parseExact(date, 'dd/MM/yyyy')
		return parsedDate !== null
	})

	$('form').each(function () {
		var $form = $(this)
		if (a === b)
			$form.validate({
				groups: {
					dateGroup: 'date-field-day date-field-month date-field-year'
				},
				rules: {
					'date-field-day': {
						required: true,
						number: true,
						min: 1,
						max: 31,
						minlength: 2,
						maxlength: 2,
						dateGroup: true
					},
					'date-field-month': {
						required: true,
						number: true,
						min: 1,
						max: 12,
						minlength: 2,
						maxlength: 2,
						dateGroup: true
					},
					'date-field-year': {
						required: true,
						number: true,
						min: 1900,
						minlength: 4,
						maxlength: 4,
						dateGroup: true
					},
					date: 'dateUK',
					'date-field-datex': 'dateUK'
				},
				messages: {
					'date-field-day': {
						required: 'Please enter values for day, month and year',
						number: 'Please enter a number',
						min: 'Please enter a value of at least {0}',
						max: 'Please enter a value no greater than {0}',
						minlength: 'Please enter exactly {0} digits',
						maxlength: 'Please enter exactly {0} digits',
						dateGroup: 'Please enter a valid date'
					},
					'date-field-month': {
						required: 'Please enter values for day, month and year',
						number: 'Please enter a number',
						min: 'Please enter a value of at least {0}',
						max: 'Please enter a value no greater than {0}',
						minlength: 'Please enter exactly {0} digits',
						maxlength: 'Please enter exactly {0} digits',
						dateGroup: 'Please enter a valid date'
					},
					'date-field-year': {
						required: 'Please enter values for day, month and year',
						number: 'Please enter a valid date',
						min: 'Please enter a value of at least {0}',
						max: 'Please enter a value no greater than {0}',
						minlength: 'Please enter exactly {0} digits',
						maxlength: 'Please enter exactly {0} digits',
						dateGroup: 'Please enter a valid date'
					}
				},
				errorElement: 'div',
				errorClass: 'error message message--error',
				errorPlacement: function (error, element) {
					error.appendTo(element.closest('.form__field'))
				}
			})
	})
})()

/**
 * SELECT SLIDER FIELD: Handle slider interface on select filds
 */
var selectSliderField = (function () {
	var $selectSliderFields = $('.select-slider-field')

	$selectSliderFields.each(function () {
		var $selectSliderField = $(this)
		var $slider = $selectSliderField.find('.slider')
		var $mercury = $slider.find('.slider__mercury')
		var $input = $slider.find('input[type="text"]')
		var $value = $slider.find('.slider__value')

		var values = $selectSliderField.attr('data-options').split(',')
		var steps = values.length

		var step = 0
		var value = values[0]
		var width = 0

		$input.val(value)
		$value.text(value)
		$mercury.css('width', width + '%')

		$slider.slider({
			min: 0,
			max: steps - 1
		})

		$slider.on('slidestop', function () {
			step = $slider.slider('value')
			value = values[step]
			width = (step * 100) / (steps - 1)

			$input.val(value)
			$value.text(value)
			$mercury.css('width', width + '%')
		})
	})
})()

/**
 * MASKED DATE FIELD: Handle masked date fields
 */
var maskedDateField = (function () {
	var $maskedDateField = $('.input-field--masked-date').find(
		'input[name|="date"]'
	)

	$maskedDateField.mask('00/00/0000')
})()

/**
 * DATE PICKER FIELD: Handle date picker field input
 */
var datePickerField = (function () {
	var $datePicker = $('[data-toggle="datepicker"]')
	$datePicker.datepicker({
		autoHide: true,
		language: 'en-GB',
		format: 'dd/mm/yyyy'
	})
})()

/**
 * PASSWORD FIELD: Handle password show/hide
 */
var passwordField = (function () {
	var $passwordField = $('.input-field--password')
	var $passwordShow = $passwordField.children('.show')

	$passwordShow.click(function () {
		var $this = $(this)
		var $passwordInput = $this.prev('label').children('input')

		if ($passwordInput.attr('type') === 'password') {
			$passwordInput.attr('type', 'text')
			$this.text('Hide')
		} else {
			$passwordInput.attr('type', 'password')
			$this.text('Show')
		}
	})
})()

/**
 * PROGRESS INDICATOR: Handle progress indicators
 */
var progressIndicator = (function () {
	var $progressIndicator = $('.progress-indicator')
	$progressIndicator.each(function () {
		var $this = $(this)
		var step = $this.attr('data-step')
		var steps = $this.attr('data-steps')
		var width = (step / steps) * 100

		$this.prepend('<span class="progress-indicator__steps">&nbsp</span>')
		$this.append(
			'<span class="progress-indicator__step" style="width:' + width + '%">&nbsp</span>'
		)
	})
})()

/**
 * DROPDOWN SELECT: Handle custom select components
 */
var dropdownSelect = (function () {
	var $dropdownSelects = $('.dropdown-select')

	// Handle state of dropdown select
	var state = (function () {

		// Public: Initialize dropdown select UI
		var init = function ($dropdownSelect) {
			var $dropdown
			var $dropdownSelected
			var $dropdownOptions

			var $select = $dropdownSelect.find('select').first()
			var $options = $select.children('option')

			$dropdownSelect.append('<div class="dropdown"></div>')
			$dropdown = $dropdownSelect.find('.dropdown')

			$dropdown.prepend('<div class="dropdown__selected">Select&hellip;</div>')
			$dropdownSelected = $dropdownSelect.find('.dropdown__selected')

			$dropdown.append('<div class="dropdown__options"></div>')
			$dropdownOptions = $dropdown.find('.dropdown__options')

			$options.each(function () {
				var $option = $(this)
				var value = $option.attr('value')
				var text = $option.text()

				if (value) {
					$dropdownOptions.append('<div class="dropdown__option" data-value=' + $option.attr('value') + '>' + $option.text() + '</div>')
					console.log(value)
					console.log($select)

					if (value === get($select)) {
						$dropdown.addClass('selected')
						$dropdownSelected.replaceWith('<div class="dropdown__selected selected">' + text + '</div>')
					}
				}
			})
			return $dropdown
		}

		// Public: Handle change event
		var change = function ($dropdownSelect, $dropdownOption) {
			var $select = $dropdownSelect.find('select')
			var $dropdown = $dropdownSelect.find('.dropdown')
			var $dropdownOptions = $dropdown.find('.dropdown__option')
			var $dropdownSelected = $dropdown.find('.dropdown__selected')

			$dropdown.removeClass('error')
			$dropdownSelect.find('.message--error').detach()


			$dropdownOptions.removeClass('selected')
			$dropdownOption.addClass('selected')

			$dropdownSelected.addClass('selected')
			$dropdownSelected.text($dropdownOption.text())

			$dropdown.addClass('selected')
		}

		// Public: Get the current value of the select element
		var get = function ($select) {
			return $select.val()
		}

		// Public: Set the current value of the select element
		var set = function ($select, value) {
			$select.val(value)
		}

		return {
			init: init,
			change: change,
			get: get,
			set: set
		}
	}())

	// Initialise dropdowns and bind events
	$dropdownSelects.each(function () {
		var $dropdownSelect = $(this)
		var $dropdown = state.init($dropdownSelect)
		var $dropdownOptions = $dropdown.find('.dropdown__option')

		// Open/close dropdown
		$dropdown.click(function () {
			$dropdown.toggleClass('open')
		})

		// Change selected option
		$dropdownOptions.click(function () {
			var $dropdownOption = $(this)

			var $select = $dropdownSelect.find('select').first()
			var value = $dropdownOption.attr('data-value')

			state.change($dropdownSelect, $dropdownOption)
			state.set($select, value)
		})
		// Handle error on form submit
		$dropdownSelect.closest('form').on('submit', function () {
			if ($dropdownSelect.find('select').hasClass('error')) {
				$dropdown.addClass('error')
			}
		})
	})
})()

/**
 * CONDITIONAL CHECKBOXES: Handle conditional checkbox groups
 */
var conditionalCheckboxGroup = (function () {
	var $conditionalCheckboxGroup = $('.conditional-checkbox-group')
	var $radioButtons = $conditionalCheckboxGroup.find('input:radio')

	var setCheckboxes = function (state) {
		var $checkboxes = $conditionalCheckboxGroup.find('.checkbox')
		var $inputs = $checkboxes.find('input:checkbox')

		if (state) {
			$checkboxes.removeClass('disabled')
			$inputs.prop('disabled', false)
		} else {
			$checkboxes.addClass('disabled')
			$inputs.prop('disabled', true)

			$checkboxes.find('input:checkbox').prop('checked', false)
		}
	}

	$radioButtons.each(function () {
		var $this = $(this)
		var isChecked = $this.attr('checked') === 'checked'

		if (isChecked) {
			var state = $this.attr('data-checkboxes-enabled') === 'true'
			setCheckboxes(state)
		}
	})

	$radioButtons.click(function () {
		var $this = $(this)
		var state = $this.attr('data-checkboxes-enabled') === 'true'
		setCheckboxes(state)
	})
})()

/**
 * SEGMENTED CONTROL: Handle segmented control components
 */
var segmentedControl = (function () {
	var $segmentedControl = $('.segmented-control')

	// Handle form submission with no selection
	$segmentedControl.closest('form').on('submit', function () {
		var $this = $(this)
		var $control = $this.find('.segmented-control')
		$control.each(function () {
			var $this = $(this)
			if ($this.find('input:radio').hasClass('error')) {
				$this.addClass('invalid')
				$this.find('.segmented-control__label').addClass('invalid')
			}
		})
	})

	// Handle click event
	$segmentedControl.click(function () {
		var $this = $(this)
		var $input = $this.find('[type=radio]')
		var $label = $this.find('.segmented-control__label')
		$label.removeClass('checked').removeClass('invalid')
		$input.attr('checked', 'checked')
	})
})()

/**
 * HIDEABLE PANEL: Handle hideable panel
 */
var userBar = (function () {
	$('.user-bar__menu-select').on('click', function () {
		var $select = $(this)
		$select.toggleClass('open')
		$select.next('.user-bar__menu-options').slideToggle()
	})
})()

/**
 * HIDEABLE PANEL: Handle hideable panel
 */
var hideablePanel = (function () {
	var $hideablePanels = $('.hideable-panel')

	$hideablePanels.each(function () {
		var $hideablePanel = $(this)
		var $hidePanel = $hideablePanel.find('.hideable-panel__close')

		$hidePanel.on('click', function () {
			$hideablePanel.hide()
		})
	})
})()

/**
 * ACCORDION: Handle accordion init/show/hide
 */
var accordion = (function () {
	var $accordions = $('.accordion')

	$accordions.each(function () {
		var $accordion = $(this)
		accordionInit($accordion)
	})
})()

/**
 * TAB PANEL: Handle tabbed content panel
 */
var tabPanel = (function () {
	var $tabPanels = $('.tab-panel')

	$tabPanels.each(function () {
		var $panel = $(this)
		var $panes = $panel.find('.tab-panel__pane')
		var $tabBar
		var $tabs
		var tabWidth = 100 / $panes.length

		$panel.prepend('<div class="tab-panel__tabs"></div>')
		$tabBar = $panel.find('.tab-panel__tabs')
		$panes.each(function () {
			var label = $(this)
				.find('.tab-panel__label')
				.text()
			$tabBar.append('<div class="tab-panel__tab" style="width: ' + tabWidth + '%;">' + label + '</div>')
		})
		$tabs = $panel.find($('.tab-panel__tab'))

		$tabs.first().addClass('active')
		$panes.first().addClass('active')

		$tabs.on('click', function () {
			var $tab = $(this)
			var index = $tabs.index($tab)

			$tabs.removeClass('active')
			$tab.addClass('active')

			$panes.removeClass('active')
			$panes.eq(index).addClass('active')
		})
	})
})()
