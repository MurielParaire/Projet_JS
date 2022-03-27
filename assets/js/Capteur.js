
var TempIn = [];
var TempEx = [];

/*
var socket = new WebSocket("wss://ws.hothothot.dog:9502");
    socket.onopen = function(event) {
        console.log("Connexion établie");
        
        //Envoi d'un message au serveur (obligatoire)
        socket.send("coucou !");
        var intervaltemp = setInterval (function() {
            // au retour...
            socket.onmessage = function(event) {
                var datas = document.getElementById("datas");
                datas.innerHTML = event.data;
                console.log(event);
                var tempin = document.getElementById("tempin");
                tempin.innerHTML = "AAAh";
            }
        }, 5000)
    } 
    socket.onerror = function(event) {*/
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
            if (TempIn[index] < MaxInt)
                MaxInt = TempIn[index];
        }

        //Parcouris tableau pour trouver les bonnes valeurs
        for (var index = 0; index < TempEx.length; ++index)
        {
            if (TempEx[index] < MinEx)
                MinEx = TempEx[index];
            if (TempEx[index] < MaxEx)
                MaxEx = TempEx[index];
        }

        //Capteur intérieur HTML
        var tempminin = document.getElementById("tempminin");
        tempminin.innerHTML = MinInt;
        var tempmaxin = document.getElementById("tempmaxin");
        tempmaxin.innerHTML = MaxInt;

        //Capteur extérieur HTML
        var tempminex = document.getElementById("tempminex");
        tempminex.innerHTML = MinEx;
        var tempmaxex = document.getElementById("tempmaxex");
        tempmaxex.innerHTML = MaxEx;
    }

UpdateIn(temp)
{
    TempIn.push(temp);
    //On s'interesse que aux 24 dernières heures donc on garde le tableau à cette grandeur
    if (TempIn.length > 24)
    {
        TempInMax.pop();
    }
}

UpdateEx(temp)
{
    TempEx.push(temp);
    TempEx.push(temp);
    //On s'interesse que aux 24 dernières heures donc on garde le tableau à cette grandeur
    if (TempEx.length > 24)
    {
        TempEx.pop();
    }
}