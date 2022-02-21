import React from "react";

class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {content: null};
    }

    componentDidMount() {
        
    }
  
    componentWillUnmount() {

    }

    render(){
        return (
            <footer className="footer-basic">
                <div className="social">
                    <a href="#"><i className="icon ion-social-instagram"></i></a>
                    <a href="#"><i className="icon ion-social-snapchat"></i></a>
                    <a href="#"><i className="icon ion-social-twitter"></i></a>
                    <a href="#"><i className="icon ion-social-facebook"></i></a>
                </div>
                <ul className="list-inline"></ul>
                <p className="copyright">Bamboo Restaurant © 2021</p>
            </footer>
        );
    }
}

export default Footer;