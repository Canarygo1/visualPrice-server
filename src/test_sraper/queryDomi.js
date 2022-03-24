
const prueba = async () => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%2B16502530000&inputtype=phonenumber&key=AIzaSyAvAwIWEWhKWgO2-SU2Xrt-ves1FxWCOuE',
        headers: { }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });


}
prueba();
