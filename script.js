// Selecting required elements
const navItems = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');
const resumeTabs = document.querySelectorAll('.resume-list');
const resumeContent = document.querySelectorAll('.resume-box');
const portfolioTabs = document.querySelectorAll('.portfolio-list');
const portfolioContent = document.querySelectorAll('.portfolio-box');

// Helper function to handle class toggling
const toggleActiveClass = (elements, activeIndex, activeClass = 'active') => {
    elements.forEach((el, index) => {
        if (index === activeIndex) {
            el.classList.add(activeClass);
        } else {
            el.classList.remove(activeClass);
        }
    });
};

// Navigation functionality
navItems.forEach((navItem, index) => {
    navItem.addEventListener('click', () => {
        toggleActiveClass(navItems, index);
        cube.style.transform = `rotateY(${index * -90}deg)`;
        toggleActiveClass(sections, index);

        const isContactSectionActive = sections[index].classList.contains('contact');
        sections[4]?.classList.toggle('action-contact', !isContactSectionActive && index !== 0);
    });
});

// Resume tab functionality
resumeTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        toggleActiveClass(resumeTabs, index);
        toggleActiveClass(resumeContent, index);
    });
});

// Portfolio tab functionality
portfolioTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        toggleActiveClass(portfolioTabs, index);
        toggleActiveClass(portfolioContent, index);
    });
});

// Ensure the contact section is hidden initially
setTimeout(() => {
    sections[4]?.classList.remove('active');
}, 1500);




document.getElementById('toggle-btn').addEventListener('click', function () {
    const moreText = document.getElementById('more-text');
    const btn = this;

    if (moreText.classList.contains('hidden')) {
        moreText.classList.remove('hidden');
        btn.textContent = 'Read less';
    } else {
        moreText.classList.add('hidden');
        btn.textContent = 'Read more';
    }
});


const form = document.getElementById('contact-form');
const responseDiv = document.getElementById('form-response');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        });

        if (response.ok) {
            responseDiv.style.display = 'block';
            responseDiv.style.color = 'green';
            responseDiv.textContent = 'Thank you! Your message has been sent successfully.';
            form.reset(); 

            setTimeout(() => {
                responseDiv.style.opacity = "0";
            }, 2000);
        } else {
            throw new Error('Form submission failed.');
        }
    } catch (error) {
        responseDiv.style.display = 'block';
        responseDiv.style.color = 'red';
        responseDiv.textContent = 'Oops! Something went wrong. Please try again.';

        setTimeout(() => {
            responseDiv.style.opacity = "0";
        }, 2000);
    }
});
