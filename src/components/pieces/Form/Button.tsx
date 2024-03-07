type ButtonProps = {
    children: React.ReactElement
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    disabled?: boolean
}

export default function Button(props: ButtonProps): React.ReactElement {
    return (
        <button
            className={`px-4 py-2 min-w-fit px-4 py-2 text-md bg-main text-white rounded-md`}
            onClick={props.onClick}
            disabled={props.disabled?props.disabled: false}
        >
            {props.children}
        </button>
    );
}