var form = document.getElementById('form');
var set = document.getElementsByClassName('set')
var myFunction = function () {
  var testVar = $(this).children('span').attr('id');
  fetch('setcur', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': testVar,
    })
  }).then(
    fetch('open', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': testVar,
      })
    }).then(
      location.href = ("open")
    )
  )
}
for (var i = 0; i < set.length; i++) {
  set[i].addEventListener('click', myFunction, false);
}
form.addEventListener('submit', function(){
    form.preventDefault();
    var name = $('#name').val();
    var name = $('#quote').val();
    $.ajax({
      type: 'POST',
      url: '/quotes',
      data: {'name': name, 'quote': quote},
      dataType: 'json',
      success: function(data) {
        $(".test").text(data);
      }
    })
  }
);
