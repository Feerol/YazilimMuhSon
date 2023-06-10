const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const templatePath=path.join(__dirname,'../sof_eng_project');
const collection=require('./mongo'); //mongodb.js dosyasından dönen collection buradan çağırılıyor
const OpenAI=require('openai');
const { Configuration, OpenAIApi } = require("openai");


const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const configuration = new Configuration({
  organization: "org-pBIzr55RnskMPxLE4hhtMoTP",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.set('view engine','hbs');//görüntü motorunun hbs olduğu tanımlanıyor
app.set("views",templatePath);//templetePath değişkeni views klasörünün yolu
app.use(express.urlencoded({extended:false}));
app.use(express.static(templatePath));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

  app.get('/',(req,res)=>{
    res.sendFile(templatePath+'/index.html');
});



//post kısmı
app.post('/signup', async (req, res) => {
    const data={
        name:req.body.name,
        phone_number:req.body.phone_number,
        email:req.body.email,
        password:req.body.password
    }
    console.log('Kullanıcı adı:', data.name);
    console.log('E-posta:', data.email);
    console.log('Şifre:', data.password);
    await collection.insertMany([data])
    // Verileri kullanarak istediğiniz işlemleri gerçekleştirin
    
    //res.sendFile(templatePath+'/index.html');
    res.send("You have been succesfully signed up");
});



app.post('/login', async (req, res) => {
    try {
      const user = await collection.findOne({ email: req.body.email});
      if (user && user.password === req.body.password) {
        res.sendFile(templatePath + '/index.html');
      } else {
        res.send('Wrong password');
      }
    } catch (error) {
      res.send('User not found');
    }
  });

  app.use(bodyParser.json());
  
  const fs = require('fs');

// ...

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are an article recommendation program. Users will give you an input, and you will suggest articles to the users about the input in a table.
      The table can contain a maximum of 5 recommendations. I expect the titles and links of the articles in the table.
      The format for the table should be like this: "Title1, Link1, Title2, Link2, Title3, Link3, Title4, Link4, Title5, Link5"
      
      User: ${message}
      ChatGPT:`,
    max_tokens: 700,
    temperature: 0.5,
  });

  console.log(response.data);

  if (response.data && response.data.choices) {
    const article = response.data.choices[0].text;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Makale</title>
      </head>
      <body>
        <h1>Makale</h1>
        <p>${article}</p>
      </body>
      </html>
    `;

    fs.writeFile('makale.html', html, (err) => {
      if (err) {
        console.error('Dosya yazma hatası:', err);
        res.send('Dosya yazılırken bir hata oluştu.');
      } else {
        console.log('Dosya başarıyla yazıldı.');
        res.sendFile(templatePath + '/makale.html');
      }
    });
  } else {
    res.send('Makale bulunamadı.');
  }
});

  
  
  
  
  
  app.get('/submit', (req, res) => {
      res.sendFile((templatePath + '/contact.html'));
    });
    
  
  // Handle form submission
  app.post('/submit', (req, res) => {
      var name = req.body.name
      var email= req.body.email
      var surname= req.body.surname
      var tel= req.body.tel
      var message= req.body.message
  
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Surname:', surname);
      console.log('Telephone:', tel);
      console.log('Message:', message);
    
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      // Specify your email service provider details here
      service: 'gmail',
      
      auth: {
        user: "clearfactsai@gmail.com",
        pass: "wpaodwqnsnwuyswb"
      }
  
      
    });
    
    // Set up email data
    var mailOptions = {
      from: "clearfactsai@gmail.com",
      to: 'clearfactsai@gmail.com',
      subject: 'Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Surname: ${surname}
        Telephone: ${tel}
        Message: ${message}
      `
      
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred while sending the email.' });
      } else {
        console.log('Email sent:', info.response);
        //res.json({ message: 'Form submitted successfully!' });
        //res.redirect(templatePath+"/contact.html")
      }
      
    });
  });



app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});


