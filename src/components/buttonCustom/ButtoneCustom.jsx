import './buttonCustom.scss'

const Button = (props) => { 
    const value = props.value 
    return (
        <button>{value}</button>
    )
}

export default Button;