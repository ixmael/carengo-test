# careno-test
Solución del ejercicio para [Carengo](https://github.com/carengo/test-feed).

Esta solución se realizón con [React](https://reactjs.org/) en el frontend y en el backend con [Express](https://expressjs.com/).

La estructura de carpetas se describe a continuación:
** config: archivos de configuración de la aplicación node.
** src: código fuente de las aplicaciones. En **app** se tienen los componentes de frontend y en **server** los componentes de node.
** static: carpeta donde son obtenidos los archivos css y js.
** templates: carpeta con los templetas de la aplicación node.

## Instalación de dependencias
La instalación de esta prueba require instalar los paquetes de Node. En la carpeta del proyecto ejecutar:
```bash
npm install
```

## Ambiente de desarrollo
La prueba hace uso del archivo de configuración **config/default.json**. Por el momento este archivo sólo se usa para almacenar la cantidad de productos a mostrar por página y el puerto utilizado por el servidor node.

Para el ambiente de desarrollo se tiene el archivo **config/development.default.json** que debe ser copiado al archivo **config/default.json**.

#### Servidor
Para iniciar el servidor de node se ejecuta la siguiente instrucción (dentro de la carpeta del proyecto):
```bash
npm run dev
```

El acceso a la aplicación se hace a través de la siguiente dirección (servidor node)[http://localhost:3030]. El puerto se puede configurar en el archivo **config/default.json**.

#### Paquetes
Para generar los paquetes de javascript y css se utiliza el programa [webpack](https://webpack.js.org/). Este es instalado por npm de forma autómatica. Para generar los paquetes para desarrollo se ejecuta la siguiente instrucción dentro de la carpeta del proyecto:
```bash
./node_modules/.bin/webpack -d
```
Esta instrucción genera los archivos js y css dentro de la carpeta static.

## Producción
TODO
