$(document).ready(function () {
    $("#botao_buscar_pokemon").click(function () {
        var cidade = $("#input_cidade").val();
        var key = 'eed26403bd837bd4e1e09379c7a059ca';

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            dataType: 'json',
            type: 'GET',
            data: { lang: 'pt_br', q: cidade, appid: key, units: 'metric' },

            success: function (data) {

                $("#input_cidade").val('');
                var temperatura = Math.round(data.main.temp);
                var climaChuva = data.weather[0].main;

                var tipoPokemon = '';
                var climaResultado = '';
              


                $.each(data.weather, function (index, value) {
                    climaResultado += '<p><strong>' + data.name + "<p>" +
                    temperatura + '&deg;C' + ' | ' + value.main + ' (' + value.description + ')'
                });
                console.log('Clima e Temperatura');
                console.log(climaResultado);
               
                $("#resultado_clima_e_temperatura").html(climaResultado);

                // Logica 
                if(climaChuva !== 'Rain'){

                    if (temperatura < 5 && climaChuva !== 'Rain') {
                        tipoPokemon = 'ice';
                        
                    }

                    else if (temperatura >= 5 && temperatura < 10) {
                        tipoPokemon = 'water';
                    }

                    else if (temperatura >= 12 && temperatura < 15) {
                        tipoPokemon = 'grass';
                    }

                    else if (temperatura >= 15 && temperatura < 21) {
                        tipoPokemon = 'ground';
                    }

                    else if (temperatura >= 23 && temperatura < 27) {
                        tipoPokemon = 'bug';
                    }

                    else if (temperatura >= 27 && temperatura <= 33) {
                        tipoPokemon = 'rock';
                    }

                    else if (temperatura > 33) {
                        tipoPokemon = 'fire';
                    }

                    else {
                        tipoPokemon = 'normal';
                    }
                    
                } else{
                                                   
                        tipoPokemon = 'electric';
                    }
    
                if (data) {
                    $.ajax({
                        url: `https://pokeapi.co/api/v2/type/${tipoPokemon}`,
                        dataType: 'json',
                        type: 'GET',

                        success: function (data) {
                            console.log(data);
                            var arrayPokemons = data.pokemon;
                            var numeroAleatorio = Math.floor(Math.random() * (data.pokemon.length + 1));

                            var pokemonEscolhidoAleatorio = arrayPokemons[numeroAleatorio].pokemon.name;
                            var pokemonEscolhidoImg = arrayPokemons[numeroAleatorio].pokemon.url;

                            if(data){

                                    $.ajax({
                                        url: `${pokemonEscolhidoImg}`,
                                        dataType: 'json',
                                        type: 'GET',

                                        

                                        success: function (data) {

                                            var caminhoUrl = data.sprites.front_default;

                                            $("#nome_do_pokemon").html("Pokemon: <span id='nome_do_pokemon'>" + pokemonEscolhidoAleatorio + "</span>" + "<br>" + "Tipo: " + tipoPokemon);
                                           
                                            $("#div_img_do_pokemon").html("<img class='img-pokemon' src='" + caminhoUrl + "'>");

                                        }    
                                   
                                    });
                            }
                          
                        }

                    });
                }

            },

            error: function (error) {
                console.log(error);
                $("#div_principal_resultado").html(error.responseJSON.message);
            }

        });

    });

});
