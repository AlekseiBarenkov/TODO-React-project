import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './PreviewPage.css';

const PreviewPage: React.FC = () => {

    return (
        <>
            <div className='preview'>
                <h2 className='preview__title'>Добро пожаловать в</h2>
                <div className="preview__arrow preview__arrow-left">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <Link className='preview__btn' to='/ToDo'>My ToDo</Link>
                <div className="preview__arrow preview__arrow-right">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h3
                    className='preview__subtitle'>
                    created by: <span>Алексей Баренков</span>
                </h3>
            </div>
            <Outlet />
        </>
    );
}

export default PreviewPage;