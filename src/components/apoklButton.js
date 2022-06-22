import ButtonStyles from '../styles/Button.module.scss';

const ApoklButton = ({text}) =>{
    return(
        <div className={ButtonStyles.button}>
          <p className={ButtonStyles.buttonContent}>{text}</p>
        </div>
    )
};

export default ApoklButton;