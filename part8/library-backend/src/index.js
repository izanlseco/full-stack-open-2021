const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')

const config =  require('./utils/config')

const { PubSub } = require('apollo-server')

const { connect } = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const pubsub = new PubSub()
  
console.log(`Connecting to ${config.MONGODB_URI}...`)

connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to mongoDB', error.message))

const JWT_SECRET = 'SUPER_SECRET_KEY'

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        console.log('%cindex.js line:89 args.genre, args.author', 'color: #007acc;', args.genre, args.author);
        const books = await Book.find({}).populate('author')
        return books
                .filter((b) => b.author.name === args.author)
                .filter((b) => b.genres.includes(args.genre))
      }

      if (args.genre) {
        const books = await Book.find({}).populate('author')
        return books.filter((b) => b.genres.includes(args.genre))
      }

      if (args.author) {
        const books = await Book.find({}).populate('author')
        return books.filter((b) => b.author.name === args.author)
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      authors.bookCount = authors.map(
        (a) => (a.bookCount = Book.collection.countDocuments({ author: a._id }))
      )
      return authors
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated!')
      }

      const authorFromDB = await Author.findOne({ name: args.author })
      const author = new Author({ name: args.author })
      const book = new Book({
        ...args,
        author: authorFromDB ? authorFromDB : author,
      })

      try {
        if (!authorFromDB) {
          await author.save()
        }
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated!')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre ? args.favouriteGenre : null,
      })

      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong credentials!')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
