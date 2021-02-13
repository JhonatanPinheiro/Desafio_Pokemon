        $(document).ready(function(){
                $("#botao_buscar_pokemon").click(function(){
                    var cidade = $("#input-cidade").val();
                    var key = 'eed26403bd837bd4e1e09379c7a059ca';
    
                        $.ajax({
                            url: 'http://api.openweathermap.org/data/2.5/weather',
                            dataType: 'json',
                            type: 'GET',
                            data:  {lang:'pt_br', q:cidade, appid: key, units: 'metric'},

                            success: function(data){
                                console.log(data);
                                $("#input-cidade").val('');
                                var temperatura =  Math.round(data.main.temp);
                                var tipoPokemon = '';
                                var climaResultado = '';

                                $.each(data.weather,function(index,value){
                                    climaResultado += '<p><strong>' + data.name + "<p>" + 
                                     temperatura + '&deg;C' + ' | ' + value.description
                                });
                                $("#Aqui").html(climaResultado);

                                // Logica 
                                if(temperatura < 5){
                                    tipoPokemon = 'ice';
                                }
                              
                                else if(temperatura >= 5 && temperatura < 10){
                                    tipoPokemon = 'water';
                                }

                                else if(temperatura >= 12 && temperatura <= 15){
                                    tipoPokemon = 'grass';
                                }

                                else if(temperatura >= 15 && temperatura < 21){
                                    tipoPokemon = 'ground';
                                }

                                else if(temperatura >= 23 && temperatura < 27){
                                    tipoPokemon = 'bug';
                                }

                                else if(temperatura >= 27 && temperatura < 33){
                                    tipoPokemon = 'rock';
                                }

                                else if(temperatura > 33){
                                    tipoPokemon = 'fire';
                                }

                                else {
                                    tipoPokemon = 'normal';
                                }
                              
                                if(data){
                                    $.ajax({
                                        url: `https://pokeapi.co/api/v2/type/${tipoPokemon}`,
                                        dataType: 'json',
                                        type: 'GET',
                                                                                   
                                        success: function(data){
                                            console.log(data);
                                            
                                            var arrayPokemons = data.pokemon;
                                            var numeroAleatorio = Math.floor(Math.random() * data.pokemon.length) + 1;
                                            
                                                // $.each(arrayPokemons,function(index,value){
                                                //     console.log(value.pokemon.name);
                                                                          
                                                // });
                                             console.log(numeroAleatorio);
                                            
                                             var pokemonEscolhidoAleatorio = arrayPokemons[numeroAleatorio].pokemon.name;
                                 
                                            $("#nome_do_pokemon").html(pokemonEscolhidoAleatorio);
            
                                            
                                        } 
                                    
                                    });
                                }

                            },

                            error: function(error) {
                                console.log(error);
                                $("#Aqui").html(error.responseJSON.message);
                              }
                        
                        });
    
                });
    
        });
