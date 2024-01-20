import '../../styles/footerStyle.sass'


const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div>
                    <b><span>PRODUCTX</span><span>PLATFORM</span></b>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div>
                    <p>Follow us on our social media accounts.</p>
                    <button type="button">JOIN PRODUCTX</button>
                </div>
            </div>
            <div className='footerCopyright'>
                <p>&copy; {new Date().getFullYear()} PRODUCTX PLATFORM. All rights reserved.</p>
            </div>
        </>
    )
}

export default Footer;