import React, { Component, PureComponent } from 'react';
import OrderForm from './OrderForm';
import CouponForm from './CouponForm';
import { BrowserRouter as Router,
        Route,
        NavLink,
        Switch
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/app.css';

import Perf from 'react-addons-perf';
window.Perf = Perf;

export default class App extends PureComponent {
    constructor(props) {
        super(props);
    }
   
    render() {
        console.log("App render!!!")
        return (
            <Router>
                <div className='wrapper'>
                    <div className='header'>
                        <header>설 정</header>
                        <ul className="nav_ul" role="tablist">
                            <li><NavLink exact to="/pages/popup.html" className="nav_link">주문설정</NavLink></li>
                            <li><NavLink exact to="/pages/coupondown" className="nav_link">쿠폰받기설정</NavLink></li>
                        </ul>
                    </div>
                    <div className="contents">
                        <Switch>
                            <Route exact path="/pages/popup.html" component={OrderForm} />
                            <Route exact path="/pages/coupondown" component={CouponForm} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
