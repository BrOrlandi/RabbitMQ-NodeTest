var amqp = require('amqplib/callback_api');


var msg = process.argv.slice(2).join(' ') || "Hello World!";

// AMQP IP
amqp.connect('amqp://10.55.71.212/', function(err, conn) {
    if(err){
        console.error(err);
        return ;
    }

    conn.createChannel(function(err, ch) {
        var q = 'hello';
        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, Buffer.from(JSON.stringify({msg: msg, value: 42})),{persistent: false});
        console.log("Message sent");

        setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});
