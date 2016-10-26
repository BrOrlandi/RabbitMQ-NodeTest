var amqp = require('amqplib/callback_api');

// AMQP IP
amqp.connect('amqp://localhost/', function(err, conn) {
    if(err){
        console.error(err);
        return ;
    }

    conn.createChannel(function(err, ch) {
        var q = 'hello';
        ch.assertQueue(q, {durable: false});
        ch.sendToQueue(q, Buffer.from(JSON.stringify({msg: 'Hello World!', value: 42})));
        console.log("Message sent");

        setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});
