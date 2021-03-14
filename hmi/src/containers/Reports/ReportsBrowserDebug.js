import React from 'react';

import {useStyles} from './styles';

const ReportsBrowserDebug = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.subContent}>
            <span>appCodeName: {window.navigator.appCodeName}</span>
            <span>appName: {window.navigator.appName}</span>
            <span>appVersion: {window.navigator.appVersion}</span>
            <span>cookieEnabled: {window.navigator.cookieEnabled}</span>
            <span>platform: {window.navigator.platform}</span>
            <span>userAgent: {window.navigator.userAgent}</span>
            <span>maxTouchPoints: {window.navigator.maxTouchPoints}</span>
            <span>userAgentDatamobile: {window.navigator.userAgentData.mobile}</span>
            <span>webdriver: {window.navigator.webdriver}</span>
            <span>ontouchstart: {Boolean(window.ontouchstart) ? 'Exists' : 'Missing'}</span>
            <span>msMaxTouchPoints: {window.navigator.msMaxTouchPoints}</span>
        </div>
    );
};

export default ReportsBrowserDebug;
