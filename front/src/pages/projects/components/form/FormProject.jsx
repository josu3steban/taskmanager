import { useDispatch, useSelector  } from "react-redux";

import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup';


import './formProject.css';
import { startAddProject, startUpdateProject } from "../../../../store/slices/project/projectThunk";
import { useNavigate } from "react-router-dom";

export const FormProject = (props) => {

  const [ widthScreen, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    } );
  });

  console.log(widthScreen)

  const { activeProject, project } = useSelector( state => state.project );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [ dateSelect, setDateSelect ] = useState(false);

  const projectSchema = yup.object().shape({
    name      : yup.string().required('El nombre es obligatorio'),
    description: yup.string().required('Debe ingresar una descripción'),
    delivery  : yup.date().required('Debe ingresar una fecha'),
    client    : yup.string().required('El cliente es obligatorio')
  });


  const handleSubmit = ( values, reset ) => {

    const { name, description, delivery, client } = values;

    const data = {name, description, delivery, client};

    if( !project ) {
      
      dispatch( startAddProject(data) );

    }else {

      const { name: pname, description: pdescription, delivery: pdelivery, client: pclient, ...rest } = project;
      
      dispatch( startUpdateProject({ ...data, ...rest }) );
      
    }
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
    
  }

  return (

    <section className="animate__animated animate__bounceIn sm:w-10/12 sm:p-2 w-2/4 mx-auto p-5 neumorphism ">

      <Formik
        initialValues={{
          name        : (!!project) ? project.name        : '',
          client      : (!!project) ? project.client      : '',
          description : (!!project) ? project.description : '',
          delivery    : (!!project) ? project.delivery.split('T')[0] : ''
        }}

        validationSchema = { projectSchema }

        enableReinitialize = { true }

        onSubmit = { (error, {resetForm}) => handleSubmit(error, resetForm) }
      >

        {
          ({ errors, touched}) => {

            return(

              <Form>

                <div className="sm:mb-4 flex flex-col items-center mb-10">
                  <Field
                    className='sm:w-full sm:text-lg sm:font-normal sm:border-b-2 w-5/6 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Nombre del proyecto'
                  />
                  {
                    (errors.name && touched.name)
                      ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.name }</span>
                      : <span className="sm:text-xs sm:font-normal uppercase block text-sm text-transparent">null</span>
                  }
                </div>

                <div className="sm:mb-4 flex flex-col items-center mb-10">
                  <Field
                    className='sm:w-full sm:text-lg sm:font-normal sm:border-b-2 w-5/6 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] border-r-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                    type='text'
                    as='textarea'
                    rows={`${(widthScreen <= 640) ? '2' : '5'}`}
                    name='description'
                    id='description'
                    placeholder='Descripción del proyecto'
                  />
                  {
                    (errors.description && touched.description)
                      ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.description }</span>
                      : <span className="sm:text-xs sm:font-normal uppercase block text-sm text-transparent">null</span>
                  }
                </div>

                <div className="flex flex-col sm:mb-4 sm:mt-0 items-center mb-10">
                  <Field
                    className='sm:w-full sm:text-lg sm:font-normal sm:border-b-2 w-5/6 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                    type={ (dateSelect) ? 'date' : 'text'}
                    onFocus ={ () => { setDateSelect(true) }}
                    onBlur  ={ () => { setDateSelect(false) }}
                    name='delivery'
                    id='delivery'
                    placeholder='Fecha de entrega del proyecto'
                  />
                  {
                    (errors.delivery && touched.delivery)
                      ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.delivery }</span>
                      : <span className="sm:text-xs sm:font-normal uppercase block text-sm text-transparent">null</span>
                  }
                </div>

                <div className="flex flex-col items-center sm:mb-8 mb-16">
                  <Field
                    className='sm:w-full sm:text-lg sm:font-normal sm:border-b-2 w-5/6 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                    type='text'
                    name='client'
                    id='client'
                    placeholder='Cliente del proyecto'
                  />
                  {
                    (errors.client && touched.client)
                      ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.client }</span>
                      : <span className="sm:text-xs sm:font-normal uppercase block text-sm text-transparent">null</span>
                  }
                </div>

                <div className="sm:justify-center sm:gap-0 flex gap-5 justify-end">

                  {/* {
                    (!!activeProject)
                    &&
                    (
                      <button
                        className="font-black text-2xl text-my-color-three px-4 border-b-2 border-my-color-one hover:border-my-color-three transition-colors"
                        type="submit"
                      >
                        Eliminar
                      </button>
                    )
                  } */}
                  
                  <button
                    className="font-black text-3xl text-my-color-two px-4 border-b-2 border-my-color-one hover:border-my-color-two transition-colors"
                    type="submit"
                  >
                    {
                      (!!activeProject)
                        ? 'Actualizar'
                        : 'Guardar'
                    }
                    
                  </button>
                  
                </div>
                
              </Form>
              
            )
            
          }
        }
        
      </Formik>
      
    </section>
    
  )
}
