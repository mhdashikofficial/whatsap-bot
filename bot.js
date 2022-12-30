const twilio = require('twilio');
const openai = require('openai');

// Set up OpenAI API client
openai.apiKey = "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";

// Set up Twilio client
const client = twilio(
  "AC3fe27dd9dc00b67b836160b6ce04b673",
  "89caf53ad60ddc7c4a5dc4eec971ff0d"
);

// Set up a webhook to listen for incoming messages
const express = require('express');
const app = express();
app.post('/webhook', (req, res) => {
  const message = req.body.Body;
}
app.listen(3000, () => {
  console.log('Server listening on port 3000');
}
  // Use the GPT-3 model to generate a response to the message
  openai.completions.create({
    engine: "text-davinci-002",
    prompt: message,
    max_tokens: 2048,
    temperature: 0.7,
  }, (error, response) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      // Send the response back to the user
      client.messages
        .create({
          body: response.choices[0].text,
          from: "+14155238886",
          to: req.body.From
        })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    }
  });
});
