
        
        
        $(document).ready(function(){
                $("#botao_buscar_pokemon").click(function(){
                    var cidade = $("#input-cidade").val();
                    var key = 'eed26403bd837bd4e1e09379c7a059ca';
    
                        $.ajax({
                            url: 'http://api.openweathermap.org/data/2.5/weather',
                            dataType: 'json',
                            type: 'GET',
                            data:  {q:cidade, appid: key, units: 'metric'},

                            success: function(data){
                                console.log(data);
                                var wf = '';
                                $.each(data.weather,function(index,val){
                                        wf += '<p><strong>' + data.name + "<p>" + 
                                        data.main.temp + '&deg;C' + ' | ' + val.description
                                        
                            });

                            $("#Aqui").html(wf);

                           
                        } 
                        
                    });
    
                });
    
            });
