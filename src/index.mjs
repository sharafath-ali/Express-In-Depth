import express from 'express'

const app = express()

app.use(express.json());

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "adam", displayName: "Adam" },
  { id: 4, username: "tina", displayName: "Tina" },
  { id: 5, username: "jason", displayName: "Jason" },
  { id: 6, username: "henry", displayName: "Henry" },
  { id: 7, username: "marilyn", displayName: "Marilyn" },
];

app.get('/', (request, response) => {
  response.status(200).send({ mes: 'hello' })
})

// app.put('/api/users/:id', (req, res) => {
//   const { body, params } = req
//   console.log(params.id)
//   if (!isNaN(parseInt(params.id))) {
//    const UserIndex = mockUsers.findIndex(e => e.id === parseInt(params.id))
//     if (UserIndex !== -1) {
//       mockUsers[UserIndex] = { id: parseInt(params.id, 10), ...body }
//       res.json(mockUsers)
//     } else {
//       res.send('user not found')
//     }
//   } else {
//     res.status(400).send('no user found')
//   }
// })

app.put('/api/users/:id', (req, res) => {
  const { body, params } = req;
  const userId = parseInt(params.id, 10);

  // Check if id is a valid number and matches the original string
  if (!isNaN(userId) && params.id === userId.toString()) {
    const userIndex = mockUsers.findIndex(e => e.id === userId);

    if (userIndex !== -1) {
      mockUsers[userIndex] = { id: userId, ...body };
      res.json(mockUsers);
    } else {
      res.status(404).send('User not found');
    }
  } else {
    res.status(400).send('Invalid user ID');
  }
});


app.get('/api/users/:id', (req, res) => {
  console.log('Received request with params:', req.params);
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    console.log('Invalid user ID:', req.params.id);
    return res.status(400).send({ message: 'Invalid user ID' });
  }

  const user = mockUsers.find(e => e.id === userId);

  if (user) {
    console.log('User found:', user);
    res.send(user);
  } else {
    console.log('User not found with ID:', userId);
    res.status(404).send({ message: 'User not found' });
  }
});


app.get('/api/users', (req, res) => {
  //http://localhost:3000/api/users?filter=username&value=a
  console.log(req.query)
  const { query: { filter, value } } = req;
  if (filter && value) {
    res.send(mockUsers.filter(e => e[filter].includes(value)))
  } else {
    res.send(mockUsers)
  }
})

app.post('/api/users', (req, res) => {
  const { body } = req;
  const user = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
  mockUsers.push(user)
  res.json(mockUsers)
})

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
})

app.listen('3000', () => {
  console.log('app running in 3000')
})