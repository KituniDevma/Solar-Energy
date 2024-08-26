import React from 'react';
import './condition.css'; // Import the CSS file

function Condition(props){
    return (
        <div className="condition-card">
            <div className="condition-content">
                <span className="condition-attribute-name">{props.attributeName}</span>
            </div>
            <span className="condition-attribute-value">{props.attributeValue} {props.unit}</span>
        </div>
    );
}

Condition.defaultProps = {
    attributeName:'condition',
    attributeValue:'value',
    unit: ''
}

export default Condition;