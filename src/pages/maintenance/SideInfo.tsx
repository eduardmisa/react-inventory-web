import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import TextInput from '../../components/form/TextInput';

export default function SideInfo(props: any) {
    const parentService = props.service;

    const formSchema: string[] = props.formSchema

    const [open, setOpen] = useState(props.show)
    const toggle = () => {
        props.toggle()
    }
    useEffect(() => {
        setOpen(props.show);
    }, [props.show])

    const [form, setForm] = useState({})
    const handleForm = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, ...{ [event.target.id]: event.target.value } });
    }

    const fetchDetails = async () => {
        const data = await parentService.details(props.detailUuid);

        const defaultObject = formSchema.reduce((acc, curr) => {
            if (curr !== 'uuid') (acc as any)[curr] = data.data[curr];
            return acc;
        }, {});

        setForm(defaultObject);
    }

    const submitUpdate = async () => {
        try {
            await parentService.update(form, props.detailUuid);
            await props.fetchListData();
            toggle();
        } catch (error) {
            alert('failed to update')
        }
    }

    const submitDelete = async () => {
        try {
            await parentService.delete(props.detailUuid);
            await props.fetchListData();
            toggle();
        } catch (error) {
            debugger
            alert('failed to delete')
        }
    }

    const submitCreate = async () => {
        try {
            await parentService.create(form);
            await props.fetchListData();
            toggle();
        } catch (error) {
            alert('failed to create')
        }
    }

    useEffect(() => {
        if (!props.detailUuid) {

            const defaultObject = formSchema.reduce((acc, curr) => {
                if (curr !== 'uuid') (acc as any)[curr] = '';
                return acc;
            }, {});

            setForm(defaultObject);
            return;
        }

        fetchDetails();
    }, [props.detailUuid])

    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggle}>
            <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                <button
                                    type="button"
                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={toggle}
                                >
                                    <span className="sr-only">Close panel</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                </div>
                            </Transition.Child>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <Dialog.Title className="text-lg font-medium text-gray-900"> Details </Dialog.Title>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    {/* Replace with your content */}
                                    <div className="absolute inset-0 px-4 sm:px-6">
                                        <div className="h-full" aria-hidden="true">
                                            <div className="mb-3 xl:w-96">

                                                {formSchema.filter(f => f !== 'uuid').map((key) => (
                                                    <TextInput id={key} label={key} value={(form as any)[key]} onChange={handleForm} key={key}/>
                                                ))}

                                                <br />

                                                {props.detailUuid &&
                                                    <div>
                                                        <button onClick={submitUpdate} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                            Update
                                                        </button>
                                                        <br />
                                                        <button onClick={submitDelete} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                            Delete
                                                        </button>
                                                    </div>
                                                }

                                                {!props.detailUuid &&
                                                    <div>
                                                        <button onClick={submitCreate} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                            Create
                                                        </button>
                                                        <br />
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    {/* /End replace */}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
