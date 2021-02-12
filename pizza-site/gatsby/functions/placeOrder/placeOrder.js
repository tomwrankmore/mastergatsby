const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready for your bitch ass</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is: <strong>${total}</strong> due at pick up.</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
    </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  // check honeypot
  if (body.sneakyOne) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: '0010100101010' }),
    };
  }
  console.log(body);
  // validate that data coming in is correct

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field.`,
        }),
      };
    }
  }

  // Make sure they always have item in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Your order contains no items.`,
      }),
    };
  }

  // send the email

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
