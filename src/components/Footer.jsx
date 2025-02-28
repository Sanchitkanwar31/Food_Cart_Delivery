import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-2 m-2 " style={{ "width": "100%","height":"1%" }}>
            <div className="container" >
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>
                            We are committed to delivering the best services. Learn more about our journey and mission.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="#services" className="text-light text-decoration-none">Services</a></li>
                            <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
                            <li><a href="#faq" className="text-light text-decoration-none">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>Email: support@example.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                </div>
                <div className="text-center border-top pt-3 mt-3">
                    <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
