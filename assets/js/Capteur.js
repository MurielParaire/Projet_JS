
var TempIn = [];
var TempEx = [];

/*
var socket = new WebSocket("wss://ws.hothothot.dog:9502");
socket.onopen = function(event) {
    console.log("Connexion établie");
    socket.send("coucou !");
}
//Envoi d'un message au serveur (obligatoire)
        
    //var intervaltemp = setInterval (function() {
    // au retour...
        socket.onmessage = function(event) {
            if (event == null || event == undefined)
            {
                console.log("Pas de retour du serveur.");
            }
            else 
            {
                eventData = event.data;
                console.log("wss");
                console.log(eventData.HotHotHot);

                //Capteur intérieur
                var tempin = document.getElementById("tempin");
                tempin.innerHTML = eventData.capteurs[0].Valeur;
                UpdateIn(eventData.capteurs[0].Valeur);
                var typein = document.getElementById("typein");
                typein.innerHTML = eventData.capteurs[0].type;
                

                //Capteur extérieur
                var tempex = document.getElementById("tempex");
                tempin.innerHTML = eventData.capteurs[1].Valeur;
                var typeex = document.getElementById("typeex");
                typein.innerHTML = eventData.capteurs[1].type;
                UpdateEx(eventData.capteurs[1].Valeur);

                CalcTempMinMax();  
            }
            
        }
    //}, 5000) */
     
    //socket.onerror = function(event) {
        fetch('https://hothothot.dog/api/capteurs').then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            console.log("allo");

            var eventData = data;

            var intervaltemp = setInterval (function() {
                console.log(eventData.HotHotHot);

                //Capteur intérieur
                var tempin = document.getElementById("tempin");
                tempin.innerHTML = eventData.capteurs[0].Valeur + " °C";
                UpdateIn(eventData.capteurs[0].Valeur);
                var typein = document.getElementById("typein");
                typein.innerHTML = eventData.capteurs[0].type;
                

                //Capteur extérieur
                var tempex = document.getElementById("tempex");
                tempex.innerHTML = eventData.capteurs[1].Valeur + " °C";
                var typeex = document.getElementById("typeex");
                typeex.innerHTML = eventData.capteurs[1].type;
                UpdateEx(eventData.capteurs[1].Valeur);

                CalcTempMinMax();
                alerter(eventData.capteurs[1].Valeur, eventData.capteurs[0].Valeur);
            },5000)
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
    //}

    //fonction qui se charge de calculer le min et le max des capteurs intérieurs et extérieurs et de les afficher
    function CalcTempMinMax ()
    {
        var MinInt = 1000;
        var MaxInt = -1000;
        var MinEx = 1000;
        var MaxEx = -1000;
        

        //Parcouris tableau pour trouver les bonnes valeurs
        for (var index = 0; index < TempIn.length; ++index)
        {
            if (TempIn[index] < MinInt)
                MinInt = TempIn[index];
            if (TempIn[index] > MaxInt)
                MaxInt = TempIn[index];
        }

        //Parcouris tableau pour trouver les bonnes valeurs
        for (var index = 0; index < TempEx.length; ++index)
        {
            if (TempEx[index] < MinEx)
                MinEx = TempEx[index];
            if (TempEx[index] > MaxEx)
                MaxEx = TempEx[index];
        }

        //Capteur intérieur HTML
        var tempminin = document.getElementById("tempminin");
        tempminin.innerHTML = MinInt + " °C";
        var tempmaxin = document.getElementById("tempmaxin");
        tempmaxin.innerHTML = MaxInt + " °C";

        //Capteur extérieur HTML
        var tempminex = document.getElementById("tempminex");
        tempminex.innerHTML = MinEx + " °C";
        var tempmaxex = document.getElementById("tempmaxex");
        tempmaxex.innerHTML = MaxEx + " °C";
    }

function UpdateIn(temp)
{
    TempIn.push(temp);
    //On s'interesse que aux 24 dernières heures donc on garde le tableau à cette grandeur
    if (TempIn.length > 24)
    {
        TempIn.pop();
    }
}

function UpdateEx(temp)
{
    TempEx.push(temp);
    TempEx.push(temp);
    //On s'interesse que aux 24 dernières heures donc on garde le tableau à cette grandeur
    if (TempEx.length > 24)
    {
        TempEx.pop();
    }
}

function alerter (msg)
{
    new Notification ("HotHotHot", {
        body: msg,
        icon: "../img/pwa-icon.png"
    });
}

function Alerte (tempext, tempint)
{
    if (tempex > 20)
    {
        alerter("Hot Hot Hot !");
    }
    else if (tempex < 0)
    {
        alerter("Banquise en vue !");
    }

    if (tempint > 10)
    {
        if (tempint > 15)
        {
            alerter("Appelez les pompiers ou arrêtez votre barbecue !");
        }
        else
        {
            alerter("Baissez le chauffage !");
        }
    }
    else if (tempint < 12)
    {
        if (tempint < 0)
        {
            alerter("Canalisation gelées, appelez SOS plombier et mettez un bonnet !");
        }
        else
        {
            alerter("Montez le chauffage ou mettez un gros pull !");
        }
    }

}