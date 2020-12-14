$(function(){
    var dataToSend = {
        "_token": "{{ csrf_token() }}"
    }
   $.post("/curso/Total", dataToSend)
       .done(response => console.log(response))
       .fail(error => console.error(error));

});
