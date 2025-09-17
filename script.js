// Email form handling with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.signup-btn');
    const messageDiv = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent redirect
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);
        showMessage('', '');

        // Submit to Google Sheets using fetch
        const params = new URLSearchParams({
            Email: email,
            Date: new Date().toISOString()
        });
        
        fetch(`${form.action}?${params}`, {
            method: 'GET',
            mode: 'no-cors'
        }).then(() => {
            // Show success message
            showMessage('Thank you! We\'ll notify you when we launch.', 'success');
            emailInput.value = '';
            setLoadingState(false);
        }).catch(() => {
            // Even if fetch fails, show success (data might still be submitted)
            showMessage('Thank you! We\'ll notify you when we launch.', 'success');
            emailInput.value = '';
            setLoadingState(false);
        });
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
    }

    function setLoadingState(loading) {
        if (loading) {
            form.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'SIGNING UP';
        } else {
            form.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = 'SIGN UP';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Remove scaling effects to prevent input from getting bigger
    // emailInput.addEventListener('focus', function() {
    //     this.parentElement.style.transform = 'scale(1.02)';
    // });

    // emailInput.addEventListener('blur', function() {
    //     this.parentElement.style.transform = 'scale(1)';
    // });

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll animations removed since we're using background images

// Add intersection observer for fade-in effects
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.headline, .cta-text, .email-form, .brand-section');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
