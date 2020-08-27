import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            address:"", 
            showCheckout: false
        };
    }

    handleInput= (e) =>{
        this.setState({[e.target.name]:e.target.value})
    };

    createOrder = (e) =>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }

        this.props.createOrder(order);
    };

    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems===0?<div className="cart cart-header">Cart is Empty</div>
                :
                <div className="cart cart-header">You have {cartItems.length} in the cart {" "} </div>
            }
            <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item=>(
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="rigth">
                                        {formatCurrency(item.price)} x {item.count}{" "}
                                    <button className="button" onClick={()=>this.props.removeFromCart(item)}>Remove</button>
                                    </div>
                                   
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {cartItems.length!== 0 && (
                    <div>
                     <div className="cart">
                     <div className="total">
                         Total:{" "}
                             <div>{formatCurrency(cartItems.reduce((a,c)=>a+c.price*c.count,0))}</div>
                     </div>
                     <button onClick={()=>{
                         this.setState({showCheckout:true});
                         
                         }} className="button primary">
                             Proced
                     </button>
                 </div>
                {this.state.showCheckout && (
                    <div className="cart">
                    <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                            <li>
                                <label>Email</label>
                                <input type="email" name="email" required onChange={this.handleInput}/>
                            </li>
                            <li>
                                <label>Name</label>
                                <input type="text" name="name" required onChange={this.handleInput}/>
                            </li>
                            <li>
                                <label>Address</label>
                                <input type="text" name="address" required onChange={this.handleInput}/>
                            </li>
                            <li>
                                <button type="submit" className="button primary">Chekout</button>
                            </li>
                        </ul>
                    </form>
                    </div>
                )}

               </div>
                )}
            </div>
        </div>
            
        )
    }
}
