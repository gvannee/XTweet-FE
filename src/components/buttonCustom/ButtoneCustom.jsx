import './buttonCustom.scss'

const Button = (props) => { 
    const value = props.value 
    const id = props.id;
    const handleClick = props.handleClick
    return (
        
        
           <button onClick={handleClick} id={id} >{value}</button>
        
        
        
    )
}

export default Button;