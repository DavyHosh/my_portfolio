/*================== toggle icon navbar ===================*/ 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*================== scroll section active link ===================*/ 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

function setActiveNavLink() {
    let fromTop = window.scrollY;

    navLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call setActiveNavLink initially
setActiveNavLink();

// Call setActiveNavLink on scroll
window.addEventListener('scroll', setActiveNavLink);

/*================== sticky navbar ===================*/ 
let header = document.querySelector('header');

function toggleStickyNavbar() {
    header.classList.toggle('sticky', window.scrollY > 100);
}

// Call toggleStickyNavbar on scroll
window.addEventListener('scroll', toggleStickyNavbar);

/*================== remove toggle icon and navbar when click navbar link(scroll) ===================*/ 
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

/*================== scroll reveal ===================*/ 
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*================== typed js ===================*/
const typed = new Typed('.multiple-text', {
    strings: ['Software Developer', 'Cyber Security Analyst', 'Digital Forensic Analyst'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*=================== back end =============================*/
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route to handle form submissions
app.post('/send-email', (req, res) => {
    // Extract form data
    const { fullName, emailAddress, mobileNumber, emailSubject, message } = req.body;

    // Transporter object using SMTP
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'davidwmaina89@gmail.com', // My email address
            pass: 'your-email-password' // My email password
        }
    });

    // Configure email options
    let mailOptions = {
        from: emailAddress,
        to: 'davidwmaina89@gmail.com', // My email address
        subject: emailSubject,
        text: `
            Name: ${fullName}
            Email: ${emailAddress}
            Mobile Number: ${mobileNumber}
            
            Message:
            ${message}
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error: Unable to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

