var socket = new WebSocket("wss://ws.hothothot.dog:9502");
    socket.onopen = function(event) {
        console.log("Connexion établie");

        //On indique sur notre page web que la connexion est établie
        let label = document.getElementById("status");
        label.innerHTML = "Connexion établie";

        var intervaltemp = setInterval (function() {
            //Envoi d'un message au serveur (obligatoire)
            socket.send("coucou !");

            // au retour...
            socket.onmessage = function(event) {
                var datas = document.getElementById("datas");
                datas.innerHTML = event.data;
                console.log(event);
            }
        }, 5000)

    } 
    socket.onerror = function(event) {
        fetch('https://hothothot.dog/api/capteurs').then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            //On indique sur notre page web que la connexion est établie
            let label = document.getElementById("status");
            label.innerHTML = "Connexion établie";

            var eventData = data;

            var intervaltemp = setInterval (function() {
                console.log(eventData.HotHotHot);

                console.log(eventData.capteurs[0].type);
                console.log(eventData.capteurs[0].Nom);
                console.log(eventData.capteurs[0].Valeur);
                console.log(eventData.capteurs[0].Timestamp);

                console.log(eventData.capteurs[1].type);
                console.log(eventData.capteurs[1].Nom);
                console.log(eventData.capteurs[1].Valeur);
                console.log(eventData.capteurs[1].Timestamp);

                var datas = document.getElementById("datas");
                datas.innerHTML = eventData.capteur[0].Valeur;
            },5000)
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
    }

    var A_temperatures = [];
                    
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [{
                label: 'CapteurExterieur',
                borderColor: "#ffe600",
                data: A_temperatures,
                fill: false,
                lineTension: 0,
                radius: 5
            }, {
                label: 'CapteurInterieur',
                borderColor: "#3281e9",
                data: [45, 12, 28, 17, 33, 36, 40, 21, 32, 8, 11, 15, 19, 27, 39, 41, 44],
                fill: false,
                lineTension: 0,
                radius: 5
            }],
            labels: ['00H', '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H']

        },
        options: {
            layout: {
                padding: 20,
            },
            scales: {
                    y: [{
                      title: {
                        display: 'true',
                        text: "Température"
                      }
                 }]
            },    
            plugins: {
                title: {
                    position: "top",
                    text: "Historique des capteurs",
                    display: 'true',
                    fontSize: 18,
                    fontColor: "#111"
                },          
            },
            responsive: 'true',
        }    
    });

    // ---------------------------------------------------------------------------------------------------------------------------------
    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    function removeData(chart) {
        chart.data.labels.shift();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
        chart.update();
    }

    function updateLabels(index) {
        var tab = ['00H', '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H']
        for (let i = 0; i < index; ++i) {
            tab.push(tab[i]);
            tab.shift(tab[i]);
        }
    }

    (function () {



        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        //
        // On renvoie un nombre aléatoire entre une valeur min (incluse)
        // et une valeur max (exclue)
        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        var min = 10000;
        var max = 0;

        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array

        for (var i = 24; i > 0; --i) {
            var x = getRandomArbitrary(-10, 40);
            A_temperatures.push(x);
            if (x < min) min = x;
            if (x > max) max = x;

        }

        console.log("Min : " + min);
        console.log("Max : " + max);

        console.log(A_temperatures);

        var Data = [];

        // https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model
        // https://developer.mozilla.org/fr/docs/Web/API/Node
        // https://developer.mozilla.org/fr/docs/Web/API/Element
        var p_temperature = document.getElementById('p_temperature');
        var section = p_temperature.parentNode;
        var span_temperature = document.getElementById('span_temperature');
        var i = 0;
        // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        var interval = setInterval(function () {
            if (i < A_temperatures.length) {
                if (document.getElementById('titre_message'))
                    document.getElementById('titre_message').remove();

                let I_temperature = A_temperatures[i];

                let color = 'blue';
                if (0 < I_temperature && I_temperature <= 20) {
                    color = 'green';
                }
                else if (20 < I_temperature && I_temperature <= 30) {
                    color = 'orange';
                }
                else if (30 < I_temperature && I_temperature <= 40) {
                    color = 'red';
                }

                addData(myChart, 'CapteurInt', A_temperatures[i]);
                removeData(myChart);
                updateLabels(i);
                ++i;
                span_temperature.setAttribute("class", color);
                span_temperature.innerText = I_temperature;

                let titre_message = document.createElement("h4")
                titre_message.setAttribute('id', 'titre_message');
                if (I_temperature < 0) {
                    titre_message.innerText = 'Il fait froid';
                }
                else if (30 < I_temperature) {
                    titre_message.innerText = 'Il fait chaud';
                }
                // https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
                section.insertBefore(titre_message, p_temperature);

                let clone_historique_ligne = document.getElementById("ligne_modele").cloneNode(true);
                clone_historique_ligne.setAttribute("id", "");
                clone_historique_ligne.querySelector(".td_date").innerText = Date().toString();
                clone_historique_ligne.querySelector(".td_temperature").innerText = I_temperature;
                clone_historique_ligne.style.display = "table-row";
                let table_tbody = document.querySelector("table tbody");
                // https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
                table_tbody.insertBefore(clone_historique_ligne, table_tbody.querySelector("#ligne_modele").nextSibling);

            } else {
                clearInterval(interval);
                interval = null;
            }




        }, 2000)

    }());    
