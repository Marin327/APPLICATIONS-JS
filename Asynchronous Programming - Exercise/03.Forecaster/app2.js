function attachEvents() {
    const locationsUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const todayUrl = 'http://localhost:3030/jsonstore/forecaster/today/';
    const upcomingUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/';
    const conditionSymbols = {
        Sunny: '\u2600', // ☀
        'Partly sunny': '\u26C5', // ⛅
        Overcast: '\u2601', // ☁
        Rain: '\u2614'// ☂
    }

    const forcastEelement = document.getElementById('forecast');

    function readResponse(respose) {
        if (!respose.ok) throw new Error("Error");
        return respose.json();
    }

    function fillTodayData(data) {
        let forecast = document.querySelector('div.forecast');
        if (forecast) {
            forecast.remove()
        }
        forecast = ce('div', {className: 'forecasts'},
            ce('span', {className: 'condition symbol'}, conditionSymbols[data.forecast.condition]),
            ce('span', {className: 'condition'},
                ce('span', {className: 'forecast-data'}, data.name),
                ce('span', {className: 'forecast-data'}, `${data.forecast.low}°/${data.forecast.high}°`),
                ce('span', {className: 'forecast-data'}, data.forecast.condition)));

        document.getElementById('current')
            .appendChild(forecast);

        forcastEelement.style.display = 'block'
    }

    function fillUpcomingData(data) {
        let forecastInfo = document.querySelector('div.forecast-info');
        if (forecastInfo) {
            forecastInfo.remove()
        }
        forecastInfo = ce('div', {className: 'forecast-info'},
            data.forecast.map(day =>
                    ce('span', {className: 'upcoming'},
                        ce('span', {className: 'symbol'}, conditionSymbols[day.condition]),
                        ce('span', {className: 'forecast-data'}, `${day.low}°/${day.high}°`),
                        ce('span', {className: 'forecast-data'}, day.condition)))
            );


        document.getElementById('upcoming')
            .appendChild(forecastInfo);

        forcastEelement.style.display = 'block'
    }

    function getDataFor(locationName) {
        fetch(locationsUrl)
            .then(readResponse)
            .then(location => {
                    const locationCode = location.find(x => x.name === locationName).code;
                    fetch(todayUrl + locationCode)
                        .then(readResponse)
                        .then(fillTodayData);
                    fetch(upcomingUrl + locationCode)
                        .then(readResponse)
                        .then(fillUpcomingData);
                }
            )
        return undefined;
    }

    function submitHandle() {
        const locationName = document.getElementById('location').value;
        const data = getDataFor(locationName);
    }

    document.getElementById('submit')
        .addEventListener('click', submitHandle);
}

attachEvents();

function ce(type, attributes, ...content) {
    const result = document.createElement(type);

    Object.entries(attributes || {})
        .forEach(([attribute, value]) => {
            if (isEventListener(attribute)) {
                result.addEventListener(attribute.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attribute] = value;
            }
        });

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (isElement(e)) {
            result.appendChild(e);
        } else {
            const node = document.createTextNode(e);
            result.appendChild(node);
        }
    });

    return result;

    function isEventListener(attr) {
        return attr.substring(0, 2).localeCompare('on') === 0;
    }

    function isElement(element) {
        return typeof element != 'string' && typeof element != 'number';
    }
}