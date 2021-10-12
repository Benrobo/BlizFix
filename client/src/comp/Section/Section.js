import React from 'react'
import { Cards } from '../Cards/Cards'
import "./section.css"


export const Section = () => {
    return (
        <section className="section">
            <div className="main">
                <div className="ideas-cont mt-3">
                        <Cards />
                </div>
            </div>
        </section>
    )
}
