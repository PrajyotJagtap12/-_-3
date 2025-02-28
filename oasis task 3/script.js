function convertTemperature() {
    let inputTemp = document.getElementById("tempInput").value;
    let unit = document.getElementById("unitSelect").value;
    let resultElement = document.getElementById("result");

    if (inputTemp === "") {
        resultElement.innerHTML = "Please enter a valid number.";
        return;
    }

    let temperature = parseFloat(inputTemp);
    let convertedTemp = "";

    switch (unit) {
        case "celsius":
            convertedTemp = `Fahrenheit: ${(temperature * 9/5 + 32).toFixed(2)}°F | Kelvin: ${(temperature + 273.15).toFixed(2)}K`;
            break;
        case "fahrenheit":
            convertedTemp = `Celsius: ${((temperature - 32) * 5/9).toFixed(2)}°C | Kelvin: ${(((temperature - 32) * 5/9) + 273.15).toFixed(2)}K`;
            break;
        case "kelvin":
            convertedTemp = `Celsius: ${(temperature - 273.15).toFixed(2)}°C | Fahrenheit: ${((temperature - 273.15) * 9/5 + 32).toFixed(2)}°F`;
            break;
    }

    resultElement.innerHTML = `Converted: ${convertedTemp}`;
}


function startVoiceRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = function () {
        document.getElementById("voiceButton").innerText = "🎙️ Listening...";
    };

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript;
        let numberExtracted = spokenText.match(/-?\d+(\.\d+)?/); // Extract positive/negative numbers & decimals

        if (numberExtracted) {
            document.getElementById("tempInput").value = numberExtracted[0];
        } else {
            alert("Could not recognize a valid temperature.");
        }

        document.getElementById("voiceButton").innerText = "🎤";
    };

    recognition.onerror = function () {
        alert("Voice recognition error. Try again.");
        document.getElementById("voiceButton").innerText = "🎤";
    };

    recognition.start();
}


document.getElementById("voiceButton").addEventListener("click", startVoiceRecognition);
