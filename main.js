function getCountry(event) {
    event.preventDefault()
    let country = document.getElementById("userInput").value;
    let info = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    let timerInterval;

    Swal.fire({
        title: 'FETCHING!',
        html: `Fetching ${country}'s info in <b></b> milliseconds`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            let b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then(async() => {
        const response = await fetch(info);
        return await response.json(); // Fetch and parse JSON
    }).then((data) => {
        let resp = data[0];
        try {
            // console.log(resp)
            let countryFlag = resp.flags.svg;
            let countryName = resp.name.common;
            let countryOfficialName = resp.name.official;
            let countryCapital = resp.capital ? Object.values(resp.capital) : "Has No Capital";
            let countryTotalArea = resp.area;
            let countryTotalPopulation = resp.population;
            let language = Object.values(resp.languages);
            let countryLanguage = ""
            let countryRegion = resp.region;
            let countryMap = resp.maps.googleMaps;
            let countryCurrencies = Object.keys(resp.currencies);
            let timeZone = Object.values(resp.timezones);
            let countryTimeZone = ""
            let borders = resp.borders;
            let countryBorders = ""

            for (let i = 0; i < borders.length; i++) {
                countryBorders += `${borders[i]}, `
            }

            for (let i = 0; i < timeZone.length; i++) {
                countryTimeZone += `${timeZone[i]}, `
            }

            for (let i = 0; i < language.length; i++) {
                countryLanguage += `${language[i]}, `
            }

            document.querySelector(".result").classList.remove('hidden')
            document.querySelector(".inst").classList.add('hidden')
            document.getElementById("flag").src = countryFlag;
            document.getElementById("name").innerHTML = countryName;
            document.getElementById("official").innerHTML = countryOfficialName;
            document.getElementById("capital").innerHTML = countryCapital;
            document.getElementById("total").innerHTML = countryTotalArea;
            document.getElementById("population").innerHTML = countryTotalPopulation;
            document.getElementById("lang").innerHTML = countryLanguage;
            document.getElementById("region").innerHTML = countryRegion;
            document.getElementById("map").href = countryMap;
            document.getElementById("currency").innerHTML = countryCurrencies;
            document.getElementById("timezone").innerHTML = countryTimeZone;
            document.getElementById("borders").innerHTML = countryBorders;
            return
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid country name',
                confirmButtonColor: "#232323"
            });
        }
    }).catch(error => {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Can't fetch data`,
            confirmButtonColor: "#232323"
        });
    });
    document.getElementById("userInput").value = ""
}