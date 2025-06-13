function updateProfileInfo(profileData) {
  const photo = document.getElementById("profilephoto");
  photo.src = profileData.photo;
  photo.alt = profileData.name;

  const name = document.getElementById("profile.name");
  name.innerText = profileData.name;

  const job = document.getElementById("profile.job");
  job.innerText = profileData.job;
  const location = document.getElementById("profile.location");
  location.innerText = profileData.location;

  const phone = document.getElementById("profile.phone");
  phone.innerText = profileData.phone;
  phone.href = `https://web.whatsapp.com/send?phone=+55${profileData.phone}`;

  const email = document.getElementById("profile.email");
  email.innerText = profileData.email;
  email.href = `mailto:${profileData.email}`;
}

function updateSoftSkills(profileData) {
  const softSkills = document.getElementById("profile.skills.softSkills");

  softSkills.innerHTML = profileData.skills.softSkills
    .map((skill) => `<li>${skill}</li>`)
    .join("");
}

function updateHardSkills(profileData) {
  const hardSkills = document.getElementById("profile.skills.hardSkills");

  hardSkills.innerHTML = profileData.skills.hardSkills
    .map(
      (skill) =>
        `<li><img src="${skill.logo}" alt="${skill.name}" title="${skill.name}}"></li>`
    )
    .join("");
}

function updateLanguages(profileData) {
  const languages = document.getElementById("profile.languages");

  languages.innerHTML = profileData.languages
    .map((language) => `<li>${language}</li>`)
    .join("");
}

function updatePortfolio(profileData) {
  const portfolio = document.getElementById("profile.portfolio");

  portfolio.innerHTML = profileData.portfolio
    .map((portfolio) => {
      return `
        <li>
            <h3 ${portfolio.github ? 'class="github"' : ""}>${
        portfolio.name
      }</h3>
            <a href="${portfolio.url}" target="_blank">${portfolio.url}</a>
        </li>
    `;
    })
    .join("");
}

function updateProfessionalExperience(profileData) {
  const professionalExperience = document.getElementById(
    "profile.professionalExperience"
  );

  professionalExperience.innerHTML = profileData.professionalExperience
    .map((experience) => {
      return `
        <li>
            <h3 class="title">${experience.name}</h3>
            <p class="period">${experience.period}</p>
            <p>${experience.description}</p>
      </li>
        `;
    })
    .join("");
}

function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.title = 'Theme toggle';
    document.body.appendChild(themeToggle);

    // Verificar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

(async function () {
  const profileData = await fetchProfileData();
  updateProfileInfo(profileData);
  updateSoftSkills(profileData);
  updateHardSkills(profileData);
  updateLanguages(profileData);
  updatePortfolio(profileData);
  updateProfessionalExperience(profileData);
  setupThemeToggle();
})();
