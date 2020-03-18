const globals = {
  svgWidth: 300,
  svgHeight: 160,
  gridWidth: 300,
  gridHeight: 160,
  xAxisLabelsHeight: 0,
  yAxisLabelsWidth: 0,
  padHorizontal: 0,
  translateX: 0,
  translateY: 0,
  translateYAxisX: [],
  translateXAxisY: 0,
  translateXAxisX: 0,
  lineHeightRatio: 1.618,
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  series: [30, 41, 35, 51, 49, 62, 69, 91, 126],
  yAxisScale: [niceScale(28, 108, 5)],
  dom: {}
}

const config = {
  tickAmount: 8,
  offsetY: 16,
  axisTicks: {
    show: true,
    height: 4,
    width: 4,
    color: '#78909c'
  },
  xaxis: {
		axisBorder:{
			color:'#78909C'
		},
    axisTicks: {
      show: true,
			tickAmount: 6,
			axisBorder:{
				show: false,
			},
			axisTicks:{
				show:false
			}
    },
		labels:{
			offsetY:0,
			style:{
			
			}
		}
  },
	yaxis:[{
		opposite: false,
		title:{
			offsetX:0
		},
		labels:{
			offsetX:0
		}
	}],
  grid: {
	  borderColor: '#e0e0e0',
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    },
		padding: {
			top: 0,
			right: 10,
			bottom: 0,
			left: 10
		},
  }
}

function log10(x) {
  return Math.log(x) / Math.LN10
}

function handleMinYMaxY() {
  const minY = Math.min(...globals.series, 0);
  const maxY = Math.max(...globals.series);
  return {
    minY,
    maxY
  };
}

function getJustRange(yMin, yMax, ticks = 10) {
  let range = Math.abs(yMax - yMin)

  let step = range / ticks
  if (ticks === Number.MAX_VALUE) {
    range = 10;
    ticks = 10;
    step = 1
  }

  let result = []
  let v = yMin

  while (ticks >= 0) {
    result.push(v)
    v = v + step
    ticks -= 1
  }

  return {
    result,
    niceMin: result[0],
    niceMax: result[result.length - 1]
  }
}

function niceScale(yMin, yMax, ticks = 10) {
  // Calculate Min amd Max graphical labels and graph
  // increments.  The number of ticks defaults to
  // 10 which is the SUGGESTED value.  Any tick value
  // entered is used as a suggested value which is
  // adjusted to be a 'pretty' value.
  //
  // Output will be an array of the Y axis values that
  // encompass the Y values.
  let result = []
  // If yMin and yMax are identical, then
  // adjust the yMin and yMax values to actually
  // make a graph. Also avoids division by zero errors.
  if (yMin === yMax) {
    yMin = yMin - 10 // some small value
    yMax = yMax + 10 // some small value
  }
  // Determine Range
  let range = yMax - yMin
  let tiks = ticks + 1
  // Adjust ticks if needed
  if (tiks < 2) {
    tiks = 2
  } else if (tiks > 2) {
    tiks -= 2
  }

  // Get raw step value
  let tempStep = range / tiks
  // Calculate pretty step value

  let mag = Math.floor(log10(tempStep))
  let magPow = Math.pow(10, mag)
  let magMsd = parseInt(tempStep / magPow)
  let stepSize = magMsd * magPow

  // build Y label array.
  // Lower and upper bounds calculations
  let lb = stepSize * Math.floor(yMin / stepSize)
  let ub = stepSize * Math.ceil((yMax / stepSize))
  // Build array
  let val = lb
  while (1) {
    result.push(val)
    val += stepSize
    if (val > ub) {
      break
    }
  }

  return {
    result,
    niceMin: result[0],
    niceMax: result[result.length - 1]
  }
}


// initialize SVG.js
var draw = SVG('drawing');

globals.dom.elGraphical = draw.group().attr({
  class: 'apexcharts-inner apexcharts-graphical'
})
globals.dom.elDefs = draw.defs();

globals.dom.elGraphical.add(globals.dom.elDefs)


