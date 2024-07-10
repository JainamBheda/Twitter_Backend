const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { DbConfig } = require('./config');
const { TweetRepository, HashtagRepository } = require('./repositories');
const app = express();

const tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();

// Middleware to parse the incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server and connect to the database
app.listen(ServerConfig.PORT, async () => {
    try {
        console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
        await DbConfig.connectDb();
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('Error starting server:', error);
    }

    // Uncomment and use the following CRUD operations as needed

    // Create tweet
    // const response = await tweetRepository.create({
    //     content: 'new tweet',
    //     likes: 100,
    //     noOfRetweets: 1,
    //     comment: 'ad'
    // });
    // console.log(response);

    // Create hashtag
    // const response = await hashtagRepository.create({
    //     text: 'travel',
    //     tweets: ['666d201c14f869ee0427135b']
    // });
    // console.log(response);

    // Get all tweets
    // const response = await tweetRepository.get();
    // console.log(response);

    // Get tweet by id
    // const response = await tweetRepository.get('666d2496216238052da86e97');
    // console.log(response);

    // Delete tweet by id
    // const response = await tweetRepository.delete('666d2496216238052da86e97');
    // console.log(response);
});
