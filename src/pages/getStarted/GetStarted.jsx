import React from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import './style.scss'
import { IoIosArrowForward } from 'react-icons/io'

const GetStarted = () => {

    return (
        <>
            {/* <img src="./main-bg.jpg" alt="" className="img" /> */}
            <section id="get-started">
                <ContentWrapper>
                    <div className="get-started-main">
                        <p className='p1'>Unlimited movies, TV shows and more</p>
                        <p className='p2'>Watch anywhere. Cancel anytime.</p>
                    </div>
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <p className='p3'>Ready to watch? Enter your email to create or restart your membership.</p>
                        <div className="mailInput">
                            <input
                                className='input'
                                required
                                type="email"
                                placeholder="Enter your Email...."
                            />
                            <button className='btn'><span>Get Started</span> <span className='icon'><IoIosArrowForward size={30} color='white' /></span></button>
                        </div>
                    </form>

                </ContentWrapper>
            </section>
        </>
    )
}

export default GetStarted