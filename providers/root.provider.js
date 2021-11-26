import { RootContext } from '../contexts/root.context';
import { supabase } from '../lib/supabase';
import { HttpService } from '../lib/httpService';
import React, { useState } from "react";

export const RootProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [applicationCache, setApplicationCache] = useState(null);
    const httpService = new HttpService();

    React.useEffect(() => {
        const init = async () => {
            let session = localStorage.getItem('supabase.auth.token');
            if (session) {
                session = JSON.parse(session).currentSession; 
                setApplicationCache(session);
                setProps("loggedIn", true);
            } else {
                setProps("loggedIn", false); 
            }
        };
        init();
    }, []);

    const setProps = (name,props) => {
        switch(name) {
            case "loggedIn": 
                setLoggedIn(props);
                return;
            case "collapse": 
                setCollapse(props);
                return;
            default:
                return;
        }
    }

    const getProp = (prop) => {
        switch(prop) {
            case "loggedIn":
                return loggedIn;
            case "collapse": 
                return collapse;
            default:
                return;
        }
    }

    return (
        <RootContext.Provider value={{ getProp, setProps, supabase, httpService, applicationCache }}>
            {props.children}
        </RootContext.Provider>
    )
}