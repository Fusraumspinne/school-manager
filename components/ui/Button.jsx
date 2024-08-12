import Button from 'react-bootstrap/Button';


function MagicButton({variant, content, funktion, extraClass, type}) {
  return (
    <>
      <Button className={extraClass + " d-flex justify-content-center align-items-center"} onClick={funktion} variant={variant} type={type}>{content}</Button>
    </>
  );
}

export default MagicButton;