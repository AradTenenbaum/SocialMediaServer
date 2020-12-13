const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const {MONGODB} = require('./config.js');

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        server.listen({port: 5000});
    })
    .then(res => console.log(`Server running at 5000`));
