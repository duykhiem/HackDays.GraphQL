import * as React from 'react';

export function Footer() {
    return (
        <div className="row footerWrapper">
            <div className="col-md-4">
                <h5>HackDays.GraphQL</h5>
                <p>This is a simple project to have fun<br /> with .Net Core, ReactJS and GraphQL.</p>
                <p>COPYRIGHT ©2021 BY MT1</p>
            </div>
            <div className="col-md-2">
                <h5>MENU</h5>
                <p>Home</p>
                <p>Mens</p>
                <p>Womens</p>
            </div>
            <div className="col-md-3">
                <h5>SOCIAL</h5>
                <i className="fa fa-facebook-square padding-left-0" />
                <i className="fa fa-instagram" />
                <i className="fa fa-google-plus-square" />
                <i className="fa fa-pinterest-square" />
                <i className="fa fa-twitter-square" />
                <i className="fa fa-youtube-square" />
            </div>
            <div className="col-md-3">
                <h5>SIGN UP FOR NEWS LETTER</h5>
                <div className="input-group">
                    <input className="letter form-control  form--grey" type="text" placeholder="name@example.com" />
                    <span className="input-group-btn">
                        <button className="btn  btn-default" type="button">
                            Sign up
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}