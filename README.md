# TaskManager - Aplicación de administración de proyectos y asignación de tareas

## Descargar y usar

**Back**

*Nota: Para poder correr el backend necesitas crear el archivo `.env` en la raíz del proyecto con las siguiente variables*

    PORT=
    MONGODB_CNN=
    SECRETKEY=
    FRONTEND_URL= //el url de front-end también debe ser añadida a la configuraciones del CORS
    EMAIL_USER=
    EMAIL_PASS=
    EMAIL_HOST=
    EMAIL_PORT=

- Decarga el respositorio

    `git clone https://github.com/josu3steban/notas.git`

- Ve a la carpeta de **back**

    `cd back`
    
- Corre el siguiente comando para instalar todos los paquetes

    `npm install`
    
- Levanta el servidor

    `node app`
    
**Front**

*Nota: Para poder correr el frontend necesitas crear el archivo `.env` en la raíz del proyecto con la siguiente variable, El valor de esta debe ser solcitada*

    VITE_API_URL=       // ejem.- http://localhost:8080/api
    VITE_BASE_API_URL=  //ejem.- http://localhost:8080
    
- Decarga el respositorio

    `git clone https://github.com/josu3steban/notas.git`

- Ve a la carpeta de **front**

    `cd front`
    
- Corre el siguiente comando para instalar todos los paquetes

    `npm install`
    
- Corre la aplicación

    `npm run dev`
    
## Instrucciones

- Crea la cuenta en la aplicación
- Se te enviará un correo para que verifiques las cuenta y poder ingreasar en la app
- Si se te olvidó la contraseña puedes solicitar crear una nueva
- Inicia sesión

![inicio](https://user-images.githubusercontent.com/84942510/183434095-675fd8dc-ee9c-4a99-b46c-29369ab754e2.jpeg)

- Podrás crear proyectos

![crear un proyecto](https://user-images.githubusercontent.com/84942510/183439877-d9c0a4d7-f473-4252-9af9-d7f81ab5c1b5.gif)

- Edita o Elimina

![editar y eliminar un proyecto](https://user-images.githubusercontent.com/84942510/183447299-8b0a385f-6099-475c-b6bf-5799687a3086.gif)

- Crea tareas para tu proyecto y desliza hacia un lado para actualizalas o eliminalas

![crear tareas](https://user-images.githubusercontent.com/84942510/183449448-e41e443d-29ef-46e1-bec0-90032d0e8531.gif)

![actualizar y eliminar tareas](https://user-images.githubusercontent.com/84942510/183450936-7b949c0c-d953-4ccb-92ec-6b635b2fd349.gif)

- Busca y agrega colaboradores a tus proyectos para que te ayuden a completar las tareas

![Busca y agrega colaboradores](https://user-images.githubusercontent.com/84942510/183453577-f39f628e-df72-4f34-a8c0-85c74f1e135d.gif)

- Tanto tú como tus colaboradores pueden completar las tareas

 *Nota: El colaborador solo tendrá la acción de marcar como Completa o Incompleta las tareas del proyecto, mientras que el creador de este, tiene todas las acciones completas. Esta acci+on, asi como las actualizaciones se verán reflejadas en tiempo real con Socket.io*
 
![marcar compleatda tarea](https://user-images.githubusercontent.com/84942510/183455463-66f50fba-86f7-41f6-9037-542c5019ed61.gif)

## Librerias y paquetes usadas

- React
- Redux toolkit
- Socket.io
- Formik
- Yup
- React router dom 6
- Sweet alert 2
- Tailwind css
- Node.js
- Bcrypt
- JsonWebToken
- Mongoose
- MongoDB
- Express
- Express validator
- Cors
- Nodemailer
