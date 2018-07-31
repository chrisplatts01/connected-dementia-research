import $ from 'jquery'

$(function () {
  /**
    * IIFE to handle custom select elements
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
          $select.find('option').first().removeAttr('selected')
          $select.find('option[value="' + value + '"]').prop('selected', true)
          $select.find('select').val(value)
          console.log($select)
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
      var $select = $this.parents('.dropdown-select')
      var $dropdown = $this.parents('.dropdown') // .children('.dropdown__selected')
      var $options = $this.parent('.dropdown__options').children('.dropdown__option')
      var $selected = $this.parents('.dropdown').children('.dropdown__selected')
      $options.removeClass('selected')
      $this.addClass('selected')
      $dropdown.addClass('selected')
      $selected.text($this.text())
      dropdownState.set($select)
    })
  })()

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
