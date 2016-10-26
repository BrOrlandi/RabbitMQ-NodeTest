var amqp = require('amqplib/callback_api');

// AMQP IP
amqp.connect('amqp://10.55.71.212', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(`Waiting for messages in ${q}. To exit press CTRL+C`);
    ch.consume(q, function (msg) {
        var json = JSON.parse(msg.content.toString());
        console.log("Received: ",json.msg);
        console.log("Value:",json.value);
        ch.ack(msg);
    })
  });
});
