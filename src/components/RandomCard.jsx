import React, { useState } from 'react';

function RandomCard({ meaning, onSearch }) {
    return (
        <>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className='text-capitalize'>{meaning}</h5>
                        <button className="btn theme-btn" onClick={() => onSearch(meaning)}>Search</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RandomCard