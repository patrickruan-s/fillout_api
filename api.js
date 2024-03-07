const express = require('express');
const api = express ();
api.use(express.json());

const port = process.env.PORT || 3000;

async function getFilloutData(params) {
  debugger
    const token = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
    const url = 'https://api.fillout.com/v1/api/forms/cLZojxk94ous/submissions';
    let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

api.get('/status', async (request, response) => {
    try {
        responseFromFillout = await getFilloutData(request.params);
        response.send(responseFromFillout);
      } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error retrieving responses' })
      }
});


api.get('/responses', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

api.listen(port, () => {
    console.log("Server Listening on PORT:", port);
});