import React, { useState, useEffect } from 'react';

export default function Clock() {
    const [time, setTime] = useState(48 * 60 * 60); // 48 hours in seconds

    useEffect(() => {
        const countdown = () => {
            setTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        };

        const interval = setInterval(countdown, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
        <div className='d-flex align-items-center gap-5 mb-5'>
            <div className='gap-5' style={{ display: 'flex', alignItems: 'center' }}>
                <span className='text-center'>
                    <h1 className='text-white fs-3'>{hours}</h1>
                    <h5 className='text-white fs-6'>Hours</h5>
                </span>
                <h6 className='text-white fs-6'>:</h6>
            </div>
            <div className='gap-5' style={{ display: 'flex', alignItems: 'center' }}>
                <span className='text-center'>
                    <h1 className='text-white fs-3'>{minutes}</h1>
                    <h5 className='text-white fs-6'>Minutes</h5>
                </span>
                <h6 className='text-white fs-6'>:</h6>
            </div>
            <div className='gap-5' style={{ display: 'flex', alignItems: 'center' }}>
                <span className='text-center'>
                    <h1 className='text-white fs-3'>{seconds}</h1>
                    <h5 className='text-white fs-6'>Seconds</h5>
                </span>
            </div>
        </div>
    );
}
