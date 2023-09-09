import React, { Component, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Banner from '../Banner';
import Loading from './Loading';
import axios from 'axios';

class Contact extends Component {
    state = {
        symptoms: '',
        specialist: '',
        isLoading: false
    };
    
    handleInputChange = (event) => {
        this.setState({ symptoms: event.target.value })
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const prompt = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Given these symptoms ${this.state.symptoms}, what kind of specialist should the patient see? Answer in JSON with 1 field: specialist"}],
        }

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', prompt, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_MY_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                  }            
            });

            const message = response.data.choices[0].message;
            const content = JSON.parse(message.content);
            const specialist = content.specialist;

            this.setState({ specialist, isLoading: true });

            setTimeout(() => {
                this.props.history.push({
                    pathname: '/Page/DentistDetails',
                    state: { specialist: this.state.specialist }
                });
                this.setState({ isLoading: false });
            }, 5000);
            
            // alert(`We will connect you with a ${specialist}`);
            // return Loading
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { specialist, isLoading } = this.state;
        return (
            <React.Fragment>
                <Banner pageTitle='Connect with us!' />

                <section className="contact-us-wrapper section-padding">
                    <div className="contact-information">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-xl-4 col-md-6 col-12">
                                    <div className="single-contact-info icon1">
                                        <div className="c-icon">
                                            <i className="fal fa-home" />
                                        </div>
                                        <div className="c-info">
                                            <h4>Address</h4>
                                            <p>55 West, 33rd Street</p>
                                            <p>5th Floor, New York</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-4 col-md-6 col-12">
                                    <div className="single-contact-info icon2">
                                        <div className="c-icon">
                                            <i className="fal fa-envelope" />
                                        </div>
                                        <div className="c-info">
                                            <h4>email</h4>
                                            <p>info@dentzone.com</p>
                                            <p>email@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-4 col-md-6 col-12">
                                    <div className="single-contact-info icon3">
                                        <div className="c-icon">
                                            <i className="fal fa-phone-volume" />
                                        </div>
                                        <div className="c-info">
                                            <h4>Phone</h4>
                                            <p>(888) 4421-1238-32</p>
                                            <p>(888) 838-1238-645</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="contact-form-wraper">
                        <div className="container">
                            <h3>Tell us your symptoms, and we will connect you with the right doctor!</h3>
                            <form className="row" onSubmit={this.handleSubmit}>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" placeholder="Your name" autoCapitalize="none" onChange={e => e.target.value = e.target.value.toLowerCase()}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="email" placeholder="Your email" autoCapitalize="none" onChange={e => e.target.value = e.target.value.toLowerCase()}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" placeholder="Your phone" autoCapitalize="none" onChange={e => e.target.value = e.target.value.toLowerCase()}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" placeholder="Your subject" autoCapitalize="none" onChange={e => e.target.value = e.target.value.toLowerCase()}/>
                                </div>
                                <div className="col-lg-12 col-12">
                                    <textarea name="message" autoCapitalize="none" placeholder="How do you feel?" defaultValue={""}   onChange={e => {
    this.handleInputChange(e);
    e.target.value = e.target.value.toLowerCase();
  }} 
 />
                                </div>
                                <div className="col-lg-12 col-12">
                                    <Loading isLoading={isLoading} specialist={specialist}></Loading>
                                </div>

                                <button className="contact-submit-btn" type="submit">Connect</button>
                            </form>

                        </div>
                    </div> 
                </section>
            </React.Fragment>
        )
    }
}

export default Contact
