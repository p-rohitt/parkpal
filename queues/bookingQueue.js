// bookingQueue.js
const Queue = require('bull');
const { Booking } = require('../models/booking');

const bookingQueue = new Queue('bookingQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});


bookingQueue.process(async (job) => {
    const { bookingId } = job.data;
    const booking = await Booking.findById(bookingId).exec();
    if (booking && booking.status === 'active') {
        booking.status = 'expired';
        await booking.save();
        console.log(`Booking ${bookingId} has been expired.`);
    }
});

module.exports = bookingQueue;
