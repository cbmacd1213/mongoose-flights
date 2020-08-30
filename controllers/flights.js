const Flight = require('../models/flight');
const Ticket = require('../models/ticket')


module.exports = {
  index,
  show,
  new: newFlight,
  create,
  edit,
  update,
  delete: deleteFlight
};

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', { title: 'All Flights', flights });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    Ticket.find({flight: flight._id}, function(err, tickets) {
     res.render('flights/show', { title: 'Flight Detail', flight, tickets });
  });
});
}

function newFlight(req, res) {
  res.render('flights/new', { title: 'Add Flight' });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) { return res.redirect('/flights/new');
    // console.log(flight);
  }
    res.redirect('/flights');
  });
}

function edit(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
      if (err) {
          res.redirect(`/flights/${req.params.id}`)
      }
      res.render('flights/edit', { flight, title: 'Edit Flight', flightDeparts: flight.departs.toISOString().slice(0, 16)})
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, flight) {
      if (err) {
          res.render('flights/edit', { flight, title: 'Edit Flight', flightDeparts: flight.departs.toISOString().slice(0, 16) })
      }
      res.redirect(`flights`)
  })
}
function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err) {
      Ticket.remove({flight: req.params.id}, function(err) {
          res.redirect('/flights');
      });
  });
}