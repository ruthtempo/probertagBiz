import { Dropdown } from "react-bootstrap";

export const Sorter = ({ setSortBy }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortBy("price")}>
          by price (ascending)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortBy("sqm")}>
          by square meter (descending)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
