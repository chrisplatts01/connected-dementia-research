import $ from 'jquery'

$(function () {
  /**
    * IIFE to handle custom select elements
    */
  var dropdownOption = (function () {
    var $dropdown
    var $dropdownOption
    var $dropdownSelect
    var $label
    var $select
    var $selectOption
    var selectOptionText

    $dropdownSelect = $('.dropdown-select')
    $dropdownSelect.each(function () {
      $label = $(this).find('label')
      $select = $(this).find('select')
      $label.after('<div class="dropdown"></div>')
      $dropdown = $label.next('.dropdown')
      $selectOption = $select.find('option')
      $selectOption.each(function (index) {
        selectOptionText = $(this).text()
        $dropdownOption = $('<div class="dropdown__option">').text(selectOptionText)
        if (index === 0) { $dropdownOption.addClass('selected') }
        $dropdown.append($dropdownOption)
      })
    })
  })()

  /**
    * IIFE to handle segmented control elements
    */
  var segmentedControl = (function () {
    var $segmentedControl

    $segmentedControl = $('.segmented-control')
    $segmentedControl.click(function () {
      $(this).parent('.segmented-controls').find('label').removeClass('checked')
      $(this).addClass('checked')
      $(this).find('[type=radio]').attr('checked', 'checked')
    })
  })()
})
