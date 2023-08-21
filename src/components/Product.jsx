import { Button } from "react-bootstrap";
export const Product = ({ item, handleAdd }) => {
  const { name, price, description } = item;
  return (
    <a href="#" className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <div className='d-flex flex-column align-items-start'>
          <h5 className="mb-1">{name}</h5>
          <p className="mb-1">{description}</p>
          <small>$ {price}</small>
        </div>
        <Button onClick={() => handleAdd(item)}>加入</Button>
      </div>
    </a>
  );
};