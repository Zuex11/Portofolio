fetch('/about')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data.name)
        document.querySelector('.hero__name').textContent = data.name;
        document.querySelector('.hero__role').textContent = data.title;
        document.querySelector('.hero__bio').textContent = data.bio;
        document.querySelector('.contact-info__email').textContent = data.email;
        document.querySelector('.contact-info__email').href = 'mailto:' + data.email;
        document.querySelector('[data-field="github"]').href = data.github;
        document.querySelector('[data-field="linkedin"]').href = data.linkedIn;
        document.querySelector('.hero__avatar').src = data.photo
    }
    )