/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export function CarouselImages() {
    return (
        <Carousel autoPlay showThumbs={false} showStatus={false}>
            <img src={require('../assets/1.PNG')} />
            <img src={require('../assets/2.PNG')} />
            <img src={require('../assets/3.PNG')} />
            <img src={require('../assets/4.PNG')} />
        </Carousel>
    );
};