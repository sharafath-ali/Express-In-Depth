import express from 'express'
import { query, validationResult, body, matchedData } from 'express-validator';

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

const resolveIndexByUserId = (req, res, next) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId) || req.params.id !== userId.toString()) {
    return res.status(400).send({ message: 'Invalid user ID' });
  }

  const userIndex = mockUsers.findIndex(e => e.id === userId);

  if (userIndex === -1) {
    return res.status(404).send({ message: 'User not found' });
  }
  req.userIndex = userIndex;
  next()
}

app.get('/', (request, response) => {
  response.status(200).send({ mes: 'hello' })
})

app.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { userIndex } = req;

  mockUsers[userIndex] = { id: req.body.id, ...req.body };
  return res.json(mockUsers[userIndex]);
});



app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { userIndex } = req;

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...req.body };
  return res.json(mockUsers[userIndex]);
});


app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { userIndex } = req;

  mockUsers.splice(userIndex, 1);
  return res.json(mockUsers);
});

const logger = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`)
  next()
}

app.use(logger); //it will call in every request

//if i only wanna call for this
app.get('/api/users/:id', logger, (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).send({ message: 'Invalid user ID' });
  }

  const user = mockUsers.find(e => e.id === userId);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.send(user);
});


app.get('/api/users', query('filter').isString().withMessage('must be string').notEmpty().withMessage('must not be empty'), (req, res) => {
  //http://localhost:3000/api/users?filter=username&value=a
  console.log(req.query)
  const Result = validationResult(req)
  console.log(Result)
  const { query: { filter, value } } = req;
  if (filter && value) {
    res.send(mockUsers.filter(e => e[filter].includes(value)))
  } else {
    res.send(mockUsers)
  }
})

app.post('/api/users', body('username').notEmpty().withMessage('must not  be empty'), body('displayName').notEmpty().withMessage('must not  be empty'), (req, res) => {
  const Result = validationResult(req)
  console.log(Result);

  if (!Result.isEmpty()) {
    return res.status(400).json({ error: Result.array() })
  }

  const data = matchedData(req)
  console.log(data)
  const user = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
  mockUsers.push(user)
  res.json(mockUsers)
})

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
})

app.listen('3000', () => {
  console.log('app running in 3000')
})