import $ from 'jquery'
import jqueryValidation from 'jquery-validation'
import additionalMethods from 'jquery-validation/dist/additional-methods'
// import jqueryui from 'webpack-jquery-ui' // Load all jquery-ui modules
import slider from 'webpack-jquery-ui/slider.js' // Load jquery-ui Slider module
import jqueryMaskPlugin from 'jquery-mask-plugin'
import datejs from '../scripts/vendor/datejs/build/date-en-GB.js'
import i18n from '../scripts/vendor/datejs/i18n/en-GB.js'
import datePicker from '@chenfengyuan/datepicker/dist/datepicker.common.js'

/**
 * Load Uppy file upload core and plugins (run `yarn add -D @uppy/[PLUGIN_NAME]` at the CLI to install dependencies)
 */
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

$(function () {
  /**
   * FILE UPLOAD: Handle file upload components
   */
  var fileUpload = (function () {
    var $fileUpload = $('.file-upload')

    $fileUpload.each(function (index, element) {
      var $this = $[this]

      var uppy = Uppy({
        debug: true,
        autoProceed: false,
        restrictions: {
          maxFileSize: 1000000,
          maxNumberOfFiles: 3,
          minNumberOfFiles: 1,
          allowedFileTypes: ['image/*', 'video/*']
        }
      })
      .use(Dashboard, {
        trigger: '.UppyModalOpenerBtn',
        inline: true,
        target: '.DashboardContainer',
        replaceTargetContent: true,
        showProgressDetails: false,
        note: 'Images and video only, 1–3 files, up to 1 MB',
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
        }],
        locale: {
          strings: {
            dropPaste: 'Drag file(s) here or %{browse}',
            complete: 'Upload successful'
          }
        },
        browserBackButtonClose: true
      })
      .use(Tus, {
        endpoint: 'https://master.tus.io/files/'
      })

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
        errorPlacement: function (error, element) {
          error.appendTo(element.closest('.form__field'))
        }
      })
    })
  })()

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
          $select
            .find('option')
            .not(':selected')
            .each(function () {
              var $this = $(this)
              var text = $this.text()
              var value = $this.val()
              $option = $(option).appendTo($options)
              $option.text(text)
              $option.attr('data-value', value)
            })

          $select
            .find('.message--error')
            .detach()
            .appendTo($select)
        },
        get: function ($select) {
          // Get current state of select element
          // NOTE: Not currently required
        },
        set: function ($select) {
          // Set state of select element
          var value = $select
            .find('.dropdown__option.selected')
            .attr('data-value')
          $select.removeClass('error')
          $select.find('div.error').remove()
          $select
            .find('option')
            .first()
            .removeAttr('selected')
          $select.find('option[value="' + value + '"]').prop('selected', true)
          $select.find('select').val(value)
        }
      }
    })()

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
      var $options = $this
        .parent('.dropdown__options')
        .children('.dropdown__option')
      var $selected = $this
        .closest('.dropdown')
        .children('.dropdown__selected')
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
})
