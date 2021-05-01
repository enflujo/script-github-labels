# Modificar los "Labels" en Github

```sh
EEEEEEE         FFFFFFF lll           jjj
EE      nn nnn  FF      lll uu   uu        oooo
EEEEE   nnn  nn FFFF    lll uu   uu   jjj oo  oo
EE      nn   nn FF      lll uu   uu   jjj oo  oo
EEEEEEE nn   nn FF      lll  uuuu u   jjj  oooo
                                    jjjj
```

Este programa en NodeJS permite actualizar o crear _labels_ en un repositorio de Github. Ya que no se pueden transferir de un repositorio a otro se vuelve útil para tener una serie de _labels_ consistentes en los repositorios del laboratorio.

Usa la librería [Octokit](https://github.com/octokit/rest.js) que facilita el uso del API de Github.

## Credenciales

1. Crear un [Token en Github](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
2. Cambiar el nombre del archivo `.env.ejemplo` por `.env`. (los archivos **.env** se ignoran para no subir claves al repositorio).
3. Pegar el token creado en el punto 1 en el archivo `.env` y se debe ver algo así:

```yaml
TOKEN=ghp_....
```

## Crear labels

Crear objetos en el archivo `/labels.js` usando la siguiente estructura para cada _label_:

```js
{
  // Sólo en el caso de que ya exista.
  nombreActual: 'invalid',
  // Se pueden usar emojis en los nombres
  // https://github.com/ikatyang/emoji-cheat-sheet#table-of-contents
  nombreNuevo: 'invalido :ghost:',
  // Se debe poner el color en formato HEX sin el # inicial.
  color: 'e4e669',
  // La descripción
  desc: 'Esto no parece estar bien.',
}
```

## Correr

En el terminal, correr el siguiente comando y se muestran las actualizaciones en el terminal.

```sh
yarn start
```
