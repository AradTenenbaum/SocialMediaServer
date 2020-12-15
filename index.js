const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
// Functions for queries
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');

const pubsub = new PubSub();

// ApolloServer init
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

// DB Connection and run server
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        server.listen({port: 5000});
    })
    .then(res => console.log(`Server running at 5000`));
