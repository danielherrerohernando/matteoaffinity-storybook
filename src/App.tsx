import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom'
import {Gauge} from './components/Gauge'

const App: FunctionComponent = () => <Gauge dataToRate={(val: number): string => (val/10).toFixed(2)} diameter={200} thickness={10} data={92} ></Gauge>


ReactDOM.render(<App />, document.getElementById('root'))