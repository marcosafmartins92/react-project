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
        fs.mkdirSync(`${projectName}/src/styles`);
        fs.mkdirSync(`${projectName}/src/store`);
        fs.mkdirSync(`${projectName}/src/routes`);
        fs.mkdirSync(`${projectName}/src/store/reducers`);
        fs.mkdirSync(`${projectName}/src/store/actions`);
        fs.mkdirSync(`${projectName}/src/components`);
        fs.mkdirSync(`${projectName}/src/pages`);
        fs.mkdirSync(`${projectName}/src/services`);
        fs.mkdirSync(`${projectName}/src/utils`);
        fs.mkdirSync(`${projectName}/assets`);
        fs.mkdirSync(`${projectName}/assets/fonts`);
        fs.mkdirSync(`${projectName}/assets/svgs`);
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
  "author": "Wooza Ventures",
  "license": "MIT",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-redux": "^7.1.0",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1",
    "redux": "^4.0.4",
    "styled-components": "^4.3.2",
    "@material-ui/core": "^4.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/plugin-transform-runtime": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "parcel-bundler": "^1.12.3"
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

const swStructure = `
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = process.env.PUBLIC_URL+'/service-worker.js';

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
` 

  fs.writeFileSync(`${projectName}/index.html`, indexHtmlSctructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
  fs.writeFileSync(`${projectName}/serviceWorker.js`, swStructure, (e) => console.log(e || 'Arquivo gerado com sucesso!'));
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