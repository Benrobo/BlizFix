import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Home from '../pages/Home'

export default function Tabs({ links }) {
    return (
        <Router>
            <div className="tab">
                <div className="tab-head">
                    <ul className="list">
                        {links.map((link) => (
                            <li className="active" key={link.id}>
                                <Link to={link.path}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tab-body">
                    <div className="tab-cont">
                        {/* <h5></h5> */}
                        <div className="box-cont">
                            <div className="box f">
                                <Route path="/" exact>
                                    <Home />
                                </Route>
                                <Route path="/about">
                                    <About />
                                </Route>
                                <Route path="/contact">
                                    <Contact />
                                </Route>
                                <Route path="/contact/:name">
                                    <Contact />
                                </Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

// export const TabContent = () => {
//     return (
//         <Router>
//             <div className="tab-cont">
//                 {/* <h5></h5> */}
//                 <div className="box-cont">
//                     <div className="box">
//                         <Route path="/" exact>
//                             <Home />
//                         </Route>
//                         <Route path="/about">
//                             <About />
//                         </Route>
//                         <Route path="/contact">
//                             <Contact />
//                         </Route>
//                     </div>
//                     <div className="box">
//                         <p>Some Content here</p>
//                     </div>
//                     <div className="box">
//                         <p>Some Content here</p>
//                     </div>
//                 </div>
//             </div>
//         </Router>
//     )
// }
