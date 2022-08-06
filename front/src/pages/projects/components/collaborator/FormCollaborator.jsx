import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { collab_startSearchCollaborator } from '../../../../store/slices/collaborator/collaboratorThunk';
import { searchingStart } from '../../../../store/slices/ui';

export const FormCollaborator = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const { project } = useSelector( state => state.project );

    const { id } = params;

    const collaboratorSchema = yup.object().shape({
    username : yup.string().required('Ingrese un nombre de usuario'),
    });


    const handleSubmit = ( values, reset ) => {

        const { username } = values;

        dispatch( searchingStart() );

        dispatch( collab_startSearchCollaborator(id, username) );

    }

    
    return (

        <Formik
            initialValues={{
            username : '',
            }}

            validationSchema = { collaboratorSchema }

            enableReinitialize = { true }

            onSubmit = { (error, {resetForm}) => handleSubmit(error, resetForm) }
        >

            {
            ({ errors, touched}) => {

                return(

                <Form>

                    <div className="sm:mb-4 flex flex-col items-center mb-10">
                    <Field
                        className='sm:w-full sm:text-xl w-5/6 bg-my-color-one focus:outline-none border-my-color-two border-b-[3px] px-3 pt-3 text-2xl font-medium text-my-color-five'
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Nombre de usuario'
                    />
                    {
                        (errors.username && touched.username)
                        ? <span className="sm:text-xs sm:font-normal self-end uppercase block text-sm text-right font-semibold text-red-700">{ errors.username }</span>
                        : <span className="uppercase block text-sm text-transparent">null</span>
                    }
                    </div>

                    <div className="sm:pb-2 sm:justify-center flex gap-5 justify-end">
                        <button
                            className="font-black text-2xl text-my-color-two px-4 border-b-2 border-my-color-one hover:border-my-color-two transition-colors"
                            type="submit"
                        >
                            Buscar
                            
                        </button>
                    </div>
                    
                </Form>
                
                )
                
            }
            }
            
        </Formik>
            
    )
}
