(function($){
  $(function(){

    $('.button-collapse').sideNav();
          $(".obterMemoriaRAM").on('click', function(){
              // console.log("#obterMemoriaRAM") 
              $('#tituloDaFuncionalidade').text("Informações sobre a Memória RAM")
              $('#conteudoDaFuncionalidade').text("A memória RAM do seu aparelho é " + navigator.deviceMemory + " GB")
              $('#modalFuncionalidades').modal().modal('open');
          }) 




          $(".obterInfArmazenamento").on('click', function(){ 
                  $('#tituloDaFuncionalidade').text("Informações sobre Gestos de toque")
                  $('#conteudoDaFuncionalidade').empty()
                  if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
                    var target = document.getElementById('target');

                    function handleChange(change) {
                      var timeBadge = new Date().toTimeString().split(' ')[0];
                      var newState = document.createElement('p');
                      newState.innerHTML = '<span class="badge">' + timeBadge + '</span> ' + change + '.';
                      target.appendChild(newState);
                    }
                    
                    function onChargingChange() {
                      handleChange('Battery charging changed to <b>' + (this.charging ? 'charging' : 'discharging') + '</b>')
                    }
                    function onChargingTimeChange() {
                      handleChange('Battery charging time changed to <b>' + this.chargingTime + ' s</b>');
                    }
                    function onDischargingTimeChange() {
                      handleChange('Battery discharging time changed to <b>' + this.dischargingTime + ' s</b>');
                    }
                    function onLevelChange() {
                      handleChange('Battery level changed to <b>' + this.level + '</b>');
                    }

                    var batteryPromise;
                    
                    if ('getBattery' in navigator) {
                      batteryPromise = navigator.getBattery();
                    } else {
                      batteryPromise = Promise.resolve(navigator.battery);
                    }
                    
                    batteryPromise.then(function (battery) {
                      var charging = battery.charging ? 'charging' : 'discharging';
                      var chargingTime = battery.chargingTime + ' s';
                      var dischargingTime = battery.dischargingTime + ' s';
                      var level = battery.level; 

                      $('#conteudoDaFuncionalidade')
                          .append("<p>O estado inicial da bateria é " + level + ", com o tempo de carregamento de " + chargingTime + ", e o tempo para descarregar " + dischargingTime + ".</p>")
                      
                      battery.addEventListener('chargingchange', onChargingChange);
                      battery.addEventListener('chargingtimechange', onChargingTimeChange);
                      battery.addEventListener('dischargingtimechange', onDischargingTimeChange);
                      battery.addEventListener('levelchange', onLevelChange);
                    });
                  }

                  
                  $('#modalFuncionalidades').modal().modal('open');   
              
          }) 

  }); // end of document ready
})(jQuery); // end of jQuery name space

