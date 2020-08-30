const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket(req, res) {
    res.render('tickets/new', {
        flightID: req.params.id,
        title: 'Add Ticket'
    })
}

function create(req, res) {
    let ticketObj = {
      flight: req.params.id,
      seat: req.body.seat,
      price: req.body.price
    }
    const newTicket = new Ticket(ticketObj);
    newTicket.save(function(err) {
        if (err) {
            console.log(err);
            res.render('tickets/new', {
                flightID: req.params.id,
                title: 'Add Ticket'
            })
        } else {
            res.redirect(`/flights/${req.params.id}`)
        }
    })
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err) {
        res.redirect('/flights')
    })
}
