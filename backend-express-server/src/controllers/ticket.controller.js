var uuid = require('uuid');

let ticket = [
    {
        ticket_id: "1",
        ticket_name: "UI Bug in Shopping Cart",
        ticket_description: "Users are experiencing issues with the shopping cart UI on mobile devices. The \"Remove Item\" button is not responsive, causing difficulty in managing cart items. This issue seems to occur on both iOS and Android platforms, primarily affecting users with screen resolutions of 720p and below. The expected behavior is for the button to be easily clickable and functional across all devices and screen sizes.",
    },
    {
        ticket_id: "2",
        ticket_name: "Payment Gateway Timeout Error",
        ticket_description: "There is a recurring timeout error when processing payments through our integrated payment gateway. Users report that the payment process fails to complete, displaying a \"Timeout Error\" message after several minutes. This problem appears to affect transactions during peak hours. The issue needs urgent investigation as it directly impacts sales and user experience. The goal is to ensure reliable and timely payment processing for all users, regardless of traffic volume.",
    },
]



exports.ticket = async (req, res) => {
    let result;

    let ticket_id
    let name
    let description

    // ensure empty string won't crash the server
    try {
        name = req.body.ticket_name;
        description = req.body.ticket_description;
    } catch (e) {
        console.log(e)
    }


    try {
        switch (req.method) {
            case "GET":
                ticket_id = req.params.ticketId;

                if (ticket_id === "all") {
                    break;

                } else {
                    // find ticket by ticket_id
                    result = ticket.find(ticket => ticket.ticket_id === ticket_id);

                    if (result === undefined) {
                        error(res, 404, "Not Found")
                        return 0;
                    }
                }
                break;


            case "PUT":
                if (name === undefined || description === undefined) {
                    error(res, 405, "Invalid input")
                    return 0;
                }

                ticket.push({
                    ticket_id: uuid.v4(),
                    ticket_name: name,
                    ticket_description: description,
                })

                break;


            case "POST":
                ticket_id = req.body.ticket_id;

                if (ticket_id === undefined || (name === undefined && description === undefined)) {
                    error(res, 405, "Invalid input")
                    return 0;
                }

                // find ticket by ticket_id and update ticket_name and ticket_description
                const mapResult = ticket.some((ticket) => {
                    if (ticket.ticket_id === ticket_id) {
                        ticket.ticket_name = name;
                        ticket.ticket_description = description;

                        return true;
                    }
                });

                // if not ture, means not found, return 404
                if (!mapResult) {
                    error(res, 404, "Not Found")
                    return 0;
                }

                break;

            case "DELETE":
                ticket_id = req.params.ticketId;

                // find index
                const index = ticket.findIndex(ticket => ticket.ticket_id === ticket_id)

                // not found, return 404
                if (index === -1) {
                    error(res, 404, "Not Found")
                    return 0;
                }

                // slice and concat
                ticket = ticket.slice(0, index).concat(ticket.slice(index + 1, ticket.length))

                break;

        }

        if (result === undefined) {
            result = ticket;
        }

        res.json(result);


    } catch (e) { // scalable for different error types
        error(res, 500, "Error")
        console.log(e)
    }

}


function error(res, code, msg){
    res.status(code).send(msg);
}