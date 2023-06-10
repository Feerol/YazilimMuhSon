
const OpenAI=require('openai');
const { Configuration, OpenAIApi } = require("openai");


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;


const configuration = new Configuration({
    organization: "org-pBIzr55RnskMPxLE4hhtMoTP",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();    


app.use(bodyParser.json());
app.use(cors());
app.post('/',async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: `You are a article recommendation program. User will give you an input and you will suggest articles to the user about the input, in a table.
        Table can contain 5 recommendations at most. I expect titles and links of the articles in the table.
        Format for the table should be like this: "Title1, Link1, Title2, Link2, Title3, Link3, Title4, Link4, Title5, Link5"
         
        User:${message}
        ChatGPT:`,
        max_tokens: 700,
        temperature: 0.5,
});
console.log(response.data);
if(response.data){
    if(response.data.choices){
        res.json({ message:response.data.choices[0].text}) ;
    }
}

});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});




