import React, { Component } from 'react'
import Banner from '../Banner';
import axios from 'axios';

class Contact extends Component {
    state = {
        symptoms: ''
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

            alert(`We will connect you with a ${specialist}`);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
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
                                    <input type="text" placeholder="Your name" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="email" placeholder="Your email" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" placeholder="Your phone" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input type="text" placeholder="Your subject" />
                                </div>
                                <div className="col-lg-12 col-12">
                                    <textarea name="message" placeholder="How do you feel?" defaultValue={""} onChange={this.handleInputChange}/>
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
