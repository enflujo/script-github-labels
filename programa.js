const { Octokit } = require('@octokit/rest');
const chalk = require('chalk');

require('dotenv').config();

const labels = require('./labels');
const octokit = new Octokit({
  auth: process.env.TOKEN,
});

const cabeza = `
EEEEEEE         FFFFFFF lll           jjj        
EE      nn nnn  FF      lll uu   uu        oooo  
EEEEE   nnn  nn FFFF    lll uu   uu   jjj oo  oo 
EE      nn   nn FF      lll uu   uu   jjj oo  oo 
EEEEEEE nn   nn FF      lll  uuuu u   jjj  oooo  
                                    jjjj         
`;

const datosPrincipales = {
  owner: 'enflujo',
  repo: 'sitios-cms-api',
};

const error = chalk.bold.red;
const puntero = chalk.bgRgb(87, 87, 247).white.bold;

console.log(chalk.rgb(87, 87, 247).bold(cabeza));
console.log(chalk.bgRgb(87, 87, 247).white(`..:: Actualizando labels del repositorio ${datosPrincipales.repo} ::..`));

function actualizarLabel(label) {
  octokit.rest.issues
    .updateLabel({
      ...datosPrincipales,
      name: label.nombreActual,
      new_name: label.nombreNuevo,
      color: label.color,
      description: label.desc,
    })
    .then(() => {
      console.log(`${puntero('Actualización del label:')} ${chalk.hex(label.color).underline(label.nombreNuevo)}`);
    })
    .catch(({ errors }) => {
      if (errors) {
        console.log(errors);
      }
    });
}

labels.forEach((label) => {
  octokit.rest.issues
    .createLabel({
      ...datosPrincipales,
      name: label.nombreNuevo,
      color: label.color,
      description: label.desc,
    })
    .then(() => {
      console.log(`${puntero('Nuevo label:')} ${chalk.hex(label.color).underline(label.nombreNuevo)}`);
    })
    .catch(({ errors }) => {
      if (errors.length === 1 && errors[0].code === 'already_exists') {
        label.nombreActual = label.nombreNuevo;
        actualizarLabel(label);
      } else {
        console.log(error('..:: Problema con los datos del label ::..'), label);
        console.log(errors.filter((err) => err.code !== 'already_exists'));
      }
    });
});
