import Logo from './Logo';
import DarkModeSwitcher from './DarkModeSwitcher';

const StartHeader = () => {
    return (
        <div>
            <DarkModeSwitcher />
            <Logo />
        </div>
    );
};

export default StartHeader;
