
var TempIn = [];
var TempEx = [];
var valeursrandom = false;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function checkCheckbox()
{
    var checkBox = document.querySelector('#buttonValeurs');
    if (checkBox.checked)
    {
        valeursrandom = true;
    }
    else
    {
        valeursrandom = false;
    }
    console.log("val" + valeursrandom);
}
/*
if (document.getElementById('buttonswitch').clicked == true)
{
    valeursrandom = !valeursrandom;
    console.log(valeursrandom);
}
*/
function GetValeursCapteurs()
{
    if (valeursrandom)
    {
        tabValRandom = [];
        tabValRandom.push(getRandomArbitrary(-5, 55));
        tabValRandom.push(getRandomArbitrary(-5, 40));
        var compteur = 0;
        var intervaltemp = setInterval (function() {


            //Capteur intérieur
            var tempin = document.getElementById("tempin");
            tempin.innerHTML = tabValRandom[0];
            UpdateIn(tabValRandom[0]);
            var typein = document.getElementById("typein");
            typein.innerHTML = "Simulateur";
                        

            //Capteur extérieur
            var tempex = document.getElementById("tempex");
            tempex.innerHTML = tabValRandom[1];
            var typeex = document.getElementById("typeex");
            typeex.innerHTML = "Simulateur";
            UpdateEx(tabValRandom[1]);

            CalcTempMinMax();
            Alerte(tabValRandom[0], tabValRandom[1]);
            updateTabHours(compteur);
            chart.update();
            compteur = compteur + 1; 

            tabValRandom.shift();
            tabValRandom.shift();
            tabValRandom.push(getRandomArbitrary(-5, 55));
            tabValRandom.push(getRandomArbitrary(-5, 40));
            checkCheckbox();
            if (valeursrandom == false)
            {
                clearInterval(intervaltemp);
                GetValeursCapteurs();
            }
            }, 5000)
            
            
    }
    else
    {
        var socket = new WebSocket("wss://ws.hothothot.dog:9502");
        socket.onopen = function(event) {
            console.log("Connexion établie");
            socket.send("coucou !");
        }
        //Envoi d'un message au serveur (obligatoire)
                
            var intervaltemp = setInterval (function() {
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
                        Alerte(eventData.capteurs[1].Valeur, eventData.capteurs[0].Valeur);
                        updateTabHours(compteur);
                        chart.update();
                        compteur = compteur + 1; 
                        checkCheckbox();
                        if (valeursrandom == true)
                        {
                            clearInterval(intervaltemp);
                            GetValeursCapteurs();
                        }
                    }
                    
                }
            }, 5000)
            var compteur = 0;
            //socket.onerror = function(event) {
                fetch('https://hothothot.dog/api/capteurs').then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);

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
                        Alerte(eventData.capteurs[1].Valeur, eventData.capteurs[0].Valeur);
                        updateTabHours(compteur);
                        chart.update();
                        compteur = compteur + 1;
                        checkCheckbox();
                        if (valeursrandom == true)
                        {
                            clearInterval(intervaltemp);
                            GetValeursCapteurs();
                        }
                    },5000)
                }).catch(function (err) {
                    console.warn('Something went wrong.', err);
                });
            //}
    }
}

    //fonction qui se charge de calculer le min et le max des capteurs intérieurs et extérieurs et de les afficher
    function CalcTempMinMax ()
    {
        var MinInt = CalcMinInt();
        var MaxInt = CalcMaxInt();
        var MinEx = CalcMinEx();
        var MaxEx = CalcMaxEx();
        
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

    function CalcMinEx()
    {
        var MinEx = 1000;
        for (var index = 0; index < TempEx.length; ++index)
        {
            if (TempEx[index] < MinEx)
                MinEx = TempEx[index];
        }
        return MinEx;
    }

    function CalcMaxEx()
    {
        var MaxEx = -1000;
        for (var index = 0; index < TempEx.length; ++index)
        {
            if (TempEx[index] > MaxEx)
                MaxEx = TempEx[index];
        }
        return MaxEx;
    }

    function CalcMinInt()
    {
        var MinInt = 1000;
        for (var index = 0; index < TempIn.length; ++index)
        {
            if (TempIn[index] < MinInt)
                MinInt = TempIn[index];
        }
        return MinInt;
    }

    function CalcMaxInt()
    {
        var MaxInt = -1000;
        for (var index = 0; index < TempIn.length; ++index)
        {
            if (TempIn[index] > MaxInt)
                MaxInt = TempIn[index];
        }
        return MaxInt;
    }

function UpdateIn(temp)
{
    TempIn.push(temp);
    //On s'interesse que aux 24 dernières heures donc on garde le tableau à cette grandeur
    if (TempIn.length > 24)
    {
        TempIn.shift();
    }
}

function UpdateEx(temp)
{
    TempEx.push(temp);
    //On s'interesse que aux 24 dernières heures donc on garde le tableau à cette grandeur
    if (TempEx.length > 24)
    {
        TempEx.shift();
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------
//Les notifications
// ---------------------------------------------------------------------------------------------------------------------------------

function alerter (msg)
{
    if (Notification.permission !== "granted") 
    { 
        return; 
    }
    new Notification ("HotHotHot", {
        body: msg,
        icon: "../img/logowhite.png"
    });
}

function Alerte (tempex, tempint)
{
    if (tempex > 35)
    {
        alerter("Il fait " + tempex + " degrées.\n Hot Hot Hot !");
    }
    else if (tempex < 0)
    {
        alerter("Il fait " + tempex + " degrées.\nBanquise en vue !");
    }

    if (tempint > 22)
    {
        if (tempint > 55)
        {
            alerter("Il fait " + tempint + " degrées.\nAppelez les pompiers ou arrêtez votre barbecue !");
        }
        else
        {
            alerter("Il fait " + tempint + " degrées.\nBaissez le chauffage !");
        }
    }
    else if (tempint < 12)
    {
        if (tempint < 0)
        {
            alerter("Il fait " + tempint + " degrées.\nCanalisation gelées, appelez SOS plombier et mettez un bonnet !");
        }
        else
        {
            alerter("Il fait " + tempint + " degrées.\nMontez le chauffage ou mettez un gros pull !");
        }
    }

}

// ---------------------------------------------------------------------------------------------------------------------------------
//Le graphique (via charts.js)
// ---------------------------------------------------------------------------------------------------------------------------------
const ctx = document.getElementById('myChart').getContext('2d');
tabHours = ['00H', '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H'];
const chart = new Chart(ctx, {
    type: "line",
    data: {
        datasets: [{
            label: 'CapteurExterieur',
            borderColor: "#ffe600",
            data: TempEx,
            fill: false,
            lineTension: 0,
            radius: 5
        }, {
            label: 'CapteurInterieur',
            borderColor: "#3281e9",
            data: TempIn,
            fill: false,
            lineTension: 0,
            radius: 5
        }],
        labels: tabHours

    },
    options: {
        plugins: {
            title: {
                position: "top",
                text: "Historique des capteurs",
                display: 'true',
                fontSize: 20,
                fontColor: "#111"
            },          
        },
        responsive: 'true',
    }    
});

function updateTabHours(index)
{
    if (index >= 24)
    {
        value = tabHours[0];
        tabHours.shift();
        tabHours.push(value);
        console.log(tabHours);
    }
    
}

// ---------------------------------------------------------------------------------------------------------------------------------
GetValeursCapteurs();