import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { modalSearchProjectClose, modalSearchProjectOpen } from '../../../store/slices/ui/modalSearchProjectSlice'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const ModalSearchProject = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ search, setSearch] = useState('')

    const { modalSearchProjectIsOpen } = useSelector( state => state.modalSearchProject );
    const { projects } = useSelector( state => state.project );


    const projectsFilter = search === '' ? [] : projects.filter( project => project.name.toLowerCase().includes(search.toLowerCase()) );

    const closeModalSearch = () => {

        dispatch( modalSearchProjectClose() );
        
    }
    
    return (
        <Transition.Root show={ modalSearchProjectIsOpen } as={Fragment} afterLeave={ () => setSearch('') }>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20" onClose={ closeModalSearch }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                <Combobox
                    as="div"
                    className="text-xl font-medium mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl focus:outline-none ring-opacity-5 transition-all"
                    onChange={ (projects) => (window.location = `/project/${projects._id}`) }
                >
                    <div className="relative">
                        <Combobox.Input
                            className="focus:outline-none focus:ring-2 focus:ring-my-color-five h-12 w-full bg-transparent pl-5 pr-4 text-gray-800 placeholder-gray-400 sm:text-sm"
                            placeholder="Buscar..."
                            onChange={(e) => {setSearch(e.target.value)}}
                        />
                    </div>

                    {projectsFilter.length > 0 && (
                        <Combobox.Options static className="focus:outline-none max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">

                            {
                                projectsFilter.map( project => (
                                    <Combobox.Option
                                        key={project._id}
                                        value={project}
                                        className={({active}) => classNames('text-lg font-medium cursor-default select-none px-4 py-2', active && 'bg-gray-400 text-white')}
                                    >
                                        {project.name}
                                    </Combobox.Option>
                                ))
                            }
                            
                        </Combobox.Options>
                    )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}
