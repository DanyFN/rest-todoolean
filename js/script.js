$(document).ready(function(){
  leggiTuttaLista();
  // Funzione Click AGGIUNGI
  $(document).on('click','#btn_lista',function(){
    var valoreInput = $('#input_lista').val();

    if(valoreInput != '') {
        $.ajax(
            {
              url:'http://157.230.17.132:3035/todos/',
              method: 'POST',
              data:{
                text:valoreInput
              },
              success: function(data) {
                leggiTuttaLista();
              },
              error: function() {
                alert('errore');
              }
            }
        );
    } else {
      alert('Inserisci qualcosa');
    }
  });

  // Funzione Click ELIMINA
  $(document).on('click','.btn_elimina',function(){
      var idEliminato = $(this).parent().attr('data-list');
      $.ajax(
      {
        url:'http://157.230.17.132:3035/todos/' + idEliminato,
        method: 'DELETE',
        success: function(data) {
          leggiTuttaLista();
        },
        error: function() {
          alert('errore')
        }
      }
    );
  });
});

// Funzione di lettura e stampa
function leggiTuttaLista() {
  $('#stampa_lista').html('');
  $.ajax(
    {
      url:'http://157.230.17.132:3035/todos/',
      method: 'GET',
      success: function(data) {
        if (data.length > 0) {
          var source = $('#lista-template').html();
          var template = Handlebars.compile(source);

          for (var i = 0; i < data.length; i++) {
            var coseFatte = data[i];

            var html = template(coseFatte);

            $('#stampa_lista').append(html);
          }
        }
      },
      error: function() {
        alert('Errore pagina non visualizzata');
      }
    }
  );
}
