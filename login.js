// DOM Elements
const loginTabs = document.querySelectorAll('.login-tab');
const loginForms = document.querySelectorAll('.login-form');

// Tab Switching
loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        loginTabs.forEach(t => t.classList.remove('active'));
        loginForms.forEach(f => f.classList.remove('active'));

        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-login`).classList.add('active');
    });
});

// Form Submission
document.getElementById('student-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentId = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    // Here you would typically validate against a backend
    // For demo purposes, we'll just redirect to the main page
    if (studentId && password) {
        localStorage.setItem('userType', 'student');
        localStorage.setItem('userId', studentId);
        window.location.href = 'index.html';
    }
});

document.getElementById('teacher-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const teacherId = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    // Here you would typically validate against a backend
    // For demo purposes, we'll just redirect to the main page
    if (teacherId && password) {
        localStorage.setItem('userType', 'teacher');
        localStorage.setItem('userId', teacherId);
        window.location.href = 'index.html';
    }
}); 