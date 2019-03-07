const fs = require('fs');
const rl = require('readline');
const util = require('util');
const execPromise = util.promisify(require('child_process').exec);
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

let projectName = '';
const prompts = rl.createInterface(process.stdin, process.stdout);
exec('echo "ute"'); 

prompts.question('Qual nome do projeto que será criado?', async (answer) => {
    projectName = answer;


    if (!fs.existsSync(projectName)) {
        fs.mkdirSync(projectName);
        fs.mkdirSync(`${projectName}/src`);
        fs.mkdirSync(`${projectName}/src/base`);
        fs.mkdirSync(`${projectName}/src/shared`);
    }

    const indexHtmlSctructure = 
    `<html>
  <body>
    <div id="root"></div>
    <script src="./src/base/index.js"></script>
  </body>
</html>
    `;

    const babelStructure = 
    `{
  "presets": [
      "env",
      "react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/transform-runtime"
  ]
}
      `;

    const appStructure =
        `import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <h1>Olá mundo</h1>
        )
    }
}

export default App;`;

    const indexJsStructure = 
        `import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
)`;

    const packageStructure = 
    `{
  "name": "${projectName}",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "parcel index.html"
  },
  "dependencies": {
    "react": "^16.8.3",
    "react-dom": "^16.8.3"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "parcel-bundler": "^1.11.0",
    "sass": "^1.17.0",
    "@babel/plugin-proposal-class-properties": "^7.3.0",
    "@babel/plugin-transform-runtime": "^7.2.0"
  }
}`;     

    fs.writeFileSync(`${projectName}/index.html`, indexHtmlSctructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${projectName}/package.json`, packageStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${projectName}/.babelrc`, babelStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${projectName}/src/base/app.js`, appStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
    fs.writeFileSync(`${projectName}/src/base/index.js`, indexJsStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));

    exec(`cd ${projectName} && echo "Aguarde, o projeto está sendo gerado" && npm i -g yarn && yarn && echo "Projeto criado"`, async(error, stdout, stderr) => {
      if(error) {
        console.log(error)
      }   
      await console.log(stdout)
      process.exit();
    }); 
});