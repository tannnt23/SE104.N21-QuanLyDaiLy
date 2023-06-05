import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      className="cursor-pointer"
      onClick={goBack}
    >
      <ArrowBackIosIcon/>
    </button>
  );
};

export default BackButton;
