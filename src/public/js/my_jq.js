$(document).ready(function () {
  // TODO Cerrar Menu
  $(".kbd").click(function () {
    $("#my_boton_menu").addClass('collapsed');
    $("#my_boton_menu").attr("aria-expanded", 'false');
    $("#boton-responsive").removeClass('show');
  });

  // TODO Cerrar Sub-Menu
  $(".sub-menu-kbd").click(function () {
    $("#my_boton_menu").addClass('collapsed');
    $("#my_boton_menu").attr("aria-expanded", 'false');
    $("#boton-responsive").removeClass('show');
  });

  // TODO Ficha JCC
  $("#cuerpo_autor").click(function () {
    $("#link_autor").addClass('collapsed');
    $("#link_autor").attr("aria-expanded", 'false');
    $("#autor").removeClass('show');
  });

  // TODO SCROLL-TOP
  $(window).scroll(function () {
    var tope = parseInt($('.my_main').css('paddingTop'));
    // var top1 = parseInt(window.getComputedStyle(('.my_main').getPropertyValue('margin-top')));
    // console.log(tope1);

    if ($(this).scrollTop() > tope) {
      $('a.scroll-top').fadeIn('slow');
    } else {
      $('a.scroll-top').fadeOut('slow');
    }
  });
  $('a.scroll-top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });


  // TODO Sintetizador_HTML
  $('#Sintetizador_HTML').click(function (event) {
    // TODO vSpeechSynthesisLocutor
    // var utterance = new SpeechSynthesisUtterance();

    // utterance.onstart = function (event) {
    //   console.log('The utterance started to be spoken.')
    // };

    // window.speechSynthesis.onvoiceschanged = function () {

    //   voices = window.speechSynthesis.getVoices();
    //   utterance.voice = voices.filter(function (voice) { return voice.lang == 'pt-BR'; })[0];

    // }


    // $(document).ready(function () {
    //   utterance.text = "Bom dia amigos!";
    //   window.speechSynthesis.speak(utterance)
    // })
    // Motores_TTS.forEach(function (voice, index) {
    //   console.log(`<option value="${voice.name}">${index}-${voice.name}</option>`);
    // });

    const Locutor = new SpeechSynthesisUtterance();
    let Voces = speechSynthesis.getVoices();
    Locutor.voice = Voces[$('#Sintetizador_HTML_Voz option:selected').index()];

    Locutor.text = "Hola Corbaz Julio Cesar";

    Locutor.volume = 1; // 0 mudo 0.5 medio 1 Max
    Locutor.rate = 1; // El "rate" predeterminado 1 (velocidad de la voz)
    Locutor.pitch = 1; //tono más bajo 0, globo de helio, establece el tono a 2

    console.log('Locutor :>> ', Locutor, Locutor.voice.lang);
    speechSynthesis.speak(Locutor);
  });

  // TODO Sintetizador_RESPONSIVE
  $('#Sintetizador_RESPONSIVE').click(function (event) {
    //https://responsivevoice.org/api/
    responsiveVoice.enableEstimationTimeout = false;
    var voicelist = responsiveVoice.getVoices();

    texto = "Como descargar audio generado con ResponsiveVoice en un archivo MP3";
    console.log('texto :>> ', texto);
    console.log('object :>> ', $('#Select_Responsive_Voz option:selected').val());
    responsiveVoice.speak(texto, $('#Select_Responsive_Voz option:selected').val(), { volume: 1 });
    // console.log('responsiveVoice :>> ', responsiveVoice);
    // responsiveVoice.speak("hello world", "UK English Male", { volume: 1 });
  });

  // TODO Sintetizador_RESPONSIVE_HTML
  $("#voice_selection").change(event => {
    event.preventDefault();
    // alert($("#voice_selection").val());

    texto = $("#Sintetizador_RESPONSIVE_HTML").val();
    //console.log(texto);
    responsiveVoice.speak(texto, $("#voice_selection").val(), { volume: 1 });
  });

  $("#boton_foto").click(function () {
    if ($("#p_foto").hasClass("d-none")) {
      $("#p_foto").removeClass('d-none');
    }
    else {
      $("#p_foto").addClass('d-none');
    }
  });


  // TODO MODAL
  $("#myModal").modal("hide");
  $("#myModal").on('hidden.bs.modal', function () {
    alert("Esta accion se ejecuta al cerrar el modal");
  });
});

function responsive_load_voces() {
  var voicelist = responsiveVoice.getVoices();

}