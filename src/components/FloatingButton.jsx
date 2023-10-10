import Button from "react-bootstrap/Button";

const FloatingButton = ({ onClick }) => {
  return (
    <div className="floating-button-container">
      <Button onClick={onClick}>Download CSV</Button>
    </div>
  );
};
export default FloatingButton;
