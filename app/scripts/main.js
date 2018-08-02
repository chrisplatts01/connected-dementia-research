import $ from 'jquery'

$(function () {
  /**
    * IIFE to handle custom select components
    */
  var dropdownSelect = (function () {
    var $dropdownSelect
    var $dropdown
    // var $dropdownSelected
    // var $dropdownOptions
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

          $select.find('.msg-error').detach().appendTo($select)
        },
        get: function ($select) {
          // Get current state of select element
          // NOTE: Not currently required
        },
        set: function ($select) {
          // Set state of select element
          var value = $select.find('.dropdown__option.selected').attr('data-value')
          $select.removeClass('error')
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
      * IIFE to handle segmented control components
      */
    var segmentedControl = (function () {
      var $segmentedControl = $('.segmented-control')
      $segmentedControl.click(function () {
        var $this = $(this)
        var $parent = $this.parent('.segmented-controls')
        var $input = $this.find('[type=radio]')
        $parent.find('label').removeClass('checked').removeClass('error')
        $this.addClass('checked')
        $input.attr('checked', 'checked')
      })
    })()

      /**
        * IIFE to handle file upload components
        */
      var fileUpload = (function () {
        // Check if browser supports advanced file upload features
        var isAdvancedUpload = (function () {
          var div = document.createElement('div')
          return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
        })()

        if (isAdvancedUpload) {
          var droppedFiles = false
          var $fileUpload = $('.file-upload')
          var $fileUploader = $('.file-upload__uploader')
          var $fileList = $('.file-upload__file-list')
          var $form = $fileUpload.closest('form')
          var fileDelete = '.file-upload__delete-file'

          $('.file-upload__button, .file-upload__input').addClass('hide')

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
            droppedFiles = e.originalEvent.dataTransfer.files
            $(this).prev('.file-upload__file-list').append('<li class="file-upload__file-added">' + droppedFiles[0].name + '  <span class="file-upload__delete-file"></span></li>')
          })
        } else {
          $('.file-upload__button, .file-upload__input').removeClass('hide')
        };

        $fileList.on('click', fileDelete, function (e) {
          $(this).parent().remove()
        })

        $form.on('submit', function (e) {
          if ($form.hasClass('is-uploading')) return false

          $form.addClass('is-uploading').removeClass('is-error')

          if (isAdvancedUpload) {
            console.log('Uploading file using AJAX for modern browsers')
            // CODE FOR MDERN BROWSERS - WILL NEED CHECKING!!!
            // e.preventDefault();
            //
            // var ajaxData = new FormData($form.get(0))
            //
            // if (droppedFiles) {
            //   $.each( droppedFiles, function(i, file) {
            //     ajaxData.append( $input.attr('name'), file );
            //   })
            // }
            //
            // $.ajax({
            //   url: $form.attr('action'),
            //   type: $form.attr('method'),
            //   data: ajaxData,
            //   dataType: 'json',
            //   cache: false,
            //   contentType: false,
            //   processData: false,
            //   complete: function() {
            //     $form.removeClass('is-uploading');
            //   },
            //   success: function(data) {
            //     $form.addClass( data.success == true ? 'is-success' : 'is-error' );
            //     if (!data.success) $errorMsg.text(data.error);
            //   },
            //   error: function() {
            //     // Log the error, show an alert, whatever works for you
            //   }
            // })
          } else {
            console.log('Uploading file using AJAX for legacy browsers')
            // CODE FOR LEGACY BROWSERS - WILL NEED CHECKING!!!
            // var iframeName = 'uploadiframe' + new Date().getTime()
            // var $iframe = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>')
            //
            // $('body').append($iframe)
            // $form.attr('target', iframeName)
            //
            // $iframe.one('load', function () {
            //   var data = JSON.parse($iframe.contents().find('body').text())
            //   $form
            //     .removeClass('is-uploading')
            //     .addClass(data.success === true ? 'is-success' : 'is-error')
            //     .removeAttr('target')
            //   if (!data.success) $errorMsg.text(data.error);
            //   $form.removeAttr('target')
            //   $iframe.remove()
            // })
          }
        })
      })()
})
