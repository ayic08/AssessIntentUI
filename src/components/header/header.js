import '../../styles/headerStyle.sass' 
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return (
        <>
        <div className='header'>
        <div>
            <button 
                icon={faBars}
                style={{ minWidth: "60px" }}
            />

            <b><span>PRODUCTX</span><span>PLATFORM</span></b>
            </div>
            <div>
                <a href='' style={{marginRight:'1em'}}>LOGIN</a>

            <button type="button">SIGN UP</button>
            
            </div>
        </div>
        
        </>
    )
}

export default Header;