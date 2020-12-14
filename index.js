const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
// Functions for queries
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');



// ApolloServer init
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// DB Connection and run server
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        server.listen({port: 5000});
    })
    .then(res => console.log(`Server running at 5000`));
