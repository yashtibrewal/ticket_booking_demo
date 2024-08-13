import React, { useState, useEffect, useRef } from 'react';
import { ping } from '../services/ping';
import log from 'loglevel';

const pollingTime = 5000; // 5 secs

const ServerConnectionStatus = ({ getPreviousBooking }) => {
    const [status, setStatus] = useState('warning'); // Initial status

    const isFirstRun = useRef(true); // Ref to track the first run

    useEffect(() => {
        const pollServer = async () => {
            try {
                const response = await ping();
                if (response.isSuccess) {
                    setStatus('success');
                } else {
                    setStatus('danger');
                }
            } catch (error) {
                log.error(error.message);
                setStatus('danger');
            }
        };

        if (isFirstRun.current) {
            pollServer(); // Call immediately on first render
            getPreviousBooking();
            isFirstRun.current = false; // Set the flag to false after the first run
        }


        const intervalId = setInterval(pollServer, pollingTime); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up on unmount
    }, [getPreviousBooking]);

    const serverConnectionStat = () => {
        switch (status) {
            case 'danger':
                return 'Could Not Connect';
            case 'warning':
                return 'Retrying';
            case 'success':
                return 'Connected';
            default:
                return 'Error';
        }
    }

    return (
        <div className="mt-5 d-flex-column flex-wrap align-items-center border border-info p-2">
            <div className='m-1'>Server Status</div>
            <div className={`m-1 alert alert-${status}`}
            >
                {
                    serverConnectionStat()
                }
            </div>
        </div>
    );
};


export default ServerConnectionStatus;
