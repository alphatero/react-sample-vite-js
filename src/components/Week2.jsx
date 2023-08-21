import { data } from '../constants';
import { useState, useEffect } from 'react';
import { CartItem } from './CartItem';
import { Product } from './Product';

export const Week2 = () => {
  const [cart, setCart] = useState([])  
  const [total, setTotal] = useState(0)
  const [order, setOrder] = useState({})
  const [comment, setComment] = useState('')
  const handleDelete = (select) => {
    const newCart = cart.filter((item) => {
      return item.id !== select.id
    })
    setCart(newCart)
  }

  const handleAdd = (item) => {
    // add item to cart if not exist
    const exist = cart.find((cartItem) => cartItem.id === item.id)
    if (exist) {
      return
    }
    else {
      setCart([
        ...cart,
        {
          ...item,
          count: 1,
        },
      ])
    }
  }

  const handleUpdate = (item) => {
    // update cart item with new count
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return item
      }
      return cartItem
    })
    setCart(newCart)
  }

  const handleOrder = (cart, total, comment) => {
    const order = {
      cart,
      total,
      comment,
    }
    setOrder(order)
  }

  useEffect(() => {
    // cart.map((item) => item.count * item.price)
    const total = cart.reduce((acc, item) => {
      return acc + item.count * item.price
    }, 0)
    setTotal(total)
  }, [cart])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            {data.map((item) => (
              <Product key={item.id} item={item} handleAdd={handleAdd} />
            ))}
          </div>
        </div>
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" width="50">
                  操作
                </th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">
                  數量
                </th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => (
                <CartItem key={index} item={item} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
              ))}
            </tbody>
          </table>
          <div className="text-end mb-3">
            <h5>
              總計: <span>${ total}</span>
            </h5>
          </div>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="備註"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="text-end">
            <button className="btn btn-primary" onClick={ () => handleOrder(cart, total, comment)
            }>送出</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h5>訂單</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">品項</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order?.cart?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>{item.price * item.count}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                <div className="text-end">
                  備註: <span>{ order?.comment}</span>
                </div>
                <div className="text-end">
                  <h5>
                    總計: <span>${ order?.total}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
