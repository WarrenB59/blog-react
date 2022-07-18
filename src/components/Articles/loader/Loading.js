import React, { useEffect, useState } from "react";
import { Alert, Spinner } from 'react-bootstrap';

const Loading = () => {
    const [err, setErr] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setErr(true);
        },10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading">
            {!err ? (
                <>
                    <Spinner animation="border" variant="primary" />
                </>
            ) : (
            <Alert variant='danger'>
                <Alert.Heading>désolé,</Alert.Heading>
                <p>
                    il semblerait qu'il y ait eu une erreur de chargement de la page.
                    Nous mettons tout en oeuvre pour la réparer au plus vite.
                </p>
                <hr />
                <p className='mb-0'>
                    Vous pouvez
                    <Alert.Link href='#'>nous contacter</Alert.Link>
                    pour nous remonter cette erreur.
                </p>
            </Alert>)}
        </div>)
};

export default Loading;