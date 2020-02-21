import React from 'react';
import { withKnobs, number } from "@storybook/addon-knobs";


import { Gauge } from '../../src/components/Gauge'

export default { title: 'Testing Gauge', decorators: [withKnobs]};

export const withGauge = () => <Gauge diameter={number("Diameter", 200)} thickness={number("Thickness", 10)} data={number("Data", 92)} ></Gauge>