const Dimensions = {
  plotCoords() {
    this.setGridCoordsForAxisCharts()
  },
  setGridCoordsForAxisCharts() {
		let xtitleCoords = []
    let xaxisLabelCoords
		let ytitleCoords = [{width:0, height:0}]
    let yaxisLabelCoords = {
      width: 0,
      height: 0
    }
    yaxisLabelCoords = this.getyAxisLabelsCoords()
    xaxisLabelCoords = this.getxAxisLabelsCoords()
		globals.yLabelsCoords = [];
		globals.yTitleCoords = []
		config.yaxis.map((yaxe, index) => {
      globals.yLabelsCoords.push({
        width: yaxisLabelCoords[index].width,
        index
      })
      globals.yTitleCoords.push({
        width: ytitleCoords[index].width,
        index
      })
    })
    let xAxisHeight = xaxisLabelCoords.height * globals.lineHeightRatio + 15
    let xAxisWidth = xaxisLabelCoords.width
		
    globals.xAxisLabelsHeight = xAxisHeight
		
		let yAxisWidth = xaxisLabelCoords.width + 5
		globals.translateY = 10 + config.grid.padding.top
		globals.translateX = yAxisWidth + config.grid.padding.left
		this.setYAxisXPosition(ytitleCoords,yaxisLabelCoords)
  },
  getyAxisLabelsCoords() {
    let width = 0;
    let height = 0;
    let labelPad = 10;
    let ret = [];
    let val = globals.yAxisScale[0].niceMax
    let virtualText = drawText({
      x: 0,
      y: 0,
      text: val,
      textAnchor: 'start',
      fontSize: '12px',
      foreColor: '#fff',
      opacity: 0
    });
    let rect = virtualText.node.getBoundingClientRect()
    virtualText.node.parentNode.removeChild(virtualText.node)
    ret.push({
      width: rect.width + labelPad,
      height: rect.height
    })
    return ret;
  },
  getxAxisLabelsCoords() {
    let xaxisLabels = globals.labels.slice();
    let val = xaxisLabels.reduce(function(a, b) {
      return a.length > b.length ? a : b
    }, 0);
    let virtualText = drawText({
      x: -200,
      y: -200,
      text: val,
      textAnchor: 'start',
      foreColor: '#fff',
      opacity: 0
    });
    let xLabelrect = virtualText.node.getBoundingClientRect()

    let rect = {
      width: xLabelrect.width,
      height: xLabelrect.height
    }
    return {
      width: rect.width,
      height: rect.height
    }
  },
	setYAxisXPosition(ytitleCoords,yaxisLabelCoords){
		let xLeft = 0
    let xRight = 0
		config.yaxis.map((yaxe, index) => {
			let yAxisWidth = (yaxisLabelCoords[index].width + ytitleCoords[index].width)
			let paddingForYAxisTitle = YAxis.xPaddingForYAxisTitle(index,{
				width: yaxisLabelCoords[index].width
			},{
				width: ytitleCoords[index].width
			},yaxe.opposite)
			if(config.yaxis.length > 1){
			
			} else {
				if (yaxe.title.text === undefined) {
          yAxisWidth = yAxisWidth + Math.abs(paddingForYAxisTitle.padd) + 15
        } else {
          yAxisWidth = yAxisWidth + Math.abs(paddingForYAxisTitle.padd)
        }
			}
			
			if (!yaxe.opposite) {
				// left side y axis
        let offset = yAxisWidth
				if(config.yaxis.length > 1) {
				
				} else {
					xLeft = globals.translateX - yAxisWidth + yaxisLabelCoords[index].width + yaxe.labels.offsetX + 2
				}
				console.log(xLeft)
				globals.translateYAxisX[index] = xLeft
			}
			
		})
	}
}

const YAxis = {
	xPaddingForYAxisTitle(realIndex, yAxisLabelsCoord, yAxisTitleCoord, yAxisOpposite) {
		let oppositeAxisCount = 0
		let x = 0
    let padd = 20
		if(yAxisOpposite) {
			x = yAxisLabelsCoord.width + 
					config.yaxis[realIndex].title.offsetX + padd + 		yAxisTitleCoord.width / 2 - 15
			if (oppositeAxisCount === 0) {
        x = x - 15
      }
      oppositeAxisCount += 1
		} else {
			x = yAxisLabelsCoord.width * -1 +
          config.yaxis[realIndex].title.offsetX + padd + yAxisTitleCoord.width / 2 - 15
		}
		return {xPos: x, padd}
	}
}

