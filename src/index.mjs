import express from 'express'

const app = express()

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

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
})

app.listen('3000', () => {
  console.log('app running in 3000')
})