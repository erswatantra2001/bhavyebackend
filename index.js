const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  const dataFilePath = path.join(__dirname, 'form-data.json');

  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading data' });
    }

    let formDataList = JSON.parse(data);
    formDataList.push(formData);

    fs.writeFile(dataFilePath, JSON.stringify(formDataList, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error writing data' });
      }

      res.json({ message: 'Form data submitted successfully' });
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
