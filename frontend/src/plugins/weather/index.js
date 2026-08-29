

navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    const testURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(2)}&longitude=${long.toFixed(2)}&current=temperature_2m`;

    fetch(testURL)
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        });
});