const Grid = {
  drawGridArea(elGrid = null) {
    if (elGrid === null) {
      elGrid = group({
        'class': 'apexcharts-grid'
      })
    }
    let elVerticalLine = drawLine(
      globals.padHorizontal,
      1,
      globals.padHorizontal,
      globals.gridHeight,
      'transparent'
    )

    let elHorzLine = drawLine(
      globals.padHorizontal,
      globals.gridHeight,
      globals.gridWidth,
      globals.gridHeight,
      'transparent'
    )

    elGrid.add(elHorzLine)
    elGrid.add(elVerticalLine)

    return elGrid
  },
  renderGrid() {
    const {
      gridWidth,
      gridHeight,
      padHorizontal,
      labels,
      yAxisScale
    } = globals;
    let elg = group({
      'class': 'apexcharts-grid'
    })
    let tickAmount = yAxisScale[0].result.length - 1 || 5
    let xCount = labels.length
    // draw vertical line
    if (config.grid.xaxis.lines.show || config.xaxis.axisTicks.show) {
      let x1 = padHorizontal
      let y1 = 0;
      let x2 = padHorizontal
      let y2 = gridHeight
      for (let i = 0; i < xCount; i++) {
        x1 = (x1 + gridWidth / xCount)
        x2 = x1
        if (i === xCount - 1) break
        if (config.grid.xaxis.lines.show) {
          let line = drawLine(x1, y1, x2, y2, config.grid.borderColor)
          line.node.classList.add('apexcharts-gridline')
          elg.add(line)
        }
        drawXaxisTicks(x1, elg)
      }
    }

    if (config.grid.yaxis.lines.show) {
      let x1 = 0
      let y1 = 0
      let y2 = 0
      let x2 = globals.gridWidth
      for (let i = 0; i < tickAmount + 1; i++) {
        let line = drawLine(x1, y1, x2, y2, config.grid.borderColor)
        elg.add(line)
        line.node.classList.add('apexcharts-gridline')
        y1 = y1 + globals.gridHeight / tickAmount
        y2 = y1
      }
    }

    return {
      el: elg,
      xAxisTickWidth: (globals.gridWidth / xCount)
    }
  }
}

const Graphics = {
  init(ctx) {
    this.ctx = ctx
    this.w = ctx.w
  },
  group(attrs = null) {
    const w = this.w
    const g = w.globals.dom.Paper.group()

    if (attrs !== null) {
      g.attr(attrs)
    }
    return g
  },
  setAttrs(el, attrs) {
    for (let key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        el.setAttribute(key, attrs[key])
      }
    }
  }
}

const Core = {
  init(el, ctx) {
    this.ctx = ctx;
    this.w = ctx.w;
    this.el = el;
  },

  setupEvents() {
    let gl = this.w.globals
    let cnf = this.w.config
    gl.dom.baseEl = opt.el;
    gl.dom.elWrap = document.createElement('div');
    Graphics.setAttrs(gl.dom.elWrap, {
      class: 'apexcharts-canvas '
    });
    this.el.appendChild(gl.dom.elWrap)
    gl.dom.Paper = new SVG.Doc(gl.dom.elWrap)
    gl.dom.Paper.attr({
      class: 'apexcharts-svg',
      'xmlns:data': 'ApexChartsNS',
      transform: `translate(${cnf.chart.offsetX}, ${cnf.chart.offsetY})`
    })
  }

}


function shiftGraphPosition() {
	const {translateY,translateX, dom} = globals;
	let scalingAttrs = {
		transform: 'translate(' + translateX + ', ' + translateY + ')'
	}
  Graphics.setAttrs(dom.elGraphical.node, scalingAttrs)
}

function group(attrs = null) {
  const g = draw.group()

  if (attrs !== null) {
    g.attr(attrs)
  }
  return g
}

function drawText(opts) {
  let {
    x,
    y,
    text,
    textAnchor,
    fontSize,
    foreColor,
    opacity
  } = opts

  if (!textAnchor) {
    textAnchor = 'middle'
  }

  if (!foreColor) {
    foreColor = '#000'
  }

  let elText = draw.plain(text)

  elText.attr({
    x: x,
    y: y,
    'text-anchor': textAnchor,
    'dominate-baseline': 'central',
  })

  elText.node.style.fontSize = fontSize
  elText.node.style.fill = foreColor
  elText.node.style.opacity = opacity

  return elText
}

