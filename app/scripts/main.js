import $ from 'jquery'

$(function () {
  /**
    * IIFE to handle custom select elements
    */
  var dropdownSelect = (function () {
    var $dropdownSelect
    var $dropdown
    var $dropdownSelected
    var $dropdownOptions
    var $dropdownOption

    $dropdownSelect = $('.dropdown-select')

    var dropdownState = (function () {
      return {
        init: function ($dropdownSelect) {
          // Set initial state of dropdown-select controls
          var dropdown = '<div class="dropdown"></div>'
          var selected = '<div class="dropdown__selected"></div>'
          var options = '<div class="dropdown__options"></div>'
          var option = '<div class="dropdown__option"></div>'
          var $dropdown = $(dropdown).appendTo($dropdownSelect)
          var $dropdownSelected = $(selected).appendTo($dropdown)
          var $dropdownOptions = $(options).appendTo($dropdown)
          var $dropdownOption

          $dropdownSelected.text($dropdownSelect.find('option:selected').text())
          $dropdownSelect.find('option').not(':selected').each(function () {
            var text = $(this).text()
            $dropdownOption = $(option).appendTo($dropdownOptions)
            $dropdownOption.text(text)
          })

          $dropdownSelect.find('.msg-error').detach().appendTo($dropdownSelect)
        },
        get: function () {
          // Get current state of select element
          console.log('GET')
        },
        set: function () {
          // Set state of select element
          console.log('SET')
        }
      }
    }())

    // Initialise dropdowns
    $dropdownSelect.each(function () {
      dropdownState.init($(this))
    })

    $dropdown = $('.dropdown')
    $dropdown.click(function () {
      console.log('DROPDOWN CLICKED')
      var $this = $(this)
      $this.toggleClass('open')
      $this.find('.dropdown__option').toggle()
    })

    $dropdownOption = $dropdown.find('.dropdown__option')
    $dropdownOption.click(function () {
      console.log('OPTION CLICKED')
      var $this = $(this)
      var $dropdown = $this.parents('.dropdown') // .children('.dropdown__selected')
      var $options = $this.parent('.dropdown__options').children('.dropdown__option')
      var $selected = $this.parents('.dropdown').children('.dropdown__selected')
      $options.removeClass('selected')
      $this.addClass('selected')
      $dropdown.addClass('selected')
      $selected.text($this.text())
    })

    // dropdownState.get()
    // dropdownState.set()

    // Set up initial state - selected container
    // $dropdownSelected.text($dropdownSelect.find('option:selected').text())
    // $dropdownSelect.find('option').not(':selected').each(function () {
    //   var text = $(this).text()
    //   $dropdownOption = $(option).appendTo($dropdownOptions)
    //   $dropdownOption.text(text)
    // })
    //
    // console.log($dropdownSelect)
  })()

  // var dropdownOption = (function () {
  //   var $dropdown
  //   var $dropdownOption
  //   var $dropdownSelect
  //   var $label
  //   var $select
  //   var $selectOption
  //   var selectOptionText
  //
  //   // Create and populate fake, stylable select control
  //   $dropdownSelect = $('.dropdown-select')
  //   $dropdownSelect.each(function () {
  //     var $this = $(this)
  //     $label = $this.find('label')
  //     $select = $this.find('select')
  //     $label.after('<div class="dropdown"></div>')
  //     $dropdown = $label.next('.dropdown')
  //     $selectOption = $select.find('option')
  //     $selectOption.each(function (index) {
  //       var $this = $(this)
  //       selectOptionText = $this.text()
  //       $dropdownOption = $('<div class="dropdown__option">').text(selectOptionText)
  //       if (index === 0) {
  //         $dropdownOption.addClass('selected').addClass('disabled')
  //       }
  //       $dropdown.append($dropdownOption)
  //     })
  //
  //     $this.click(function () {
  //       var $dropdown = $this.children('.dropdown')
  //       var $option = $dropdown.children('.dropdown__option')
  //
  //       $dropdown.toggleClass('open')
  //       $option.click(function () {
  //         var $clicked = $(this)
  //         $option.removeClass('selected').removeClass('chosen')
  //         $clicked.addClass('selected').addClass('chosen')
  //         $dropdown.addClass('chosen')
  //       })
  //
  //       // if ($dropdown.hasClass('open')) {
  //       //   $option.click(function () {
  //       //     $this = $(this)
  //       //     $option.removeClass('selected')
  //       //     $this.addClass('selected')
  //       //   })
  //       // }
  //     })
  // })()

  /**
    * IIFE to handle segmented control elements
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
})
