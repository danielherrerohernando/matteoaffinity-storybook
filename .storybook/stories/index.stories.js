import React from 'react';
import { withKnobs, number, text } from "@storybook/addon-knobs";


import { Gauge } from '../../src/components/Gauge'

export default { title: 'Testing Gauge', decorators: [withKnobs]};

export const withGauge = () => <Gauge diameter={number("Diameter", 200)} color={text("Color", '#40e6ae')} numColor={text("Number Color", '#40e6ae')} thickness={number("Thickness", 10)} data={number("Data", 92)} ></Gauge>