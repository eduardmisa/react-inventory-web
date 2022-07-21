export default function SelectInput(props: any) {
    return (
        <>
            <label htmlFor={props.id} className="form-label inline-block mb-2 text-gray-700">
                {props.label}
            </label>
            <select className="
                form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example
            "
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}>
                <option value={-1}>Open this select menu</option>
                {props.items.map((item: any) => (
                    <option value={item.key} key={item.key}>{item.value}</option>)
                )}
            </select>
        </>
    )
}
