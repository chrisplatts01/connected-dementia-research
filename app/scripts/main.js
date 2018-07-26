import $ from 'jquery'

$(function () {
  /**
    * Function to handle custom select elements
    */
  (function () {
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
})