function drawLine(x1, y1, x2, y2, lineColor = '#a8a8a8', dashArray = 0, strokeWidth = 1) {
  const line = draw.line().attr({
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    stroke: lineColor,
    'stroke-dasharray': dashArray,
    'stroke-width': strokeWidth
  })

  return line
}

function drawXaxis() {
  const {
    labels,
    gridWidth,
    gridHeight,
		padHorizontal
  } = globals;
  const elXaxis = group({
    'class': 'apexcharts-xaxis'
  })

  let elXaxisTexts = group({
		'class': 'apexcharts-xaxis-texts-g',
		'transform':
		`translate(${globals.translateXAxisX}, ${globals.translateXAxisY})`
	})


  elXaxis.add(elXaxisTexts)

  const labelsLen = labels.length;
  const colWidth = gridWidth / labelsLen;

  let xPos = padHorizontal + colWidth;
  for (let i = 0; i <= labelsLen - 1; i++) {
    let label = typeof labels[i] === 'undefined' ? '' : labels[i];
    let x = xPos - colWidth / 2
		let offsetYCorrection = 28
    let elTick = drawText({
      x: x,
      y: gridHeight + offsetYCorrection,
      text: '',
      textAnchor: 'middle',
      fontSize: '12px',
    })
    elXaxisTexts.add(elTick)

    elTick.tspan(label)
    xPos = xPos + colWidth
  }
  let elHorzLine = drawLine(0, gridHeight + 1, gridWidth, gridHeight + 1, '#78909C', 0, '1px')

  elXaxis.add(elHorzLine)

  return elXaxis
}

function drawYaxis(realIndex=0) {
  let elYaxis = group({
		class: 'apexcharts-yaxis',
		'rel': realIndex,
		'transform':
		'translate(' + globals.translateYAxisX[realIndex] + ', 0)'
	})

  let elYaxisTexts = group({
    'class': 'apexcharts-yaxis-texts-g'
  })
  elYaxis.add(elYaxisTexts)
  let tickAmount = globals.yAxisScale[0].result.length - 1;
  let labelsDivider = globals.gridHeight / tickAmount + 0.1;
  let l = globals.translateY;
  for (let i = tickAmount; i >= 0; i--) {
    let val = globals.yAxisScale[0].result[i];
    let xPad = 20;
    let label = drawText({
      x: xPad,
      y: l + tickAmount / 10 + 1,
      text: val,
      textAnchor: 'end',
      fontSize: '12px',
    })
    elYaxisTexts.add(label)
    l = l + labelsDivider
  }

  let x = 31;

  let elVerticalLine = drawLine(
    x,
    globals.translateY - 2,
    x,
    globals.gridHeight + globals.translateY + 2,
    '#78909C'
  )
  elYaxis.add(elVerticalLine)
  drawYaxisTicks(x, tickAmount, labelsDivider, elYaxis)
  return elYaxis
}

function drawXaxisTicks(x1, appendToElement) {
  let x2 = x1;
  if (x1 < 0 || x1 > globals.gridWidth) return
  let y1 = globals.gridHeight;
  let y2 = y1 + config.axisTicks.height
  let line = drawLine(
    x1,
    y1,
    x2,
    y2,
    config.axisTicks.color
  )

  // we are not returning anything, but appending directly to the element pased in param
  appendToElement.add(line)
  line.node.classList.add('apexcharts-xaxis-tick')
}

function drawYaxisTicks(x, tickAmount, labelsDivider, elYaxis) {
  let t = globals.translateY
  for (let i = tickAmount; i >= 0; i--) {
    let tY = t + tickAmount / 10 - 1
    let elTick = drawLine(
      x - config.axisTicks.width,
      tY,
      x,
      tY,
      config.axisTicks.color
    )
    elYaxis.add(elTick)
    t = t + labelsDivider
  }
}


function drawAxis() {
  const elXaxis = drawXaxis();
  globals.dom.elGraphical.add(elXaxis)
		drawYaxis();
	
}


function drawGrid() {
  const grid = Object.create(Grid);
  let elgrid = grid.renderGrid();
  globals.dom.elGraphical.add(elgrid.el)
  grid.drawGridArea(elgrid.el);
  //const elYaxis = drawYaxis();
}


function drawChart() {
	Dimensions.plotCoords();
	shiftGraphPosition();
  drawGrid();
  drawAxis();

}


drawChart();

