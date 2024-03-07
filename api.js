const express = require('express');
const api = express ();
api.use(express.json());

const port = process.env.PORT || 3000;

const compareToFilters = (response, filters) => {
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    const condition = filter.condition;
    const id = filter.id;
    const value = filter.value;

    const question = response.questions.find(question => question.id == id);
    if ((condition == 'equals' && question.value == value ) || (condition == 'does_not_equal' && question.value != value)
    || (condition == 'greater_than' && question.value > value) || (condition == 'less_than' && question.value < value)) {
      continue;
    } else {
      return false;
    }
  }

  return true;
}

const filterResponse = (data, filters) => {
  if (filters.length == 0 || filters == null) { return data };

  const ret = [];
  data.responses.forEach((response) => {
    if(compareToFilters(response, filters)) { ret.push(response) };
  });
  data.responses = ret;
  data.totalResponses = ret.length;
  return data;
}

async function getFilloutData(filters) {
    const token = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
    const url = 'https://api.fillout.com/v1/api/forms/cLZojxk94ous/submissions';
    let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    });
    let data = await response.json();
    ret_data = filterResponse(data, filters);
    return ret_data;
}

api.get('/cLZojxk94ous/filteredResponses', async (request, response) => {
    const filters = request.query.filters;
    try {
        const decodedFilters = decodeURIComponent(filters);
        responseFromFillout = await getFilloutData(JSON.parse(decodedFilters));
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


const test_filters = [
	{
		id: "fFnyxwWa3KV6nBdfBDCHEA",
		condition: "greater_than",
		value: "30",
	}
]

const filters = encodeURIComponent(JSON.stringify(test_filters));