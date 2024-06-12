var uuid = require('uuid');
// var ticket = require('../data/ticket');

let ticket = [
    {
        ticket_id: "1",
        ticket_name: "ticket_name",
        ticket_description: "ticket_description",
    },
    {
        ticket_id: "2",
        ticket_name: "ticket_name",
        ticket_description: "ticket_description",
    },
]


exports.ticket = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":

                break;


            case "PUT":

                break;


            case "POST":

                break;

            case "DELETE":

                break;

        }


        res.json(ticket);


    } catch (e) { // scalable for different error types
        res.status(500).send("Error");
        console.log(e)
    }

}
