import React, {Component} from 'react';
import Lang from 'lodash';
import './RangeChart.css';

/*
 A chart that displays a data point on a range scale
 */
class RangeChart extends Component {

    render() {
        // Calculate typical value tick mark placement
        const lineLengthPixels = 225;
        // x position in pixels for where the line begins
        const lineStartXPixels = 10;
        // padding value for the two ends of the line
        const mainLinePaddingPixels = 10;
        // y position in pixels for where the line is drawn
        // This might have to change if we have text, so we use `let`
        let mainLineYPosition = 15;
        // height of the tick
        const tickHeight = 20;
        // padding between text and line
        const textPadding = 25;
        // width of the viewBox
        const viewBoxWidth = 250;
        // height of the viewBox
        const viewBoxHeight = 60;
        // Conditional padding of the mainLine if there's text to be displayed above it
        // While the value here is static, it will be conditionally added to the mainLineY
        const conditionalYPaddingIfNoRange = 10;

        // x position in pixels for the center of the svg
        const middle = lineLengthPixels / 2 + lineStartXPixels;

        // calculate the upper and lower bounds of the chart
        const valueArray = [];
        if (!Lang.isNull(this.props.lowerValue)) valueArray.push(this.props.lowerValue);
        if (!Lang.isNull(this.props.upperValue)) valueArray.push(this.props.upperValue);
        if (!Lang.isNull(this.props.typicalValue)) valueArray.push(this.props.typicalValue);
        if (!Lang.isNull(this.props.value)) valueArray.push(this.props.value);
        const upperBound = Math.max.apply(null, valueArray);
        const lowerBound = Math.min.apply(null, valueArray);

        // initialize pixel values as null
        let typicalValueXPixels = null;
        let lowerValueXPixels = null;
        let upperValueXPixels = null;
        let valueXPixels = null;
        let typicalValueTextXPixels = null;
        let lowerValueTextXPixels = null;
        let upperValueTextXPixels = null;
        let dotColor = '#AAA';
        let radius, strokeWidth;

        // range is null
        if (Lang.isNull(this.props.lowerValue) || Lang.isNull(this.props.upperValue)) {

            // if typical value is defined, center it in the middle
            if (!Lang.isNull(this.props.typicalValue)) {
                typicalValueXPixels = middle;
            }

            // calculate location of value dot
            if (!Lang.isNull(this.props.value)) {

                // if typical value is not defined or typical value = value, center value in the middle
                if (Lang.isNull(this.props.typicalValue) || (this.props.value === this.props.typicalValue)) {
                    valueXPixels = middle;
                }

                // else place the value on the far right (if greater than typical value) or left (if less than typical value)
                else {
                    valueXPixels = lineStartXPixels;
                    if (this.props.typicalValue < this.props.value) valueXPixels += lineLengthPixels;
                    dotColor = '#C80B0B';
                }
            }
        }

        // range is defined
        else {

            // range is singular (same upper and lower values)
            if (this.props.lowerValue === this.props.upperValue) {
                let singularRangePadding = 3;

                // if typical value is defined, center it in the middle
                if (!Lang.isNull(this.props.typicalValue)) {
                    typicalValueXPixels = middle;
                }

                // calculate location of value dot
                if (!Lang.isNull(this.props.value)) {

                    // lower (or upper) value = value, center value in the middle
                    if (this.props.value === this.props.lowerValue) {
                        valueXPixels = middle;
                        singularRangePadding = 7;
                    }

                    // else place the value on the far right (if greater than lower value) or left (if less than lower value)
                    else {
                        valueXPixels = lineStartXPixels;
                        if (this.props.lowerValue < this.props.value) valueXPixels += lineLengthPixels;
                    }
                }

                // center the singular range in the middle with some padding on either side
                lowerValueXPixels = middle - singularRangePadding;
                upperValueXPixels = middle + singularRangePadding;
            }

            // range has different upper and lower values
            else {

                // calculate padding around lower and upper values and use as the bounds of the graph
                const numberOfPixelsPerUnit = lineLengthPixels / (upperBound - lowerBound);

                // calulate location of typical value using the pixels per unit scale
                if (!Lang.isNull(this.props.typicalValue)) {
                    typicalValueXPixels = ((this.props.typicalValue - lowerBound) * numberOfPixelsPerUnit) + lineStartXPixels;
                }

                // calulate location of value dot using the pixels per unit scale
                if (!Lang.isNull(this.props.value)) {
                    valueXPixels = ((this.props.value - lowerBound) * numberOfPixelsPerUnit) + lineStartXPixels;
                }

                // calulate location of the upper & lower values using the pixels per unit scale
                lowerValueXPixels = ((this.props.lowerValue - lowerBound) * numberOfPixelsPerUnit) + lineStartXPixels;
                upperValueXPixels = ((this.props.upperValue - lowerBound) * numberOfPixelsPerUnit) + lineStartXPixels;
            }

            // add additional styling if the value is out of range
            if (!Lang.isNull(this.props.value)) {

                // if the dot is out of range, color it red
                if (this.props.value < this.props.lowerValue  || this.props.value > this.props.upperValue) {
                    dotColor = '#C80B0B';

                    // if value is more than 4x the max value of the range, add a border to the dot
                    if (this.props.value > this.props.upperValue * 4) {
                        strokeWidth = 1;
                        radius = 6;

                        // if value is more than 10x the max value of the range, add a larger border to the dot
                        if (this.props.value > this.props.upperValue * 10) {
                            strokeWidth = 2;
                            radius = 7;
                        }
                    }
                }
            }
        }

        // adjust typical value label text location
        if (!Lang.isNull(this.props.typicalValue)) {
            const typicalValueCharLength = this.props.typicalValue.toString().length;
            typicalValueTextXPixels = typicalValueXPixels - typicalValueCharLength * 3;
        }

        // adjust upper & lower value label text location
        if (!Lang.isNull(this.props.lowerValue) && !Lang.isNull(this.props.upperValue)) {

            const lowerValueCharLength = this.props.lowerValue.toString().length;
            const upperValueCharLength = this.props.upperValue.toString().length;

            // range is singular
            if (this.props.lowerValue === this.props.upperValue) {
                if (Lang.isNull(this.props.typicalValue)) {
                    lowerValueTextXPixels = middle - lowerValueCharLength * 3;
                }
            }

            // range has two different values
            else {
                lowerValueTextXPixels = lowerValueXPixels - lowerValueCharLength * 3;
                upperValueTextXPixels = upperValueXPixels - upperValueCharLength * 3;

                // if there is a typical value, check if they overlap
                if (!Lang.isNull(this.props.typicalValue)) {
                    const typicalValueCharLength = this.props.typicalValue.toString().length;
                    typicalValueTextXPixels = typicalValueXPixels - typicalValueCharLength * 3;

                    // if the lower value and typical value overlap, omit the typical value
                    if (lowerValueTextXPixels + lowerValueCharLength * 3 + 5 >= typicalValueTextXPixels) {
                        typicalValueTextXPixels = null;
                    }

                    // if the lower value and typical value overlap, omit the typical value
                    if (typicalValueTextXPixels + typicalValueCharLength * 3 + 5 >= upperValueTextXPixels) {
                        typicalValueTextXPixels = null;
                    }
                }

                // if the upper value and lower value overlap, omit the value furthest from the actual value
                if (lowerValueTextXPixels + lowerValueCharLength * 3 + 8 >= upperValueTextXPixels) {
                    if (this.props.value < this.props.lowerValue) upperValueTextXPixels = null;
                    if (this.props.value > this.props.upperValue) lowerValueTextXPixels = null;
                }
            }
        }

        // create svg for the upper & lower value range bar & text labels
        // NOTE: This needs to happen first incase there's no range data,
        // since this will result in a shift down of the mainLine
        let svgForRangeBar = null;
        let svgForRangeLowerText = null;
        let svgForRangeUpperText = null;
        if (Lang.isNull(lowerValueXPixels) || Lang.isNull(upperValueXPixels)) {
            // There's no range; we need to display text to communicate that
            // But that text will squish up against our mainLine;
            // Let's add some padding to avoid that
            mainLineYPosition += conditionalYPaddingIfNoRange;
            svgForRangeBar = <text x={lineStartXPixels} y={mainLineYPosition - conditionalYPaddingIfNoRange} fontFamily="sans-serif" fontSize="14px" fill="#3F3F3F">dosage range unknown</text>;
        } else {
            svgForRangeBar = <line x1={lowerValueXPixels} y1={mainLineYPosition} x2={upperValueXPixels} y2={mainLineYPosition} stroke="#DDD" strokeWidth="5" />;
            if (!Lang.isNull(lowerValueTextXPixels)) {
                svgForRangeLowerText = <text x={lowerValueTextXPixels} y={mainLineYPosition + textPadding} fontFamily="sans-serif" fontSize="14px" fill="#3F3F3F">{this.props.lowerValue}</text>;
            }
            if (!Lang.isNull(upperValueTextXPixels)) {
                svgForRangeUpperText = <text x={upperValueTextXPixels} y={mainLineYPosition + textPadding} fontFamily="sans-serif" fontSize="14px" fill="#3F3F3F">{this.props.upperValue}</text>;
            }
        }

        // create svg for the typical tick & text labels
        let svgForTypicalTick = null;
        let svgForTypicalText = null;
        if (!Lang.isNull(typicalValueXPixels)) {
            svgForTypicalTick = <line x1={typicalValueXPixels} y1={mainLineYPosition - Math.floor(tickHeight/2)} x2={typicalValueXPixels} y2={mainLineYPosition + Math.floor(tickHeight/2)} stroke="#979797" strokeWidth="1" />;
            if (!Lang.isNull(typicalValueTextXPixels)) {
                svgForTypicalText = <text x={typicalValueTextXPixels} y={mainLineYPosition + textPadding} fontFamily="sans-serif" fontSize="14px" fill="#3F3F3F">{this.props.typicalValue}</text>;
            }
        }

        // create svg for value data point & border (if necessary)
        let svgForDataPoint = null;
        let svgForDataPointBorder = null;
        if (!Lang.isNull(valueXPixels)) {
            if (!Lang.isNull(radius) && !Lang.isNull(strokeWidth)) {
                svgForDataPointBorder = <circle cx={valueXPixels} cy={mainLineYPosition} r={radius} strokeWidth={strokeWidth} stroke={dotColor} fill="#FFF" />;
            }
            svgForDataPoint = <circle cx={valueXPixels} cy={mainLineYPosition} r="4" strokeWidth="3" fill={dotColor} />;
        }

        // set svg viewbox dimensions
        const viewBoxDimensions = `0 0 ${viewBoxWidth} ${viewBoxHeight}`;

        return (
            <div>
                <svg width={viewBoxWidth + "px"} height={viewBoxHeight + "px"} viewBox={viewBoxDimensions}>
                    {/*Typical value tick*/}
                    {svgForTypicalTick}
                    {svgForTypicalText}

                    {/*Value range bar*/}
                    {svgForRangeBar}
                    {svgForRangeLowerText}
                    {svgForRangeUpperText}

                    {/*Main line*/}
                    <line x1={lineStartXPixels - mainLinePaddingPixels} y1={mainLineYPosition} x2={lineStartXPixels + lineLengthPixels + mainLinePaddingPixels} y2={mainLineYPosition} stroke="#C2C2C2" strokeWidth="0.5" />

                    {/* Data point for the value */}
                    {svgForDataPointBorder}
                    {svgForDataPoint}
                </svg>
            </div>
        );
    }
}

export default RangeChart;
