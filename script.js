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
        fs.mkdirSync(`${projectName}/src/store`);
        fs.mkdirSync(`${projectName}/src/routes`);
        fs.mkdirSync(`${projectName}/src/store/reducers`);
        fs.mkdirSync(`${projectName}/src/store/actions`);
        fs.mkdirSync(`${projectName}/src/components`);
    }

    const indexHtmlSctructure = 
    `<html>
  <body>
    <div id="root"></div>
    <script src="./src/index.js"></script>
    <link rel="manifest" href="manifest.webmanifest" data-parceljs-ignore>
  </body>
</html>
    `;

    const babelStructure = 
    `{
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env"
  ],
  "env": {
    "development": {
      "presets": [["@babel/preset-react", { "development": true }]]
    }
  },
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/transform-runtime"
  ]
}`;

    const appStructure =
        `import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Redux from 'redux'
import Router from './routes'
import store from './store'

class App extends React.Component {
  constructor() {
      super()
  }

  render() {
    return (
      <>  
      <h1>Olá mundo</h1>
      <Provider store={store}> 
        <Router />
      </Provider>
      </>
    )
  }
}

export default App;`;

  const routeStructure = `import React, { Component } from 'react';

  import { BrowserRouter, Route, Switch } from 'react-router-dom'
  
  const routes = [
//    { path: '/example', component: example },
  ];
  
  
  const Router = () => (
    <BrowserRouter>
      <Switch>
        {
          routes.map(({component, path}) => (
            <Route key={path} path={path} component={component} />
          ))
        }
      </Switch>
    </BrowserRouter>
  )
  
  export default Router;
  `;

  const indexJsStructure = `import React from 'react'
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
  "author": "Atlas Inovações",
  "license": "MIT",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
  "dependencies": {
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-redux": "^6.0.1",
    "react-router-dom": "^4.3.1",
    "redux": "^4.0.1"
  },
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/plugin-proposal-class-properties": "^7.3.0",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/preset-react": "^7.0.0",
    "parcel-bundler": "^1.11.0",
    "sass": "^1.17.2"
  }
}`;  

  const manifestStructure = `{
    "short_name": "${projectName}",
    "name": "${projectName}",
    "start_url": "/",
    "display": "standalone"
}`;

  const storeStructure = `import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store;`;


  const reducerStructure= `import {combineReducers} from 'redux'
  import {exampleReducer} from './example'
  
  const rootReducer = combineReducers({
    exampleReducer,
  })
  
  export default rootReducer`;


  const actionExampleStructure=`export function actionExample(data) {
  return {
    type: 'EXAMPLE_CODE',
    data
  }
}`;

  const reducerExampleStructure =`const INITIAL = {
  data: 'Início'
}

export function exampleReducer(state = INITIAL, action) {
    if(action.type === 'EXAMPLE_CODE') {
        const updatedData = {data: action.data};
        return {...state, ...updatedData}
    }
    return state;
}`;

  fs.writeFileSync(`${projectName}/index.html`, indexHtmlSctructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/manifest.webmanifest`, manifestStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/package.json`, packageStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/.babelrc`, babelStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/app.js`, appStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/index.js`, indexJsStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/routes/index.js`, routeStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/store/index.js`, storeStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/store/reducers/index.js`, reducerStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/store/reducers/example.js`, reducerExampleStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/src/store/actions/example.js`, actionExampleStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));

  exec(`cd ${projectName} && echo "Aguarde, o projeto está sendo gerado" && npm i -g yarn && yarn && echo "Projeto criado"`, async(error, stdout, stderr) => {
    if(error) {
      console.log(error)
    }   
    await console.log(stdout)
    process.exit();
  }); 
});