import $ from 'jquery'
import jqueryValidation from 'jquery-validation'
// import jqueryui from 'webpack-jquery-ui'
import slider from 'webpack-jquery-ui/slider.js'
import additionalMethods from 'jquery-validation/dist/additional-methods'
import jqueryMaskPlugin from 'jquery-mask-plugin'
import datejs from '../scripts/vendor/datejs/build/date-en-GB.js'
import i18n from '../scripts/vendor/datejs/i18n/en-GB.js'
import datePicker from '@chenfengyuan/datepicker/dist/datepicker.common.js'

$(function () {
	/**
	 * FORM VALIDATION: Handle form validation using the jquery-validation plugin
	 */
	var formValidation = (function () {
		$.validator.addMethod('dateUK', function (value, element) {
			return Date.parseExact(value, 'd/M/yyyy')
		}, 'Please enter a valid date')

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
					'date': 'dateUK',
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
				errorPlacement: function (error, element) {
					error.appendTo(element.closest('.form__field'))
				}
			})
		})
	}())

	/**
	 * SELECT SLIDER FIELD: Handle slidr interface on select filds
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
			$mercury.css("width", width + "%")


			$slider.slider({
				min: 0,
				max: steps - 1,
			})

			$slider.on('slidestop', function () {
				step = $slider.slider("value")
				value = values[step]
				width = step * 100 / (steps - 1)

				$input.val(value)
				$value.text(value)
				$mercury.css("width", width + "%")
			})
		})
	}())

	/**
	 * MASKED DATE FIELD: Handle masked date fields
	 */
	var maskedDateField = (function () {
		var $maskedDateField = $('.input-field--masked-date').find('input[name|="date"]')

		$maskedDateField.mask('00/00/0000')
	}())

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
	}())

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
	}())

	/**
	 * PROGRESS INDICATOR: Handle progress indicators
	 */
	var progressIndicator = (function () {
		var $progressIndicator = $('.progress-indicator')
		$progressIndicator.each(function () {
			var $this = $(this)
			var step = $this.attr('data-step')
			var steps = $this.attr('data-steps')
			var width = step / steps * 100

			$this.prepend('<span class="progress-indicator__steps">&nbsp</span>')
			$this.append('<span class="progress-indicator__step" style="width:' + width + '%">&nbsp</span>')
		})
	}())

	/**
	 * DROPDOWN SELECT: Handle custom select components
	 */
	var dropdownSelect = (function () {
		var $dropdownSelect
		var $dropdown
		var $dropdownOption

		$dropdownSelect = $('.dropdown-select')

		var dropdownState = (function () {
			return {
				init: function ($select) {
					// Set initial state of dropdown-select controls
					var dropdown = '<div class="dropdown"></div>'
					var selected = '<div class="dropdown__selected"></div>'
					var options = '<div class="dropdown__options"></div>'
					var option = '<div class="dropdown__option"></div>'
					var $dropdown = $(dropdown).appendTo($select)
					var $selected = $(selected).appendTo($dropdown)
					var $options = $(options).appendTo($dropdown)
					var $option

					$selected.text($select.find('option:selected').text())
					$select.find('option').not(':selected').each(function () {
						var $this = $(this)
						var text = $this.text()
						var value = $this.val()
						$option = $(option).appendTo($options)
						$option.text(text)
						$option.attr('data-value', value)
					})

					$select.find('.message--error').detach().appendTo($select)
				},
				get: function ($select) {
					// Get current state of select element
					// NOTE: Not currently required
				},
				set: function ($select) {
					// Set state of select element
					var value = $select.find('.dropdown__option.selected').attr('data-value')
					$select.removeClass('error')
					$select.find('div.error').remove()
					$select.find('option').first().removeAttr('selected')
					$select.find('option[value="' + value + '"]').prop('selected', true)
					$select.find('select').val(value)
				}
			}
		}())

		// Initialise dropdowns
		$dropdownSelect.each(function () {
			dropdownState.init($(this))
		})

		// Handle form submission with no selection
		$dropdownSelect.closest('form').on('submit', function () {
			var $this = $(this)
			var $dropdown = $this.find('.dropdown-select')
			$dropdown.each(function () {
				var $this = $(this)
				if ($this.find('select').hasClass('error')) {
					$this.addClass('error')
				}
			})
		})

		$dropdown = $('.dropdown')
		$dropdown.click(function () {
			var $this = $(this)
			$this.toggleClass('open')
			$this.find('.dropdown__option').toggle()
		})

		$dropdownOption = $dropdown.find('.dropdown__option')
		$dropdownOption.click(function () {
			var $this = $(this)
			var $select = $this.closest('.dropdown-select')
			var $dropdown = $this.closest('.dropdown') // .children('.dropdown__selected')
			var $options = $this.parent('.dropdown__options').children('.dropdown__option')
			var $selected = $this.closest('.dropdown').children('.dropdown__selected')
			$options.removeClass('selected')
			$this.addClass('selected')
			$dropdown.addClass('selected')
			$selected.text($this.text())
			dropdownState.set($select)
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
	}())

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
	}())

	/**
	 * ACCORDION: Handle accordion init/show/hide
	 */
	var accordion = (function () {
		var $accordions = $('.accordion')

		$accordions.each(function () {
			var $accordion = $(this)
			var $items = $accordion.find('.accordion__item')
			$items.addClass('closed')
			$items.first().removeClass('closed')

			$items.on('click', function () {
				var $item = $(this)
				$items.addClass('closed')
				$item.removeClass('closed')
				//   $('html, body').animate({
				//     scrollTop: ($item.offset().top)
				//   },500)
			})
		})
	}())

	/**
	 * FILE UPLOAD: Handle file upload components
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
				var label = $(this).find('.tab-panel__label').text()
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
	}())

	/**
	 * FILE UPLOAD: Handle file upload components
	 */
	var fileUpload = (function () {
		// Check if browser supports advanced file upload features
		var isAdvancedUpload = (function () {
			var div = document.createElement('div')
			return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
		})()

		// Handle list of files to be displayed/uploaded
		var fileList = (function () {
			return {
				init: function ($form) {
					if (typeof fileList.files === 'undefined') {
						fileList.files = []
					}
				},
				add: function (files) {
					$.each(files, function (index, file) {
						fileList.files.push(file)
					})
				},
				delete: function (index) {
					fileList.files.splice(index, 1)
				},
				show: function ($list) {
					$list.empty()
					$.each(fileList.files, function (index, file) {
						$list.append('<li class="file-upload__file-added" data-index="' + index + '">' + file.name + '  <span class="file-upload__delete-file"></span></li>')
					})
				},
				upload: function () {
					// How???
				}
			}
		}())

		$('#upload').on('click', fileList.upload())

		if (isAdvancedUpload) { // Handle advanced file upload
			var $fileUploader = $('.file-upload__uploader')
			var $fileInputUploader = $('.file-upload__input')
			var $fileList = $('.file-upload__file-list')
			var $form = $fileUploader.closest('form')
			var fileDelete = '.file-upload__delete-file'

			// Initialise file list array
			fileList.init($form)

			// Visually hide file input element
			$('.file-upload__button, .file-upload__input').addClass('hide')

			// Handle non-drag and drop file selection
			$fileInputUploader.change(function () {
				var $this = $(this)
				var $list = $this.closest('.file-upload__uploader').prev('.file-upload__file-list')
				var files = $this.prop('files')
				fileList.add(files)
				fileList.show($list)
			})

			// Handle drag and drop file selection
			$fileUploader.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
					e.preventDefault()
					e.stopPropagation()
				})
				.on('dragover dragenter', function () {
					$(this).addClass('is-dragover')
				})
				.on('dragleave dragend drop', function () {
					$(this).removeClass('is-dragover')
				})
				.on('drop', function (e) {
					var $this = $(this)
					var $list = $this.prev('.file-upload__file-list')
					var files = e.originalEvent.dataTransfer.files
					fileList.add(files)
					fileList.show($list)
				})
		} else { // Handle basic file upload
			$('.file-upload__button, .file-upload__input').removeClass('hide')
		}

		// Delete file from file list
		$fileList.on('click', fileDelete, function (e) {
			var $this = $(this)
			var $list = $this.closest('.file-upload').children('.file-upload__file-list')
			var index = $this.parent('.file-upload__file-added').attr('data-index')
			fileList.delete(index)
			fileList.show($list)
		})
	})()
})
