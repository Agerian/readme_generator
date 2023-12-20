const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project?',
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return 'Please enter a project title.';
        },
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description explaining the what, why, and how of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use. Include screenshots as needed.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your application:',
        choices: [
        'Other',    
        'MIT License',
        'Apache License, Version 2.0',
        'GNU General Public License version 3',
        'The 2-Clause BSD License',
        'The 3-Clause BSD License',
        'GNU General Public License version 2',
        'GNU Lesser General Public License version 3',
        'GNU Lesser General Public License version 2.1',
        'Mozilla Public License 2.0',
        'Eclipse Public License version 2.0',
        'Common Development and Distribution License 1.0',
        'GNU Library General Public License version 2'
        ],
    },
    {
        type: 'input',
        name: 'licenseNotice',
        message: 'If you chose "Other" for the license, provide any additional notice or details:',
        when: (answers) => answers.license === 'Other',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'List your collaborators, if any, with links to their GitHub profiles:',
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
    }
];

function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
        const readmeContent = generateReadme(answers);

        writeToFile('README.md', readmeContent);
        console.log('README.md has been generated successfully!');
    });
}

function generateReadme(data) {
    let licenseBadge = '';
    if (data.license !== 'Other') {
        const licenseLink = `https://opensource.org/licenses/${encodeURIComponent(data.license)}`;
        licenseBadge = `[![${data.license} License](https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-green)](${licenseLink})`;
    }

    return `
# ${data.projectTitle}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## License
${licenseBadge}

${data.license === 'Other' ? 'Additional Notice: ' + data.licenseNotice : ''}

## Contributing

${data.contributing}

## Questions

- GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})
- Email: ${data.email}    
`;
}
 
init();