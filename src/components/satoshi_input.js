import React from 'react'

function generateValues(max = 1000000) {
  const vals = [];
  let val = 100;
  vals.push(val);
  while (val < max) {
    val += (10 ** (val.toString().length - 1));
    if (val < max) vals.push(val);
  }
  vals.push(max);
  return vals;
}

export default class SatoshiInput extends React.Component {
  constructor(props) {
    super(props);
    this.values = generateValues(this.props.max);

    this.state = {
      index: Math.floor((this.values.length - 1) / 2),
      satoshis: this.values[Math.floor((this.values.length - 1) / 2)],
      numberInput: false
    };


  }


  handleChange = ({ target }) => {
    const index = parseInt(target.value);
    const satoshis = this.values[index];
    this.setState({ index, satoshis, numberInput: false });
    this.props.onUpdate(satoshis)
  }

  handleSatoshiChange = ({target}) => {
    const satoshis = parseInt(target.value);
    this.setState({ satoshis });

  }

  numberInput = () => {
    this.setState({ numberInput: true })
  }

  render() {
    const { index, satoshis } = this.state;

    return(
      <div id="satoshi-input-container">
        {this.state.numberInput ?
          <div className="satoshi-amount" id="rek-form-satoshis">
            <input autoFocus={true} id="satoshis-number-input" type="text" value={satoshis} onChange={this.handleSatoshiChange} />
            <div> Satoshis</div>
          </div>
          : <div className="satoshi-amount" id="rek-form-satoshis">
              <div onClick={this.numberInput} className="wallet-satoshis">{satoshis.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0})}</div>
              <div> Satoshis</div>
            </div>
        }
        <input
          id="satoshi-input"
          className="slider"
          type="range"
          value={index}
          onChange={this.handleChange}
          max={this.values.length - 1}
        />
      </div>
    )
  }
}