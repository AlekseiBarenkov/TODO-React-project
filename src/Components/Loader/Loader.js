import React from 'react';
import './Loader.css';

function Loader () {
        return (
            <div className='loader-body'>
                <svg className="filter" version="1.1">
                    <defs>
                    <filter id="gooeyness">
                        <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="10"
                        result="blur" />
                        <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                        result="gooeyness" />
                        <feComposite
                        in="SourceGraphic"
                        in2="gooeyness"
                        operator="atop" />
                    </filter>
                    </defs>
                </svg>
                <div className="dots">
                    <div className="dot mainDot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        );
}

export default Loader;