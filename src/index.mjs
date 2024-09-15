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

app.get('/api/users', (req, res) => {
  res.send(mockUsers)
})

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
})

app.listen('3000', () => {
  console.log('app running in 3000')
})