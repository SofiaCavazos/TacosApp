$(function(){
    var tacosDB = firebase.database().ref('/usuarios');
    //para que se actualice la informacion en cuanto algo pase.
    tacosDB.on('value', function(data){
        console.log("value", data.key, data.val());
        var usuarios = data.val();
        $.get("views/_tbTacos.html", function(template)
             {
            $("#rolTable-content").handlebars(template,usuarios);
        });

    });
    //solo cuando algo cambia.
    tacosDB.on("child_changed", function(data){
        console.log("child_changed",data.key, data.val());
    });
});
function nuevoUsuario(userId, nombre, foto, fecha, listo){
    
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    
    var config = {
        quality: (device.platform !== 'Android') ? 10 : 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: (device.platform !== 'Android') ? 150 : 750
    };
    
    $(".tacoContainer>img").on("click",function(){
        getPicture({
            config: config,
            onSuccess: function(imageData) {
                $("#NewImg").attr("src", "data:image/jpeg;base64," + imageData)
            },
            onFail: function(message) {
                alert(message);
            }
        });
    })
 
    function getPicture(d){
    navigator.camera.getPicture(d.onSuccess, d.onFail, d.config);
}
    
}


