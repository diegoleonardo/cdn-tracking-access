var connection = new WebSocket('ws://user-tracking-app.herokuapp.com/socket/websocket');
        
        // When the connection is open, send some data to the server
        connection.onopen = function () {
           
            connection.send('{"topic":"room:tracking","ref":"1","payload":{},"event":"phx_join"}');
            
            if(localStorage.tracking){
                connection.send(`{"topic":"room:tracking","ref":"","payload":{"id":${localStorage.tracking},"url": "${window.location.href}", "accessDate": "${new Date().toJSON()}"},"event":"tracking_suspect"}`);
            }else{
                connection.send(`{"topic":"room:tracking","ref":"","payload":{"url": "${window.location.href}", "accessDate": "${new Date().toJSON()}"},"event":"tracking_suspect"}`);
            }
        };

        // Log errors
        connection.onerror = function (error) {
            console.log('WebSocket Error ' + error);
        };

        // Log messages from the server
        connection.onmessage = function (e) {
            json = JSON.parse(e.data)
            
            if(json.payload.response.id){
                if(!localStorage.tracking){
                    localStorage.setItem("tracking", `${json.payload.response.id}`);
                }
            }
            console.log(e.data)
        };
