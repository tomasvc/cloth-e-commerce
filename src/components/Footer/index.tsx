import React from 'react'
import './styles.css'

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="top__column">
                    <h4>Help & Information</h4>
                    <p>Help</p>
                    <p>Track Order</p>
                    <p>Delivery & Returns</p>
                    <p>Premier Delivery</p>
                    <p>10% Student Discount</p>
                </div>
                <div className="top__column">
                    <h4>About Cloth</h4>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Corporate responsibility</p>
                    <p>Investors' site</p>
                    <p>Cyber Security</p>
                </div>
                <div className="top__column">
                    <h4>More from Cloth</h4>
                    <p>Mobile and Cloth apps</p>
                    <p>Cloth Marketplace</p>
                    <p>Gift vouchers</p>
                    <p>Black Friday</p>
                    <p>Our responsible fashion journey</p>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; 2022 Cloth — created by tomasvc</p>
                <div>
                    <p>Privacy Policy</p>
                    <p>T&C</p>
                    <p>Accessibility</p>
                </div>
            </div>
        </footer>
    )
}
