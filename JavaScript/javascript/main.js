if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('sw.js') //a adapter à l'url du code
    .then(() => { console.log('Service Worker Registered');});
}



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