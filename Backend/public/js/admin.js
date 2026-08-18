
//ABOUT TAB
const aboutFields = ['name', 'title', 'photo', 'bio', 'email', 'github', 'linkedIn'];
const aboutButton = document.querySelector('#about-form');
const aboutInputs = [
    document.querySelector('#about-name-input'),
    document.querySelector('#about-role-input'),
    document.querySelector('#about-photo-input'),
    document.querySelector('#about-bio-input'),
    document.querySelector('#about-email-input'),
    document.querySelector('#about-github-input'),
    document.querySelector('#about-linkedin-input')
];
aboutButton.addEventListener('submit', event => {
    event.preventDefault(); //so page doesn't reload
    const aboutData = {};
    aboutFields.forEach((key, i) => {
        aboutData[key] = aboutInputs[i].value;
    });
    fetch('/about', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(aboutData)
    })
})

fetch('/about')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        aboutFields.forEach((key, i) => {
            aboutInputs[i].value = data[key];
        })
    })
// SIDEBAR
const sidebarButtons = document.querySelectorAll(".admin-sidebar__item");
const panels = document.querySelectorAll(".admin-panel")
sidebarButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.panel;
        panels.forEach(panel => {
            panel.classList.remove('is-active');
        })
        sidebarButtons.forEach(btn => {
            btn.classList.remove('is-active');
        })
        button.classList.add('is-active');
        document.querySelector(`#panel-${target}`).classList.add('is-active');
    })
})


