const OpenAI = require('openai');
require("dotenv").config();



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



const completion = async (req, res) => {
    try {
        const prompt = req.body.prompt;

        console.log(prompt)

        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 500,
            stream: false
        });

        
        res.json(response.choices[0].text);
    } catch (error) {
        res.status(500).send('Error with OpenAI request');
    }
};



const test = async (req, res) => {
    try {
        const promptText = "Give a a simple markdown file example";
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: promptText,
            max_tokens: 150,
            stream: false
        });

        console.log(response.choices[0].text);
        res.json(response.choices[0].text);
    } catch (error) {
        console.error("Error with OpenAI request:", error);
        res.status(500).send('Error with OpenAI request');
    }
};


module.exports = {
    completion,
    test
}