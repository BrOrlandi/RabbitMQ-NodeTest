var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(`Waiting for messages in ${q}. To exit press CTRL+C`);
    ch.consume(q, function (msg) {
        var json = JSON.parse(msg.content.toString());
        console.log("Received: ",json.msg);
        console.log("Value:",json.value);
    })
  });
});
