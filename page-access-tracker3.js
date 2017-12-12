        if (localStorage.tracking) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            let accessed_page = {
                "visitor_id": `${localStorage.tracking}`,
                "access_date": `${new Date().toJSON()}`,
                "accessed_url": "www.examplo.com" //`${window.location.href}`
            };

            fetch('https://page-access-tracker.herokuapp.com/api/accessed_pages/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({ accessed_page })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }
        else {
            var myInit = { method: 'POST', cache: 'default' };
            fetch('https://page-access-tracker.herokuapp.com/api/visitors/', myInit).then(function (response) {
                return response.json();
            }).then(function (json) {
                localStorage.setItem("tracking", `${json.data.id}`);
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        }

        function registraContato(contact) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json")

            return fetch('https://page-access-tracker.herokuapp.com/api/contacts/', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({ contact })
            }).then(function (response) {
                return response.json();
            });
        }
