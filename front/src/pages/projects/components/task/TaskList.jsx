import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useDispatch } from "react-redux";
import { formatDate } from "../../../../helpers/formatDate";
import { task_SetActiveTask, task_SetTask, task_startChangeStatusTask, task_startDeleteTask } from "../../../../store";
import { modalTaskOpen } from "../../../../store/slices/ui";

import './tasklist.css';
import Swal from 'sweetalert2';
import { checkAdmin } from '../../../../helpers/checkAdmin';

export const TaskList = ({ task }) => {

    const colorPriority = ( priority ) => {
        switch( priority ) {
            case 'Baja':
                return 'text-my-color-five'
            break;

            case 'Media':
                return 'text-my-color-two'
            break;

            case 'Alta':
                return 'text-my-color-three'
            break;
        }
    };

    const dispatch = useDispatch();

    const isAdmin = checkAdmin();

    const handleComplete = ( state ) => {

        dispatch( task_startChangeStatusTask(task._id, state) );
        
    };

    const handleIncomplete = ( state ) => {

        dispatch( task_startChangeStatusTask(task._id, state) );
        
    };

    const handleEdit = ( task ) => {

        dispatch( task_SetTask(task) );
        dispatch( modalTaskOpen() );
        dispatch( task_SetActiveTask(task._id) );

    };

    const handleDelete = ( id ) => {

        Swal.fire({
            title: '¿Seguro desea eliminar este proyecto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
        if (result.isConfirmed) {
    
            dispatch( task_startDeleteTask(id) );
        }
        })

    };


    const leadingActions = () => (

        ( isAdmin ) && (
            <LeadingActions>
                <SwipeAction
                    onClick={ () => handleEdit(task) }
                >
                    Editar
                </SwipeAction>
            </LeadingActions>
        )
    );


    const trailingActions = () => (

        ( isAdmin ) && (
            <TrailingActions>
                <SwipeAction
                    onClick={ () => handleDelete(task._id) }
                >
                    Eliminar
                </SwipeAction>
            </TrailingActions>
        )
    );
    
  return (

    <SwipeableList>
        <SwipeableListItem
            
            leadingActions  = { leadingActions() }
            trailingActions = { trailingActions() }
        >

        <div className={`
            animate__animated animate__bounceIn
            sm:flex-col
            sm:gap-2
            sm:p-2
            sm:items-start
        
            w-full
            mb-8
            flex
            justify-between
            items-center
            p-4
            rounded-xl
            cursor-default
            shadow-[6px_6px_14px_#c9cecf,-6px_-6px_14px_#ffffff] 

            ${task.status ? 'border-l-4 border-my-color-two ' : 'border-l-4 border-my-color-three'}
        `}>

        <section className="sm:w-full">

            <h4 className="mb-2 text-base sm:font-bold text-my-color-five font-medium uppercase">{task.name}</h4>

            <p className="sm:text-base mb-2 text-gray-600" >{task.description}</p>

            <p className="sm:text-base mb-2 font-medium">{ formatDate(task.delivery) }</p>

            <p className="sm:text-base text-gray-600">Prioridad: <span className={`font-medium ${colorPriority(task.priority)}`}>{ task.priority }</span></p>

            
            {
                (task.complete)
                && (
                    <p className="sm:text-base text-gray-600">Completada por: <span className={`font-medium ${colorPriority(task.priority)}`}>{ task.complete.name }</span></p>
                )
            }

            

        </section>

        <section className="sm:self-end flex flex-col gap-2">

            <div className="">

                {
                    (task.status)
                        ?(
                            <button
                                className='
                                    sm:px-2
                                    sm:py-1
                                    sm:text-sm
                                
                                    border-2
                                    border-my-color-two
                                    hover:bg-my-color-two
                                    text-my-color-two
                                    hover:text-my-color-one 
                                    text-xl
                                    font-medium px-4 py-3 
                                    rounded-full
                                    w-full
                                    transition-colors'
                                onClick={ () => handleComplete(false) }
                            >
                                Completada
                            </button>
                        )
                        :(
                            <button
                                className='
                                    sm:px-2
                                    sm:py-1
                                    sm:text-sm
                                
                                    border-2
                                    border-my-color-three hover:bg-my-color-three text-my-color-three 
                                    hover:text-my-color-one 
                                    text-xl
                                    font-medium px-4 py-3 
                                    rounded-full
                                    w-full
                                    transition-colors'
                                onClick={ () => handleIncomplete(true) }
                            >
                                Incompleta
                            </button>  
                        )
                }
            </div>
            
            {/* <div className="flex gap-2">
                <button
                    className="border-2 border-my-color-five hover:bg-my-color-five text-my-color-five hover:text-my-color-one font-medium px-4 py-1 rounded-lg transition-colors"
                    onClick={() => handleEdit(task)}
                >
                    Editar
                </button>
                

                <button
                    className="border-2 border-red-800 hover:bg-red-800 text-red-800 hover:text-my-color-one font-medium px-4 py-1 rounded-lg transition-colors"
                    onClick={() => handleDelete(task._id)}
                >
                    Eliminar
                </button>
            </div> */}
        </section>
            
        </div>

        </SwipeableListItem>
    </SwipeableList>

  )
}
