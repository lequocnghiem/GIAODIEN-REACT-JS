// ColorBox.js
import React from 'react';

const ColorBox = ({ color }) => {
    const boxStyle = {
        width: '20px',
        height: '20px',
        backgroundColor: color,
        display: 'inline-block',
        marginRight: '5px',
        border: '1px solid #ccc'
    };

    return <span style={boxStyle}></span>;
};

export default ColorBox;
