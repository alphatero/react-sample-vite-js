import { Button } from "react-bootstrap";
import { useState } from 'react'
export const CartItem = ({ item, handleDelete, handleUpdate }) => {
  const [count, setCount] = useState(1)
  const { name, price, description} = item;
  return (
    <tr>
      <td>
        <Button variant="danger" onClick={() => handleDelete(item)}>x</Button>
      </td>
      <td>{name}</td>
      <td>
        <small>{description}</small>
      </td>
      <td>
        <select value={count} className="form-select" onChange={(e) => {
         
          setCount(Number(e.target.value))
          handleUpdate({ ...item, count: Number(e.target.value) })
        }}>
          {
            [...Array(10).keys()].map((item) => {
              return (<option value={item + 1} key={item}>{item + 1}</option>)
            }
            )
          }
        </select>
      </td>
      <td>{price}</td>
      <td>{price * count}</td>
    </tr>
  );
};