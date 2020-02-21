import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface ContainerProps {
	diameter: number;
}
interface SemiCircleProps {
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

const Container = styled.div`
	width: ${(props: ContainerProps): string => props.diameter+'px'};
	height: ${(props: ContainerProps): string => props.diameter/2+'px'};
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
	background-color: ${(props: ContainerProps & SemiCircleProps): string => props.color || '#40e6ae'};

	display: block;
	width: 100%;
	height: 100%;

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

	width: ${(props: ContainerProps & SemiCircleProps & SemiCircleMaskProps): string => props.diameter+'px'};
	height: ${(props: ContainerProps & SemiCircleProps & SemiCircleMaskProps): string => props.diameter+'px'};

	background: transparent;

	transform: ${(props: ContainerProps & SemiCircleProps & SemiCircleMaskProps): string => `rotate(${props.data}deg)`};
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
	color: black;
	z-index: 20;
	font-weight: bold;
`
export const Gauge: FunctionComponent<ContainerProps & SemiCircleProps & SemiCircleMaskProps> = ({data, dataToDeg=(val: number): number => val*1.8, dataToRate=(val: number): string => (val/10).toFixed(1) , color, innerColor, backColor, diameter, thickness}) => {
	return (
		<Container diameter={diameter} >
			<Mask >
				<SemiCircle color={color} innerColor={innerColor} diameter={diameter} thickness={thickness}></SemiCircle>
				<SemiCircleMask diameter={diameter} backColor={backColor} thickness={thickness} data={dataToDeg(data)}></SemiCircleMask>
			</Mask>
			<NumDisplay>{dataToRate(data)}</NumDisplay>
		</Container>
	)
}
