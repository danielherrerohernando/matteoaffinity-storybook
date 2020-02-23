import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface ContainerProps {
	diameter: number;
}
interface SemiCircleProps {
	data: number;
	thickness: number;
	color?: string;
	innerColor?: string;
}
interface SemiCircleMaskProps {
	data: number;
	dataToDeg?: (val: number) => number;
	dataToRate?: (val: number) => string;
	backColor?: string;
}
interface NumberProps {
	data: number;
	numColor: string;
}

const dataToColor = (val: number): string => val < 50 ? '#d90e00' : (val < 75 ? '#d9cb00' : '#40e6ae')

const Container = styled.div`
	width: ${({diameter}: ContainerProps): string => diameter+'px'};
	height: ${({diameter}: ContainerProps): string => diameter/2+'px'};
	overflow: visible;
	position: relative;
`
const Mask = styled.div`
  	position: relative;
	overflow: hidden;
	display: block;
	width: 100%;
	height: 100%;
`
const SemiCircle = styled.div`
	position: relative;
	background-color: ${({color, data}): string => color || dataToColor(data)};

	display: block;
	width: 100%;
	height: 100%;
	transition: all .3s ease-in-out;
	border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;

	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		z-index: 2;
		display: block;
		width: ${(props: ContainerProps & SemiCircleProps): string => (props.diameter-2*props.thickness)+'px'};
		height: ${(props: ContainerProps & SemiCircleProps): string => (props.diameter/2-props.thickness)+'px'};
		margin-left: ${(props: ContainerProps & SemiCircleProps): string => "-"+(props.diameter/2-props.thickness)+'px'};
		background: ${(props: ContainerProps & SemiCircleProps): string => props.innerColor || '#ffffff'};
		border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
	}
`

const SemiCircleMask = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	width: ${({diameter}): string => diameter+'px'};
	height: ${({diameter}): string => diameter+'px'};

	background: transparent;

	transform: ${({data}): string => `rotate(${data}deg)`};
	transform-origin: center center;
	backface-visibility: hidden;
	transition: all .3s ease-in-out;

	&::before {
		content: "";

		position: absolute;
		top: 0;
		left: 0%;
		z-index: 2;

		display: block;
		width: ${(props: ContainerProps & SemiCircleProps & SemiCircleMaskProps): string => (props.diameter+2)+'px'};
		height: ${(props: ContainerProps & SemiCircleProps & SemiCircleMaskProps): string => ((props.diameter/2)+2)+'px'};
		margin: -1px 0 0 -1px;

		background: ${(props: ContainerProps & SemiCircleProps & SemiCircleMaskProps): string => props.backColor || '#f5f5f5'};

		border-radius: 50% 50% 50% 50% / 100% 100% 0% 0% ;
	}
`
const NumDisplay = styled.span`
	position: absolute;
	width: 100%;
	text-align: center;
	margin-left: -50%;
	bottom: -40%;
	left: 50%;
	font-size: 4em;
	color: ${(props: NumberProps): string => props.numColor || dataToColor(props.data)};
	z-index: 20;
	transition: all .3s ease-in-out;
	font-weight: bold;
`
const Gauge: FunctionComponent<ContainerProps & NumberProps & SemiCircleProps & SemiCircleMaskProps> = ({data, dataToDeg=(val: number): number => val*1.8, dataToRate=(val: number): string => (val/10).toFixed(1) , color, numColor, innerColor, backColor, diameter, thickness}) => {
	return (
		<Container diameter={diameter} >
			<Mask >
				<SemiCircle color={color} data={data} innerColor={innerColor} diameter={diameter} thickness={thickness}></SemiCircle>
				<SemiCircleMask diameter={diameter} backColor={backColor} thickness={thickness} data={dataToDeg(data)}></SemiCircleMask>
			</Mask>
			<NumDisplay data={data} numColor={numColor}>{dataToRate(data)}<span style={{fontWeight:300, fontSize:'.5em'}}>/10</span></NumDisplay>
		</Container>
	)
}

export default Gauge
