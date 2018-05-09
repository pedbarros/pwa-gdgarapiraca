(function($){
  $(function(){

    $('.button-collapse').sideNav();
          $(".obterMemoriaRAM").on('click', function(){
              // console.log("#obterMemoriaRAM") 
              $('#tituloDaFuncionalidade').text("Informações sobre a Memória RAM")
              $('#conteudoDaFuncionalidade').text("A memória RAM do seu aparelho é " + navigator.deviceMemory + " GB")
              $('#modalFuncionalidades').modal().modal('open');
          }) 




          $(".obterInfBateria").on('click', function(){ 
                  $('#tituloDaFuncionalidade').text("Informações sobre a bateria")
                  $('#conteudoDaFuncionalidade').empty()

                  if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
                    var target = document.getElementById('target');

                    function handleChange(change) {
                      var timeBadge = new Date().toTimeString().split(' ')[0];
                      var newState = document.createElement('p');
                      newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
                      target.appendChild(newState);
                    }
                    
                    function onLevelChange() {
                      handleChange('O estado da bateria modificou para <b>' + (this.level*100)+ '%</b>');
                    }

                    var batteryPromise;
                    
                    if ('getBattery' in navigator) {
                      batteryPromise = navigator.getBattery();
                    } else {
                      batteryPromise = Promise.resolve(navigator.battery);
                    }
                    
                    batteryPromise.then(function (battery) {
                      var level = battery.level; 

                      $('#conteudoDaFuncionalidade')
                          .append("<p>O estado da bateria é <b>" + (level*100) + "%</b>")
                      
                      battery.addEventListener('levelchange', onLevelChange);
                    });
                  }

                  
                  $('#modalFuncionalidades').modal().modal('open');   
              
          }) 

  }); // end of document ready
})(jQuery); // end of jQuery name space

