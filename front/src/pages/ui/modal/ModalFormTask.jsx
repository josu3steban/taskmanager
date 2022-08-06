import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Dialog, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { modalTaskClose } from '../../../store/slices/ui/modalTaskSlice';
import { task_ClearActiveTask, task_startAddTask, task_startUpdateTask } from '../../../store/slices/task';


export const ModalFormTask = () => {
 
    const dispatch = useDispatch();

    const [ dateSelect, setDateSelect ] = useState(false);

    const { activeProject }   = useSelector( state => state.project );
    const { modalTaskIsOpen } = useSelector( state => state.modalTask );
    const { task }            = useSelector( state => state.task );

    const PRIORITY = ['Baja', 'Media', 'Alta'];
    
    const newTaskSchema = yup.object().shape({
        name: yup.string().required('El nombre es obligatorio'),
        description: yup.string().required('La descripción es obligatoria'),
        priority: yup.string().required('Debes seleccionar la prioridad'),
        delivery: yup.date().required('Se requiere una fecha de entrega')
    });
    
    const handleCloseModal = () => {

        dispatch( modalTaskClose() );

        setTimeout(() => {
            dispatch( task_ClearActiveTask() );
        }, 200);
        
    };

    const handleSubmit = ( values, reset ) => {

        const newTask = {...values, project: activeProject }

        if(!!task) {

            dispatch( task_startUpdateTask(task._id, newTask) );

        }else {

            dispatch( task_startAddTask(newTask) );

        }

        setTimeout(() => {

            dispatch( modalTaskClose() );
            dispatch( task_ClearActiveTask() );
            
        },700);
        
    }
    
    return (
        <Transition.Root show={ modalTaskIsOpen } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleCloseModal }>
                <div className="flex items-end justify-center h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-my-color-one rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-11/12 sm:p-6">


                            <div className="block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleCloseModal }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">

                                    <Dialog.Title as="h3" className=" text-3xl font-black text-my-color-five">

                                        Crear una Tarea

                                    </Dialog.Title>

                                    
                                    <section>

                                        <Formik
                                            initialValues = {{
                                                name        : (task?.name)          ?? '',
                                                priority    : (task?.priority)      ?? '',
                                                description : (task?.description)   ?? '',
                                                delivery    : (task?.delivery)      ? task.delivery.split('T')[0] : ''
                                            }}

                                            validationSchema = { newTaskSchema }

                                            enableReinitialize = { true }

                                            onSubmit = { (error, {resetForm}) => handleSubmit(error, resetForm) }
                                        >
                                            
                                            {
                                                ({errors, touched}) => {
                                                    return (

                                                        <Form>

                                                            <div className="">
                                                                <Field
                                                                    className='sm:border-b-2 sm:w-full sm:px-2 sm:text-lg sm:font-normal w-11/12 mt-5 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                                                                    type='text'
                                                                    name='name'
                                                                    id='name'
                                                                    placeholder='Nombre de la tarea'
                                                                />
                                                                {
                                                                    (errors.name && touched.name)
                                                                    ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.name }</span>
                                                                    : <span className="sm:text-xs sm:font-normal uppercase block text-sm text-transparent">null</span>
                                                                }
                                                            </div>

                                                            <div className="">
                                                                <Field
                                                                    className='sm:border-b-2 sm:w-full sm:px-2 sm:text-lg sm:font-normal w-11/12 mt-5 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] border-r-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                                                                    type='text'
                                                                    as="textarea"
                                                                    row="5"
                                                                    name='description'
                                                                    id='description'
                                                                    placeholder='Descripción de la tarea'
                                                                />
                                                                {
                                                                    (errors.description && touched.description)
                                                                    ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.description }</span>
                                                                    : <span className="sm:text-xs sm:font-normal uppercase block text-sm text-transparent">null</span>
                                                                }
                                                            </div>

                                                            <div className="">
                                                                <Field
                                                                    className='sm:border-b-2 sm:w-full sm:px-2 sm:text-lg sm:font-normal w-11/12 mt-5 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                                                                    type={ (dateSelect) ? 'date' : 'text'}
                                                                    onFocus ={ () => { setDateSelect(true) }}
                                                                    onBlur  ={ () => { setDateSelect(false) }}
                                                                    name='delivery'
                                                                    id='delivery'
                                                                    placeholder='Fecha de entrega del proyecto'
                                                                />
                                                                {
                                                                    (errors.delivery && touched.delivery)
                                                                    ? <span className="sm:text-xs sm:font-normal  self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.delivery }</span>
                                                                    : <span className="sm:text-xs sm:font-normal  uppercase block text-sm text-transparent">null</span>
                                                                }
                                                            </div>

                                                            <div className="mt-5">
                                                                <Field
                                                                    className='sm:mt-0 sm:border-2 sm:w-full sm:px-2 sm:text-lg sm:font-normal w-11/12 bg-my-color-one rounded-xl text-center border-[3px] border-my-color-two focus:outline-none mt-5 px-3 py-2 text-2xl font-medium text-my-color-five'
                                                                    as="select"
                                                                    name='priority'
                                                                    id='priority'
                                                                >
                                                                    <option defaultValue={true} disabled hidden value="">Elige la prioridad</option>
                                                                    {
                                                                        PRIORITY.map( option => (
                                                                            <option key={option} value={option}>{option}</option>
                                                                        ))
                                                                    }

                                                                </Field>
                                                                
                                                                {
                                                                    (errors.priority && touched.priority)
                                                                    ? <span className="sm:text-xs sm:font-normal  self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.priority }</span>
                                                                    : <span className="sm:text-xs sm:font-normal  uppercase block text-sm text-transparent">null</span>
                                                                }
                                                            </div>


                                                            <div className=" sm:mt-5 sm:justify-center w-11/12 flex gap-5 justify-end mt-10">

                                                                <button
                                                                    className="font-black text-3xl text-my-color-two px-4 border-b-2 border-my-color-one hover:border-my-color-two transition-colors"
                                                                    type="submit"
                                                                >
                                                                    {
                                                                        (!!task)
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
                                    

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
};