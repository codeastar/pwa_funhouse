import React from 'react';
import './Btc.css'
import axios from 'axios'
import moment from 'moment';

class Btc extends React.Component {
    // Adds a class constructor that assigns the initial state values:
    constructor () {
        super();
        this.state = {
            btcusd: '<getting info...>', 
            last_updated:'',
            price_change: 0,
            price_sign: ''
        };
        this.last_price = null;
        this.price_change =0;
    }//constructor

    componentDidMount () 
    {
       // console.log("Mount");
        this.timerID = setInterval(
            () => this.getBtcInfo(),
            1000
          );// timer , 1 sec
       // console.log(">>"+this.timerID);
    }//componentDidMount
  
    componentWillUnmount() 
    {
        clearInterval(this.timerID);
    }//componentWillUnmount

    getBtcInfo()
    {       
        axios.get("https://blockchain.info/ticker")
        .then(response => {
           let current_price = response.data.USD.last;

           this.setState({ latest_price: current_price });
           this.setState({ btcusd: current_price });
 
           if (this.last_price)
           {
                let change = parseFloat(current_price) - parseFloat(this.last_price);
                if (change !== 0)  
                {
                    this.setState({ price_change: change.toFixed(2) });
                    let sign = (change > 0) ? '+' : '';
                    this.setState({ price_sign: sign });
                }//if (change !== 0)                
                console.log(this.price_change);
                console.log(this.last_price);
           }//if (this.last_price)

           this.last_price = current_price;

           let curr_date = moment().local().format('YYYY-MM-DD HH:mm:ss');
           this.setState({ last_updated: curr_date });          
         })
        // Catch any error here
        .catch(error => {
           console.log(error)
           this.setState({ btcusd: this.state.btcusd });
        })// axios.get    
    }//getBtcInfo()

    render() {
        return (
                <div className="divTable darkTable">
                    <div className="divTableBody">
                        <div className="divTableRow">
                          <div className="divTableCell">BTC/USD:</div><div className="divTableCell">${this.state.btcusd}</div>
                        </div>
                        <div className="divTableRow">
                          <div className="divTableCell">Change:</div><div className="divTableCell">{this.state.price_sign}{this.state.price_change}</div>
                        </div>
                        <div className="divTableRow">
                          <div className="divTableCell">Last updated:</div><div className="divTableCell">{this.state.last_updated}</div>
                        </div>
                    </div>
                </div>    
        )
    }//render
}//Btc class

export default Btc;