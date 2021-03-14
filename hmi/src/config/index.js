const appConfig = {
    env: process.env.NODE_ENV,
    baseURL: process.env.REACT_APP_API,
    tokenKey: process.env.REACT_APP_USER_TOKEN_KEY,
    plcnextEhmiUrl: process.env.REACT_APP_PLCNEXT_EHMI_URL,
};

export default appConfig;
